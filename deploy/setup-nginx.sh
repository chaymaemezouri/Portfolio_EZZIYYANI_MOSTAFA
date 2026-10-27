#!/usr/bin/env bash
set -euo pipefail

SNIPPET_SRC="${1:-}"
if [ -z "$SNIPPET_SRC" ]; then
  for candidate in \
    "$HOME/ezziyyani-cms/deploy/nginx-api.conf" \
    /var/www/ezziyyani-portfolio-deploy/nginx-api.conf
  do
    if [ -f "$candidate" ]; then
      SNIPPET_SRC="$candidate"
      break
    fi
  done
fi
if [ ! -f "${SNIPPET_SRC:-}" ]; then
  echo "nginx snippet not found" >&2
  exit 1
fi

mkdir -p /etc/nginx/snippets
cp "$SNIPPET_SRC" /etc/nginx/snippets/ezziyyani-api.conf
cp "$SNIPPET_SRC" /var/www/ezziyyani-portfolio-deploy/nginx-api.conf 2>/dev/null || true

python3 - <<'PY'
from pathlib import Path

needles = (
    "    location / {",
    "  location / {",
    "\tlocation / {",
    "    location /{",
    "location / {",
)
include = "    include snippets/ezziyyani-api.conf;\n"
roots = [
    Path("/etc/nginx/sites-enabled"),
    Path("/etc/nginx/sites-available"),
    Path("/etc/nginx/conf.d"),
    Path("/www/server/panel/vhost/nginx"),
]
files = []
for root in roots:
    if root.is_dir():
        files.extend(sorted(p for p in root.rglob("*") if p.is_file()))
files.append(Path("/etc/nginx/nginx.conf"))

def interesting(text: str) -> bool:
    return any(
        token in text
        for token in (
            "ezziyyani-portfolio-deploy",
            "ezziyyani.com",
            "try_files $uri $uri/ /index.html",
            "try_files $uri /index.html",
        )
    )

changed = []
seen = []
for path in files:
    try:
        text = path.read_text()
    except OSError:
        continue
    if "ezziyyani-api.conf" in text or "location ^~ /api" in text:
        seen.append(str(path))
        continue
    if not interesting(text):
        continue
    for needle in needles:
        if needle in text:
            path.write_text(text.replace(needle, include + needle, 1))
            changed.append(str(path))
            break

if not changed and not seen:
    raise SystemExit("No nginx site matched ezziyyani.com / SPA root")
print("nginx already proxied:" if seen and not changed else "nginx updated:")
for item in seen + changed:
    print(" -", item)
PY

nginx -t
if command -v systemctl >/dev/null 2>&1; then
  systemctl reload nginx
else
  nginx -s reload
fi
echo "nginx API proxy ready"
