import { Router } from 'express';
import { index, createAttendant, store, destroy, edit, update } from '../controllers/UserController.js';

const router = Router();

router.get('/list', index);
router.get('/attendant', createAttendant);
router.post('/attendant', store);
router.post('/attendant/delete', destroy);
router.get('/attendant/edit/:id', edit);
router.post('/attendant/edit/:id', update);

export default router;