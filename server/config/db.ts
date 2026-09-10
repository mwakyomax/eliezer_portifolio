import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

async function seedInitialAdmin() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = (process.env.ADMIN_EMAIL || 'admin@eliezamwakyoma.com').trim().toLowerCase();
      const rawPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      await Admin.create({
        email,
        password: hashedPassword,
        name: 'Elieza Mwakyoma',
      });
      console.log(`[Database] Initial admin user seeded in MongoDB: ${email}`);
    }
  } catch (err) {
    console.warn('[Database] Could not seed initial admin in MongoDB:', (err as Error).message);
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
    await seedInitialAdmin();
    return true;
  } catch (error) {
    console.warn('MongoDB connection failed. Using in-memory store engine fallback:', (error as Error).message);
    return false;
  }
}
