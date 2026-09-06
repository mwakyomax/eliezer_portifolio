import express from 'express';
import { createMessage, getMessages, toggleReadStatus, deleteMessage } from '../controllers/messageController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/', protectAdmin, getMessages);
router.put('/:id/read', protectAdmin, toggleReadStatus);
router.delete('/:id', protectAdmin, deleteMessage);

export default router;
