import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Service from '../models/Service.js';
import { memoryStore } from '../data/store.js';

export const getServices = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const services = await Service.find().sort({ createdAt: 1 });
      return res.json({ success: true, count: services.length, data: services });
    }
    return res.json({ success: true, count: memoryStore.services.length, data: memoryStore.services });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const created = await Service.create(req.body);
      return res.status(201).json({ success: true, data: created, message: 'Service created' });
    }
    const newServ = { _id: 'serv_' + Date.now(), ...req.body };
    memoryStore.services.push(newServ);
    return res.status(201).json({ success: true, data: newServ, message: 'Service created' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Service updated' });
      }
    }
    const idx = memoryStore.services.findIndex(s => s._id === id || s.id === id);
    if (idx !== -1) {
      memoryStore.services[idx] = { ...memoryStore.services[idx], ...req.body };
      return res.json({ success: true, data: memoryStore.services[idx], message: 'Service updated' });
    }
    return res.status(404).json({ success: false, message: 'Service not found' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Service.findByIdAndDelete(id);
      }
    }
    memoryStore.services = memoryStore.services.filter(s => s._id !== id && s.id !== id);
    return res.json({ success: true, message: 'Service deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
