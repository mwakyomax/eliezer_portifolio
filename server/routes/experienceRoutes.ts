import express from 'express';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getExperience);
router.post('/', protectAdmin, createExperience);
router.put('/:id', protectAdmin, updateExperience);
router.delete('/:id', protectAdmin, deleteExperience);

export default router;
