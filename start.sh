#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

log() { echo -e "${CYAN}[sync-mate-app]${NC} $1"; }
ok()  { echo -e "${GREEN}[ok]${NC} $1"; }

if [ ! -d "node_modules" ]; then
  log "Installing npm dependencies..."
  npm install
fi

if [ ! -f "node_modules/electron/path.txt" ]; then
  log "Downloading Electron binary..."
  node node_modules/electron/install.js
fi

ok "Starting Electron app..."
npm run dev
