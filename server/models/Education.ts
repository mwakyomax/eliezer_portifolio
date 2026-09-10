import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  startYear?: string;
  endYear?: string;
  grade?: string;
  activities?: string;
  description?: string;
  createdAt: Date;
}

const EducationSchema: Schema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  startYear: { type: String, default: '' },
  endYear: { type: String, default: '' },
  grade: { type: String, default: '' },
  activities: { type: String, default: '' },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

EducationSchema.pre('save', function(this: any) {
  if (!this.startDate && this.startYear) this.startDate = this.startYear;
  if (!this.startYear && this.startDate) this.startYear = this.startDate;
  if (!this.endDate && this.endYear) this.endDate = this.endYear;
  if (!this.endYear && this.endDate) this.endYear = this.endDate;
});

export default (mongoose.models.Education as mongoose.Model<IEducation>) || mongoose.model<IEducation>('Education', EducationSchema);
