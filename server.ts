import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express'; // ✅ Import types here
import cors from 'cors';

import domainRoutes from './src/routes/domainRoutes'; 
import authRoutes from './src/routes/authRoutes'; 
import userRoutes from './src/routes/userRoutes'; 
import profileRoutes from './src/routes/profileRoutes'; 

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api/domains', domainRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI as string;

if (!mongoURI) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

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
  console.error('Global Error Handler:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});