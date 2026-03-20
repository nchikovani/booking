# Architecture: Frontend

Общие подходы для Web Admin и Telegram Mini App.

Общий контекст: [architecture.md](architecture.md)

Детали по приложениям: [architecture-admin.md](architecture-admin.md), [architecture-miniapp.md](architecture-miniapp.md)

---

# 1. Feature-Sliced Design (FSD)

Используется архитектура **Feature-Sliced Design (FSD)**.

Слои:

- app — инициализация (providers, router, config)
- pages — страницы (композиция widgets/features)
- widgets — крупные UI-блоки
- features — бизнес-сценарии (действия пользователя)
- entities — доменные модели (User, Booking)
- shared — переиспользуемое (ui, api, lib, config)

Сегменты внутри слайсов

Используются стандартные:
- ui — компоненты
- model — состояние, типы, бизнес-логика
- api — запросы
- lib — утилиты (локальные)
- config — конфиги

Необязательные:
- hooks
- constants

Правила:

- бизнес-логика находится в features, а логика, привязанная к доменным объектам — в entities
- entities содержат доменные модели
- shared содержит UI-компоненты и утилиты
- страницы собирают UI из widgets и features
- импорты только вниз по слоям app → pages → widgets → features → entities → shared
- слайсы одного слоя не импортируют друг друга напрямую
- каждый слайс экспортирует только через index.ts
- React-компоненты не разрастаются: крупные страницы и формы декомпозируются на секции, подкомпоненты и локальные утилиты/мапперы

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

## 2.4. UI-соглашения (admin + miniapp)

- **MUI используется точечно:** только как библиотека компонент (например `Typography`, `Link`, `FormControl`, `OutlinedInput`, `Button`).
- **Лейаут и позиционирование:** через обычные HTML-теги (`div`, `section`, `form`, `header`, `footer`) + Tailwind-классы.
- **Текстовые узлы:** выводить через `Typography`; `variant` выбирать только из значений, объявленных в `packages/ui/src/theme/index.ts` (`h1`, `h2`, `h3`, `h4`, `body1`, `body2`, `caption`, `overline`).
- **Цвет текста в Typography:** задавать через проп `color` (например `color={tokens.color.textPrimary}`), не через `sx.color`.
- **Ссылки:** интерактивный текст, ведущий на другой URL/роут, оформляется как ссылка (`a`/`Link`), а не как `button`.
- **Цвета:** для MUI-компонентов — через `tokens.color.*`/палитру темы; без хардкода цветов.

## 2.5. Общие технологии

- **Серверные данные:** TanStack React Query
- **UI-состояние:** Zustand
- **Импорты:** алиасы `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`, `@api`
- **Контракт API в админке:** OpenAPI-типизация генерируется в `apps/admin/src/shared/api/openapi.generated.ts`
- **Генерация типов API:** `pnpm --filter admin api:generate`
- **Единая точка доступа к backend:** все запросы из админки выполняются только через `client` из `@api`
- **Чтение успешного ответа API:** использовать `getResponseDataOrThrow`, а не разбирать `res.data` вручную в каждом запросе
- **Query keys:** хранить централизованно в доменном слайсе (`entities/...`), а не дублировать литералы в features/pages

## 2.6. Обработка ошибок

- **ErrorBoundary** — на уровне приложения
- **React Query:** `onError` / глобальный обработчик для уведомлений
- **Формат ошибок API:** `{ status: 'error', error: { code, message } }`
- **Mutation-ошибки в UI:** показывать через `enqueueSnackbar`; не дублировать обработку сетевых/API-ошибок в JSX формы.
- **useMutation по умолчанию:** для feature-level мутаций указывать `meta: { [MUTATION_META_SKIP_GLOBAL_ERROR]: true }`, чтобы глобальный обработчик не показывал дублирующую нотификацию
- **Валидация форм:** ошибки полей показываются после попытки отправки (`onSubmit`), а не по `onBlur`, если для конкретной формы не оговорено иное.

## 2.7. Переменные окружения

- **Префикс:** `VITE_` (Vite), `NEXT_PUBLIC_` (Next.js) — для доступа на клиенте
- **Типы:** объявлять в `vite-env.d.ts` / `next-env.d.ts`

## 2.8. Прочее

- **Lazy-загрузка:** страницы через `React.lazy()` + `Suspense`

---

# 3. Тестирование (Frontend)

- **Vitest** + **React Testing Library**

Типы тестов:

- Unit tests — тестирование компонентов
- Integration tests — тестирование пользовательских сценариев
