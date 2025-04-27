import { Request, Response } from 'express';
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
export const createDomain = async (req: Request, res: Response) => {
  try {
    const { name, url } = req.body;
    const newDomain = new Domain({ name, url });
    await newDomain.save();
    res.status(201).json(newDomain);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create domain' });
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

