import { Router } from 'express';
import { index, login, auth, register, storeUser, logout, destroy, edit, update } from '../controllers/LoginController.js';

const router = Router();

router.get('/rol', index);
router.get('/login', login);
router.post('/login', auth);
router.get('/register', register);
router.post('/register', storeUser);
router.get('/logout', logout);
router.post('/user/delete', destroy);
router.get('/user/edit/:id', edit);
router.post('/user/edit/:id', update);


export default router;