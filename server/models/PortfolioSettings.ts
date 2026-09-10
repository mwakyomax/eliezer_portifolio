import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolioSettings extends Document {
  fullName: string;
  title: string;
  tagline: string;
  bio: string;
  aboutMe?: string;
  profileImage: string;
  cvUrl: string;
  location: string;
  email: string;
  phone: string;
  stats: {
    projectsCompleted: number;
    technologiesMastered: number;
    yearsExperience: number;
    certificationsCount: number;
    rating?: number;
    satisfiedUsers?: string;
  };
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
  tagline: { type: String, default: 'Building digital solutions and scalable software for everyone 🟡' },
  bio: { 
    type: String, 
    default: 'I hold a Bachelor of Science in Computer Science and work as a software developer and network specialist based in Dar es Salaam, Tanzania. I specialize in building responsive full-stack web applications, native Android tools, network infrastructure configurations, and resilient software systems that solve real-world problems.' 
  },
  aboutMe: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  cvUrl: { type: String, default: '/cv/Elieza_Mwakyoma_CV.pdf' },
  location: { type: String, default: 'Dar es Salaam, Tanzania' },
  email: { type: String, default: 'eliezaeliezer1318@gmail.com' },
  phone: { type: String, default: '+255 629 899 017' },
  stats: {
    projectsCompleted: { type: Number, default: 12 },
    technologiesMastered: { type: Number, default: 18 },
    yearsExperience: { type: Number, default: 3 },
    certificationsCount: { type: Number, default: 5 },
    rating: { type: Number, default: 4.9 },
    satisfiedUsers: { type: String, default: '2.5k+' }
  },
  statistics: {
    projectsCompleted: { type: Number, default: 12 },
    technologiesMastered: { type: Number, default: 18 },
    yearsExperience: { type: Number, default: 3 },
    certificationsCount: { type: Number, default: 5 }
  },
  socialLinks: {
    github: { type: String, default: 'https://github.com/mwakyomax' },
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
