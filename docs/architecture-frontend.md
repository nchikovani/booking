# Architecture: Frontend

Общие подходы для Web Admin и Telegram Mini App.

Общий контекст: [architecture.md](architecture.md)

Детали по приложениям: [architecture-admin.md](architecture-admin.md), [architecture-miniapp.md](architecture-miniapp.md)

---

# 1. Feature-Sliced Design (FSD)

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
- импорты только вниз по слоям

---

# 2. Соглашения и подходы для разработки

## 2.1. Интернационализация (i18n)

- **Библиотека:** i18next + react-i18next
- **Все пользовательские строки** — через переводы, не хардкодить
- Структура: `shared/i18n/`, JSON-файлы по языкам (`ru.json`)
- Использование: `const { t } = useTranslation(); t('common.appName')`
- Ключи: `namespace.key` (например `common.loading`, `auth.login.title`)

## 2.2. Цвета и дизайн-система

- **Источник истины:** `packages/ui` — `variables.css`, `tokens`, `theme`
- **Не хардкодить** hex-коды, rgb и т.п. в компонентах
- **Предпочтительно Tailwind** — утилиты `bg-primary`, `text-surface-bg`, `border-border-default` и т.д. (цвета из `@theme` в index.css)
- **Альтернативы:**
  - `tokens` из `@repo/ui` — для inline-стилей и MUI: `import { tokens } from '@repo/ui'`
  - CSS-переменные: `var(--color-primary)` — в кастомном CSS
- **Темизация:** light/dark через `[data-theme='dark']` в `variables.css`; Tailwind и MUI используют те же переменные

## 2.3. Пакет @repo/ui

- **Экспорты:** `theme`, `tokens` — из корня: `import { theme, tokens } from '@repo/ui'`
- **CSS:** `import '@repo/ui/theme/variables.css'` — обязательно в приложении
- **MUI:** `@mui/material`, `@emotion/react`, `@emotion/styled` — в `peerDependencies`; устанавливать только в apps (admin, miniapp)
- **MUI ThemeProvider:** использовать `theme` из `@repo/ui`

## 2.4. Общие технологии

- **Серверные данные:** TanStack React Query
- **UI-состояние:** Zustand
- **Импорты:** алиасы `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`

## 2.5. Обработка ошибок

- **ErrorBoundary** — на уровне приложения
- **React Query:** `onError` / глобальный обработчик для уведомлений
- **Формат ошибок API:** `{ status: 'error', error: { code, message } }`

## 2.6. Переменные окружения

- **Префикс:** `VITE_` (Vite), `NEXT_PUBLIC_` (Next.js) — для доступа на клиенте
- **Типы:** объявлять в `vite-env.d.ts` / `next-env.d.ts`

## 2.7. Прочее

- **Lazy-загрузка:** страницы через `React.lazy()` + `Suspense`

---

# 3. Тестирование (Frontend)

- **Jest** + **React Testing Library**

Типы тестов:

- Unit tests — тестирование компонентов
- Integration tests — тестирование пользовательских сценариев
