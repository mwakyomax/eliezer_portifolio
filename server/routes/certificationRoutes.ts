import express from 'express';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../controllers/certificationController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCertifications);
router.post('/', protectAdmin, createCertification);
router.put('/:id', protectAdmin, updateCertification);
router.delete('/:id', protectAdmin, deleteCertification);

export default router;
