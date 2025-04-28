import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import domainRoutes from './src/routes/domainRoutes';
import authRoutes from './src/routes/authRoutes';
import { userRoutes } from './src/routes/userRoutes';
import { Request, Response, NextFunction } from 'express';
import profileRoutes from './src/routes/profileRoutes';





dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors({
  origin: 'http://localhost:8080', // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/domains', domainRoutes);
app.use('/api/auth', authRoutes); // Mount the auth routes
app.use('/api/users', userRoutes); // Mount the user routes

// MongoDB Connection
const mongoURI = process.env.MONGO_URI as string;

if (!mongoURI) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1); // Exit if MONGO_URI is not defined
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  }).catch(err => {
    console.error('Error while closing MongoDB connection:', err);
    process.exit(1);
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.use('/api/profile', profileRoutes);