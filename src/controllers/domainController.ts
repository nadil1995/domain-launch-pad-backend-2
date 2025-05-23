import { Request, Response } from 'express';

// Extend the Request interface to include the user property
interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}
import { Domain } from '../models/domainModel';
import mongoose from 'mongoose';

// GET all domains
export const getDomains = async (req: Request, res: Response) => {
  try {
  const domains = await Domain.find();
  res.status(200).json(domains);
} catch (error) {
    res.status(500).json({ message: 'Failed to fetch domains' });
  }
};

// POST a new domain
export const createDomain = async (req: CustomRequest, res: Response) => {
  // console.log('1. Received create domain request');

  try {
  //   console.log('2. Request body:', req.body);
  //   console.log('3. User:', req.user);

    const { name } = req.body;
    const domainName = name;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'User not authenticated or User ID missing' });
    }

    if (!domainName) {
      return res.status(400).json({ success: false, message: 'Domain name is required' });
    }

    const newDomain = new Domain({
      domainName,
      user: new mongoose.Types.ObjectId(userId),
      dnsStatus: 'Pending',
      isVerified: false,
    });

    // console.log('4. Saving domain...');
    await newDomain.save();
    // console.log('5. Domain saved successfully.');

    res.status(201).json({ success: true, data: newDomain });
  } catch (error) {
    console.error('Error at create domain:', error);
    res.status(500).json({ success: false, message: 'Failed to create domain', error: (error as Error).message });
  }
};


// Get a single domain by ID
export const getDomainById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Ensure the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const domain = await Domain.findById(id);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }
    res.status(200).json(domain);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch domain details' });
  }
};

// Verify domain
export const verifyDomain = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const domain = await Domain.findById(id);
    if (!domain) {
      return res.status(404).json({ message: 'Domain not found' });
    }

    // Update only the isVerified field
    domain.isVerified = true;
    await domain.save({ validateModifiedOnly: true }); // Only validate modified fields

    res.status(200).json({ message: 'Domain verified successfully', domain });
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify domain', error });
  }
};

