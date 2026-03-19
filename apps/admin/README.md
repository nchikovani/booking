# Admin — панель администратора

Vite + React SPA для управления бизнесом, услугами, сотрудниками и расписанием.

## Стек

- Vite, React, TypeScript
- Tailwind CSS v4, Material UI
- Zustand, React Query, react-router-dom
- i18next, notistack
- Feature-Sliced Design (FSD)
- @repo/ui — тема, tokens, design-system

## Архитектура и соглашения

- [architecture-frontend.md](../../docs/architecture-frontend.md) — Frontend архитектура и соглашения
- [architecture-admin.md](../../docs/architecture-admin.md) — Web Admin

## Запуск

```sh
pnpm dev      # http://localhost:3001
pnpm build    # сборка в dist/
pnpm preview  # предпросмотр production-сборки
```

## Переменные окружения

Скопировать `.env.example` → `.env`:

- `VITE_API_URL` — URL Backend API (например `http://localhost:3000/api/v1`)
