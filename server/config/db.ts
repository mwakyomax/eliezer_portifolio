import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import Service from '../models/Service.js';
import Message from '../models/Message.js';
import PortfolioSettings from '../models/PortfolioSettings.js';
import Article from '../models/Article.js';
import Category from '../models/Category.js';
import { memoryStore } from '../data/store.js';

async function seedInitialData() {
  try {
    // 1. Admin
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = (process.env.ADMIN_EMAIL || 'admin@eliezamwakyoma.com').trim().toLowerCase();
      const rawPassword = process.env.ADMIN_PASSWORD || 'mwakyoma123';
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      await Admin.create({
        email,
        password: hashedPassword,
        name: 'Elieza Mwakyoma',
      });
      console.log(`[Database] Initial admin user seeded in MongoDB: ${email}`);
    }

    // 2. Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0 && memoryStore.projects.length > 0) {
      const cleanProjects = memoryStore.projects.map(({ _id, id, ...rest }) => rest);
      await Project.insertMany(cleanProjects);
      console.log(`[Database] Seeded ${cleanProjects.length} initial projects into MongoDB.`);
    }

    // 3. Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0 && memoryStore.skills.length > 0) {
      const cleanSkills = memoryStore.skills.map(({ _id, id, ...rest }) => rest);
      await Skill.insertMany(cleanSkills);
      console.log(`[Database] Seeded ${cleanSkills.length} skills into MongoDB.`);
    }

    // 4. Experience
    const expCount = await Experience.countDocuments();
    if (expCount === 0 && memoryStore.experience.length > 0) {
      const cleanExp = memoryStore.experience.map(({ _id, id, ...rest }) => rest);
      await Experience.insertMany(cleanExp);
      console.log(`[Database] Seeded ${cleanExp.length} experiences into MongoDB.`);
    }

    // 5. Education
    const eduCount = await Education.countDocuments();
    if (eduCount === 0 && memoryStore.education.length > 0) {
      const cleanEdu = memoryStore.education.map(({ _id, id, ...rest }) => rest);
      await Education.insertMany(cleanEdu);
      console.log(`[Database] Seeded ${cleanEdu.length} educations into MongoDB.`);
    }

    // 6. Certifications
    const certCount = await Certification.countDocuments();
    if (certCount === 0 && memoryStore.certifications.length > 0) {
      const cleanCerts = memoryStore.certifications.map(({ _id, id, ...rest }) => rest);
      await Certification.insertMany(cleanCerts);
      console.log(`[Database] Seeded ${cleanCerts.length} certifications into MongoDB.`);
    }

    // 7. Services
    const servCount = await Service.countDocuments();
    if (servCount === 0 && memoryStore.services.length > 0) {
      const cleanServ = memoryStore.services.map(({ _id, id, ...rest }) => rest);
      await Service.insertMany(cleanServ);
      console.log(`[Database] Seeded ${cleanServ.length} services into MongoDB.`);
    }

    // 8. Messages
    const msgCount = await Message.countDocuments();
    if (msgCount === 0 && memoryStore.messages.length > 0) {
      const cleanMsg = memoryStore.messages.map(({ _id, id, ...rest }) => rest);
      await Message.insertMany(cleanMsg);
      console.log(`[Database] Seeded ${cleanMsg.length} demo inquiries into MongoDB.`);
    }

    // 9. Portfolio Settings
    const settingsCount = await PortfolioSettings.countDocuments();
    if (settingsCount === 0 && memoryStore.settings) {
      const { _id, id, ...cleanSettings } = memoryStore.settings;
      await PortfolioSettings.create(cleanSettings);
      console.log(`[Database] Seeded default portfolio settings into MongoDB.`);
    }

    // 10. Articles
    const articleCount = await Article.countDocuments();
    if (articleCount === 0 && (memoryStore.articles || []).length > 0) {
      const cleanArticles = (memoryStore.articles || []).map(({ _id, id, ...rest }) => rest);
      await Article.insertMany(cleanArticles);
      console.log(`[Database] Seeded ${cleanArticles.length} blog articles into MongoDB.`);
    }

    // 11. Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0 && (memoryStore.categories || []).length > 0) {
      const cleanCategories = (memoryStore.categories || []).map(({ _id, id, ...rest }) => rest);
      await Category.insertMany(cleanCategories);
      console.log(`[Database] Seeded ${cleanCategories.length} domain categories into MongoDB.`);
    }
  } catch (err) {
    console.warn('[Database] Could not complete initial data seeding in MongoDB:', (err as Error).message);
  }
}

export async function connectDB(): Promise<boolean> {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.log('No MONGO_URI set. Using optimized in-memory store engine.');
    return false;
  }

  try {
    mongoose.set('strictQuery', false);
    mongoose.connection.on('error', (err) => {
      console.warn('MongoDB runtime warning (handled):', err.message);
    });
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log('MongoDB Connected successfully');
    await seedInitialData();
    return true;
  } catch (error) {
    console.warn('MongoDB connection failed. Using in-memory store engine fallback:', (error as Error).message);
    return false;
  }
}
