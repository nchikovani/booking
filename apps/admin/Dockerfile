# Build stage
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/admin ./apps/admin

RUN pnpm install --frozen-lockfile
RUN pnpm --filter admin build

# Production stage
FROM node:20-alpine AS runner

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/admin ./apps/admin

EXPOSE 3000

CMD ["pnpm", "--filter", "admin", "start"]
