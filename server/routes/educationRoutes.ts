import express from 'express';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../controllers/educationController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getEducation);
router.post('/', protectAdmin, createEducation);
router.put('/:id', protectAdmin, updateEducation);
router.delete('/:id', protectAdmin, deleteEducation);

export default router;
