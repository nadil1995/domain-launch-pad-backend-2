import express from 'express';

const router = express.Router();

// Example route
router.get('/profile', (req, res) => {
  res.send('User routes working!');
});

export const userRoutes = router; // Exporting the renamed router
