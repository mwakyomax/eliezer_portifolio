import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  problemStatement?: string;
  solution?: string;
  features?: string[];
  screenshots?: string[];
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    default: 'Web Development'
  },
  technologies: { type: [String], default: [] },
  image: { type: String, required: true },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  problemStatement: { type: String, default: '' },
  solution: { type: String, default: '' },
  features: { type: [String], default: [] },
  screenshots: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default (mongoose.models.Project as mongoose.Model<IProject>) || mongoose.model<IProject>('Project', ProjectSchema);
