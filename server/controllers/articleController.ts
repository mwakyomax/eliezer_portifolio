import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Article from '../models/Article.js';
import { memoryStore, saveStoreToDisk } from '../data/store.js';
import { saveBase64Image } from '../utils/fileStorage.js';

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
    const articleData = { ...req.body };
    if (articleData.image && typeof articleData.image === 'string') {
      articleData.image = saveBase64Image(articleData.image, 'article');
    }

    const newArt = { _id: 'art_' + Date.now(), id: 'art_' + Date.now(), ...articleData };
    if (!(memoryStore as any).articles) (memoryStore as any).articles = [];
    (memoryStore as any).articles.unshift(newArt);
    saveStoreToDisk();

    if (mongoose.connection.readyState === 1) {
      const created = await Article.create(articleData);
      return res.status(201).json({ success: true, data: created, message: 'Article created' });
    }

    return res.status(201).json({ success: true, data: newArt, message: 'Article created' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (updateData.image && typeof updateData.image === 'string') {
      updateData.image = saveBase64Image(updateData.image, 'article');
    }

    const articles = (memoryStore as any).articles || [];
    const idx = articles.findIndex((a: any) => a._id === id || a.id === id);
    if (idx !== -1) {
      articles[idx] = { ...articles[idx], ...updateData };
      saveStoreToDisk();
    }

    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Article.findByIdAndUpdate(id, updateData, { new: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Article updated' });
      }
    }

    if (idx !== -1) {
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

    if ((memoryStore as any).articles) {
      (memoryStore as any).articles = (memoryStore as any).articles.filter((a: any) => a._id !== id && a.id !== id);
      saveStoreToDisk();
    }

    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Article.findByIdAndDelete(id);
      }
    }

    return res.json({ success: true, message: 'Article deleted' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
