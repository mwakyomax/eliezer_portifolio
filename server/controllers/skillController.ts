import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Skill from '../models/Skill.js';
import { memoryStore } from '../data/store.js';

export const getSkills = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const skills = await Skill.find().sort({ category: 1, name: 1 });
      return res.json({ success: true, count: skills.length, data: skills });
    }
    return res.json({ success: true, count: memoryStore.skills.length, data: memoryStore.skills });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const created = await Skill.create(req.body);
      return res.status(201).json({ success: true, data: created, message: 'Skill created' });
    }
    const newSkill = { _id: 'skill_' + Date.now(), ...req.body };
    memoryStore.skills.push(newSkill);
    return res.status(201).json({ success: true, data: newSkill, message: 'Skill created' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Skill.findByIdAndUpdate(id, req.body, { new: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Skill updated' });
      }
    }
    const idx = memoryStore.skills.findIndex(s => s._id === id || s.id === id);
    if (idx !== -1) {
      memoryStore.skills[idx] = { ...memoryStore.skills[idx], ...req.body };
      return res.json({ success: true, data: memoryStore.skills[idx], message: 'Skill updated' });
    }
    return res.status(404).json({ success: false, message: 'Skill not found' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Skill.findByIdAndDelete(id);
      }
    }
    memoryStore.skills = memoryStore.skills.filter(s => s._id !== id && s.id !== id);
    return res.json({ success: true, message: 'Skill deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
