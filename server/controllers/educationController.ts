import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Education from '../models/Education.js';
import { memoryStore } from '../data/store.js';

export const getEducation = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const edu = await Education.find().sort({ startYear: -1 });
      return res.json({ success: true, count: edu.length, data: edu });
    }
    return res.json({ success: true, count: memoryStore.education.length, data: memoryStore.education });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const created = await Education.create(req.body);
      return res.status(201).json({ success: true, data: created, message: 'Education created' });
    }
    const newEdu = { _id: 'edu_' + Date.now(), ...req.body };
    memoryStore.education.unshift(newEdu);
    return res.status(201).json({ success: true, data: newEdu, message: 'Education created' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Education.findByIdAndUpdate(id, req.body, { new: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Education updated' });
      }
    }
    const idx = memoryStore.education.findIndex(e => e._id === id || e.id === id);
    if (idx !== -1) {
      memoryStore.education[idx] = { ...memoryStore.education[idx], ...req.body };
      return res.json({ success: true, data: memoryStore.education[idx], message: 'Education updated' });
    }
    return res.status(404).json({ success: false, message: 'Education record not found' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Education.findByIdAndDelete(id);
      }
    }
    memoryStore.education = memoryStore.education.filter(e => e._id !== id && e.id !== id);
    return res.json({ success: true, message: 'Education record deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
