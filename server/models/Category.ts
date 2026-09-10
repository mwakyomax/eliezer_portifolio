import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  itemCount: string;
  iconName: string;
  description: string;
  createdAt: Date;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  itemCount: { type: String, default: '5+ Projects' },
  iconName: { type: String, default: 'Code' },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default (mongoose.models.Category as mongoose.Model<ICategory>) || mongoose.model<ICategory>('Category', CategorySchema);
