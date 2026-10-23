import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Certification from '../models/Certification.js';
import { memoryStore, saveStoreToDisk } from '../data/store.js';
import { saveBase64Image } from '../utils/fileStorage.js';

export const getCertifications = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const certs = await Certification.find().sort({ issueDate: -1 });
      return res.json({ success: true, count: certs.length, data: certs });
    }
    return res.json({ success: true, count: memoryStore.certifications.length, data: memoryStore.certifications });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  try {
    const certData = { ...req.body };
    if (certData.image && typeof certData.image === 'string') {
      certData.image = saveBase64Image(certData.image, 'cert');
    }

    if (mongoose.connection.readyState === 1) {
      const created = await Certification.create(certData);
      return res.status(201).json({ success: true, data: created, message: 'Certification created' });
    }
    const newCert = { _id: 'cert_' + Date.now(), ...certData };
    memoryStore.certifications.unshift(newCert);
    saveStoreToDisk();
    return res.status(201).json({ success: true, data: newCert, message: 'Certification created' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const certData = { ...req.body };
    if (certData.image && typeof certData.image === 'string') {
      certData.image = saveBase64Image(certData.image, 'cert');
    }

    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Certification.findByIdAndUpdate(id, certData, { new: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Certification updated' });
      }
    }
    const idx = memoryStore.certifications.findIndex(c => c._id === id || c.id === id);
    if (idx !== -1) {
      memoryStore.certifications[idx] = { ...memoryStore.certifications[idx], ...certData };
      saveStoreToDisk();
      return res.json({ success: true, data: memoryStore.certifications[idx], message: 'Certification updated' });
    }
    return res.status(404).json({ success: false, message: 'Certification not found' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Certification.findByIdAndDelete(id);
      }
    }
    memoryStore.certifications = memoryStore.certifications.filter(c => c._id !== id && c.id !== id);
    saveStoreToDisk();
    return res.json({ success: true, message: 'Certification deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
