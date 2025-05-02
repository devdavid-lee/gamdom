import request from 'supertest';
import express, { ErrorRequestHandler } from 'express';
import { AppDataSource } from '../dataSource';
import { SportEvent } from '../entities';
import { SportEventController } from './sportEvent.controller';
import {
  errorHandlerMiddleware as errorHandler,
  validateMiddleware as validate,
} from '../middleware';
import {
  createSportEventSchema,
  updateSportEventSchema,
  idParamSchema,
} from '../schemas';

const app = express();
const sportEventController = new SportEventController();

app.use(express.json());
app.post(
  '/',
  validate(createSportEventSchema, 'body'),
  sportEventController.createEvent.bind(sportEventController)
);
app.get('/', sportEventController.getAllEvents.bind(sportEventController));
app.get(
  '/:id',
  validate(idParamSchema, 'params'),
  sportEventController.getEventById.bind(sportEventController)
);
app.put(
  '/:id',
  validate(updateSportEventSchema, 'body'),
  validate(idParamSchema, 'params'),
  sportEventController.updateEvent.bind(sportEventController)
);
app.delete(
  '/:id',
  validate(idParamSchema, 'params'),
  sportEventController.deleteEvent.bind(sportEventController)
);
app.use(errorHandler as ErrorRequestHandler);

describe('SportEvent Integration Tests', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(SportEvent).clear();
  });

  const mockEvent = {
    eventName: 'Test Event',
    odds: 2.5,
  };

  describe('POST /', () => {
    it('should create a new event', async () => {
      const response = await request(app).post('/').send(mockEvent).expect(201);

      expect(response.body).toHaveProperty('eventId');
      expect(response.body.eventName).toBe(mockEvent.eventName);
      expect(response.body.odds).toBe(mockEvent.odds);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 for invalid event data', async () => {
      const invalidEvent = {
        eventName: '',
        odds: -1,
      };

      await request(app).post('/').send(invalidEvent).expect(400);
    });
  });

  describe('GET /', () => {
    it('should return all events', async () => {
      const event1 = await request(app).post('/').send(mockEvent).expect(201);

      const event2 = await request(app)
        .post('/')
        .send({ ...mockEvent, eventName: 'Test Event 2' })
        .expect(201);

      const response = await request(app).get('/').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].eventId).toBe(event1.body.eventId);
      expect(response.body[1].eventId).toBe(event2.body.eventId);
    });
  });

  describe('GET /:id', () => {
    it('should return event by id', async () => {
      const createdEvent = await request(app)
        .post('/')
        .send(mockEvent)
        .expect(201);

      const response = await request(app)
        .get(`/${createdEvent.body.eventId}`)
        .expect(200);

      expect(response.body.eventId).toBe(createdEvent.body.eventId);
      expect(response.body.eventName).toBe(mockEvent.eventName);
      expect(Number(response.body.odds)).toEqual(mockEvent.odds);
    });

    it('should return 404 for non-existent event', async () => {
      await request(app)
        .get('/b840c724-3b9e-46f4-af80-910b0b53b2bb')
        .expect(404);
    });
  });

  describe('PUT /:id', () => {
    it('should update event', async () => {
      const createdEvent = await request(app)
        .post('/')
        .send(mockEvent)
        .expect(201);

      const updateData = {
        eventName: 'Updated Event',
        odds: 3.0,
      };

      const response = await request(app)
        .put(`/${createdEvent.body.eventId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.eventId).toBe(createdEvent.body.eventId);
      expect(response.body.eventName).toBe(updateData.eventName);
      expect(response.body.odds).toBe(updateData.odds);
    });

    it('should return 404 when updating non-existent event', async () => {
      const updateData = {
        eventName: 'Updated Event',
        odds: 3.0,
      };

      await request(app)
        .put('/b840c724-3b9e-46f4-af80-910b0b53b2bb')
        .send(updateData)
        .expect(404);
    });
  });

  describe('DELETE /:id', () => {
    it('should delete event', async () => {
      const createdEvent = await request(app)
        .post('/')
        .send(mockEvent)
        .expect(201);

      await request(app).delete(`/${createdEvent.body.eventId}`).expect(204);

      await request(app).get(`/${createdEvent.body.eventId}`).expect(404);
    });

    it('should return 404 when deleting non-existent event', async () => {
      await request(app)
        .delete('/b840c724-3b9e-46f4-af80-910b0b53b2bb')
        .expect(404);
    });
  });
});
