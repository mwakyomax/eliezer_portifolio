import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string;
  icon?: string;
  level?: number; // optional proficiency percentage 0-100
  proficiency?: number;
  createdAt: Date;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
  },
  icon: { type: String, default: 'code' },
  level: { type: Number, default: 85 },
  proficiency: { type: Number, default: 85 },
  createdAt: { type: Date, default: Date.now }
});

export default (mongoose.models.Skill as mongoose.Model<ISkill>) || mongoose.model<ISkill>('Skill', SkillSchema);
