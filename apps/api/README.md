# Backend API

Backend API — единый сервер бизнес-логики для платформы **Booking Mini App** (система онлайн-записи на услуги для бизнеса через Telegram).

API обслуживает три типа клиентов:

- **Web Admin** — веб-панель администратора бизнеса
- **Telegram Mini App** — клиентское приложение внутри Telegram
- **Telegram Bot** — бот для уведомлений и команд

## Связанные документы

- [Project Overview](../../docs/project.md) — описание продукта и ролей
- [Architecture](../../docs/architecture.md) — обзор; [architecture-api.md](../../docs/architecture-api.md) — Backend, API, БД

---

## Технологический стек

- **Node.js** + **TypeScript**
- **NestJS**
- **Prisma** (PostgreSQL)
- **Redis** — кеш, очереди, напоминания
- **MinIO** — объектное хранилище (логотипы, фото услуг и сотрудников)

Архитектура: Layered (Controller → Service → Repository).

---

## Структура API

Base URL: `/api/v1`

| API                     | Base path       | Назначение                                                                                    |
| ----------------------- | --------------- | --------------------------------------------------------------------------------------------- |
| **Admin API**           | `/api/v1/admin` | Аутентификация, управление бизнесом, услугами, сотрудниками, расписанием, записями, клиентами |
| **Client Mini App API** | `/api/v1/app`   | Информация о компании, услуги, слоты, создание/перенос/отмена записей                         |
| **Bot API**             | `/api/v1/bot`   | Webhook, уведомления, deep link, расписание мастера                                           |

### Документация API

- **Swagger UI**: `/swagger`
- **OpenAPI JSON**: `/swagger-json`

---

## Установка и запуск

### Установка зависимостей

```bash
pnpm install
```

### Переменные окружения

Скопируйте `.env.example` в `.env` и настройте переменные:

```bash
cp .env.example .env
```

Основные переменные:

| Переменная           | Описание                                          |
| -------------------- | ------------------------------------------------- |
| `DATABASE_URL`       | URL подключения к PostgreSQL                      |
| `REDIS_URL`          | URL подключения к Redis                           |
| `MINIO_*`            | Настройки MinIO (endpoint, порт, ключи)           |
| `CORS_ORIGIN`        | Разрешённые origins для CORS                      |
| `JWT_SECRET`         | Секрет для JWT (обязательно сменить в production) |
| `FRONTEND_URL`       | URL Web Admin (для cookies)                       |
| `TELEGRAM_BOT_TOKEN` | Токен Telegram Bot (для Bot API)                  |

Перед первым запуском поднимите инфраструктуру (PostgreSQL, Redis, MinIO) и выполните миграции:

```bash
# Из корня монорепозитория
pnpm infra:up
pnpm prisma:migrate
```

### Режимы запуска

```bash
# development
pnpm run start

# watch mode (hot reload)
pnpm run start:dev

# production
pnpm run start:prod
```

---

## Тестирование

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

Используются **Jest** и **Supertest** для unit- и integration-тестов.

---

## Инфраструктура и middleware

- **X-Request-ID** — трассировка запросов (генерируется или принимается из заголовка)
- **CORS** — настраивается через `CORS_ORIGIN`
- **Rate limiting** — ThrottlerGuard по IP
- **ValidationPipe** — валидация DTO
- **TransformInterceptor** — единый формат успешных ответов `{ status, data }`
- **HttpExceptionFilter** — единый формат ошибок `{ status, error: { code, message } }`
- **Логирование** — nestjs-pino (JSON в production, pino-pretty в dev)

---

## Deployment

Инструкции по деплою в k3s: [infra/README.md](../../infra/README.md).
