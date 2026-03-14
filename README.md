# Booking Miniapp

Telegram Booking Platform — платформа онлайн-записи с Web Admin, Telegram Mini App и Backend API.

## Быстрый старт

1. **Поднять инфраструктуру** (PostgreSQL, Redis, MinIO):

   ```sh
   pnpm infra:up
   ```

2. **Настроить переменные окружения** — скопировать `.env.example` в `.env` в каждой app:

   ```sh
   cp apps/api/.env.example apps/api/.env
   cp apps/admin/.env.example apps/admin/.env
   cp apps/miniapp/.env.example apps/miniapp/.env
   cp packages/prisma/.env.example packages/prisma/.env
   ```

3. **Запустить приложения**:

   ```sh
   pnpm dev
   ```

- API: http://localhost:3000
- Admin: http://localhost:3001
- Miniapp: http://localhost:3002

## Структура проекта

- `apps/api` — NestJS Backend API
- `apps/admin` — Next.js Web Admin
- `apps/miniapp` — Next.js Telegram Mini App
- `packages/prisma` — Prisma schema и клиент

## Деплой

Инструкции по деплою в k3s см. в [infra/README.md](infra/README.md).

## Документация

- [Architecture](docs/architecture.md) — архитектура системы
- [Roadmap](docs/roadmap.md) — дорожная карта разработки
