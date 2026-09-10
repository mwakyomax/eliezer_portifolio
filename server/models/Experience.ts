import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  company: string;
  position?: string;
  organization?: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[] | string;
  responsibilities: string[];
  technologies: string[];
  createdAt: Date;
}

const ExperienceSchema: Schema = new Schema({
  title: { type: String, default: '' },
  company: { type: String, default: '' },
  position: { type: String, default: '' },
  organization: { type: String, default: '' },
  location: { type: String, default: 'Dar es Salaam, Tanzania' },
  startDate: { type: String, required: true },
  endDate: { type: String, default: 'Present' },
  current: { type: Boolean, default: false },
  description: { type: Schema.Types.Mixed, default: [] },
  responsibilities: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

// Virtual/pre-save normalize title & company
ExperienceSchema.pre('save', function(this: any) {
  if (!this.title && this.position) this.title = this.position;
  if (!this.position && this.title) this.position = this.title;
  if (!this.company && this.organization) this.company = this.organization;
  if (!this.organization && this.company) this.organization = this.company;
});

export default (mongoose.models.Experience as mongoose.Model<IExperience>) || mongoose.model<IExperience>('Experience', ExperienceSchema);
