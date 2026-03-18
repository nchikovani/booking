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

describe('Admin Employees (e2e)', () => {
  let app: INestApplication<App>;
  let agent: ReturnType<typeof request.agent>;
  let mainUser: { email: string; password: string };
  let mainToken: string;
  let businessId: string;
  let categoryId: string;
  let serviceId1: string;
  let serviceId2: string;
  let employeeId1: string;

  const authUrl = '/api/v1/admin/auth';
  const businessUrl = '/api/v1/admin/businesses';

  const createUniqueUser = () => ({
    email: `emp-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`,
    password: 'SecurePass1',
    firstName: 'Employee',
    lastName: 'Tester',
  });

  const getEmployeesUrl = () => `${businessUrl}/${businessId}/employees`;

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

    const catRes = await agent
      .post(`${businessUrl}/${businessId}/categories`)
      .set('Authorization', `Bearer ${mainToken}`)
      .send({ name: 'Стрижка' })
      .expect(201);
    categoryId = catRes.body.data.id;

    const svc1Res = await agent
      .post(`${businessUrl}/${businessId}/services`)
      .set('Authorization', `Bearer ${mainToken}`)
      .send({
        name: 'Мужская стрижка',
        price: 1500,
        durationMinutes: 30,
        categoryId,
      })
      .expect(201);
    serviceId1 = svc1Res.body.data.id;

    const svc2Res = await agent
      .post(`${businessUrl}/${businessId}/services`)
      .set('Authorization', `Bearer ${mainToken}`)
      .send({
        name: 'Женская стрижка',
        price: 2000,
        durationMinutes: 60,
        categoryId,
      })
      .expect(201);
    serviceId2 = svc2Res.body.data.id;
  });

  afterAll(async () => {
    await app.close();
  });

  const getMainUserToken = () => mainToken;

  describe('GET /employees', () => {
    it('TC-1: GET /employees — член бизнеса → 200, список', async () => {
      const res = await agent
        .get(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('TC-2: GET /employees — не член → 404', async () => {
      const otherUser = createUniqueUser();
      await agent.post(`${authUrl}/register`).send(otherUser).expect(201);
      const otherLogin = await agent
        .post(`${authUrl}/login`)
        .send({ email: otherUser.email, password: otherUser.password })
        .expect(200);
      const otherToken = otherLogin.body.data.accessToken;

      await agent
        .get(getEmployeesUrl())
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });

    it('TC-3: GET /employees с search, sort → 200', async () => {
      const res = await agent
        .get(getEmployeesUrl())
        .query({ search: 'Анна', sort: 'name' })
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /employees', () => {
    it('TC-4: POST /employees с services → 201, сотрудник создан', async () => {
      const res = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Анна Иванова',
          specialization: 'Мастер маникюра',
          services: [{ serviceId: serviceId1 }, { serviceId: serviceId2 }],
        })
        .expect(201);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toMatchObject({
        name: 'Анна Иванова',
        specialization: 'Мастер маникюра',
      });
      expect(res.body.data.services).toBeDefined();
      expect(res.body.data.services.map((s: { serviceId: string }) => s.serviceId)).toEqual(
        expect.arrayContaining([serviceId1, serviceId2]),
      );
      expect(res.body.data.id).toBeDefined();
      employeeId1 = res.body.data.id;
    });

    it('TC-8b: POST /employees с services с priceOverride, durationMinutesOverride → 201, override в ответе', async () => {
      const res = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Мастер с индивидуальной ценой',
          services: [{ serviceId: serviceId1, priceOverride: 2000, durationMinutesOverride: 45 }],
        })
        .expect(201);

      expect(res.body.status).toBe('success');
      expect(res.body.data.services).toHaveLength(1);
      expect(res.body.data.services[0].serviceId).toBe(serviceId1);
      expect(['2000', '2000.00']).toContain(res.body.data.services[0].priceOverride);
      expect(res.body.data.services[0].durationMinutesOverride).toBe(45);
    });

    it('TC-5: POST /employees с serviceId другого бизнеса → 404', async () => {
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
      const otherCatRes = await agent
        .post(`${businessUrl}/${otherBusinessId}/categories`)
        .set('Authorization', `Bearer ${otherToken}`)
        .send({ name: 'Чужая' })
        .expect(201);
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
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Тест',
          services: [{ serviceId: otherServiceId }],
        })
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });
  });

  describe('GET /employees/:id', () => {
    it('TC-6: GET /employees/:id → 200', async () => {
      const res = await agent
        .get(`${getEmployeesUrl()}/${employeeId1}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toMatchObject({
        id: employeeId1,
        name: 'Анна Иванова',
      });
      expect(res.body.data.services.map((s: { serviceId: string }) => s.serviceId)).toEqual(
        expect.arrayContaining([serviceId1, serviceId2]),
      );
    });

    it('TC-7: GET /employees/:id — не член → 404', async () => {
      const otherUser = createUniqueUser();
      await agent.post(`${authUrl}/register`).send(otherUser).expect(201);
      const otherLogin = await agent
        .post(`${authUrl}/login`)
        .send({ email: otherUser.email, password: otherUser.password })
        .expect(200);
      const otherToken = otherLogin.body.data.accessToken;

      await agent
        .get(`${getEmployeesUrl()}/${employeeId1}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(404);
    });
  });

  describe('PATCH /employees/:id', () => {
    it('TC-8: PATCH /employees/:id с services → 200', async () => {
      const res = await agent
        .patch(`${getEmployeesUrl()}/${employeeId1}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ services: [{ serviceId: serviceId1 }] })
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.services.map((s: { serviceId: string }) => s.serviceId)).toEqual([
        serviceId1,
      ]);
    });

    it('TC-8a: PATCH /employees/:id без services в body не меняет связи с услугами', async () => {
      // Сначала восстанавливаем связи [serviceId1]
      await agent
        .patch(`${getEmployeesUrl()}/${employeeId1}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ services: [{ serviceId: serviceId1 }] })
        .expect(200);

      const res = await agent
        .patch(`${getEmployeesUrl()}/${employeeId1}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Анна Иванова (обновлено)' })
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.name).toBe('Анна Иванова (обновлено)');
      expect(res.body.data.services.map((s: { serviceId: string }) => s.serviceId)).toEqual([
        serviceId1,
      ]);
    });

    it('TC-9: PATCH /employees/:id с services: [] → 200, связи удалены', async () => {
      const res = await agent
        .patch(`${getEmployeesUrl()}/${employeeId1}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ services: [] })
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.services).toEqual([]);
    });

    it('TC-10: PATCH /employees/:id с пустым body → 200 без изменений', async () => {
      const res = await agent
        .patch(`${getEmployeesUrl()}/${employeeId1}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({})
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.id).toBe(employeeId1);
    });
  });

  describe('POST /employees/:id/photo', () => {
    it('TC-11: POST /employees/:id/photo с JPEG → 200', async () => {
      const buffer = await createTestImageBuffer();

      const res = await agent
        .post(`${getEmployeesUrl()}/${employeeId1}/photo`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .attach('file', buffer, 'photo.jpg')
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.url).toBeDefined();
      expect(typeof res.body.data.url).toBe('string');
    });

    it('TC-12: POST /employees/:id/photo без file → 400', async () => {
      await agent
        .post(`${getEmployeesUrl()}/${employeeId1}/photo`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('VALIDATION_FAILED');
        });
    });
  });

  describe('DELETE /employees/:id/photo', () => {
    it('TC-13: DELETE /employees/:id/photo при наличии файла → 200', async () => {
      const res = await agent
        .delete(`${getEmployeesUrl()}/${employeeId1}/photo`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toBeNull();
    });

    it('TC-14: DELETE /employees/:id/photo при отсутствии файла → 200 (идемпотентно)', async () => {
      await agent
        .delete(`${getEmployeesUrl()}/${employeeId1}/photo`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);
    });
  });

  describe('DELETE /employees/:id', () => {
    it('TC-15: DELETE /employees/:id → 200', async () => {
      const empRes = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'На удаление' })
        .expect(201);
      const empId = empRes.body.data.id;

      const res = await agent
        .delete(`${getEmployeesUrl()}/${empId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data).toBeNull();
    });
  });

  describe('Service employeeServices', () => {
    it('TC-16: POST /services с employeeServices → 201, employeeServices в ответе', async () => {
      const empRes = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Мастер для услуги' })
        .expect(201);
      const empId = empRes.body.data.id;

      const res = await agent
        .post(`${businessUrl}/${businessId}/services`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Услуга с мастером',
          price: 1000,
          durationMinutes: 30,
          employeeServices: [{ employeeId: empId }],
        })
        .expect(201);

      expect(res.body.status).toBe('success');
      expect(
        res.body.data.employeeServices.some((s: { employeeId: string }) => s.employeeId === empId),
      ).toBe(true);
    });

    it('TC-16a: POST /services с employeeServices и priceOverride, durationMinutesOverride → 201, override в ответе', async () => {
      const empRes = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Мастер с override' })
        .expect(201);
      const empId = empRes.body.data.id;

      const res = await agent
        .post(`${businessUrl}/${businessId}/services`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Услуга с индивидуальной ценой мастера',
          price: 1000,
          durationMinutes: 30,
          employeeServices: [
            { employeeId: empId, priceOverride: 2000, durationMinutesOverride: 45 },
          ],
        })
        .expect(201);

      expect(res.body.status).toBe('success');
      const link = res.body.data.employeeServices.find(
        (s: { employeeId: string }) => s.employeeId === empId,
      );
      expect(link).toBeDefined();
      expect(['2000', '2000.00']).toContain(link.priceOverride);
      expect(link.durationMinutesOverride).toBe(45);
    });

    it('TC-17: PATCH /services/:id с employeeServices → 200, связи обновлены', async () => {
      const listRes = await agent
        .get(`${businessUrl}/${businessId}/services`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);
      const svc = listRes.body.data.items.find(
        (s: { name: string }) => s.name === 'Услуга с мастером',
      );
      expect(svc).toBeDefined();

      const res = await agent
        .patch(`${businessUrl}/${businessId}/services/${svc.id}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ employeeServices: [{ employeeId: employeeId1 }] })
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(
        res.body.data.employeeServices.some(
          (s: { employeeId: string }) => s.employeeId === employeeId1,
        ),
      ).toBe(true);
    });

    it('TC-17a: PATCH /services/:id с employeeServices и override → 200, override обновлены', async () => {
      const listRes = await agent
        .get(`${businessUrl}/${businessId}/services`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);
      const svc = listRes.body.data.items.find(
        (s: { name: string }) => s.name === 'Услуга с индивидуальной ценой мастера',
      );
      if (!svc) {
        throw new Error(
          'Услуга "Услуга с индивидуальной ценой мастера" не найдена — выполните TC-16a',
        );
      }

      const res = await agent
        .patch(`${businessUrl}/${businessId}/services/${svc.id}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          employeeServices: [
            { employeeId: employeeId1, priceOverride: 2500, durationMinutesOverride: 60 },
          ],
        })
        .expect(200);

      expect(res.body.status).toBe('success');
      const link = res.body.data.employeeServices.find(
        (s: { employeeId: string }) => s.employeeId === employeeId1,
      );
      expect(link).toBeDefined();
      expect(['2500', '2500.00']).toContain(link.priceOverride);
      expect(link.durationMinutesOverride).toBe(60);
    });
  });

  describe('Authorization', () => {
    it('должен возвращать 401 без токена', async () => {
      await request(app.getHttpServer()).get(getEmployeesUrl()).expect(401);
    });
  });

  describe('Employee schedule (Feature 1.5)', () => {
    let scheduleTemplateId: string;
    // UUID шаблона другого бизнеса (валидный v4, не существует) — для тестов 404
    const otherBusinessTemplateId = '00000000-0000-4000-8000-000000000001';

    beforeAll(async () => {
      const tplRes = await agent
        .post(`${businessUrl}/${businessId}/schedule-templates`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'График для сотрудников',
          days: [{ dayOfWeek: 1, startTime: '09:00', endTime: '18:00', breaks: [] }],
        })
        .expect(201);
      scheduleTemplateId = tplRes.body.data.id;
    });

    it('TC-14: POST /employees с schedule.scheduleTemplateId → 201, schedule в ответе', async () => {
      const res = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Сотрудник с шаблоном',
          schedule: { scheduleTemplateId },
        })
        .expect(201);

      expect(res.body.status).toBe('success');
      expect(res.body.data.schedule).toMatchObject({
        type: 'template',
        scheduleTemplateId,
        scheduleTemplateName: 'График для сотрудников',
        days: expect.any(Array),
      });
    });

    it('TC-15: POST /employees с schedule.days → 201, type: custom', async () => {
      const res = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Сотрудник с индивидуальным графиком',
          schedule: {
            days: [
              {
                dayOfWeek: 1,
                startTime: '09:00',
                endTime: '17:00',
                breaks: [{ startTime: '13:00', endTime: '14:00' }],
              },
            ],
          },
        })
        .expect(201);

      expect(res.body.status).toBe('success');
      expect(res.body.data.schedule).toMatchObject({
        type: 'custom',
        days: expect.any(Array),
      });
      expect(res.body.data.schedule.days).toHaveLength(1);
    });

    it('TC-19: POST /employees с schedule: { days: [] } → 201, сотрудник без рабочих дней', async () => {
      const res = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Сотрудник без рабочих дней',
          schedule: { days: [] },
        })
        .expect(201);

      expect(res.body.status).toBe('success');
      expect(res.body.data.schedule).toMatchObject({
        type: 'custom',
        days: [],
      });
    });

    it('TC-16: PATCH /employees/:id с schedule: null → 200, график удалён', async () => {
      const empRes = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'На удаление графика',
          schedule: { scheduleTemplateId },
        })
        .expect(201);
      const empId = empRes.body.data.id;

      const res = await agent
        .patch(`${getEmployeesUrl()}/${empId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ schedule: null })
        .expect(200);

      expect(res.body.status).toBe('success');
      expect(res.body.data.schedule).toBeNull();
    });

    it('TC-17: PATCH /employees/:id с scheduleTemplateId другого бизнеса → 404', async () => {
      const empRes = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ name: 'Для теста 404' })
        .expect(201);
      const empId = empRes.body.data.id;

      await agent
        .patch(`${getEmployeesUrl()}/${empId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ schedule: { scheduleTemplateId: otherBusinessTemplateId } })
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });

    it('TC-17a: POST /employees с scheduleTemplateId другого бизнеса → 404', async () => {
      await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Тест',
          schedule: { scheduleTemplateId: otherBusinessTemplateId },
        })
        .expect(404)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('NOT_FOUND');
        });
    });

    it('TC-13: schedule: {} (пустой) → 400', async () => {
      await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Тест',
          schedule: {},
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('VALIDATION_FAILED');
        });
    });

    it('schedule с обоими полями → 400', async () => {
      await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Тест',
          schedule: {
            scheduleTemplateId,
            days: [{ dayOfWeek: 1, startTime: '09:00', endTime: '18:00', breaks: [] }],
          },
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.status).toBe('error');
          expect(res.body.error.code).toBe('VALIDATION_FAILED');
        });
    });

    it('PATCH с schedule.days на сотруднике с шаблоном → тип меняется на custom', async () => {
      const empRes = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Для смены типа',
          schedule: { scheduleTemplateId },
        })
        .expect(201);
      const empId = empRes.body.data.id;
      expect(empRes.body.data.schedule.type).toBe('template');

      const res = await agent
        .patch(`${getEmployeesUrl()}/${empId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          schedule: {
            days: [{ dayOfWeek: 2, startTime: '10:00', endTime: '18:00', breaks: [] }],
          },
        })
        .expect(200);

      expect(res.body.data.schedule.type).toBe('custom');
      expect(res.body.data.schedule.days).toHaveLength(1);
      expect(res.body.data.schedule.days[0].dayOfWeek).toBe(2);
    });

    it('PATCH с schedule.scheduleTemplateId на сотруднике с custom-графиком → тип меняется на template', async () => {
      const empRes = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Для смены на шаблон',
          schedule: {
            days: [{ dayOfWeek: 3, startTime: '09:00', endTime: '17:00', breaks: [] }],
          },
        })
        .expect(201);
      const empId = empRes.body.data.id;
      expect(empRes.body.data.schedule.type).toBe('custom');

      const res = await agent
        .patch(`${getEmployeesUrl()}/${empId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({ schedule: { scheduleTemplateId } })
        .expect(200);

      expect(res.body.data.schedule.type).toBe('template');
      expect(res.body.data.schedule.scheduleTemplateId).toBe(scheduleTemplateId);
    });

    it('TC-6: DELETE шаблона → у сотрудников с этим шаблоном schedule: null', async () => {
      const tplRes = await agent
        .post(`${businessUrl}/${businessId}/schedule-templates`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'График на удаление',
          days: [{ dayOfWeek: 1, startTime: '09:00', endTime: '18:00', breaks: [] }],
        })
        .expect(201);
      const tplId = tplRes.body.data.id;

      const empRes = await agent
        .post(getEmployeesUrl())
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .send({
          name: 'Сотрудник с удаляемым шаблоном',
          schedule: { scheduleTemplateId: tplId },
        })
        .expect(201);
      const empId = empRes.body.data.id;

      await agent
        .delete(`${businessUrl}/${businessId}/schedule-templates/${tplId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      const getRes = await agent
        .get(`${getEmployeesUrl()}/${empId}`)
        .set('Authorization', `Bearer ${getMainUserToken()}`)
        .expect(200);

      expect(getRes.body.data.schedule).toBeNull();
    });
  });
});
