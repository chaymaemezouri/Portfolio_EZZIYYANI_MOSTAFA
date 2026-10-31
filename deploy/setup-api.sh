#!/usr/bin/env bash
set -euo pipefail

ROOT="${CMS_ROOT:-$HOME/ezziyyani-cms}"
SERVER="$ROOT/server"
ENV_FILE="$SERVER/.env"
SNIPPET_SRC="$ROOT/deploy/nginx-api.conf"
ADMIN_EMAIL="${ADMIN_EMAIL:-mezzyani@uae.ac.ma}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-EzziyyaniAdmin2026}"
DEPLOY_USER="$(id -un)"
NVM_VER="$(ls -1 "$HOME/.nvm/versions/node" 2>/dev/null | tail -1 || true)"
export PATH="${HOME}/.nvm/versions/node/${NVM_VER}/bin:/usr/local/bin:/usr/bin:/bin:${PATH:-}"

log() { printf '%s\n' "$*"; }

ensure_node() {
  if command -v node >/dev/null 2>&1; then
    log "node $(node -v)"
    return
  fi
  if [ -s "$HOME/.nvm/nvm.sh" ]; then
    # shellcheck disable=SC1091
    . "$HOME/.nvm/nvm.sh"
    nvm use 22 >/dev/null 2>&1 || nvm use default >/dev/null 2>&1 || true
  fi
  if command -v node >/dev/null 2>&1; then
    log "node $(node -v) via nvm"
    return
  fi
  if sudo -n true 2>/dev/null; then
    log "Installing Node.js 22 with apt"
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -n bash -
    sudo -n apt-get install -y nodejs build-essential python3
  else
    log "Installing nvm + Node.js 22 for $DEPLOY_USER"
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    # shellcheck disable=SC1091
    . "$HOME/.nvm/nvm.sh"
    nvm install 22
  fi
  command -v node >/dev/null 2>&1 || { echo "Unable to install Node.js" >&2; exit 1; }
}

ensure_node
mkdir -p "$SERVER/data" "$SERVER/uploads"
cd "$SERVER"

if [ ! -f package-lock.json ]; then
  echo "server/package-lock.json is missing" >&2
  exit 1
fi

if ! npm ci --omit=dev; then
  if sudo -n true 2>/dev/null; then
    sudo -n apt-get update -y
    sudo -n apt-get install -y build-essential python3
    npm ci --omit=dev
  else
    echo "npm ci failed (native module build?). Install build-essential python3 on the VPS." >&2
    exit 1
  fi
fi

TSX="$SERVER/node_modules/.bin/tsx"

if [ -f "$ENV_FILE" ] && ! grep -q "^ADMIN_PASSWORD_HASH='" "$ENV_FILE"; then
  log "Existing .env is unquoted, recreating"
  rm -f "$ENV_FILE"
fi

if [ ! -f "$ENV_FILE" ]; then
  log "Creating $ENV_FILE"
  HASH="$("$TSX" src/hash.ts "$ADMIN_PASSWORD")"
  JWT="${JWT_SECRET:-$(openssl rand -hex 32)}"
  if [ "${#JWT}" -lt 32 ]; then
    JWT="$(openssl rand -hex 32)"
  fi
  umask 077
  cat > "$ENV_FILE" <<EOF
PORT=8787
HOST=0.0.0.0
DIST_DIR=/var/www/ezziyyani-portfolio-deploy
NODE_ENV=production
DATABASE_PATH='$SERVER/data/content.db'
UPLOAD_DIR='/var/www/ezziyyani-portfolio-deploy/uploads'
ADMIN_EMAIL='$ADMIN_EMAIL'
ADMIN_PASSWORD_HASH='$HASH'
JWT_SECRET='$JWT'
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
EOF
else
  log "Keeping existing $ENV_FILE"
  grep -q '^HOST=' "$ENV_FILE" || printf "\nHOST=0.0.0.0\n" >> "$ENV_FILE"
  grep -q '^DIST_DIR=' "$ENV_FILE" || printf "DIST_DIR=/var/www/ezziyyani-portfolio-deploy\n" >> "$ENV_FILE"
  if grep -q "^UPLOAD_DIR='$SERVER/uploads'" "$ENV_FILE" || grep -q "^UPLOAD_DIR=$SERVER/uploads" "$ENV_FILE"; then
    TMP="$(mktemp)"
    grep -v '^UPLOAD_DIR=' "$ENV_FILE" > "$TMP"
    printf "UPLOAD_DIR='/var/www/ezziyyani-portfolio-deploy/uploads'\n" >> "$TMP"
    mv "$TMP" "$ENV_FILE"
    chmod 600 "$ENV_FILE"
  fi
  grep -q '^OPENAI_API_KEY=' "$ENV_FILE" || printf "OPENAI_API_KEY=\n" >> "$ENV_FILE"
  grep -q '^OPENAI_BASE_URL=' "$ENV_FILE" || printf "OPENAI_BASE_URL=https://api.openai.com/v1\n" >> "$ENV_FILE"
  grep -q '^OPENAI_MODEL=' "$ENV_FILE" || printf "OPENAI_MODEL=gpt-4o-mini\n" >> "$ENV_FILE"
