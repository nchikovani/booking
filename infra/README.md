# Infrastructure

## Локальная разработка

### Docker Compose

PostgreSQL, Redis и MinIO запускаются через docker-compose в корне репозитория:

```sh
pnpm infra:up    # запуск
pnpm infra:down  # остановка
```

Сервисы:
- PostgreSQL: localhost:5432 (user: booking, db: booking)
- Redis: localhost:6379
- MinIO: localhost:9000 (API), localhost:9001 (Console)

### Переменные окружения

Скопируйте `.env.example` → `.env` в каждой директории app:
- `apps/api/.env`
- `apps/admin/.env`
- `apps/miniapp/.env`

## Сборка образов

Dockerfile находятся в каждой app. Сборка из корня репозитория:

```sh
docker build -f apps/api/Dockerfile -t booking-api:latest .
docker build -f apps/admin/Dockerfile -t booking-admin:latest .
docker build -f apps/miniapp/Dockerfile -t booking-miniapp:latest .
```

## Деплой в k3s

### Подготовка

1. Создать Secret из шаблона:

   ```sh
   cp infra/k8s/secrets.yaml.example infra/k8s/secrets.yaml
   # Заполнить реальные значения в secrets.yaml
   kubectl apply -f infra/k8s/secrets.yaml
   ```

2. Применить манифесты (порядок важен):

   ```sh
   kubectl apply -f infra/k8s/namespace.yaml
   kubectl apply -f infra/k8s/configmap.yaml
   kubectl apply -f infra/k8s/postgres/
   kubectl apply -f infra/k8s/redis/
   kubectl apply -f infra/k8s/minio/
   kubectl apply -f infra/k8s/api/
   kubectl apply -f infra/k8s/admin/
   kubectl apply -f infra/k8s/miniapp/
   kubectl apply -f infra/k8s/ingress.yaml
   ```

### Переменные окружения для прода

Секреты задаются в `secrets.yaml`:
- `DATABASE_URL` — строка подключения к PostgreSQL
- `REDIS_URL` — строка подключения к Redis
- `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY` — учётные данные MinIO
- `TELEGRAM_BOT_TOKEN` — токен Telegram Bot

**Важно:** `NEXT_PUBLIC_API_URL` для admin и miniapp задаётся на этапе сборки образов. Укажите production URL API при сборке (например, через build-arg).
