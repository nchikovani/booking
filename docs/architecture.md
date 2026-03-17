# System Architecture
Telegram Booking Platform

---

# 1. Общая архитектура

Система онлайн‑записи состоит из следующих основных компонентов:

1. Web Admin — веб‑приложение для владельца/администратора бизнеса
2. Telegram Mini App (Client App) — мини‑приложение внутри Telegram для клиентов
3. Telegram Bot — бот для уведомлений и deep link‑переходов
4. Backend API — единый backend для бизнес‑логики
5. Database — основное хранилище данных
6. Redis — кеш и очередь задач
7. MinIO — объектное хранилище для файлов

Все компоненты находятся в одном монорепозитории.

Взаимодействие компонентов:

- Web Admin работает как обычное веб‑приложение в браузере и через REST API обращается к Backend.
- Telegram Mini App запускается внутри Telegram WebView, использует Telegram Mini Apps SDK и взаимодействует с Backend через REST API.
- Telegram Bot использует Telegram Bot API, получает события от Telegram и вызывает Backend (webhooks / REST) для:
  - отправки уведомлений бизнесу и клиентам
  - генерации и обработки deep link для открытия Mini App в нужном контексте (например, конкретный бизнес или услуга).

---
# 2. Структура монорепозитория

Проект использует monorepo.
Стек: pnpm workspaces + Turborepo

repo
│
├── apps
│
│ ├── admin
│ │ веб-панель администратора
│ │
│ ├── miniapp
│ │ Telegram Mini App
│ │
│ └── api
│ Backend API
│
├── packages
│
│ ├── prisma
│ │ Prisma: схема, миграции, сгенерированный клиент
│ │
│ ├── ui
│ │ общие UI компоненты
│ │
│ ├── eslint-config
│ │ общие правила ESLint
│ │
│ └── typescript-config
│ общие конфигурации TypeScript

---
# 3. Технологический стек

## Frontend

### Web Admin

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Query
- Material UI
- Архитектура: Feature-Sliced Design (FSD)

### Telegram Mini App (Client App)

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Query
- Material UI
- Telegram Mini Apps SDK — `@tma.js/sdk-react`
- Архитектура: Feature-Sliced Design (FSD)

---

## Backend

- Node.js
- TypeScript
- NestJS

Архитектура backend:

Layered Architecture

- Controller
- Service
- Repository

Backend является единым для:

- Web Admin (административные сценарии)
- Telegram Mini App (клиентские сценарии)
- Telegram Bot (уведомления, напоминания, deep link‑сценарии)

---

## Database

- PostgreSQL

**Prisma**

- Схема: `packages/prisma/schema.prisma`
- Клиент: `@repo/prisma`, токен `PRISMA` для инъекции
- Миграции: `pnpm run db:migrate` в `packages/prisma`

---

## Redis

Используется для:

- кеширования
- очередей уведомлений
- планирования напоминаний
---

## Infrastructure

- Docker
- REST API
- Telegram Bot API (для уведомлений, напоминаний и deep link‑переходов в Mini App)

### Локальная разработка

- **docker-compose** — PostgreSQL, Redis, MinIO
- **turbo** — приложения (api, admin, miniapp)

Порядок запуска: `pnpm infra:up` → `pnpm dev`

### Продакшен (k3s)

- **k3s** — оркестрация контейнеров
- **Traefik** — Ingress (встроен в k3s)
- **Dockerfile** — в каждой app (api, admin, miniapp)
- **.dockerignore** — исключение лишних файлов из контекста сборки

Схема деплоя: образы → k8s Deployments → Services → Ingress (TLS)

### Переменные окружения

