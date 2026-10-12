#!/bin/sh
set -e

echo "Menyiapkan skema database & seed awal..."
node ./prisma/seed.js || true

echo "Memulai server Next.js etalase.online di port 3005..."
exec "$@"
