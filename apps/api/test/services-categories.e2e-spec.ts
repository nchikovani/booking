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

describe('Services & Categories (e2e)', () => {
  let app: INestApplication<App>;
  let agent: ReturnType<typeof request.agent>;
  let mainUser: { email: string; password: string };
  let mainToken: string;
  let businessId: string;
  let categoryId: string;
  let serviceId1: string;
  let serviceId2: string;

  const authUrl = '/api/v1/admin/auth';
  const businessUrl = '/api/v1/admin/businesses';

  const createUniqueUser = () => ({
    email: `svc-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`,
    password: 'SecurePass1',
    firstName: 'Service',
    lastName: 'Tester',
  });

  const getCategoriesUrl = () => `${businessUrl}/${businessId}/categories`;
  const getServicesUrl = () => `${businessUrl}/${businessId}/services`;

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
    await agent.get(`${authUrl}/me`).set('Authorization', `Bearer ${mainToken}`).expect(200);
    const listRes = await agent
      .get(businessUrl)
      .set('Authorization', `Bearer ${mainToken}`)
      .expect(200);
    businessId = listRes.body.data[0].id;
  });

  afterAll(async () => {
    await app.close();
  });

  const getMainUserToken = () => mainToken;

  describe('Categories', () => {
    it('TC-1: GET /categories — член бизнеса → 200, список', async () => {
      const res = await agent
        .get(getCategoriesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('TC-2: GET /categories — не член → 404', async () => {
      const otherUser = createUniqueUser();
      await agent.post(`${authUrl}/register`).send(otherUser).expect(201);
      const otherLogin = await agent
        .post(`${authUrl}/login`)
        .send({ email: otherUser.email, password: otherUser.password })
        .expect(200);
      const otherToken = otherLogin.body.data.accessToken;

      await agent
        .get(getCategoriesUrl())
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });

    it('TC-3: POST /categories с дубликатом name → 409 CONFLICT', async () => {
      await agent
        .post(getCategoriesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Стрижка' })
        .expect(201);

      await agent
        .post(getCategoriesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Стрижка' })
        .expect(409)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('CONFLICT');
        });
    });
  });

  describe('Services', () => {
    beforeAll(async () => {
      const catRes = await agent
        .post(getCategoriesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Окрашивание' })
        .expect(201);
      categoryId = catRes.body.data.id;

      const svc1Res = await agent
        .post(getServicesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Мужская стрижка',
          description: 'Классическая',
          price: 1500,
          durationMinutes: 30,
          breakAfterMinutes: 5,
          categoryId,
        })
        .expect(201);
      serviceId1 = svc1Res.body.data.id;

      const svc2Res = await agent
        .post(getServicesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Женская стрижка',
          description: 'С укладкой',
          price: 2000,
          durationMinutes: 60,
          categoryId,
        })
        .expect(201);
      serviceId2 = svc2Res.body.data.id;
    });

    it('TC-4: GET /services с search, categoryId, limit → 200, items + nextCursor', async () => {
      const res = await agent
        .get(getServicesUrl())
        .query({ search: 'стрижка', categoryId, limit: 1 })
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toHaveProperty('items');
      expect(res.body.data).toHaveProperty('nextCursor');
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.items.length).toBeLessThanOrEqual(1);
    });

    it('TC-5: GET /services с cursor → 200, следующая страница', async () => {
      const firstRes = await agent
        .get(getServicesUrl())
        .query({ limit: 1 })
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      const cursor = firstRes.body.data.nextCursor;
      if (cursor) {
        const secondRes = await agent
          .get(getServicesUrl())
          .query({ cursor, limit: 1 })
          .set('Authorization', `Bearer ${getMainUserToken()}`)
          .expect(200);
        expect(secondRes.body.data.items.length).toBeLessThanOrEqual(1);
      }
    });

    it('TC-6: PATCH /services/:id/reorder с afterServiceId → 200, position обновлён', async () => {
      const res = await agent
        .patch(`${getServicesUrl()}/${serviceId1}/reorder`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ afterServiceId: serviceId2 })
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe(serviceId1);
      expect(res.body.data).toHaveProperty('position');
    });

    it('TC-7: PATCH /services/:id/reorder без afterServiceId → 200, услуга в начало', async () => {
      const res = await agent
        .patch(`${getServicesUrl()}/${serviceId2}/reorder`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({})
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe(serviceId2);
      expect(res.body.data).toHaveProperty('position');
    });

    it('TC-8: PATCH /services/:id/reorder с afterServiceId другого бизнеса → 404', async () => {
      const otherUser = createUniqueUser();
      await agent.post(`${authUrl}/register`).send(otherUser).expect(201);
      const otherLogin = await agent
        .post(`${authUrl}/login`)
        .send({ email: otherUser.email, password: otherUser.password })
        .expect(200);
      const otherToken = otherLogin.body.data.accessToken;
      await agent.get(`${authUrl}/me`).set('Authorization', `Bearer ${otherToken}`).expect(200);
      const otherListRes = await agent
        .get(businessUrl)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(200);
      const otherBusinessId = otherListRes.body.data[0]?.id;
      expect(otherBusinessId).toBeDefined();

      const otherSvcRes = await agent
        .post(`${businessUrl}/${otherBusinessId}/services`)
        .set('Authorization', `Bearer ${otherToken}`)
        .send({
          name: 'Чужая услуга',
          price: 500,
          durationMinutes: 30,
        })
        .expect(201);
      const otherServiceId = otherSvcRes.body.data.id;

      await agent
        .patch(`${getServicesUrl()}/${serviceId1}/reorder`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ afterServiceId: otherServiceId })
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });

    it('TC-9: GET /services с categoryId другого бизнеса → 400 INVALID_CATEGORY', async () => {
      const otherUser = createUniqueUser();
      await agent.post(`${authUrl}/register`).send(otherUser).expect(201);
      const otherLogin = await agent
        .post(`${authUrl}/login`)
        .send({ email: otherUser.email, password: otherUser.password })
        .expect(200);
      const otherToken = otherLogin.body.data.accessToken;
      await agent.get(`${authUrl}/me`).set('Authorization', `Bearer ${otherToken}`).expect(200);
      const otherListRes = await agent
        .get(businessUrl)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(200);
      const otherBusinessId = otherListRes.body.data[0]?.id;
      expect(otherBusinessId).toBeDefined();
      const otherCatRes = await agent
        .post(`${businessUrl}/${otherBusinessId}/categories`)
        .set('Authorization', `Bearer ${otherToken}`)
        .send({ name: 'Чужая категория' })
        .expect(201);
      const otherCategoryId = otherCatRes.body.data.id;

      await agent
        .get(getServicesUrl())
        .query({ categoryId: otherCategoryId })
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('INVALID_CATEGORY');
        });
    });

    it('TC-10: GET /services с невалидным cursor → 400 INVALID_CURSOR', async () => {
      await agent
        .get(getServicesUrl())
        .query({ cursor: 'invalid!!!' })
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('INVALID_CURSOR');
        });
    });

    it('TC-11: PATCH /services/:id/reorder с afterServiceId === id → 200 идемпотентно', async () => {
      const beforeRes = await agent
        .get(`${getServicesUrl()}/${serviceId1}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      const res = await agent
        .patch(`${getServicesUrl()}/${serviceId1}/reorder`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ afterServiceId: serviceId1 })
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe(serviceId1);
      expect(res.body.data.position).toBe(beforeRes.body.data.position);
    });
  });
});
