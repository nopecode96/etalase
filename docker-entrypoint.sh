#!/bin/sh
set -e

echo "Menunggu database PostgreSQL siap..."
npx prisma migrate deploy

echo "Menjalankan aplikasi di port 3005..."
exec "$@"
