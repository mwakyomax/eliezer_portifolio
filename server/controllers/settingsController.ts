import { Request, Response } from 'express';
import mongoose from 'mongoose';
import PortfolioSettings from '../models/PortfolioSettings.js';
import { memoryStore } from '../data/store.js';

export const getSettings = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let settings = await PortfolioSettings.findOne();
      if (!settings) {
        settings = await PortfolioSettings.create(memoryStore.settings);
      }
      return res.json({ success: true, data: settings });
    }
    return res.json({ success: true, data: memoryStore.settings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let settings = await PortfolioSettings.findOne();
      if (settings) {
        Object.assign(settings, req.body, { updatedAt: new Date() });
        await settings.save();
      } else {
        settings = await PortfolioSettings.create({ ...req.body, updatedAt: new Date() });
      }
      return res.json({ success: true, data: settings, message: 'Settings updated successfully' });
    }

    memoryStore.settings = {
      ...memoryStore.settings,
      ...req.body,
      updatedAt: new Date()
    };
    return res.json({ success: true, data: memoryStore.settings, message: 'Settings updated successfully' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
