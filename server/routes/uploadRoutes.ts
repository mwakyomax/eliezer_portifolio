import express, { Request, Response } from 'express';
import { saveBase64Image } from '../utils/fileStorage.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectAdmin, (req: Request, res: Response) => {
  try {
    const { image, prefix = 'img' } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    const savedUrl = saveBase64Image(image, prefix);
    return res.json({
      success: true,
      url: savedUrl,
      message: 'Image uploaded and saved to disk successfully',
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Upload failed' });
  }
});

export default router;
