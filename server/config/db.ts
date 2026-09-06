import mongoose from 'mongoose';

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
    return true;
  } catch (error) {
    console.warn('MongoDB connection failed. Using in-memory store engine fallback:', (error as Error).message);
    return false;
  }
}
