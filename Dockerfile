# Stage 1: Install Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci

# Stage 2: Rebuild & Generate Standalone Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Sediakan dummy DATABASE_URL untuk keperluan prerendering build Next.js
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public"
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npx prisma generate
RUN npm run build

# Stage 3: Runner (Image Akhir Produksi)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3005
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Salin aset publik dan hasil standalone build dari stage builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/docker-entrypoint.sh ./docker-entrypoint.sh

# Berikan izin eksekusi pada entrypoint script
RUN chmod +x ./docker-entrypoint.sh

USER nextjs

EXPOSE 3005

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
