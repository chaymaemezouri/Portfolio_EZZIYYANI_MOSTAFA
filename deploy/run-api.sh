#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/server"

if ! command -v node >/dev/null 2>&1; then
  if [ -s "$HOME/.nvm/nvm.sh" ]; then
    # shellcheck disable=SC1091
    . "$HOME/.nvm/nvm.sh"
  fi
fi

if ! command -v node >/dev/null 2>&1; then
  echo "node is not available in PATH" >&2
  exit 1
fi

exec "$ROOT/server/node_modules/.bin/tsx" src/index.ts
