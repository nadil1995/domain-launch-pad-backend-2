// src/routes/authRoutes.ts
import express, { Request, Response } from 'express';
import { signup, login } from '../controllers/authController';

const router = express.Router();

// POST request to /signup
router.post('/signup', async (req: Request, res: Response) => {
    await signup(req, res);
});

// POST request to /login
router.post('/login', async (req: Request, res: Response) => {
    await login(req, res);
});

export default router;
