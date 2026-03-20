export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  },
  minio: {
    endPoint: process.env.MINIO_ENDPOINT ?? 'localhost',
    port: parseInt(process.env.MINIO_PORT ?? '9000', 10),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
  },
  cors: {
    origin: process.env.CORS_ORIGIN ?? '*',
  },
  rateLimit: {
    ttl: 60_000,
    limit: 100,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpires: process.env.JWT_ACCESS_EXPIRES ?? '15m',
    refreshExpires: process.env.JWT_REFRESH_EXPIRES ?? '7d',
  },
  auth: {
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3001',
    cookieDomain: process.env.COOKIE_DOMAIN ?? '',
    cookieName: 'refreshToken',
    rateLimit: {
      ttl: 600_000, // 10 min
      limit: 5,
    },
  },
  fileStorage: {
    url: process.env.FILE_STORAGE_URL ?? 'http://localhost:9000/uploads',
    bucket: process.env.FILE_STORAGE_BUCKET ?? 'uploads',
  },
});
