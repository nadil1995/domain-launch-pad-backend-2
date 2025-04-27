// src/routes/authRoutes.ts
import express, { Request, Response } from 'express';
import { signup, login } from '../controllers/authController';

const router = express.Router();

// POST request to /signup
router.post('/signup', async (req: Request, res: Response) => {
    try {
        await signup(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// POST request to /login
router.post('/login', async (req: Request, res: Response) => {
    try {
        await login(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

export default router;
