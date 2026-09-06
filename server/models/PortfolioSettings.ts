import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolioSettings extends Document {
  fullName: string;
  title: string;
  bio: string;
  profileImage: string;
  cvUrl: string;
  statistics: {
    projectsCompleted: number;
    technologiesMastered: number;
    yearsExperience: number;
    certificationsCount: number;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
  contactInfo: {
    location: string;
    phone?: string;
  };
  updatedAt: Date;
}

const PortfolioSettingsSchema: Schema = new Schema({
  fullName: { type: String, default: 'Elieza Mwakyoma' },
  title: { type: String, default: 'Software Developer & Networker | B.Sc. in Computer Science' },
  bio: { 
    type: String, 
    default: 'I hold a Bachelor of Science in Computer Science and work as a software developer and network specialist. I specialize in building full-stack web applications, network architectures, databases, and cybersecurity tools.' 
  },
  profileImage: { type: String, default: '' },
  cvUrl: { type: String, default: '/cv/Elieza_Mwakyoma_CV.pdf' },
  statistics: {
    projectsCompleted: { type: Number, default: 12 },
    technologiesMastered: { type: Number, default: 18 },
    yearsExperience: { type: Number, default: 3 },
    certificationsCount: { type: Number, default: 5 }
  },
  socialLinks: {
    github: { type: String, default: 'https://github.com/eliezamwakyoma' },
    linkedin: { type: String, default: 'https://linkedin.com/in/eliezamwakyoma' },
    email: { type: String, default: 'eliezaeliezer1318@gmail.com' },
    twitter: { type: String, default: 'https://twitter.com/eliezamwakyoma' }
  },
  contactInfo: {
    location: { type: String, default: 'Dar es Salaam, Tanzania' },
    phone: { type: String, default: '+255 629 899 017' }
  },
  updatedAt: { type: Date, default: Date.now }
});

export default (mongoose.models.PortfolioSettings as mongoose.Model<IPortfolioSettings>) || mongoose.model<IPortfolioSettings>('PortfolioSettings', PortfolioSettingsSchema);
