import { Router } from 'express';
import { index, create, storeEvent, destroy, edit, update } from '../controllers/EventController.js';

const router = Router();

router.get('/ev', index);
router.get('/event', create);
router.post('/event', storeEvent);
router.post('/event/delete', destroy);
router.get('/event/edit/:id', edit);
router.post('/event/edit/:id', update);

export default router;