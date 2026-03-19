# Telegram Mini App

Клиентское приложение внутри Telegram для записи на услуги — каталог, выбор даты/времени, создание и управление записями.

## Связанные документы

- [Project Overview](../../docs/project.md) — описание продукта и ролей
- [Architecture](../../docs/architecture.md) — обзор; [architecture-frontend.md](../../docs/architecture-frontend.md) — соглашения
- [Roadmap](../../docs/roadmap.md) — фазы разработки

---

## Стек

- **Next.js** (App Router)
- **React**, **TypeScript**
- **Tailwind CSS**, **Material UI**
- **Zustand** — UI-состояние
- **React Query** — серверные данные
- **@tma.js/sdk-react** — Telegram Mini Apps SDK
- **Feature-Sliced Design (FSD)**

---

## Запуск

```bash
# Из корня монорепозитория
pnpm dev
# Miniapp: http://localhost:3002
```

Или из папки `apps/miniapp`:

```bash
pnpm run dev
```

---

## Переменные окружения

Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

| Переменная            | Описание                                          |
| --------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | URL Backend API (например, http://localhost:3000) |

---

## Telegram Mini App

- Работает в Telegram WebView
- Аутентификация через `initData` (валидация на backend)
- Использование `@tma.js/sdk-react` для темы, viewport, haptic feedback

---

## Структура (FSD)

```
app/          — App Router
pages/        — страницы
widgets/      — виджеты
features/     — фичи
entities/     — сущности
shared/       — общие компоненты

Импорты только вниз: app → pages → widgets → features → entities → shared.
```

## Соглашения

См. [architecture-frontend.md](../../docs/architecture-frontend.md): архитектура и соглашения.
