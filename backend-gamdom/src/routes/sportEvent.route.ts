import { Router } from 'express';
import { SportEventController } from '../controllers';

const router = Router();

router.get('/', SportEventController.getAllEvents);
router.get('/:id', SportEventController.getEventById);
router.post('/', SportEventController.createEvent);
router.put('/:id', SportEventController.updateEvent);
router.delete('/:id', SportEventController.deleteEvent);

export const sportEventRouter = router;
