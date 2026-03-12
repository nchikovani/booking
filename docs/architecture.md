# System Architecture
Telegram Mini App — Booking System

---

# 1. Общая архитектура

Система онлайн‑записи состоит из следующих основных компонентов:

1. Web Admin — веб‑приложение для владельца/администратора бизнеса
2. Telegram Mini App (Client App) — мини‑приложение внутри Telegram для клиентов
3. Telegram Bot — бот для уведомлений и deep link‑переходов
4. Backend API — единый backend для бизнес‑логики
5. Database — основное хранилище данных

Взаимодействие компонентов:

- Web Admin работает как обычное веб‑приложение в браузере и через REST API обращается к Backend.
- Telegram Mini App запускается внутри Telegram WebView, использует Telegram Mini Apps SDK и взаимодействует с Backend через REST API.
- Telegram Bot использует Telegram Bot API, получает события от Telegram и вызывает Backend (webhooks / REST) для:
  - отправки уведомлений бизнесу и клиентам
  - генерации и обработки deep link для открытия Mini App в нужном контексте (например, конкретный бизнес или услуга).

---

# 2. Технологический стек

## Frontend

### Web Admin

- React
- TypeScript
- Vite
- Zustand (state management)
- React Router
- Tailwind CSS
- Архитектура: Feature-Sliced Design (FSD)

### Telegram Mini App (Client App)

- React
- TypeScript
- Vite
- Telegram Mini Apps SDK — `@tma.js/sdk-react`
- Zustand (state management)
- React Router (c учётом ограничений Mini Apps)
- Tailwind CSS
- Архитектура: Feature-Sliced Design (FSD)

---

## Backend

- Node.js
- TypeScript
- NestJS
- Redis

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

## Infrastructure

- Docker
- REST API
- Telegram Bot API (для уведомлений, напоминаний и deep link‑переходов в Mini App)

Логические каналы взаимодействия:

- Web Admin → Backend API → Database
- Telegram Mini App → Backend API → Database
- Telegram Bot ↔ Telegram Bot API ↔ Backend API

Уведомления и напоминания (как для бизнеса, так и для клиентов) формируются на Backend и доставляются через Telegram Bot.

---

# 3. Архитектурные принципы

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

# 4. API

Backend предоставляет REST API.

Base URL: `/api/v1`

API логически разделено по типам клиентов:

- **Admin API** — для Web Admin  
  - Base path: `/api/v1/admin`
  - Основные зоны ответственности:
    - управление бизнесом, услугами и расписанием
    - управление бронированиями (просмотр, изменение статуса, отмена)
    - управление клиентами
    - доступ к аналитике

- **Client Mini App API** — для Telegram Mini App  
  - Base path: `/api/v1/app`
  - Основные зоны ответственности:
    - получение списка бизнесов/услуг
    - получение доступных слотов (`Schedule` / `TimeSlot`)
    - создание и отмена бронирований клиентом в рамках бизнес‑правил
    - просмотр своих бронирований

- **Bot API** — для Telegram Bot  
  - Base path: `/api/v1/bot`
  - Основные зоны ответственности:
    - обработка webhook‑запросов от Telegram Bot API
    - триггеры отправки уведомлений и напоминаний
    - генерация и обработка deep link для открытия Mini App

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

# 5. Безопасность

Основные правила безопасности:

- проверка подписи Telegram initData
- валидация всех входных данных
- проверка прав доступа пользователя
- защита от создания дубликатов записей
- rate limiting на создание записей

---

# 6. Масштабирование

При росте нагрузки возможны следующие оптимизации:

- кеширование расписания
- очередь для отправки уведомлений

# 7. Тестирование

Проект использует автоматические тесты для проверки бизнес-логики и API.

## Backend

Тестирование backend выполняется с использованием:

- Jest
- Supertest (для тестирования HTTP API)

Типы тестов:

- Unit tests — тестирование сервисов и бизнес-логики
- Integration tests — тестирование API и взаимодействия с базой данных

Тесты располагаются рядом с кодом и используют суффикс:


*.spec.ts


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