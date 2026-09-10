import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Article from '../models/Article.js';
import { memoryStore } from '../data/store.js';

export const getArticles = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const articles = await Article.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: articles.length, data: articles });
    }
    return res.json({ success: true, count: (memoryStore as any).articles?.length || 0, data: (memoryStore as any).articles || [] });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const created = await Article.create(req.body);
      return res.status(201).json({ success: true, data: created, message: 'Article created' });
    }
    const newArt = { _id: 'art_' + Date.now(), id: 'art_' + Date.now(), ...req.body };
    if (!(memoryStore as any).articles) (memoryStore as any).articles = [];
    (memoryStore as any).articles.unshift(newArt);
    return res.status(201).json({ success: true, data: newArt, message: 'Article created' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Article.findByIdAndUpdate(id, req.body, { new: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Article updated' });
      }
    }
    const articles = (memoryStore as any).articles || [];
    const idx = articles.findIndex((a: any) => a._id === id || a.id === id);
    if (idx !== -1) {
      articles[idx] = { ...articles[idx], ...req.body };
      return res.json({ success: true, data: articles[idx], message: 'Article updated' });
    }
    return res.status(404).json({ success: false, message: 'Article not found' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Article.findByIdAndDelete(id);
      }
    }
    if ((memoryStore as any).articles) {
      (memoryStore as any).articles = (memoryStore as any).articles.filter((a: any) => a._id !== id && a.id !== id);
    }
    return res.json({ success: true, message: 'Article deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
