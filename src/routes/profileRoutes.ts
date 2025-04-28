import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Protected route example
router.get('/', authMiddleware, (req, res) => {
  const user = (req as any).user;
  res.json({ message: `Welcome, user ${user.id}` });
});

export default router;
