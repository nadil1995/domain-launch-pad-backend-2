import express from 'express';
import { getDomains, createDomain, getDomainById, verifyDomain } from '../controllers/domainController';

const router = express.Router();

// Existing routes
router.get('/', (req, res, next) => {
  getDomains(req, res).catch(next);
});

router.post('/', (req, res, next) => {
  createDomain(req, res).catch(next);
});

// New routes
router.get('/:id', (req, res, next) => {
    getDomainById(req, res).catch(next);
  });
  

router.post('/:id/verify', (req, res, next) => {
  verifyDomain(req, res).catch(next);
});

export default router;
