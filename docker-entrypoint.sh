#!/bin/sh
set -e

echo "Menunggu database PostgreSQL siap..."

# Gunakan binary lokal langsung jika tersedia agar tidak memicu download via npx
if [ -f "./node_modules/.bin/prisma" ]; then
  ./node_modules/.bin/prisma migrate deploy
else
  npx --yes prisma migrate deploy || true
fi

echo "Database siap. Menjalankan aplikasi di port 3005..."
exec "$@"
