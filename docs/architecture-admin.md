# Architecture: Web Admin

Веб-панель администратора.

Общий контекст: [architecture.md](architecture.md)

Общие подходы для фронта: [architecture-frontend.md](architecture-frontend.md)

---

# 1. Стек

- Vite + React (SPA)
- TypeScript
- Tailwind CSS v4
- Material UI
- Zustand (state management)
- React Query
- react-router-dom
- i18next, notistack
- Feature-Sliced Design (FSD)
- @repo/ui — тема, tokens, design-system

---

# 2. Роутинг

- **react-router-dom** — `createBrowserRouter`
- Lazy-загрузка страниц через `React.lazy()` + `Suspense`

---

# 3. Уведомления

- **notistack** — SnackbarProvider для toast-уведомлений
