import express from 'express';
import { register, login, verifyToken } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get("/verify-token", verifyToken);
export default router;
