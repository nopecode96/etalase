#!/bin/sh
set -e

echo "Menyiapkan skema dan data awal database..."
node ./prisma/seed.js || true

echo "Menjalankan aplikasi Next.js di port 3005..."
exec "$@"
