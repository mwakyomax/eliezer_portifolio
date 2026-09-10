import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  readTime: string;
  content: string;
  category: string;
  createdAt: Date;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, default: 'Elieza Mwakyoma' },
  image: { type: String, required: true },
  excerpt: { type: String, required: true },
  readTime: { type: String, default: '5 min read' },
  content: { type: String, required: true },
  category: { type: String, default: 'Engineering' },
  createdAt: { type: Date, default: Date.now }
});

export default (mongoose.models.Article as mongoose.Model<IArticle>) || mongoose.model<IArticle>('Article', ArticleSchema);
