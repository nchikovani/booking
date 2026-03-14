# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/miniapp ./apps/miniapp

RUN pnpm install --frozen-lockfile
RUN pnpm --filter miniapp build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/miniapp/.next/standalone ./
COPY --from=builder /app/apps/miniapp/.next/static ./apps/miniapp/.next/static
COPY --from=builder /app/apps/miniapp/public ./apps/miniapp/public

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["node", "apps/miniapp/server.js"]
