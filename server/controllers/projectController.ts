import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { memoryStore } from '../data/store.js';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query: any = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      const projects = await Project.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: projects.length, data: projects });
    }

    // Memory store fallback
    let filtered = [...memoryStore.projects];
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }
    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const project = await Project.findById(id);
        if (project) return res.json({ success: true, data: project });
      }
    }

    const project = memoryStore.projects.find(p => p._id === id || p.id === id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return res.json({ success: true, data: project });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProjectData = {
      ...req.body,
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const created = await Project.create(newProjectData);
      return res.status(201).json({ success: true, data: created, message: 'Project created successfully' });
    }

    const newProj = {
      _id: 'proj_' + Date.now(),
      ...newProjectData
    };
    memoryStore.projects.unshift(newProj);
    return res.status(201).json({ success: true, data: newProj, message: 'Project created successfully' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (updated) return res.json({ success: true, data: updated, message: 'Project updated successfully' });
      }
    }

    const index = memoryStore.projects.findIndex(p => p._id === id || p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    memoryStore.projects[index] = {
      ...memoryStore.projects[index],
      ...req.body
    };

    return res.json({ success: true, data: memoryStore.projects[index], message: 'Project updated successfully' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.isValidObjectId(id)) {
        await Project.findByIdAndDelete(id);
      }
    }

    memoryStore.projects = memoryStore.projects.filter(p => p._id !== id && p.id !== id);
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
