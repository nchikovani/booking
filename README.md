# Booking Miniapp

Telegram Booking Platform — платформа онлайн-записи с Web Admin, Telegram Mini App и Backend API.

## Требования

- **Node.js** >= 18
- **pnpm** 9.x
- **Docker** и Docker Compose (для локальной разработки)

## Быстрый старт

1. **Установить зависимости:**

   ```sh
   pnpm install
   ```

2. **Поднять инфраструктуру** (PostgreSQL, Redis, MinIO):

   ```sh
   pnpm infra:up
   ```

3. **Настроить переменные окружения** — скопировать `.env.example` в `.env` в каждой app:

   ```sh
   cp apps/api/.env.example apps/api/.env
   cp apps/admin/.env.example apps/admin/.env
   cp apps/miniapp/.env.example apps/miniapp/.env
   cp packages/prisma/.env.example packages/prisma/.env
   ```

4. **Выполнить миграции БД** (если есть):

   ```sh
   pnpm --filter @repo/prisma db:migrate:deploy
   ```

5. **Запустить приложения**:

   ```sh
   pnpm dev
   ```

| Приложение | URL |
|------------|-----|
| API | http://localhost:3000 |
| Admin | http://localhost:3001 |
| Miniapp | http://localhost:3002 |

## Скрипты

| Команда | Описание |
|---------|----------|
| `pnpm dev` | Запуск всех приложений в режиме разработки |
| `pnpm build` | Сборка всех приложений |
| `pnpm infra:up` | Запуск PostgreSQL, Redis, MinIO (docker compose) |
| `pnpm infra:down` | Остановка инфраструктуры |
| `pnpm lint` | Проверка кода (ESLint) |
| `pnpm format` | Форматирование (Prettier) |
| `pnpm check-types` | Проверка типов TypeScript |

## API и Swagger

- **Swagger UI:** http://localhost:3000/swagger
- **OpenAPI JSON:** http://localhost:3000/swagger-json

Base URL API: `/api/v1`

## Инфраструктура (локально)

| Сервис | Порт | Учётные данные |
|--------|------|----------------|
| PostgreSQL | 5432 | user: `booking`, db: `booking`, password: `booking` |
| Redis | 6379 | — |
| MinIO API | 9000 | `minioadmin` / `minioadmin` |
| MinIO Console | 9001 | — |

## Структура проекта

```
├── apps/
│   ├── api          — NestJS Backend API
│   ├── admin        — Next.js Web Admin
│   └── miniapp      — Next.js Telegram Mini App
├── packages/
│   ├── prisma       — Prisma schema, миграции, клиент
│   ├── ui           — общие UI компоненты
│   ├── eslint-config
│   └── typescript-config
├── infra/           — k8s манифесты, деплой
└── docs/            — документация (см. [docs/README.md](docs/README.md))
```

## Деплой

Инструкции по деплою в k3s см. в [infra/README.md](infra/README.md).

## Документация

- [docs/README.md](docs/README.md) — обзор документации
- [Architecture](docs/architecture.md) — архитектура системы
- [Roadmap](docs/roadmap.md) — дорожная карта разработки
- [PRD](docs/prd.md) — спецификация продукта
- [Project Overview](docs/project.md) — обзор продукта и ролей
