import axios from 'axios';
import { 
  Project, 
  Skill, 
  Experience, 
  Education, 
  Certification, 
  Service, 
  Message, 
  PortfolioSettings 
} from '../types';

const rawBaseUrl = import.meta.env.VITE_API_URL;
const API_BASE = rawBaseUrl ? `${rawBaseUrl.replace(/\/$/, '')}/api` : '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header token if logged in as admin
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginAdmin = (data: { email: string; password: string }) => api.post('/auth/login', data);
export const verifyAdminToken = () => api.get('/auth/me');

// Projects
export const fetchProjects = (category?: string) => 
  api.get<{ success: boolean; count: number; data: Project[] }>(`/projects${category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''}`);
export const fetchProjectById = (id: string) => api.get<{ success: boolean; data: Project }>(`/projects/${id}`);
export const createProject = (data: Partial<Project>) => api.post<{ success: boolean; data: Project; message: string }>('/projects', data);
export const updateProject = (id: string, data: Partial<Project>) => api.put<{ success: boolean; data: Project; message: string }>(`/projects/${id}`, data);
export const deleteProject = (id: string) => api.delete<{ success: boolean; message: string }>(`/projects/${id}`);

// Skills
export const fetchSkills = () => api.get<{ success: boolean; count: number; data: Skill[] }>('/skills');
export const createSkill = (data: Partial<Skill>) => api.post<{ success: boolean; data: Skill; message: string }>('/skills', data);
export const updateSkill = (id: string, data: Partial<Skill>) => api.put<{ success: boolean; data: Skill; message: string }>(`/skills/${id}`, data);
export const deleteSkill = (id: string) => api.delete<{ success: boolean; message: string }>(`/skills/${id}`);

// Experience
export const fetchExperience = () => api.get<{ success: boolean; count: number; data: Experience[] }>('/experience');
export const createExperience = (data: Partial<Experience>) => api.post<{ success: boolean; data: Experience; message: string }>('/experience', data);
export const updateExperience = (id: string, data: Partial<Experience>) => api.put<{ success: boolean; data: Experience; message: string }>(`/experience/${id}`, data);
export const deleteExperience = (id: string) => api.delete<{ success: boolean; message: string }>(`/experience/${id}`);

// Education
export const fetchEducation = () => api.get<{ success: boolean; count: number; data: Education[] }>('/education');
export const createEducation = (data: Partial<Education>) => api.post<{ success: boolean; data: Education; message: string }>('/education', data);
export const updateEducation = (id: string, data: Partial<Education>) => api.put<{ success: boolean; data: Education; message: string }>(`/education/${id}`, data);
export const deleteEducation = (id: string) => api.delete<{ success: boolean; message: string }>(`/education/${id}`);

// Certifications
export const fetchCertifications = () => api.get<{ success: boolean; count: number; data: Certification[] }>('/certifications');
export const createCertification = (data: Partial<Certification>) => api.post<{ success: boolean; data: Certification; message: string }>('/certifications', data);
export const updateCertification = (id: string, data: Partial<Certification>) => api.put<{ success: boolean; data: Certification; message: string }>(`/certifications/${id}`, data);
export const deleteCertification = (id: string) => api.delete<{ success: boolean; message: string }>(`/certifications/${id}`);

// Services
export const fetchServices = () => api.get<{ success: boolean; count: number; data: Service[] }>('/services');
export const createService = (data: Partial<Service>) => api.post<{ success: boolean; data: Service; message: string }>('/services', data);
export const updateService = (id: string, data: Partial<Service>) => api.put<{ success: boolean; data: Service; message: string }>(`/services/${id}`, data);
export const deleteService = (id: string) => api.delete<{ success: boolean; message: string }>(`/services/${id}`);

// Messages
export const sendMessage = (data: { name: string; email: string; subject: string; message: string }) => api.post<{ success: boolean; message: string }>('/messages', data);
export const fetchMessages = () => api.get<{ success: boolean; count: number; data: Message[] }>('/messages');
export const toggleMessageRead = (id: string, isRead: boolean) => api.put<{ success: boolean; data: Message }>(`/messages/${id}/read`, { isRead });
export const deleteMessage = (id: string) => api.delete<{ success: boolean; message: string }>(`/messages/${id}`);

// Settings
export const fetchSettings = () => api.get<{ success: boolean; data: PortfolioSettings }>('/settings');
export const updateSettings = (data: Partial<PortfolioSettings>) => api.put<{ success: boolean; data: PortfolioSettings; message: string }>('/settings', data);

export default api;
