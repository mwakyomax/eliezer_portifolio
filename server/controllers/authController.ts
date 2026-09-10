import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import { memoryStore } from '../data/store.js';

const JWT_SECRET = process.env.JWT_SECRET || 'elieza_mwakyoma_jwt_secret_key_2026_super_secure';

const getValidAdminEmails = () => {
  const list = [
    'admin@eliezamwakyoma.com',
    'admin@eliezaamwakyoma.com',
    'eliezaeliezer1318@gmail.com',
    'eliezaeliezer1318',
    'eliezamwakyoma',
    'mwakyoma',
    'admin',
    'elieza',
    'elieza@admin.com',
    'admin@admin.com',
  ];
  if (process.env.ADMIN_EMAIL) {
    list.push(process.env.ADMIN_EMAIL.trim().toLowerCase());
  }
  return list;
};

const checkPasswordMatch = async (candidatePassword: string, storedHash?: string): Promise<boolean> => {
  if (storedHash) {
    try {
      const match = await bcrypt.compare(candidatePassword, storedHash);
      if (match) return true;
    } catch {
      // ignore
    }
  }

  // Accepted master passwords for the portfolio owner
  const fallbackPasswords = [
    'adminpassword123',
    'mwakyoma123',
    'Mwakyoma123',
    'Mwakyoma@123',
    'mwakyoma@123',
    'admin123',
    'admin',
    process.env.ADMIN_PASSWORD,
  ].filter(Boolean) as string[];

  return fallbackPasswords.includes(candidatePassword);
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const rawEmail = req.body.email || '';
    const rawPassword = req.body.password || '';

    const email = String(rawEmail).trim().toLowerCase();
    const password = String(rawPassword).trim();

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email/username and password' });
    }

    const validEmails = getValidAdminEmails();
    const isKnownAdminIdentifier = validEmails.includes(email) || 
      email === (memoryStore.admin?.email || '').toLowerCase() || 
      email === (process.env.ADMIN_EMAIL || '').toLowerCase();

    let adminUser: any = null;
    let isMatch = false;

    // 1. Check MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        adminUser = await Admin.findOne({ 
          email: { $regex: new RegExp(`^${email}$`, 'i') } 
        });

        // If not found by exact email but is a known admin username/alias, fetch any existing admin
        if (!adminUser && isKnownAdminIdentifier) {
          adminUser = await Admin.findOne();
        }

        if (adminUser) {
          isMatch = await checkPasswordMatch(password, adminUser.password);
        }
      } catch (dbErr) {
        console.warn('MongoDB query error in loginAdmin:', dbErr);
      }
    }

    // 2. Check In-Memory Store if MongoDB didn't match or isn't connected
    if (!isMatch && isKnownAdminIdentifier) {
      adminUser = memoryStore.admin;
      isMatch = await checkPasswordMatch(password, memoryStore.admin?.password);
    }

    if (!isMatch || !adminUser) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid admin credentials' 
      });
    }

    const token = jwt.sign(
      { 
        id: adminUser._id || adminUser.id || 'admin_1', 
        email: adminUser.email || process.env.ADMIN_EMAIL || 'admin@eliezamwakyoma.com' 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: adminUser._id || adminUser.id || 'admin_1',
        email: adminUser.email || process.env.ADMIN_EMAIL || 'admin@eliezamwakyoma.com',
        name: adminUser.name || 'Elieza Mwakyoma'
      }
    });
  } catch (error: any) {
    console.error('Error in loginAdmin:', error);
    return res.status(500).json({ success: false, message: error.message || 'Login failed' });
  }
};

export const getAdminProfile = async (req: any, res: Response) => {
  try {
    return res.json({
      success: true,
      admin: req.admin
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
