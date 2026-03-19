# Документация проекта

Документация Telegram Booking Platform: архитектура, roadmap, спецификации фич и workflow разработки.

---

## Основные документы

| Документ | Описание |
| -------- | -------- |
| [architecture.md](architecture.md) | Обзор системы, монорепо, инфраструктура |
| [architecture-api.md](architecture-api.md) | Backend, API, БД, Redis, MinIO |
| [architecture-frontend.md](architecture-frontend.md) | Frontend архитектура и соглашения |
| [architecture-admin.md](architecture-admin.md) | Web Admin |
| [architecture-miniapp.md](architecture-miniapp.md) | Telegram Mini App |
| [roadmap.md](roadmap.md)           | Дорожная карта: фазы разработки, MVP scope, TODO, «После MVP»          |
| [prd.md](prd.md)                   | Product Requirements Document — требования и пользовательские сценарии |
| [project.md](project.md)           | Обзор продукта, роли, ценности                                         |

---

## Спецификации фич

Папка **`features/`** — спецификации фич в формате `{X.Y}-{slug}.md`.

- Шаблон: [features/\_template.md](features/_template.md)
- Примеры: `1.1-auth.md`, `1.2-business.md`
- Создание: skill `/create-feature-spec`
- Ревью: skill `/review-feature-spec`

---

## Планы реализации

Папка **`plans/`** — планы реализации по спецификациям.

- Формат имени: `{X.Y}-{slug}.md` (как у spec)
- Создание: skill `/create-implementation-plan` (Plan Mode)
- Ревью: skill `/review-implementation-plan`

---

## Cursor AI Workflow

[cursor-workflow.md](cursor-workflow.md) — краткая шпаргалка по последовательности команд при разработке фичи (spec → review → plan → implement → verify → update-docs).

---

## Структура `docs/`

```
docs/
├── README.md              ← этот файл
├── architecture.md        — обзор архитектуры
├── architecture-*.md      — api, frontend, admin, miniapp
├── roadmap.md             — дорожная карта
├── prd.md              — PRD
├── project.md          — обзор продукта
├── cursor-workflow.md — workflow Cursor AI
├── features/           — спецификации фич
│   ├── _template.md
│   └── {X.Y}-{slug}.md
└── plans/              — планы реализации
    └── {X.Y}-{slug}.md
```
