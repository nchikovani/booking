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
- i18next, notistack - для toast-уведомлений
- Feature-Sliced Design (FSD)
- @repo/ui — тема, tokens, design-system

---

# 2. UI-соглашения

- MUI используется как библиотека UI-компонентов, а не как система лейаута.
- Основная верстка выполняется на HTML-тегах и Tailwind utility-классах (без `Stack`/`Box` для базовой компоновки).
- Пользовательский текст выводится через `Typography`; `variant` допускается только из темы `@repo/ui` (`h1`, `h2`, `h3`, `h4`, `body1`, `body2`, `caption`, `overline`).
- Цвет текста в `Typography` задается через проп `color`, без `sx.color`.
- Интерактивные переходы оформляются ссылками (`Link`/`a`), не кнопками, если действие семантически является навигацией.
- Цвета компонентов берутся из темы/`tokens`, хардкод значений запрещен.

---

# 3. Роутинг

- **react-router-dom** — `createBrowserRouter`
- Lazy-загрузка страниц через `React.lazy()` + `Suspense`

---

# 4. Аутентификация и сессия

- **Стратегия:** AccessToken (JWT) в памяти (Zustand), RefreshToken (JWT) в HttpOnly Cookie.
- **Bootstrap:** При загрузке приложения (`SessionProvider`) выполняется попытка `POST /refresh`. При успехе — `GET /me` для загрузки профиля. Приложение считается готовым (`ready`) только после завершения этой цепочки.
- **Интерцептор 401:** Реализован на уровне `openapi-fetch` middleware. Поддерживает single-flight refresh (атомарное обновление токена при пачке параллельных запросов).
- **Сессия:** accessToken хранится только в памяти (Zustand store), refreshToken — в HttpOnly Cookie. Это исключение из правила «серверные данные в React Query» для безопасности секретов. Слайс `entities/session` содержит `accessToken` и объект `user` (профиль).
- **HTTP-клиент:** `openapi-fetch` с middleware для:
  - Автоматического подмешивания `Authorization: Bearer <token>`
  - Обработки 401 ошибки через **single-flight refresh** (один запрос на обновление токена для всех параллельных 401)
  - Одного повтора (retry) исходного запроса после успешного refresh
  - Автоматического `credentials: 'include'` для auth-эндпоинтов