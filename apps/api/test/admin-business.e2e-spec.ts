import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import cookieParser from 'cookie-parser';
import sharp from 'sharp';
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

async function createTestImageBuffer(): Promise<Buffer> {
  return sharp({
    create: { width: 10, height: 10, channels: 3, background: { r: 255, g: 0, b: 0 } },
  })
    .jpeg()
    .toBuffer();
}

describe('Admin Business (e2e)', () => {
  let app: INestApplication<App>;
  let agent: ReturnType<typeof request.agent>;
  let mainUser: { email: string; password: string };
  let mainToken: string;
  const authUrl = '/api/v1/admin/auth';
  const businessUrl = '/api/v1/admin/businesses';

  const createUniqueUser = () => ({
    email: `business-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`,
    password: 'SecurePass1',
    firstName: 'Business',
    lastName: 'Tester',
  });

  beforeAll(async () => {
    app = await createTestApp();
    agent = request.agent(app.getHttpServer());
    mainUser = createUniqueUser();
    await agent.post(`${authUrl}/register`).send(mainUser).expect(201);
    const loginRes = await agent
      .post(`${authUrl}/login`)
      .send({ email: mainUser.email, password: mainUser.password })
      .expect(200);
    mainToken = loginRes.body.data.accessToken;
    await agent.get(`${authUrl}/me`).set('Authorization', `Bearer ${mainToken}`);
  });

  afterAll(async () => {
    await app.close();
  });

  const getMainUserToken = () => mainToken;

  describe('GET /', () => {
    it('should return 200 with business array after /me (business created)', async () => {
      const res = await agent
        .get(businessUrl)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0]).toMatchObject({
        id: expect.any(String),
        role: 'OWNER',
      });
    });

    it('should return 200 with empty array when no business (before /me)', async () => {
      const otherUser = createUniqueUser();
      await agent.post(`${authUrl}/register`).send(otherUser).expect(201);
      const loginRes = await agent
        .post(`${authUrl}/login`)
        .send({ email: otherUser.email, password: otherUser.password })
        .expect(200);
      const token = loginRes.body.data.accessToken;

      const res = await agent.get(businessUrl).set('Authorization', `Bearer ${token}`).expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toEqual([]);
    });
  });

  describe('PATCH /:id', () => {
    it('should return 200 with updated business', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      const res = await agent
        .patch(`${businessUrl}/${businessId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Updated Business Name', description: 'New description' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.name).toBe('Updated Business Name');
      expect(res.body.data.description).toBe('New description');
    });
  });

  describe('GET /:id', () => {
    it('should return 200 with full business when member', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      const res = await agent
        .get(`${businessUrl}/${businessId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toMatchObject({
        id: businessId,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should return 404 for non-member', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      const otherUser = createUniqueUser();
      await agent.post(`${authUrl}/register`).send(otherUser).expect(201);
      const otherLogin = await agent
        .post(`${authUrl}/login`)
        .send({ email: otherUser.email, password: otherUser.password })
        .expect(200);
      const otherToken = otherLogin.body.data.accessToken;

      await agent
        .get(`${businessUrl}/${businessId}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });

    it('should return 404 for invalid UUID', async () => {
      await agent
        .get(`${businessUrl}/invalid-uuid`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(404);
    });
  });

  describe('PATCH /:id (continued)', () => {
    it('should save empty string as null', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      const res = await agent
        .patch(`${businessUrl}/${businessId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Has Name', description: '' });

      expect(res.status).toBe(200);
      expect(res.body.data.description).toBeNull();
    });

    it('should return 400 for name > 100 chars', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      await agent
        .patch(`${businessUrl}/${businessId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'a'.repeat(101) })
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('VALIDATION_FAILED');
        });
    });
  });

  describe('POST /:id/logo', () => {
    it('should return 200 with url when multipart file provided', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      const buffer = await createTestImageBuffer();

      const res = await agent
        .post(`${businessUrl}/${businessId}/logo`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .attach('file', buffer, 'logo.jpg')
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.url).toBeDefined();
      expect(typeof res.body.data.url).toBe('string');
    });

    it('should return 400 when no file', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      await agent
        .post(`${businessUrl}/${businessId}/logo`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('VALIDATION_FAILED');
        });
    });
  });

  describe('DELETE /:id/logo', () => {
    it('should return 200 when file exists', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      const buffer = await createTestImageBuffer();
      await agent
        .post(`${businessUrl}/${businessId}/logo`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .attach('file', buffer, 'logo.jpg');

      await agent
        .delete(`${businessUrl}/${businessId}/logo`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);
    });

    it('should return 200 when no file (idempotent)', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      await agent
        .delete(`${businessUrl}/${businessId}/logo`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);
    });
  });

  describe('DELETE /:id', () => {
    it('should return 200 when OWNER', async () => {
      const listRes = await agent.get(businessUrl).set('Authorization', `Bearer ${getMainUserToken()}`);
      const businessId = listRes.body.data[0].id;

      const res = await agent
        .delete(`${businessUrl}/${businessId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.message).toContain('удалён');
    });
  });

  describe('Authorization', () => {
    it('should return 401 without token', async () => {
      await request(app.getHttpServer()).get(businessUrl).expect(401);
    });
  });
});
