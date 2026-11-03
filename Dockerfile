# ScaleUp Web — production image (Next.js standalone output).
# Build:  docker compose build      Run:  docker compose up -d

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 1) Install dependencies (cached unless package files change)
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# 2) Build the site
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Baked in at build time (metadata is prerendered). Change them → rebuild.
ARG NEXT_PUBLIC_SITE_URL=https://scaleupweb.xyz
ARG GOOGLE_SITE_VERIFICATION=""
ARG BING_SITE_VERIFICATION=""
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    GOOGLE_SITE_VERIFICATION=$GOOGLE_SITE_VERIFICATION \
    BING_SITE_VERIFICATION=$BING_SITE_VERIFICATION
RUN npm run build

# 3) Small runtime image
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/robots.txt >/dev/null || exit 1
CMD ["node", "server.js"]