- **apps/api/.env**, **apps/admin/.env**, **apps/miniapp/.env** — локальная разработка
- **packages/prisma/.env** — для миграций (DATABASE_URL)
- **infra/k8s/** — ConfigMap (несекретные), Secret (секреты, не коммитятся)

Структура инфраструктуры: `infra/k8s/` (namespace, ConfigMap, Secrets, Deployments, Services, Ingress).

Подробные инструкции по деплою: [infra/README.md](../infra/README.md)

---

## File Storage (MinIO → CDN)

Хранение файлов реализуется поэтапно:

**Этап 1 (разработка и первый релиз):** только MinIO

- MinIO — S3‑совместимое объектное хранилище
- Хранятся: логотипы бизнеса, фотографии услуг, фотографии сотрудников
- Backend загружает файлы в MinIO и возвращает клиентам ссылки
- Схема: `Клиент → Backend API → MinIO`

**Этап 2 (после релиза):** подключение CDN

- CDN подключается перед MinIO для ускорения раздачи статики
- Код работы с файлами не меняется — используется тот же S3 API
- Меняется только конфигурация (endpoint, origin для CDN)

Рекомендации при разработке:

- в БД хранить **путь** (key) в полях `logoPath`, `imagePath`, например `businesses/{id}/logo.webp`
- публичный URL формировать через `StorageService.getPublicUrl(path)`  ([Feature 1.2](features/1.2-business.md))
- env: `FILE_STORAGE_URL` — базовый URL (dev: `http://localhost:9000/uploads`, prod: MinIO или CDN)
- env: `FILE_STORAGE_BUCKET` — имя bucket (по умолчанию `uploads`)
- bucket создаётся при старте API (StorageInitService), если не существует
- при подключении CDN: изменить только `FILE_STORAGE_URL`, код не меняется
- настраивать CORS в MinIO с учётом будущего CDN

---

Логические каналы взаимодействия:

- Web Admin → Backend API → Database
- Telegram Mini App → Backend API → Database
- Telegram Bot ↔ Telegram Bot API ↔ Backend API

Уведомления и напоминания (как для бизнеса, так и для клиентов) формируются на Backend и доставляются через Telegram Bot.

---

# 4. Архитектурные принципы

## Backend

Используются принципы:

- SOLID
- KISS
- DRY

Основные правила:

- контроллеры не содержат бизнес-логики
- бизнес-логика находится в service
- доступ к базе только через repository
- DTO используются для входных данных
- валидация выполняется на уровне DTO

### Структура модулей (apps/api/src/modules/)

- **Shared-модули** (`business/`, `storage/`) — общая логика для Admin и Client API
- **Admin-модули** (`admin/*/`) — эндпоинты Admin API, проверка прав
- **App-модули** (`app/*/`) — публичные эндпоинты Client API
- Структура: `modules/<domain>/` → `*.module.ts`, `*.service.ts`, `*.repository.ts`, `dto/`

### Конвенции именования

- **Файлы:** `*.module.ts`, `*.service.ts`, `*.repository.ts`, `*.controller.ts`, `*-response.dto.ts`, `update-*-.dto.ts`
- **Классы:** `XxxService`, `XxxRepository`, `XxxController`, `UpdateXxxDto`, `XxxResponseDto`
- **Пути API:** kebab-case (`/admin/businesses`)

---

## Frontend

Используется архитектура **Feature-Sliced Design (FSD)**.

Слои:

- app
- pages
- widgets
- features
- entities
- shared

Правила:

- бизнес-логика находится в features
- entities содержат доменные модели
- shared содержит UI-компоненты и утилиты
- страницы собирают UI из widgets и features

---

# 5. API

Backend предоставляет REST API.

Base URL: `/api/v1`

API логически разделено по типам клиентов:

- **Admin API** — для Web Admin  
  - Base path: `/api/v1/admin`
  - Основные зоны ответственности:
    - аутентификация и авторизация ([Feature 1.1](features/1.1-auth.md))
    - управление бизнесом ([Feature 1.2](features/1.2-business.md)) — общий BusinessModule для Admin и Client API
    - управление услугами
    - управление сотрудниками
    - управление расписанием
    - управление записями
    - управление клиентами

- **Client Mini App API** — для Telegram Mini App  
  - Base path: `/api/v1/app`
  - Основные зоны ответственности:
    - получение информации о компании
    - получение услуг
    - получение сотрудников
    - получение доступных слотов
    - создание записи
    - перенос записи
    - отмена записи
    - просмотр своих записей

- **Bot API** — для Telegram Bot  
  - Base path: `/api/v1/bot`
  - Основные зоны ответственности:
    - обработка webhook
    - отправка уведомлений
    - генерация deep link для Mini App
    - получение расписания мастера

## Swagger / OpenAPI

Документация API доступна по адресу `/swagger`.
Openapi доступен по адресу `/swagger-json`.

---

## Инфраструктура API

Общие компоненты, применяемые ко всем запросам:

- **X-Request-ID** — middleware генерирует или принимает идентификатор запроса, добавляет в заголовки ответа и логи
- **CORS** — настраивается через `CORS_ORIGIN` (env)
- **Rate limiting** — ThrottlerGuard, лимит на IP (ttl и limit в конфигурации)
- **ValidationPipe** — валидация DTO (whitelist, forbidNonWhitelisted, transform)
- **TransformInterceptor** — оборачивает успешные ответы в `{ status, data }`
- **HttpExceptionFilter** — единый формат ошибок `{ status, error: { code, message } }`, обработка HttpException, Prisma-ошибок
- **Логирование** — nestjs-pino (JSON в production, pino-pretty в dev)

**Конфигурация**

- `configuration.ts` — загрузка из env
- `AppConfigService.get(path, defaultValue)` — типизированный доступ
- `configuration.types.ts` — типы конфигурации

---

## Формат запросов и ответов

Все ответы API используют единый формат.

### Успешный ответ

```json
{
  "status": "success",
  "data": {}
}
```

### Ответ со списком данных

```json
{
  "status": "success",
  "data": []
}
```

### Формат данных в API

**Даты и время**

- ISO 8601 в UTC: `YYYY-MM-DDTHH:mm:ss.sssZ`
- Пример: `"2024-01-15T10:00:00.000Z"`
- Применяется к полям `createdAt`, `updatedAt`, `expiresAt` и другим датам
- Публичные эндпоинты (Client API) могут не возвращать служебные даты

**Идентификаторы**

- UUID v4 (строка)

**Именование в JSON**

- camelCase: `createdAt`, `logoUrl`, `imageUrl`

**Null и опциональные поля**

- Отсутствующее значение опционального поля: `null` (например, `imageUrl: null`)

**Пустые строки в запросах**

- Пустая строка `""` для опционального поля трактуется как очистка и сохраняется как `null`

**Поля времени (durationMinutes, breakAfterMinutes, слоты расписания)**

- Все поля, влияющие на время начала/окончания записи, кратны 5 (минуты)

## Идентификация запросов (X-Request-ID)

Для трассировки и отладки каждый запрос имеет уникальный идентификатор.

- Клиент может передать заголовок `X-Request-ID` в запросе; при отсутствии Backend генерирует новый (UUID).
- Backend возвращает `X-Request-ID` в заголовках ответа.
- Идентификатор добавляется в логи и используется при вызовах внешних сервисов для distributed tracing.

## Формат ошибок

Все ошибки возвращаются в едином формате.

```json
{
    "status": "error",
    "error": {
        "code": "ERROR_CODE",
        "message": "Human readable message"
    }
}
```

**Обработка ошибок**

- `ErrorCode` — enum в `common/errors/error-codes.ts`
- `AppException.create(code, message?)` — создание исключений
- `ERROR_DEFINITIONS` — соответствие кода и HTTP-статуса
- При отсутствии доступа к ресурсу возвращать 404 (не раскрывать существование ресурса)

**Prisma-ошибки (P2002, P2025, P2000)**

- Обрабатываются глобально в `HttpExceptionFilter`
- Маппинг: P2002 → 409 CONFLICT, P2025 → 404 NOT_FOUND, P2000 → 400 VALIDATION_FAILED
- В теле ответа возвращается `ErrorCode` (CONFLICT, NOT_FOUND), а не код Prisma
- Репозитории **не** перехватывают эти ошибки — они пробрасываются наверх и обрабатываются фильтром

**Валидация**

- class-validator + class-transformer в DTO
- ValidationPipe: `whitelist`, `forbidNonWhitelisted`, `transform`
- `@Transform()` — для `""` → `null` и приведения типов

**Поведение по умолчанию (общие договорённости)**

- **Невалидный или истёкший JWT:** 401 `UNAUTHORIZED`
- **Отсутствие доступа к ресурсу:** 404 `NOT_FOUND` (не раскрывать существование)
- **PATCH с пустым body `{}`:** 200 с текущими данными (частичное обновление без изменений). Исключение: если DTO требует хотя бы одно обязательное поле (например, `UpdateServiceCategoryDto.name`), вернётся 400 `VALIDATION_FAILED`.
- **Фильтр по связанной сущности (например, categoryId):** если ID не принадлежит текущему контексту (бизнесу) или не существует — 400 `BAD_REQUEST` с кодом `INVALID_*` (например, `INVALID_CATEGORY`)
- **Создание/обновление с ID связанной сущности:** если ID не принадлежит контексту или не существует — 404 `NOT_FOUND`
- **Невалидный cursor (пагинация):** 400 `BAD_REQUEST` с кодом `INVALID_CURSOR`
- **Reorder: перемещение «после себя» (afterId === id):** 200 идемпотентно, без изменений

---

# 6. Безопасность

Основные правила безопасности:

- аутентификация Admin API (email + пароль, JWT access/refresh, HttpOnly cookies) — [Feature 1.1](features/1.1-auth.md)
- проверка подписи Telegram initData
- валидация входных данных
- проверка прав доступа
- защита от дублирования записей
- rate limiting (ThrottlerGuard, глобально по IP)

**Проверка прав доступа**

- AdminAuthGuard — извлечение `adminUserId` из JWT
- Декоратор `@CurrentUser('adminUserId')` — доступ к текущему пользователю
- Декоратор `@Public()` — отключение проверки аутентификации
- Хелперы в `BusinessService`:
  - `requireBusinessMember(adminUserId, businessId)` — проверяет членство, возвращает `{ business, role }` или выбрасывает 404
  - `requireBusinessOwner(adminUserId, businessId)` — то же, но требует роль OWNER (для удаления бизнеса и т.п.)
- Для маршрутов, где `businessId` не в пути (например `/employees/:id`): контроллер загружает ресурс, получает `businessId`, затем вызывает хелпер

---

# 7. Масштабирование

При росте нагрузки возможны следующие оптимизации:

- кеширование расписания
- очередь для отправки уведомлений

# 8. Тестирование

Проект использует автоматические тесты для проверки бизнес-логики и API.

## Backend

Тестирование backend выполняется с использованием:

- Jest
- Supertest (для тестирования HTTP API)

Типы тестов:

- Unit tests — тестирование сервисов и бизнес-логики, моки через `Test.createTestingModule`
- E2E tests — `test/*.e2e-spec.ts`, полный `AppModule`, `request.agent()` для cookie

Тесты располагаются рядом с кодом и используют суффикс: `*.spec.ts`

---

## Frontend

Тестирование frontend выполняется с использованием:

- Jest
- React Testing Library

Типы тестов:

- Unit tests — тестирование компонентов
- Integration tests — тестирование пользовательских сценариев

---

## Общие правила

- каждый сервис backend должен иметь unit тесты
- критическая бизнес-логика должна быть покрыта тестами
- тесты должны проверять основные сценарии и edge cases

---

# 9. Документация

- **Feature-спеки:** `docs/features/*.md` — детали реализации фич
- **Планы реализации:** `docs/plans/*.md` — пошаговые планы
- **Roadmap:** [docs/roadmap.md](roadmap.md) — фазы и этапы
- **PRD:** [docs/prd.md](prd.md) — требования продукта