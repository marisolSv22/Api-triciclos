import { Router } from 'express';
import { index, create, storeChildren, destroy, edit, update } from '../controllers/ChildrenController.js';

const router = Router();

router.get('/chil', index);
router.get('/create', create);
router.post('/create', storeChildren);
router.post('/children/delete', destroy);
router.get('/children/edit/:id', edit);
router.post('/children/edit/:id', update);

export default router