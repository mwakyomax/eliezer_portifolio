import express from 'express';
import { getSettings, updateSettings, seedDatabase } from '../controllers/settingsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protectAdmin, updateSettings);
router.post('/seed', protectAdmin, seedDatabase);

export default router;

