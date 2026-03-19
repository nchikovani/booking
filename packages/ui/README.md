# @repo/ui — Design System

Общие UI-компоненты, тема и design-system для Admin и Miniapp.

## Экспорты

- `theme`, `tokens` — `import { theme, tokens } from '@repo/ui'`
- CSS-переменные — `import '@repo/ui/theme/variables.css'`

## Зависимости

MUI и Emotion — в `peerDependencies`

```json
"@emotion/react": "^11.14.0",
"@emotion/styled": "^11.14.1",
"@mui/material": "^7.3.9"
```

## Цвета и темизация

- **variables.css** — источник цветов (`:root`, `[data-theme='dark']`)
- **tokens** — TS-словарь `var(--color-*)` для MUI и inline-стилей
- **Tailwind** — в приложении `@theme` ссылается на те же переменные

См. [architecture-frontend.md](../../docs/architecture-frontend.md).
