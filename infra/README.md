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

Скопируйте `.env.example` → `.env` в каждой директории:

- `apps/api/.env`
- `apps/admin/.env`
- `apps/miniapp/.env`
- `packages/prisma/.env` — для миграций (только DATABASE_URL)

## Сборка образов

Dockerfile находятся в каждой app. Сборка из корня репозитория:

```sh
docker build -f apps/api/Dockerfile -t booking-api:latest .
docker build -f apps/admin/Dockerfile -t booking-admin:latest .
docker build -f apps/miniapp/Dockerfile -t booking-miniapp:latest .
```

Для admin и miniapp с production URL API:

```sh
docker build -f apps/admin/Dockerfile --build-arg VITE_API_URL=https://api.example.com -t booking-admin:latest .
docker build -f apps/miniapp/Dockerfile --build-arg NEXT_PUBLIC_API_URL=https://api.example.com -t booking-miniapp:latest .
```

## Деплой в k3s

### Требования

- k3s с Traefik
- cert-manager (для TLS) — см. [документацию](https://cert-manager.io/docs/installation/)
- ClusterIssuer `letsencrypt-prod` для автоматических сертификатов

### Подготовка

1. Создать Secret из шаблона (файл `secrets.yaml` в .gitignore, не коммитится):

   ```sh
   cp infra/k8s/secrets.yaml.example infra/k8s/secrets.yaml
   # Заменить CHANGE_ME на реальные значения
   kubectl apply -f infra/k8s/secrets.yaml
   ```

2. Применить манифесты. Порядок важен: инфраструктура → приложения:

   ```sh
   kubectl apply -f infra/k8s/namespace.yaml
   kubectl apply -f infra/k8s/configmap.yaml
   kubectl apply -f infra/k8s/postgres/   # БД
   kubectl apply -f infra/k8s/redis/
   kubectl apply -f infra/k8s/minio/
   kubectl apply -f infra/k8s/api/        # после готовности postgres, redis, minio
   kubectl apply -f infra/k8s/admin/
   kubectl apply -f infra/k8s/miniapp/
   kubectl apply -f infra/k8s/ingress.yaml
   ```

3. Выполнить миграции БД: `pnpm --filter @repo/prisma db:migrate:deploy` (с DATABASE_URL из secrets).

### Переменные окружения для прода

Секреты в `secrets.yaml`:

- `POSTGRES_PASSWORD`, `DATABASE_URL` — PostgreSQL
- `REDIS_URL` — Redis
- `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY` — MinIO
- `TELEGRAM_BOT_TOKEN` — Telegram Bot

**Важно:** `VITE_API_URL` (admin) и `NEXT_PUBLIC_API_URL` (miniapp) задаются при сборке образов через `--build-arg`.
