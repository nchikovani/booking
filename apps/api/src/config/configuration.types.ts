export interface Configuration {
  port: number;
  database: {
    url?: string;
  };
  redis: {
    url: string;
  };
  minio: {
    endPoint: string;
    port: number;
    useSSL: boolean;
    accessKey: string;
    secretKey: string;
  };
  cors: {
    origin: string;
  };
  rateLimit: {
    ttl: number;
    limit: number;
  };
}

/** Извлекает тип значения по пути (например, 'redis.url' -> string) */
export type PathValue<T, P extends string> = P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PathValue<T[K], R>
    : unknown
  : P extends keyof T
    ? T[P]
    : unknown;
