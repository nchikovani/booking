# @repo/eslint-config

Общие конфигурации ESLint для монорепозитория Booking Mini App.

## Экспорты

| Конфиг | Использование |
|--------|---------------|
| `@repo/eslint-config/base` | Базовая конфигурация (TypeScript, общие правила) |
| `@repo/eslint-config/next-js` | Next.js (admin, miniapp) |
| `@repo/eslint-config/nestjs` | NestJS (api) |
| `@repo/eslint-config/react-internal` | React-компоненты внутри NestJS |

## Использование

В `eslint.config.js` приложения:

```js
import base from '@repo/eslint-config/base';
import nextConfig from '@repo/eslint-config/next-js';

export default [...base, ...nextConfig];
```