fi

DIST_DIR_VALUE="/var/www/ezziyyani-portfolio-deploy"
mkdir -p "$DIST_DIR_VALUE/uploads" "$DIST_DIR_VALUE/cms"
if [ -d "$SERVER/uploads" ] && [ "$(ls -A "$SERVER/uploads" 2>/dev/null || true)" ]; then
  log "Copying existing uploads into the public site folder"
  cp -a "$SERVER/uploads/." "$DIST_DIR_VALUE/uploads/" 2>/dev/null || true
fi

set +u
set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a
set -u

if ! ADMIN_PASSWORD="$ADMIN_PASSWORD" "$TSX" -e "
import bcrypt from 'bcryptjs';
const ok = await bcrypt.compare(process.env.ADMIN_PASSWORD ?? '', process.env.ADMIN_PASSWORD_HASH ?? '');
if (!ok) process.exit(1);
console.log('admin password hash ok');
"; then
  log "Admin password hash does not match, updating"
  HASH="$("$TSX" src/hash.ts "$ADMIN_PASSWORD")"
  TMP="$(mktemp)"
  grep -v '^ADMIN_PASSWORD_HASH=' "$ENV_FILE" > "$TMP"
  printf "ADMIN_PASSWORD_HASH='%s'\n" "$HASH" >> "$TMP"
  mv "$TMP" "$ENV_FILE"
  chmod 600 "$ENV_FILE"
  set +u
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
  set -u
fi

ITEM_COUNT="$("$TSX" -e "
import Database from 'better-sqlite3';
const db = new Database(process.env.DATABASE_PATH);
const row = db.prepare(\"SELECT COUNT(*) AS c FROM sqlite_master WHERE type='table' AND name='items'\").get();
if (!row.c) { console.log(0); process.exit(0); }
console.log(db.prepare('SELECT COUNT(*) AS c FROM items').get().c);
")"
if [ "${ITEM_COUNT:-0}" -eq 0 ]; then
  log "Seeding CMS database"
  npm run seed
else
  log "CMS database already has $ITEM_COUNT item(s)"
fi

insert_nginx_include() {
  local conf="$1"
  python3 - "$conf" <<'PY'
import pathlib, sys
path = pathlib.Path(sys.argv[1])
text = path.read_text()
include = "    include snippets/ezziyyani-api.conf;\n"
if "ezziyyani-api.conf" in text or "location ^~ /api" in text:
    raise SystemExit(0)
replaced = False
for needle in ("    location / {", "  location / {", "\tlocation / {", "    location /{", "location / {"):
    if needle in text:
        path.write_text(text.replace(needle, include + needle, 1))
        replaced = True
        break
if not replaced:
    raise SystemExit("Could not find location / in nginx site")
PY
}

install_nginx() {
  if [ ! -d /etc/nginx ]; then
    log "nginx not found — skip proxy install"
    return 1
  fi

  log "id=$(id)"
  log "nginx paths:"
  ls -ld /etc/nginx /etc/nginx/snippets /etc/nginx/conf.d /etc/nginx/sites-enabled /etc/nginx/sites-available 2>/dev/null || true
  CONF="$(grep -RIl --include='*.conf' --include='*.nginx' 'ezziyyani-portfolio-deploy\|server_name.*ezziyyani.com' /etc/nginx /www/server/panel/vhost/nginx /home 2>/dev/null | head -n 1 || true)"
  log "site config: ${CONF:-none} writable=$( [ -n "${CONF:-}" ] && [ -w "$CONF" ] && echo yes || echo no )"
  if [ -n "${CONF:-}" ]; then
    ls -l "$CONF" || true
    log "----- nginx site -----"
    cat "$CONF" || true
    log "----- end nginx site -----"
  fi

  cp "$SNIPPET_SRC" /var/www/ezziyyani-portfolio-deploy/nginx-api.conf 2>/dev/null || true

  if [ -n "${CONF:-}" ] && [ -w "$CONF" ]; then
    mkdir -p "$(dirname "$CONF")"
    if [ -w /etc/nginx/snippets ]; then
      cp "$SNIPPET_SRC" /etc/nginx/snippets/ezziyyani-api.conf
    else
      python3 - "$CONF" "$SNIPPET_SRC" <<'PY'
import pathlib, sys
conf, snippet = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]).read_text()
text = conf.read_text()
if "location ^~ /api" in text:
    raise SystemExit(0)
