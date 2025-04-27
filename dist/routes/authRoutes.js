import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';  // Your User model

// Signup controller
export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send the response with the token and user info
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
