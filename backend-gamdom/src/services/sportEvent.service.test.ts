import { Repository, DeepPartial, UpdateResult } from 'typeorm';
import { SportEventService } from './sportEvent.service';
import { SportEvent } from '../entities';
import { AppError } from '../utils/errors';
import { ERROR_MESSAGES } from '../consts/errorMessages';

// Mock TypeORM decorators
jest.mock('typeorm', () => ({
  Repository: jest.fn(),
  Entity: () => jest.fn(),
  PrimaryGeneratedColumn: () => jest.fn(),
  Column: () => jest.fn(),
  CreateDateColumn: () => jest.fn(),
  UpdateDateColumn: () => jest.fn(),
  DeleteDateColumn: () => jest.fn(),
}));

// Mock AppDataSource
jest.mock('../dataSource', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('SportEventService', () => {
  let service: SportEventService;
  let mockRepository: jest.Mocked<Repository<SportEvent>>;

  const mockEvent = {
    eventId: '123e4567-e89b-12d3-a456-426614174000',
    eventName: 'Test Event',
    odds: 2.5,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  } as SportEvent;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
      remove: jest.fn(),
      softDelete: jest.fn(),
    } as unknown as jest.Mocked<Repository<SportEvent>>;

    service = new SportEventService();
    (service as any).sportEventRepository = mockRepository;
  });

  describe('getAllEvents', () => {
    it('should return all events', async () => {
      const mockEvents = [mockEvent];
      mockRepository.find.mockResolvedValue(mockEvents);

      const result = await service.getAllEvents();
      expect(result).toEqual(mockEvents);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('should throw AppError when find fails', async () => {
      mockRepository.find.mockRejectedValue(new Error('Database error'));

      await expect(service.getAllEvents()).rejects.toThrow(
        new AppError(ERROR_MESSAGES.ERROR_FETCHING_EVENTS, 500)
      );
    });
  });

  describe('getEventById', () => {
    it('should return event by id', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockEvent);

      const result = await service.getEventById(mockEvent.eventId);
      expect(result).toEqual(mockEvent);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        eventId: mockEvent.eventId,
      });
    });

    it('should throw AppError when event not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.getEventById('non-existent-id')).rejects.toThrow(
        new AppError(ERROR_MESSAGES.EVENT_NOT_FOUND, 404)
      );
    });

    it('should throw AppError when findOneBy fails', async () => {
      mockRepository.findOneBy.mockRejectedValue(new Error('Database error'));

      await expect(service.getEventById(mockEvent.eventId)).rejects.toThrow(
        new AppError(ERROR_MESSAGES.ERROR_FETCHING_EVENT, 500)
      );
    });
  });

  describe('createEvent', () => {
    const createEventData = {
      eventName: 'New Event',
      odds: 1.5,
    };

    it('should create and return new event', async () => {
      const newEvent = { ...mockEvent, ...createEventData };
      mockRepository.create.mockReturnValue(newEvent);
      mockRepository.save.mockResolvedValue(newEvent);

      const result = await service.createEvent(createEventData);
      expect(result).toEqual(newEvent);
      expect(mockRepository.create).toHaveBeenCalledWith(createEventData);
      expect(mockRepository.save).toHaveBeenCalledWith(newEvent);
    });

    it('should throw AppError when save fails', async () => {
      mockRepository.create.mockReturnValue(mockEvent);
      mockRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(service.createEvent(createEventData)).rejects.toThrow(
        new AppError(ERROR_MESSAGES.ERROR_CREATING_EVENT, 500)
      );
    });
  });

  describe('updateEvent', () => {
    const updateEventData = {
      eventName: 'Updated Event',
      odds: 2.0,
    };

    it('should update and return event', async () => {
      const existingEvent = { ...mockEvent };
      const mergedEvent = { ...existingEvent, ...updateEventData };

      mockRepository.findOneBy.mockResolvedValue(existingEvent);
      mockRepository.merge.mockImplementation(
        (target: SportEvent, source: DeepPartial<SportEvent>) => {
          Object.assign(target, source);
          return target;
        }
      );
      mockRepository.save.mockResolvedValue(mergedEvent);

      const result = await service.updateEvent(
        existingEvent.eventId,
        updateEventData
      );

      expect(result).toEqual(mergedEvent);
      expect(mockRepository.merge).toHaveBeenCalledWith(
        existingEvent,
        updateEventData
      );
      expect(mockRepository.save).toHaveBeenCalledWith(mergedEvent);
    });

    it('should throw AppError when event not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.updateEvent('non-existent-id', updateEventData)
      ).rejects.toThrow(new AppError(ERROR_MESSAGES.EVENT_NOT_FOUND, 404));
    });

    it('should throw AppError when save fails', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockEvent);
      mockRepository.merge.mockReturnValue(mockEvent);
      mockRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(
        service.updateEvent(mockEvent.eventId, updateEventData)
      ).rejects.toThrow(new AppError(ERROR_MESSAGES.ERROR_UPDATING_EVENT, 500));
    });
  });

  describe('deleteEvent', () => {
    it('should delete event', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockEvent);
      mockRepository.softDelete.mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: [],
      } as UpdateResult);

      await service.deleteEvent(mockEvent.eventId);
      expect(mockRepository.softDelete).toHaveBeenCalledWith(mockEvent.eventId);
    });

    it('should throw AppError when event not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.deleteEvent('non-existent-id')).rejects.toThrow(
        new AppError(ERROR_MESSAGES.EVENT_NOT_FOUND, 404)
      );
    });

    it('should throw AppError when softDelete fails', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockEvent);
      mockRepository.softDelete.mockRejectedValue(new Error('Database error'));

      await expect(service.deleteEvent(mockEvent.eventId)).rejects.toThrow(
        new AppError(ERROR_MESSAGES.ERROR_DELETING_EVENT, 500)
      );
    });
  });
});
