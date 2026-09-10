import express from 'express';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getArticles);
router.post('/', protectAdmin, createArticle);
router.put('/:id', protectAdmin, updateArticle);
router.delete('/:id', protectAdmin, deleteArticle);

export default router;
