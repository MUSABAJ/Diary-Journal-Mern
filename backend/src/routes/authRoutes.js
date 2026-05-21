import express from 'express';
import {signup, login, logout, changePassword} from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/sign-up', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/change-password', protect,changePassword);

export default router;