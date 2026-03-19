# Admin — панель администратора

Vite + React SPA для управления бизнесом, услугами, сотрудниками и расписанием.

## Стек

- Vite, React, TypeScript
- Tailwind CSS
- @repo/eslint-config (react-internal)

## Запуск

```sh
pnpm dev      # http://localhost:3001
pnpm build    # сборка в dist/
pnpm preview  # предпросмотр production-сборки
```

## Переменные окружения

Скопировать `.env.example` → `.env`:

- `VITE_API_URL` — URL Backend API (например `http://localhost:3000/api/v1`)
