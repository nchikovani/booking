# System Architecture

Telegram Booking Platform

Обзор системы. Детали по доменам:

- [architecture-api.md](architecture-api.md) — Backend, API, БД
- [architecture-frontend.md](architecture-frontend.md) — общие подходы для Admin и Miniapp
- [architecture-admin.md](architecture-admin.md) — Web Admin
- [architecture-miniapp.md](architecture-miniapp.md) — Telegram Mini App

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

```
repo
│
├── apps
│   ├── admin      — веб-панель администратора
│   ├── miniapp    — Telegram Mini App
│   └── api        — Backend API
│
├── packages
│   ├── prisma         — Prisma: схема, миграции, сгенерированный клиент
│   ├── ui             — общие UI компоненты, design-system
│   ├── eslint-config  — общие правила ESLint
│   └── typescript-config — общие конфигурации TypeScript
```

---

# 3. Технологический стек (обзор)

| Область | Стек |
|---------|------|
| Web Admin | Vite + React, TypeScript, Tailwind, MUI, FSD |
| Miniapp | Next.js, React, TypeScript, Tailwind, MUI, FSD, @tma.js/sdk-react |
| Backend | NestJS, Prisma (PostgreSQL), Redis, MinIO |

Детали: [architecture-api.md](architecture-api.md), [architecture-frontend.md](architecture-frontend.md), [architecture-admin.md](architecture-admin.md).

---

# 4. Инфраструктура

- **Docker** — контейнеризация
- **REST API** — взаимодействие компонентов
- **Telegram Bot API** — уведомления, напоминания, deep link в Mini App

## Локальная разработка

- **docker-compose** — PostgreSQL, Redis, MinIO
- **turbo** — приложения (api, admin, miniapp)

Порядок запуска: `pnpm infra:up` → `pnpm dev`

## Продакшен (k3s)

- **k3s** — оркестрация контейнеров
- **Traefik** — Ingress (встроен в k3s)
- **Dockerfile** — в каждой app (api, admin, miniapp)
- **.dockerignore** — исключение лишних файлов из контекста сборки

Схема деплоя: образы → k8s Deployments → Services → Ingress (TLS)

## Переменные окружения

- **apps/api/.env**, **apps/admin/.env**, **apps/miniapp/.env** — локальная разработка
- **packages/prisma/.env** — для миграций (DATABASE_URL)
- **infra/k8s/** — ConfigMap (несекретные), Secret (секреты, не коммитятся)

Подробные инструкции по деплою: [infra/README.md](../infra/README.md)

---

# 5. Логические каналы взаимодействия

- Web Admin → Backend API → Database
- Telegram Mini App → Backend API → Database
- Telegram Bot ↔ Telegram Bot API ↔ Backend API

Уведомления и напоминания (как для бизнеса, так и для клиентов) формируются на Backend и доставляются через Telegram Bot.

---

# 6. Масштабирование

При росте нагрузки возможны следующие оптимизации:

- кеширование расписания
- очередь для отправки уведомлений

---

# 7. Документация

- **Feature-спеки:** `docs/features/*.md` — детали реализации фич
- **Планы реализации:** `docs/plans/*.md` — пошаговые планы
- **Roadmap:** [roadmap.md](roadmap.md) — фазы и этапы
- **PRD:** [prd.md](prd.md) — требования продукта
