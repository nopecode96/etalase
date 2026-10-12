#!/bin/sh
set -e

echo "Menunggu database PostgreSQL siap..."

# Jalankan migrasi jika binary lokal tersedia, jangan biarkan proses menggagalkan boot web
if [ -f "./node_modules/.bin/prisma" ]; then
  ./node_modules/.bin/prisma migrate deploy || true
fi

echo "Memulai server Next.js di port 3005..."
exec "$@"
