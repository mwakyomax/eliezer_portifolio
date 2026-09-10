import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import { memoryStore } from '../data/store.js';

export const getCategories = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const categories = await Category.find().sort({ createdAt: 1 });
      return res.json({ success: true, count: categories.length, data: categories });
    }
    return res.json({ success: true, count: (memoryStore as any).categories?.length || 0, data: (memoryStore as any).categories || [] });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const created = await Category.create(req.body);
      return res.status(201).json({ success: true, data: created, message: 'Category created' });
    }
    const newCat = { _id: 'cat_' + Date.now(), id: 'cat_' + Date.now(), ...req.body };
    if (!(memoryStore as any).categories) (memoryStore as any).categories = [];
    (memoryStore as any).categories.push(newCat);
    return res.status(201).json({ success: true, data: newCat, message: 'Category created' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Category updated' });
      }
    }
    const categories = (memoryStore as any).categories || [];
    const idx = categories.findIndex((c: any) => c._id === id || c.id === id);
    if (idx !== -1) {
      categories[idx] = { ...categories[idx], ...req.body };
      return res.json({ success: true, data: categories[idx], message: 'Category updated' });
    }
    return res.status(404).json({ success: false, message: 'Category not found' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Category.findByIdAndDelete(id);
      }
    }
    if ((memoryStore as any).categories) {
      (memoryStore as any).categories = (memoryStore as any).categories.filter((c: any) => c._id !== id && c.id !== id);
    }
    return res.json({ success: true, message: 'Category deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
