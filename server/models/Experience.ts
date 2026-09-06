import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  position: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  createdAt: Date;
}

const ExperienceSchema: Schema = new Schema({
  position: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, default: '' },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default (mongoose.models.Experience as mongoose.Model<IExperience>) || mongoose.model<IExperience>('Experience', ExperienceSchema);
