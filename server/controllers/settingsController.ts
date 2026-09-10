import { Request, Response } from 'express';
import mongoose from 'mongoose';
import PortfolioSettings from '../models/PortfolioSettings.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import Service from '../models/Service.js';
import Message from '../models/Message.js';
import Article from '../models/Article.js';
import Category from '../models/Category.js';
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
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    if (mongoose.connection.readyState === 1) {
      let settings = await PortfolioSettings.findOne();
      if (settings) {
        Object.assign(settings, updateData, { updatedAt: new Date() });
        await settings.save();
      } else {
        settings = await PortfolioSettings.create({ ...updateData, updatedAt: new Date() });
      }
      return res.json({ success: true, data: settings, message: 'Settings updated successfully' });
    }

    memoryStore.settings = {
      ...memoryStore.settings,
      ...updateData,
      updatedAt: new Date()
    };
    return res.json({ success: true, data: memoryStore.settings, message: 'Settings updated successfully' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const seedDatabase = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      // Clear and populate with full portfolio dataset
      await Promise.all([
        Project.deleteMany({}),
        Skill.deleteMany({}),
        Experience.deleteMany({}),
        Education.deleteMany({}),
        Certification.deleteMany({}),
        Service.deleteMany({}),
        Message.deleteMany({}),
        PortfolioSettings.deleteMany({}),
        Article.deleteMany({}),
        Category.deleteMany({})
      ]);

      const cleanProjects = memoryStore.projects.map(({ _id, id, ...rest }) => rest);
      const cleanSkills = memoryStore.skills.map(({ _id, id, ...rest }) => rest);
      const cleanExp = memoryStore.experience.map(({ _id, id, ...rest }) => rest);
      const cleanEdu = memoryStore.education.map(({ _id, id, ...rest }) => rest);
      const cleanCerts = memoryStore.certifications.map(({ _id, id, ...rest }) => rest);
      const cleanServ = memoryStore.services.map(({ _id, id, ...rest }) => rest);
      const cleanMsg = memoryStore.messages.map(({ _id, id, ...rest }) => rest);
      const cleanArticles = (memoryStore.articles || []).map(({ _id, id, ...rest }) => rest);
      const cleanCategories = (memoryStore.categories || []).map(({ _id, id, ...rest }) => rest);
      const { _id, id, ...cleanSettings } = memoryStore.settings;

      await Promise.all([
        Project.insertMany(cleanProjects),
        Skill.insertMany(cleanSkills),
        Experience.insertMany(cleanExp),
        Education.insertMany(cleanEdu),
        Certification.insertMany(cleanCerts),
        Service.insertMany(cleanServ),
        Message.insertMany(cleanMsg),
        Article.insertMany(cleanArticles),
        Category.insertMany(cleanCategories),
        PortfolioSettings.create(cleanSettings)
      ]);

      return res.json({ 
        success: true, 
        message: 'Successfully seeded entire portfolio dataset into MongoDB Atlas!',
        counts: {
          projects: cleanProjects.length,
          skills: cleanSkills.length,
          experience: cleanExp.length,
          education: cleanEdu.length,
          certifications: cleanCerts.length,
          services: cleanServ.length,
          messages: cleanMsg.length,
          articles: cleanArticles.length,
          categories: cleanCategories.length
        }
      });
    }

    return res.json({
      success: true,
      message: 'Running in in-memory mode. Dataset already initialized.',
      counts: {
        projects: memoryStore.projects.length,
        skills: memoryStore.skills.length,
        experience: memoryStore.experience.length,
        education: memoryStore.education.length,
        certifications: memoryStore.certifications.length,
        services: memoryStore.services.length,
        messages: memoryStore.messages.length,
        articles: (memoryStore.articles || []).length,
        categories: (memoryStore.categories || []).length
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

