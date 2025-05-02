import { Router } from 'express';
import { SportEventController } from '../controllers';
import { validateMiddleware as validate } from '../middleware';
import {
  createSportEventSchema,
  updateSportEventSchema,
  idParamSchema,
} from '../schemas';

const router = Router();
const sportEventController = new SportEventController();

router.get('/', sportEventController.getAllEvents.bind(sportEventController));
router.get(
  '/:id',
  validate(idParamSchema, 'params'),
  sportEventController.getEventById.bind(sportEventController)
);
router.post(
  '/',
  validate(createSportEventSchema, 'body'),
  sportEventController.createEvent.bind(sportEventController)
);
router.put(
  '/:id',
  validate(updateSportEventSchema, 'body'),
  validate(idParamSchema, 'params'),
  sportEventController.updateEvent.bind(sportEventController)
);
router.delete(
  '/:id',
  validate(idParamSchema, 'params'),
  sportEventController.deleteEvent.bind(sportEventController)
);

export const sportEventRouter = router;
