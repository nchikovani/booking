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

describe('Admin Schedule Templates (e2e)', () => {
  let app: INestApplication<App>;
  let agent: ReturnType<typeof request.agent>;
  let mainUser: { email: string; password: string };
  let mainToken: string;
  let businessId: string;
  let templateId: string;

  const authUrl = '/api/v1/admin/auth';
  const businessUrl = '/api/v1/admin/businesses';

  const createUniqueUser = () => ({
    email: `sched-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`,
    password: 'SecurePass1',
    firstName: 'Schedule',
    lastName: 'Tester',
  });

  const getScheduleTemplatesUrl = () => `${businessUrl}/${businessId}/schedule-templates`;

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

  describe('GET /schedule-templates', () => {
    it('TC-1: GET /schedule-templates — член бизнеса → 200, список', async () => {
      const res = await agent
        .get(getScheduleTemplatesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('TC-2: GET /schedule-templates — не член → 404', async () => {
      const otherUser = createUniqueUser();
      await agent.post(`${authUrl}/register`).send(otherUser).expect(201);
      const otherLogin = await agent
        .post(`${authUrl}/login`)
        .send({ email: otherUser.email, password: otherUser.password })
        .expect(200);
      const otherToken = otherLogin.body.data.accessToken;

      await agent
        .get(getScheduleTemplatesUrl())
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });
  });

  describe('POST /schedule-templates', () => {
    it('TC-3: POST /schedule-templates с валидными days → 201', async () => {
      const res = await agent
        .post(getScheduleTemplatesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Стандартный график',
          days: [
            {
              dayOfWeek: 1,
              startTime: '09:00',
              endTime: '18:00',
              breaks: [{ startTime: '13:00', endTime: '14:00' }],
            },
            {
              dayOfWeek: 2,
              startTime: '09:00',
              endTime: '18:00',
              breaks: [],
            },
          ],
        })
        .expect(201);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toMatchObject({
        name: 'Стандартный график',
        days: expect.any(Array),
      });
      expect(res.body.data.days).toHaveLength(2);
      expect(res.body.data.id).toBeDefined();
      templateId = res.body.data.id;
    });

    it('TC-4: POST /schedule-templates с startTime "09:07" → 400', async () => {
      await agent
        .post(getScheduleTemplatesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Невалидный',
          days: [
            {
              dayOfWeek: 1,
              startTime: '09:07',
              endTime: '18:00',
              breaks: [],
            },
          ],
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('VALIDATION_FAILED');
        });
    });
  });

  describe('GET /schedule-templates/:id', () => {
    it('TC-5: GET /schedule-templates/:id → 200', async () => {
      const res = await agent
        .get(`${getScheduleTemplatesUrl()}/${templateId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe(templateId);
      expect(res.body.data.days).toBeDefined();
    });

    it('GET /schedule-templates/:id несуществующего → 404', async () => {
      const nonExistentId = '00000000-0000-4000-8000-000000000001';
      await agent
        .get(`${getScheduleTemplatesUrl()}/${nonExistentId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });
  });

  describe('PATCH /schedule-templates/:id', () => {
    it('TC-6: PATCH /schedule-templates/:id → 200', async () => {
      const res = await agent
        .patch(`${getScheduleTemplatesUrl()}/${templateId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Обновлённый график' })
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.name).toBe('Обновлённый график');
    });

    it('PATCH /schedule-templates/:id с {} → 200 (no-op)', async () => {
      const res = await agent
        .patch(`${getScheduleTemplatesUrl()}/${templateId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({})
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.name).toBe('Обновлённый график');
    });

    it('PATCH /schedule-templates/:id с days: [] → 400', async () => {
      await agent
        .patch(`${getScheduleTemplatesUrl()}/${templateId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ days: [] })
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('VALIDATION_FAILED');
        });
    });

    it('PATCH /schedule-templates/:id с дублирующимся dayOfWeek → 400', async () => {
      await agent
        .patch(`${getScheduleTemplatesUrl()}/${templateId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          days: [
            { dayOfWeek: 1, startTime: '09:00', endTime: '18:00', breaks: [] },
            { dayOfWeek: 1, startTime: '10:00', endTime: '17:00', breaks: [] },
          ],
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('VALIDATION_FAILED');
        });
    });

    it('PATCH /schedule-templates/:id несуществующего → 404', async () => {
      const nonExistentId = '00000000-0000-4000-8000-000000000002';
      await agent
        .patch(`${getScheduleTemplatesUrl()}/${nonExistentId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Test' })
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });
  });

  describe('DELETE /schedule-templates/:id', () => {
    it('TC-7: DELETE /schedule-templates/:id → 200', async () => {
      const res = await agent
        .delete(`${getScheduleTemplatesUrl()}/${templateId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toBeNull();
    });

    it('DELETE /schedule-templates/:id несуществующего → 404', async () => {
      const nonExistentId = '00000000-0000-4000-8000-000000000003';
      await agent
        .delete(`${getScheduleTemplatesUrl()}/${nonExistentId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });
  });
});
