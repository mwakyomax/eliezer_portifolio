import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  description: string;
  createdAt: Date;
}

const EducationSchema: Schema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default (mongoose.models.Education as mongoose.Model<IEducation>) || mongoose.model<IEducation>('Education', EducationSchema);
