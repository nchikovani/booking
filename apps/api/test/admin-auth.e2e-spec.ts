import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';

async function createTestApp(): Promise<INestApplication<App>> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({ origin: true, credentials: true });

  await app.init();
  return app;
}

describe('Admin Auth (e2e)', () => {
  let app: INestApplication<App>;
  let agent: ReturnType<typeof request.agent>;
  const baseUrl = '/api/v1/admin/auth';
  const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'SecurePass1',
    firstName: 'Test',
    lastName: 'User',
  };

  beforeAll(async () => {
    app = await createTestApp();
    agent = request.agent(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /register', () => {
    it('should register and return 201 with user and tokens', () => {
      return agent
        .post(`${baseUrl}/register`)
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.status).toBe('success');
          expect(res.body.data).toMatchObject({
            user: {
              email: testUser.email,
              firstName: testUser.firstName,
              lastName: testUser.lastName,
            },
            accessToken: expect.any(String),
            expiresIn: expect.any(Number),
          });
          expect(res.headers['set-cookie']).toBeDefined();
          const setCookie = res.headers['set-cookie'];
          expect(Array.isArray(setCookie) ? setCookie[0] : setCookie).toContain('refreshToken=');
        });
    });

    it('should return 409 when email already exists', () => {
      return agent
        .post(`${baseUrl}/register`)
        .send(testUser)
        .expect(409)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('EMAIL_ALREADY_EXISTS');
        });
    });

    it('should return 400 for invalid email', () => {
      return agent
        .post(`${baseUrl}/register`)
        .send({ email: 'invalid', password: 'SecurePass1' })
        .expect(400);
    });

    it('should return 400 for weak password', () => {
      return agent
        .post(`${baseUrl}/register`)
        .send({
          email: 'other@example.com',
          password: 'short',
        })
        .expect(400);
    });
  });

  describe('POST /login', () => {
    it('should login and return 200 with tokens', () => {
      return agent
        .post(`${baseUrl}/login`)
        .send({ email: testUser.email, password: testUser.password })
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('success');
          expect(res.body.data.user.email).toBe(testUser.email);
          expect(res.body.data.accessToken).toBeDefined();
          expect(res.headers['set-cookie']).toBeDefined();
        });
    });

    it('should return 401 for wrong password', () => {
      return agent
        .post(`${baseUrl}/login`)
        .send({ email: testUser.email, password: 'WrongPass1' })
        .expect(401)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
        });
    });

    it('should return 401 for unknown email', () => {
      return agent
        .post(`${baseUrl}/login`)
        .send({ email: 'unknown@example.com', password: 'SecurePass1' })
        .expect(401);
    });
  });

  describe('GET /me', () => {
    let accessToken: string;

    beforeAll(async () => {
      const res = await agent
        .post(`${baseUrl}/login`)
        .send({ email: testUser.email, password: testUser.password });
      accessToken = res.body.data.accessToken;
    });

    it('should return user when authorized', () => {
      return agent
        .get(`${baseUrl}/me`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('success');
          expect(res.body.data.email).toBe(testUser.email);
        });
    });

    it('should create business on first /me call; GET /admin/businesses returns one business', async () => {
      await agent.get(`${baseUrl}/me`).set('Authorization', `Bearer ${accessToken}`);

      const res = await agent
        .get('/api/v1/admin/businesses')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0]).toMatchObject({
        id: expect.any(String),
        role: 'OWNER',
      });
    });

    it('should return 401 without token', () => {
      return request(app.getHttpServer()).get(`${baseUrl}/me`).expect(401);
    });
  });

  describe('POST /refresh', () => {
    beforeAll(async () => {
      await agent
        .post(`${baseUrl}/login`)
        .send({ email: testUser.email, password: testUser.password });
    });

    it('should return new tokens with valid refresh cookie', () => {
      return agent
        .post(`${baseUrl}/refresh`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.accessToken).toBeDefined();
          expect(res.headers['set-cookie']).toBeDefined();
        });
    });

    it('should return 401 without cookie', () => {
      return request(app.getHttpServer()).post(`${baseUrl}/refresh`).expect(401);
    });
  });

  describe('POST /logout', () => {
    beforeAll(async () => {
      await agent
        .post(`${baseUrl}/login`)
        .send({ email: testUser.email, password: testUser.password });
    });

    it('should logout with valid cookie', () => {
      return agent.post(`${baseUrl}/logout`).expect(200);
    });

    it('should return 401 without cookie', () => {
      return request(app.getHttpServer()).post(`${baseUrl}/logout`).expect(401);
    });
  });

  describe('POST /forgot-password', () => {
    const forgotPasswordUser = {
      email: `forgot-${Date.now()}@example.com`,
      password: 'SecurePass1',
    };

    beforeAll(async () => {
      await agent.post(`${baseUrl}/register`).send(forgotPasswordUser);
    });

    it('should always return 200 (no email disclosure)', () => {
      return agent
        .post(`${baseUrl}/forgot-password`)
        .send({ email: 'unknown@example.com' })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.message).toContain('Если аккаунт существует');
        });
    });

    it('should return 200 for existing user', () => {
      return agent
        .post(`${baseUrl}/forgot-password`)
        .send({ email: forgotPasswordUser.email })
        .expect(200);
    });
  });

  describe('POST /reset-password', () => {
    it('should return 400 for invalid token', () => {
      return agent
        .post(`${baseUrl}/reset-password`)
        .send({ token: 'invalid-token', password: 'NewSecure1' })
        .expect(400)
        .expect((res) => {
          expect(res.body.error.code).toBe('INVALID_OR_EXPIRED_TOKEN');
        });
    });
  });
});
