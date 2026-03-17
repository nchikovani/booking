# Web Admin

Веб-панель администратора бизнеса для платформы **Booking Mini App** — настройка компании, услуг, сотрудников, расписания и записей.

## Связанные документы

- [Project Overview](../../docs/project.md) — описание продукта и ролей
- [Architecture](../../docs/architecture.md) — техническая архитектура
- [Roadmap](../../docs/roadmap.md) — фазы разработки

---

## Стек

- **Next.js** (App Router)
- **React**, **TypeScript**
- **Tailwind CSS**, **Material UI**
- **Zustand** — UI-состояние
- **React Query** — серверные данные
- **Feature-Sliced Design (FSD)**

---

## Запуск

```bash
# Из корня монорепозитория
pnpm dev
# Admin: http://localhost:3001
```

Или из папки `apps/admin`:

```bash
pnpm run dev
```

---

## Переменные окружения

Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

| Переменная | Описание |
|------------|----------|
| `NEXT_PUBLIC_API_URL` | URL Backend API (например, http://localhost:3000) |

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
