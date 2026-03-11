# System Architecture
Telegram Mini App — Booking System

---

# 1. Общая архитектура

Приложение состоит из трех основных частей:

1. Telegram Mini App (Frontend)
2. Backend API
3. Database


Frontend запускается внутри Telegram Mini App WebView и взаимодействует с backend через REST API.

---

# 2. Технологический стек

## Frontend

- React
- TypeScript
- Vite
- Telegram Mini Apps SDK - @tma.js/sdk-react
- Zustand (state management)
- React Router
- tailwind
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


---

## Database

- PostgreSQL

ORM:

- Prisma

---

## Infrastructure

- Docker
- REST API
- Telegram Bot API (для уведомлений)

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
# 10. Обработка ошибок

API возвращает стандартный формат ошибок:


{
"error": "message",
"code": "ERROR_CODE"
}

# 4. Безопасность

Основные правила безопасности:

- проверка подписи Telegram initData
- валидация всех входных данных
- проверка прав доступа пользователя
- защита от создания дубликатов записей
- rate limiting на создание записей

---

# 5. Масштабирование

При росте нагрузки возможны следующие оптимизации:

- кеширование расписания
- очередь для отправки уведомлений