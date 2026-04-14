#!/bin/sh
set -eu

API_URL="${VITE_API_BACKEND_URL:-}"

cat > /usr/share/nginx/html/runtime-config.js <<EOF
window.__APP_CONFIG__ = {
  VITE_API_BACKEND_URL: "${API_URL}"
};
EOF

exec "$@"