marker = "    location / {"
if marker not in text:
    raise SystemExit("Could not find location / in nginx site")
conf.write_text(text.replace(marker, snippet + "\n" + marker, 1))
PY
      nginx -t && nginx -s reload && log "nginx reloaded without sudo" && return 0
      return 1
    fi
    insert_nginx_include "$CONF"
    nginx -t && nginx -s reload && log "nginx reloaded without sudo" && return 0
  fi

  if sudo -n true 2>/dev/null; then
    sudo -n mkdir -p /etc/nginx/snippets
    sudo -n cp "$SNIPPET_SRC" /etc/nginx/snippets/ezziyyani-api.conf
    if [ -z "${CONF:-}" ]; then
      CONF="$(sudo -n grep -RIl --include='*.conf' 'ezziyyani-portfolio-deploy\|server_name.*ezziyyani.com' /etc/nginx 2>/dev/null | head -n 1 || true)"
    fi
    if [ -z "${CONF:-}" ]; then
      log "Could not find nginx site for ezziyyani.com"
      return 1
    fi
    sudo -n python3 - "$CONF" "$SNIPPET_SRC" <<'PY'
import pathlib, sys
conf, snippet = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]).read_text()
text = conf.read_text()
include = "    include snippets/ezziyyani-api.conf;\n"
if "ezziyyani-api.conf" in text or "location ^~ /api" in text:
    raise SystemExit(0)
replaced = False
for needle in ("    location / {", "  location / {", "\tlocation / {", "location / {"):
    if needle in text:
        conf.write_text(text.replace(needle, include + needle, 1))
        replaced = True
        break
if not replaced:
    raise SystemExit("Could not find location / in nginx site")
PY
    sudo -n nginx -t
    sudo -n nginx -s reload || sudo -n systemctl reload nginx || sudo -n service nginx reload
    log "nginx reloaded with sudo"
    return 0
  fi

  log "No writable nginx config and no passwordless sudo"
  return 1
}

restart_api() {
  if command -v fuser >/dev/null 2>&1; then
    fuser -k 8787/tcp >/dev/null 2>&1 || true
  fi
  pkill -f "$SERVER/node_modules/.bin/tsx src/index.ts" >/dev/null 2>&1 || true
  sleep 1

  UNIT="$ROOT/deploy/ezziyyani-api.service"
  NODE_BIN="$(dirname "$(command -v node)")"
  cat > "$UNIT" <<EOF
[Unit]
Description=Ezziyyani CMS API
After=network.target

[Service]
Type=simple
WorkingDirectory=$SERVER
EnvironmentFile=$ENV_FILE
Environment=PATH=$NODE_BIN:/usr/local/bin:/usr/bin:/bin
ExecStart=$ROOT/deploy/run-api.sh
Restart=always
RestartSec=3
User=$DEPLOY_USER

[Install]
WantedBy=multi-user.target
EOF

  if sudo -n true 2>/dev/null; then
    sudo -n cp "$UNIT" /etc/systemd/system/ezziyyani-api.service
    sudo -n systemctl daemon-reload
    sudo -n systemctl enable --now ezziyyani-api
    sudo -n systemctl restart ezziyyani-api
    log "systemd service ezziyyani-api started"
    return
  fi

  mkdir -p "$HOME/.config/systemd/user"
  cp "$UNIT" "$HOME/.config/systemd/user/ezziyyani-api.service"
  sed -i '/^User=/d' "$HOME/.config/systemd/user/ezziyyani-api.service"
  if systemctl --user daemon-reload >/dev/null 2>&1; then
    systemctl --user enable --now ezziyyani-api >/dev/null 2>&1 || true
    systemctl --user restart ezziyyani-api >/dev/null 2>&1 || true
    loginctl enable-linger "$DEPLOY_USER" >/dev/null 2>&1 || true
    if systemctl --user is-active --quiet ezziyyani-api; then
      log "user systemd service started"
      return
    fi
  fi

  log "Starting API with nohup"
  nohup "$ROOT/deploy/run-api.sh" >> "$SERVER/api.log" 2>&1 &
  echo $! > "$SERVER/api.pid"
}

install_nginx || true
restart_api

for _ in $(seq 1 20); do
  if curl -fsS http://127.0.0.1:8787/api/health | grep -q '"ok"'; then
    log "API health OK on 127.0.0.1:8787"
    exit 0
  fi
  sleep 1
done

echo "API did not become healthy on 127.0.0.1:8787" >&2
if [ -f "$SERVER/api.log" ]; then
  tail -n 40 "$SERVER/api.log" >&2 || true
fi
if sudo -n journalctl -u ezziyyani-api -n 40 --no-pager >/dev/null 2>&1; then
  sudo -n journalctl -u ezziyyani-api -n 40 --no-pager >&2 || true
fi
exit 1
