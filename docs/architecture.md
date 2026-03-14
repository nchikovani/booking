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
│ ├── database
│ │ Prisma: схема, миграции, сгенерированный клиент
│ │
│ ├── types
│ │ общие TypeScript типы
│ │
│ ├── validation
│ │ схемы валидации
│ │
│ ├── ui
│ │ общие UI компоненты
│ │
│ └── config
│ общие конфигурации

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

ORM:

- Prisma

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

- использовать единую структуру URL для файлов (например, через отдельный домен или путь `/api/v1/files/...`), чтобы позже сменить origin на CDN без правок клиента
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
    - управление бизнесом
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

---

# 6. Безопасность

Основные правила безопасности:

- проверка подписи Telegram initData
- валидация входных данных
- проверка прав доступа
- защита от дублирования записей
- rate limiting на создание записей

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

- Unit tests — тестирование сервисов и бизнес-логики
- Integration tests — тестирование API и взаимодействия с базой данных

Тесты располагаются рядом с кодом и используют суффикс: *.spec.ts

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