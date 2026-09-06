import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import { memoryStore } from '../data/store.js';

export const getExperience = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const exp = await Experience.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: exp.length, data: exp });
    }
    return res.json({ success: true, count: memoryStore.experience.length, data: memoryStore.experience });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const created = await Experience.create(req.body);
      return res.status(201).json({ success: true, data: created, message: 'Experience created' });
    }
    const newExp = { _id: 'exp_' + Date.now(), ...req.body };
    memoryStore.experience.unshift(newExp);
    return res.status(201).json({ success: true, data: newExp, message: 'Experience created' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Experience.findByIdAndUpdate(id, req.body, { new: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Experience updated' });
      }
    }
    const idx = memoryStore.experience.findIndex(e => e._id === id || e.id === id);
    if (idx !== -1) {
      memoryStore.experience[idx] = { ...memoryStore.experience[idx], ...req.body };
      return res.json({ success: true, data: memoryStore.experience[idx], message: 'Experience updated' });
    }
    return res.status(404).json({ success: false, message: 'Experience not found' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Experience.findByIdAndDelete(id);
      }
    }
    memoryStore.experience = memoryStore.experience.filter(e => e._id !== id && e.id !== id);
    return res.json({ success: true, message: 'Experience deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
