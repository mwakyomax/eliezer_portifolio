export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'Phone' | 'Cloth' | 'Gaming' | 'Bluetooth' | 'Book' | 'Kitchen' | 'Other' | string;
  gender?: 'Men' | 'Women' | 'Unisex';
  origin: string;
  price: number;
  originalPrice?: number;
  rating: number;
  soldCount: number;
  image: string;
  images?: string[];
  description: string;
  isSpecialOffer?: boolean;
  isFeatured?: boolean;
  stock?: number;
  colors?: string[];
  sizes?: string[];
  specs?: Record<string, string>;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  productCount: string;
  iconName: 'Phone' | 'Cloth' | 'Gaming' | 'Bluetooth' | 'Book' | 'Kitchen';
  color?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  readTime: string;
  content: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

// Supplemental Types
export interface AdminUser {
  id: string;
  username: string;
  token?: string;
}

export interface PortfolioSettings {
  _id?: string;
  fullName?: string;
  title?: string;
  tagline?: string;
  bio?: string;
  aboutMe?: string;
  profileImage?: string;
  cvUrl?: string;
  location?: string;
  phone?: string;
  email?: string;
  stats?: {
    yearsOfExperience?: number;
    projectsCompleted?: number;
    satisfiedClients?: number;
    certificationsCount?: number;
    technologiesMastered?: number;
    yearsExperience?: number;
  };
  statistics?: {
    projectsCompleted?: number;
    technologiesMastered?: number;
    yearsExperience?: number;
    certificationsCount?: number;
  };
  contactInfo?: {
    location?: string;
    phone?: string;
  };
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
    twitter?: string;
  };
}

export interface Project {
  _id?: string;
  id?: string;
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
}

export interface Skill {
  _id?: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

export interface Experience {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies?: string[];
}

export interface Education {
  _id?: string;
  degree: string;
  institution: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  activities?: string;
}

export interface Certification {
  _id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialUrl?: string;
  image?: string;
}

export interface Service {
  _id?: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}
