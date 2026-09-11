import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, Code2, Briefcase, GraduationCap, 
  Award, Layers, Mail, Settings, LogOut, Plus, Trash2, Edit, 
  ExternalLink, Github, CheckCircle2, AlertCircle, Search, 
  Sparkles, Shield, User, Globe, ArrowUpRight, Check, X,
  FileText, Smartphone, Database, Server, Network, Wifi,
  Phone, MapPin, Eye, RefreshCw, Send, MessageSquare,
  Image as ImageIcon, Upload, Camera, RotateCcw, UploadCloud,
  FileImage, CheckCircle, ArrowRight, Droplets, Sliders, Wind, Moon, Sun
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { useLiquidNav } from '../../context/LiquidNavContext';
import { processGalleryImage } from '../../utils/imageUtils';
import defaultHeroPortrait from '../../assets/images/elieza_official_portrait_1788279969619.jpg';
import { SEO } from '../../components/SEO';
import { 
  DEFAULT_PROFILE_IMAGE,
  PROJECTS_DATA,
  SKILLS_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  SERVICES_DATA,
  PORTFOLIO_SETTINGS
} from '../../data/portfolioData';
import { 
  fetchProjects, createProject, updateProject, deleteProject,
  fetchSkills, createSkill, updateSkill, deleteSkill,
  fetchExperience, createExperience, updateExperience, deleteExperience,
  fetchEducation, createEducation, updateEducation, deleteEducation,
  fetchCertifications, createCertification, updateCertification, deleteCertification,
  fetchServices, createService, updateService, deleteService,
  fetchMessages, toggleMessageRead, deleteMessage,
  fetchSettings, updateSettings, seedDatabase
} from '../../services/api';
import { Project, Skill, Experience, Education, Certification, Service, Message, PortfolioSettings } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAuth();
  const { updateSettingsState } = usePortfolio();
  const { config: liquidConfig, updateConfig: updateLiquidConfig, setIsCustomizerOpen } = useLiquidNav();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Datasets
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [settings, setSettings] = useState<PortfolioSettings | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');

  // Filter & Search states
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('All');
  const [projectSearch, setProjectSearch] = useState<string>('');

  // Gallery and Image Upload States
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);
  const certImageInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingProfile, setIsDraggingProfile] = useState<boolean>(false);
  const [imageMeta, setImageMeta] = useState<{ sizeKb?: number; width?: number; height?: number; name?: string } | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);

  // Modal / Form state
  const [modalType, setModalType] = useState<string | null>(null); // 'project' | 'skill' | 'experience' | 'education' | 'certification' | 'service'
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [tempTechInput, setTempTechInput] = useState<string>('');
  const [tempDescInput, setTempDescInput] = useState<string>('');
  const [tempFeatureInput, setTempFeatureInput] = useState<string>('');

  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [pRes, sRes, eRes, edRes, cRes, servRes, mRes, setRes] = await Promise.all([
        fetchProjects().catch(() => null),
        fetchSkills().catch(() => null),
        fetchExperience().catch(() => null),
        fetchEducation().catch(() => null),
        fetchCertifications().catch(() => null),
        fetchServices().catch(() => null),
        fetchMessages().catch(() => null),
        fetchSettings().catch(() => null),
      ]);

      const loadedProjects = pRes?.data?.data && pRes.data.data.length > 0 ? pRes.data.data : PROJECTS_DATA;
      const loadedSkills = sRes?.data?.data && sRes.data.data.length > 0 ? sRes.data.data : SKILLS_DATA;
      const loadedExp = eRes?.data?.data && eRes.data.data.length > 0 ? eRes.data.data : EXPERIENCE_DATA;
      const loadedEdu = edRes?.data?.data && edRes.data.data.length > 0 ? edRes.data.data : EDUCATION_DATA;
      const loadedCerts = cRes?.data?.data && cRes.data.data.length > 0 ? cRes.data.data : CERTIFICATIONS_DATA;
      
      setProjects(loadedProjects);
      setSkills(loadedSkills);
      setExperience(loadedExp);
      setEducation(loadedEdu);
      setCertifications(loadedCerts);

      const loadedServices = servRes?.data?.data && servRes.data.data.length > 0 ? servRes.data.data : SERVICES_DATA;
      setServices(loadedServices);

      if (mRes?.data?.data) {
        setMessages(mRes.data.data);
      }
      if (setRes?.data?.data) {
        setSettings(setRes.data.data);
      } else {
        setSettings(PORTFOLIO_SETTINGS as any);
      }
    } catch (err) {
      console.error('Error loading admin datasets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    try {
      setIsSeeding(true);
      notify('Populating database with full portfolio dataset...');
      const res = await seedDatabase();
      if (res.data.success) {
        const counts = res.data.counts;
        const countInfo = counts
          ? ` (${counts.projects} projects, ${counts.skills} skills, ${counts.experience} experiences, ${counts.articles || 3} articles, ${counts.categories || 6} categories)`
          : '';
        notify(`Database successfully synced & populated!${countInfo}`);
        await loadAllData();
      } else {
        notify(res.data.message || 'Failed to sync database', 'error');
      }
    } catch (err: any) {
      notify(err.response?.data?.message || err.message || 'Error seeding database', 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  const notify = (msg: string, type: 'success' | 'error' = 'success') => {
    setStatusMsg(msg);
    setStatusType(type);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  // --- PROJECT HANDLERS ---
  const handleOpenNewProject = () => {
    setIsNew(true);
    setEditingItem({
      title: '',
      description: '',
      category: 'Web Development',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      githubUrl: 'https://github.com/eliezamwakyoma',
      liveUrl: '',
      featured: true,
      problemStatement: '',
      solution: ''
    });
    setTempTechInput('');
    setModalType('project');
  };

  const handleEditProject = (p: Project) => {
    setIsNew(false);
    setEditingItem({ ...p, technologies: Array.isArray(p.technologies) ? [...p.technologies] : [] });
    setTempTechInput('');
    setModalType('project');
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        const res = await createProject(editingItem);
        if (res.data.success) {
          setProjects([res.data.data, ...projects]);
          notify('Project published successfully!');
        }
      } else {
        const id = editingItem._id || editingItem.id;
        const res = await updateProject(id, editingItem);
        if (res.data.success) {
          setProjects(projects.map((p) => (p._id === id || p.id === id ? res.data.data : p)));
          notify('Project updated successfully!');
        }
      }
      setModalType(null);
      setEditingItem(null);
    } catch (err: any) {
      notify(err.response?.data?.message || 'Error saving project', 'error');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteProject(id);
        setProjects(projects.filter((p) => p._id !== id && p.id !== id));
        notify('Project removed.');
      } catch (err: any) {
        notify('Error deleting project', 'error');
      }
    }
  };

  // --- SKILL HANDLERS ---
  const handleOpenNewSkill = () => {
    setIsNew(true);
    setEditingItem({
      name: '',
      category: 'Frontend',
      proficiency: 85,
      icon: 'Code'
    });
    setModalType('skill');
  };

  const handleEditSkill = (s: Skill) => {
    setIsNew(false);
    setEditingItem({ ...s });
    setModalType('skill');
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        const res = await createSkill(editingItem);
        if (res.data.success) {
          setSkills([...skills, res.data.data]);
          notify('Skill added successfully!');
        }
      } else {
        const id = editingItem._id || editingItem.id;
        const res = await updateSkill(id, editingItem);
        if (res.data.success) {
          setSkills(skills.map((s) => (s._id === id || s.id === id ? res.data.data : s)));
          notify('Skill updated!');
        }
      }
      setModalType(null);
      setEditingItem(null);
    } catch (err: any) {
      notify('Error saving skill', 'error');
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await deleteSkill(id);
        setSkills(skills.filter((s) => s._id !== id && s.id !== id));
        notify('Skill deleted.');
      } catch (err: any) {
        notify('Error deleting skill', 'error');
      }
    }
  };

  // --- EXPERIENCE HANDLERS ---
  const handleOpenNewExperience = () => {
    setIsNew(true);
    setEditingItem({
      title: '',
      company: '',
      location: 'Dar es Salaam, Tanzania',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      description: ['Engineered scalable full-stack web and mobile features', 'Designed and tested enterprise network architecture and routing protocols'],
      technologies: ['React', 'TypeScript', 'Node.js', 'Cisco Packet Tracer']
    });
    setTempTechInput('');
    setTempDescInput('');
    setModalType('experience');
  };

  const handleEditExperience = (exp: Experience) => {
    setIsNew(false);
    setEditingItem({
      ...exp,
      description: Array.isArray(exp.description) ? [...exp.description] : [],
      technologies: Array.isArray(exp.technologies) ? [...exp.technologies] : []
    });
    setTempTechInput('');
    setTempDescInput('');
    setModalType('experience');
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure description is an array of non-empty strings
      const payload = {
        ...editingItem,
        description: Array.isArray(editingItem.description) 
          ? editingItem.description.filter((d: string) => d.trim().length > 0)
          : [editingItem.description || '']
      };

      if (isNew) {
        const res = await createExperience(payload);
        if (res.data.success) {
          setExperience([res.data.data, ...experience]);
          notify('Work experience added successfully!');
        }
      } else {
        const id = editingItem._id || editingItem.id;
        const res = await updateExperience(id, payload);
        if (res.data.success) {
          setExperience(experience.map((exp) => (exp._id === id || exp.id === id ? res.data.data : exp)));
          notify('Experience updated!');
        }
      }
      setModalType(null);
      setEditingItem(null);
    } catch (err: any) {
      notify(err.response?.data?.message || 'Error saving experience', 'error');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience record?')) {
      try {
        await deleteExperience(id);
        setExperience(experience.filter((e) => e._id !== id && e.id !== id));
        notify('Experience deleted.');
      } catch (err: any) {
        notify('Error deleting experience', 'error');
      }
    }
  };

  // --- EDUCATION HANDLERS ---
  const handleOpenNewEducation = () => {
    setIsNew(true);
    setEditingItem({
      degree: 'B.Sc. in Computer Science',
      institution: 'St. Joseph University in Tanzania',
      fieldOfStudy: 'Software Engineering & Computer Networks',
      startDate: '2021',
      endDate: '2024',
      grade: 'Distinction / Honors',
      activities: 'Lead Student Developer & Network Lab Coordinator'
    });
    setModalType('education');
  };

  const handleEditEducation = (edu: Education) => {
    setIsNew(false);
    setEditingItem({ ...edu });
    setModalType('education');
  };

  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        const res = await createEducation(editingItem);
        if (res.data.success) {
          setEducation([...education, res.data.data]);
          notify('Education record added!');
        }
      } else {
        const id = editingItem._id || editingItem.id;
        const res = await updateEducation(id, editingItem);
        if (res.data.success) {
          setEducation(education.map((edu) => (edu._id === id || edu.id === id ? res.data.data : edu)));
          notify('Education record updated!');
        }
      }
      setModalType(null);
      setEditingItem(null);
    } catch (err: any) {
      notify('Error saving education', 'error');
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (window.confirm('Delete this education record?')) {
      try {
        await deleteEducation(id);
        setEducation(education.filter((edu) => edu._id !== id && edu.id !== id));
        notify('Education record deleted.');
      } catch (err: any) {
        notify('Error deleting education', 'error');
      }
    }
  };

  // --- CERTIFICATION HANDLERS ---
  const handleOpenNewCertification = () => {
    setIsNew(true);
    setEditingItem({
      name: '',
      issuer: 'Cisco / Google / Oracle',
      issueDate: '2024',
      expirationDate: '',
      credentialUrl: '',
      image: ''
    });
    setModalType('certification');
  };

  const handleEditCertification = (cert: Certification) => {
    setIsNew(false);
    setEditingItem({ ...cert });
    setModalType('certification');
  };

  const handleSaveCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        const res = await createCertification(editingItem);
        if (res.data.success) {
          setCertifications([...certifications, res.data.data]);
          notify('Certification credential added!');
        }
      } else {
        const id = editingItem._id || editingItem.id;
        const res = await updateCertification(id, editingItem);
        if (res.data.success) {
          setCertifications(certifications.map((c) => (c._id === id || c.id === id ? res.data.data : c)));
          notify('Certification updated!');
        }
      }
      setModalType(null);
      setEditingItem(null);
    } catch (err: any) {
      notify('Error saving certification', 'error');
    }
  };

  const handleDeleteCertification = async (id: string) => {
    if (window.confirm('Delete this certification?')) {
      try {
        await deleteCertification(id);
        setCertifications(certifications.filter((c) => c._id !== id && c.id !== id));
        notify('Certification removed.');
      } catch (err: any) {
        notify('Error deleting certification', 'error');
      }
    }
  };

  // --- SERVICE HANDLERS ---
  const handleOpenNewService = () => {
    setIsNew(true);
    setEditingItem({
      title: '',
      description: '',
      features: ['High-performance system design', 'Clean maintainable codebase', 'Secure deployment']
    });
    setTempFeatureInput('');
    setModalType('service');
  };

  const handleEditService = (srv: Service) => {
    setIsNew(false);
    setEditingItem({
      ...srv,
      features: Array.isArray(srv.features) ? [...srv.features] : []
    });
    setTempFeatureInput('');
    setModalType('service');
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        const res = await createService(editingItem);
        if (res.data.success) {
          setServices([...services, res.data.data]);
          notify('Service offering added!');
        }
      } else {
        const id = editingItem._id || editingItem.id;
        const res = await updateService(id, editingItem);
        if (res.data.success) {
          setServices(services.map((s) => (s._id === id || s.id === id ? res.data.data : s)));
          notify('Service offering updated!');
        }
      }
      setModalType(null);
      setEditingItem(null);
    } catch (err: any) {
      notify('Error saving service', 'error');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Delete this service offering?')) {
      try {
        await deleteService(id);
        setServices(services.filter((s) => s._id !== id && s.id !== id));
        notify('Service removed.');
      } catch (err: any) {
        notify('Error deleting service', 'error');
      }
    }
  };

  // --- MESSAGE HANDLERS ---
  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await toggleMessageRead(id, !currentRead);
      if (res.data.success) {
        setMessages(messages.map((m) => (m._id === id ? { ...m, read: !currentRead } : m)));
        notify(!currentRead ? 'Message marked as read' : 'Message marked as unread');
      }
    } catch (err) {
      notify('Failed to update message status', 'error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Delete this message?')) {
      try {
        await deleteMessage(id);
        setMessages(messages.filter((m) => m._id !== id));
        notify('Message deleted.');
      } catch (err) {
        notify('Failed to delete message', 'error');
      }
    }
  };

  // --- SETTINGS & IMAGE HANDLERS ---
  const handleProfileImageFile = async (file: File) => {
    if (!file) return;
    try {
      setIsProcessingImage(true);
      const result = await processGalleryImage(file, 1000, 0.85);
      
      const newSettings = {
        ...settings,
        profileImage: result.dataUrl
      };

      setSettings(newSettings);
      updateSettingsState(newSettings);

      setImageMeta({
        name: file.name,
        sizeKb: result.sizeKb,
        width: result.width,
        height: result.height
      });

      // Auto-publish to backend immediately
      try {
        const { _id, id, __v, createdAt, updatedAt, ...cleanUpdate } = newSettings;
        const res = await updateSettings(cleanUpdate);
        if (res.data.success) {
          updateSettingsState(res.data.data);
          notify(`Profile picture "${file.name}" uploaded and published to public view!`);
        } else {
          notify(`Photo loaded! Click "Save Profile Settings" to finalize.`);
        }
      } catch (saveErr) {
        notify(`Photo loaded (${result.sizeKb} KB)! Click "Save Profile Settings" to apply.`);
      }
    } catch (err: any) {
      notify(err.message || 'Failed to process selected image', 'error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleResetProfileImage = async () => {
    if (settings) {
      const newSettings = {
        ...settings,
        profileImage: DEFAULT_PROFILE_IMAGE
      };
      setSettings(newSettings);
      updateSettingsState(newSettings);
      setImageMeta(null);
      try {
        const { _id, id, __v, createdAt, updatedAt, ...cleanUpdate } = newSettings;
        await updateSettings(cleanUpdate);
      } catch (e) {}
      notify('Reset to default official portrait.');
    }
  };

  const handleProjectImageFile = async (file: File) => {
    if (!file || !editingItem) return;
    try {
      setIsProcessingImage(true);
      const result = await processGalleryImage(file, 1000, 0.85);
      setEditingItem({
        ...editingItem,
        image: result.dataUrl
      });
      notify(`Project screenshot "${file.name}" loaded (${result.sizeKb} KB)!`);
    } catch (err: any) {
      notify(err.message || 'Failed to process image', 'error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleCertImageFile = async (file: File) => {
    if (!file || !editingItem) return;
    try {
      setIsProcessingImage(true);
      const result = await processGalleryImage(file, 800, 0.88);
      setEditingItem({
        ...editingItem,
        image: result.dataUrl
      });
      notify(`Credential image "${file.name}" loaded (${result.sizeKb} KB)!`);
    } catch (err: any) {
      notify(err.message || 'Failed to process image', 'error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    try {
      const { _id, id, __v, createdAt, updatedAt, ...cleanUpdate } = settings;
      const res = await updateSettings(cleanUpdate);
      if (res.data.success) {
        updateSettingsState(res.data.data);
        notify('Portfolio profile and picture saved successfully!');
      } else {
        notify(res.data.message || 'Failed to save settings', 'error');
      }
    } catch (err: any) {
      notify(err.response?.data?.message || err.message || 'Failed to save settings', 'error');
    }
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesCategory = projectCategoryFilter === 'All' || p.category === projectCategoryFilter;
    const matchesSearch = projectSearch === '' || 
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) || 
      p.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (Array.isArray(p.technologies) && p.technologies.some(t => t.toLowerCase().includes(projectSearch.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Web Development', 'Mobile', 'Networking', 'Algorithms', 'Database', 'DevOps', 'UI/UX'];

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-[#18181B] flex flex-col font-sans">
      <SEO title="Portfolio Admin Panel | Elieza Mwakyoma" description="Administrative management console." noIndex={true} canonicalPath="/admin" />
      
      {/* Top Header Matching Public Site Navbar */}
      <header className="sticky top-0 z-40 bg-[#FDFBFB]/90 backdrop-blur-md border-b border-[#F1EBEB] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Monogram */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#761A30] to-[#4D0E1D] flex items-center justify-center text-white font-serif font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                    E
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-500/30 animate-pulse" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-baseline space-x-1">
                    <span className="font-serif font-black text-2xl text-[#18181B] tracking-tight group-hover:text-[#761A30] transition-colors">
                      Elieza
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#761A30]" />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-[#71717A] -mt-1">
                    Admin Management Console
                  </span>
                </div>
              </Link>
            </div>

            {/* Quick Actions & User Bar */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Seed / Sync Database Action */}
              <button
                onClick={handleSeedDatabase}
                disabled={isSeeding}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-all cursor-pointer shadow-2xs disabled:opacity-50"
                title="Sync and populate MongoDB database with all default projects, skills, experience, and profile details"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${isSeeding ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isSeeding ? 'Syncing...' : 'Sync Database'}</span>
              </button>

              <Link
                to="/"
                className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] text-xs font-bold border border-[#E4E4E7] hover:border-[#761A30]/30 transition-all shadow-xs"
              >
                <Globe className="w-3.5 h-3.5 text-[#761A30]" />
                <span>View Public Site</span>
                <ArrowUpRight className="w-3 h-3 text-[#A1A1AA]" />
              </Link>

              <div className="h-6 w-px bg-[#E4E4E7] hidden sm:block" />

              {/* Admin badge */}
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#FAF3F5] border border-[#F4ECEE]">
                <Shield className="w-3.5 h-3.5 text-[#761A30]" />
                <span className="text-xs font-bold text-[#761A30]">Admin</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-all cursor-pointer"
                title="Sign out of Admin Dashboard"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation Ribbon */}
      <nav className="bg-white border-b border-[#F1EBEB] shadow-xs sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
              { id: 'skills', label: `Skills & Stack (${skills.length})`, icon: Code2 },
              { id: 'experience', label: `Experience (${experience.length})`, icon: Briefcase },
              { id: 'education', label: `Education & Honors`, icon: GraduationCap },
              { id: 'certifications', label: `Certifications (${certifications.length})`, icon: Award },
              { id: 'services', label: `Services (${services.length})`, icon: Layers },
              { id: 'messages', label: `Inquiries (${messages.length})`, icon: Mail, badge: unreadMessagesCount },
              { id: 'settings', label: 'Portfolio Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setModalType(null);
                  }}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#761A30] text-white shadow-md'
                      : 'bg-white hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] border border-[#E4E4E7]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#761A30]'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && tab.badge > 0 ? (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black animate-pulse">
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Status Notification Toast */}
        {statusMsg && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center justify-between border shadow-sm animate-in fade-in slide-in-from-top-2 ${
            statusType === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            <div className="flex items-center space-x-2.5">
              {statusType === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600" />
              )}
              <span className="text-xs sm:text-sm font-bold">{statusMsg}</span>
            </div>
            <button onClick={() => setStatusMsg('')} className="p-1 rounded-lg hover:bg-black/5 text-slate-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* Top Welcome Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#761A30] via-[#5E1426] to-[#3D0A16] text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-0" />
              
              <div className="relative z-10 space-y-4 max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10 text-amber-300 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Welcome back, {settings?.fullName || 'Elieza Mwakyoma'}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  Portfolio Operations Center
                </h1>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Manage your software portfolio, experience track record, technical skills, and client inquiries from a unified console.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('projects');
                      handleOpenNewProject();
                    }}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-[#761A30] hover:bg-[#FAF3F5] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Project</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('experience');
                      handleOpenNewExperience();
                    }}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Add Experience</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('messages')}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>View Inquiries ({unreadMessagesCount} unread)</span>
                  </button>

                  <button
                    onClick={handleSeedDatabase}
                    disabled={isSeeding}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-100 font-bold text-xs uppercase tracking-wider transition-all border border-emerald-400/30 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isSeeding ? 'animate-spin' : ''}`} />
                    <span>{isSeeding ? 'Populating...' : 'Sync Database Records'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stat Bento Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div 
                onClick={() => setActiveTab('projects')} 
                className="p-6 rounded-3xl bg-white border border-[#F1EBEB] shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Live</span>
                </div>
                <p className="text-3xl font-black text-[#18181B] tracking-tight group-hover:text-[#761A30] transition-colors">
                  {projects.length}
                </p>
                <p className="text-xs font-bold text-[#71717A] mt-1">Published Projects</p>
              </div>

              <div 
                onClick={() => setActiveTab('skills')} 
                className="p-6 rounded-3xl bg-white border border-[#F1EBEB] shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">Verified</span>
                </div>
                <p className="text-3xl font-black text-[#18181B] tracking-tight group-hover:text-[#761A30] transition-colors">
                  {skills.length}
                </p>
                <p className="text-xs font-bold text-[#71717A] mt-1">Technical Skills</p>
              </div>

              <div 
                onClick={() => setActiveTab('experience')} 
                className="p-6 rounded-3xl bg-white border border-[#F1EBEB] shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">Milestones</span>
                </div>
                <p className="text-3xl font-black text-[#18181B] tracking-tight group-hover:text-[#761A30] transition-colors">
                  {experience.length}
                </p>
                <p className="text-xs font-bold text-[#71717A] mt-1">Work Experiences</p>
              </div>

              <div 
                onClick={() => setActiveTab('messages')} 
                className="p-6 rounded-3xl bg-white border border-[#F1EBEB] shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  {unreadMessagesCount > 0 ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {unreadMessagesCount} New
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">All Read</span>
                  )}
                </div>
                <p className="text-3xl font-black text-[#18181B] tracking-tight group-hover:text-[#761A30] transition-colors">
                  {messages.length}
                </p>
                <p className="text-xs font-bold text-[#71717A] mt-1">Contact Messages</p>
              </div>
            </div>

            {/* Inquiries & Profile Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white rounded-3xl border border-[#F1EBEB] p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-4">
                  <div>
                    <h2 className="text-lg font-black text-[#18181B] tracking-tight">Recent Inquiries</h2>
                    <p className="text-xs text-[#71717A]">Submissions received through the contact form</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs font-bold text-[#761A30] hover:text-[#5E1426] flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {messages.length === 0 ? (
                  <div className="py-12 text-center text-[#71717A] space-y-2">
                    <MessageSquare className="w-8 h-8 text-[#A1A1AA] mx-auto" />
                    <p className="text-xs font-medium">No contact messages received yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.slice(0, 4).map((msg) => (
                      <div 
                        key={msg._id || msg.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          msg.read ? 'bg-[#FAFAFA] border-[#F1EBEB]' : 'bg-[#FAF3F5] border-[#F4ECEE]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-[#18181B]">{msg.name}</span>
                            <span className="text-xs text-[#71717A]">({msg.email})</span>
                            {!msg.read && (
                              <span className="px-2 py-0.5 rounded-full bg-[#761A30] text-white text-[10px] font-bold">New</span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-[#761A30]">{msg.subject}</p>
                          <p className="text-xs text-[#52525B] line-clamp-1">{msg.message}</p>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#761A30] text-[#761A30] hover:text-white border border-[#E4E4E7] text-xs font-bold transition-all shadow-xs"
                          >
                            Reply
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 bg-white rounded-3xl border border-[#F1EBEB] p-6 sm:p-8 shadow-xs space-y-6">
                <h2 className="text-lg font-black text-[#18181B] tracking-tight border-b border-[#F1EBEB] pb-4">
                  Profile Status
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF3F5] border border-[#F4ECEE] flex items-center justify-center text-[#761A30] font-serif font-black text-xl">
                      E
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#18181B]">{settings?.fullName || 'Elieza Mwakyoma'}</p>
                      <p className="text-xs text-[#71717A]">{settings?.title || 'Software Developer & Networker'}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#F1EBEB] space-y-2 text-xs text-[#52525B]">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#71717A]">Institution</span>
                      <span className="font-bold text-[#18181B]">St. Joseph University</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#71717A]">Degree</span>
                      <span className="font-bold text-[#18181B]">B.Sc. Computer Science</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#71717A]">Location</span>
                      <span className="font-bold text-[#18181B]">Dar es Salaam, Tanzania</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#71717A]">Phone</span>
                      <span className="font-bold text-[#18181B]">+255 629 899 017</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full py-3 rounded-full bg-[#FAF3F5] hover:bg-[#761A30] text-[#761A30] hover:text-white font-bold text-xs uppercase tracking-wider border border-[#F4ECEE] transition-all cursor-pointer"
                  >
                    Edit Profile Details
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#F1EBEB] shadow-xs">
              <div>
                <h1 className="text-2xl font-black text-[#18181B] tracking-tight">Projects Management</h1>
                <p className="text-xs text-[#71717A] mt-0.5">Showcase full-stack applications, mobile systems, and networking setups</p>
              </div>

              <button
                onClick={handleOpenNewProject}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      projectCategoryFilter === cat
                        ? 'bg-[#761A30] text-white shadow-sm'
                        : 'bg-white hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] border border-[#E4E4E7]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30] focus:ring-1 focus:ring-[#761A30]/20"
                />
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-[#F1EBEB] p-8 space-y-3">
                <FolderKanban className="w-10 h-10 text-[#A1A1AA] mx-auto" />
                <h3 className="font-bold text-[#18181B] text-base">No Projects Found</h3>
                <p className="text-xs text-[#71717A] max-w-sm mx-auto">
                  Try adjusting your search query or category filter, or add a new project.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((proj) => (
                  <div 
                    key={proj._id || proj.id} 
                    className="bg-white rounded-3xl border border-[#F1EBEB] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-44 bg-[#FAF3F5] overflow-hidden">
                        {proj.image ? (
                          <img 
                            src={proj.image} 
                            alt={proj.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#761A30]">
                            <FolderKanban className="w-10 h-10 opacity-40" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#761A30] text-[11px] font-bold shadow-xs">
                            {proj.category}
                          </span>
                        </div>
                        {proj.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-full bg-[#F59E0B] text-white text-[10px] font-bold shadow-xs flex items-center space-x-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Featured</span>
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-black text-[#18181B] tracking-tight group-hover:text-[#761A30] transition-colors line-clamp-1">
                          {proj.title}
                        </h3>

                        <p className="text-xs text-[#52525B] line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>

                        {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {proj.technologies.slice(0, 4).map((tech, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAFAFA] border border-[#E4E4E7] text-[10px] font-medium text-[#52525B]">
                                {tech}
                              </span>
                            ))}
                            {proj.technologies.length > 4 && (
                              <span className="px-2 py-0.5 rounded-md bg-[#FAF3F5] text-[10px] font-bold text-[#761A30]">
                                +{proj.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-[#F1EBEB] flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        {proj.githubUrl && (
                          <a 
                            href={proj.githubUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-2 rounded-full bg-[#FAFAFA] hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] border border-[#E4E4E7] transition-colors"
                            title="GitHub Repo"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-2 rounded-full bg-[#FAFAFA] hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] border border-[#E4E4E7] transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditProject(proj)}
                          className="px-3 py-1.5 rounded-full bg-[#FAF3F5] hover:bg-[#761A30] text-[#761A30] hover:text-white text-xs font-bold transition-all border border-[#F4ECEE] flex items-center space-x-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProject(proj._id || proj.id!, proj.title)}
                          className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SKILLS & TECH STACK */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#F1EBEB] shadow-xs">
              <div>
                <h1 className="text-2xl font-black text-[#18181B] tracking-tight">Technical Stack & Skills</h1>
                <p className="text-xs text-[#71717A] mt-0.5">Manage proficiencies across languages, frameworks, networking, and databases</p>
              </div>

              <button
                onClick={handleOpenNewSkill}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {skills.map((skill) => (
                <div 
                  key={skill._id || skill.id} 
                  className="bg-white rounded-3xl border border-[#F1EBEB] p-5 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#18181B]">{skill.name}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">{skill.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditSkill(skill)}
                        className="p-1.5 rounded-lg text-[#761A30] hover:bg-[#FAF3F5] transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill._id || skill.id!)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#71717A]">Proficiency</span>
                      <span className="text-[#761A30]">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#FAFAFA] border border-[#E4E4E7] overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#761A30] to-[#5E1426] rounded-full transition-all duration-500" 
                        style={{ width: `${skill.proficiency}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#F1EBEB] shadow-xs">
              <div>
                <h1 className="text-2xl font-black text-[#18181B] tracking-tight">Work Experience</h1>
                <p className="text-xs text-[#71717A] mt-0.5">Track your professional roles, milestones, and technical impact</p>
              </div>

              <button
                onClick={handleOpenNewExperience}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>

            {experience.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-[#F1EBEB] p-8 space-y-3">
                <Briefcase className="w-10 h-10 text-[#A1A1AA] mx-auto" />
                <h3 className="font-bold text-[#18181B] text-base">No Experience Records</h3>
                <p className="text-xs text-[#71717A] max-w-sm mx-auto">
                  Add internships, engineering positions, and collaborative roles to showcase your career timeline.
                </p>
                <button
                  onClick={handleOpenNewExperience}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#761A30] text-white font-bold text-xs uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Experience Record</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp._id || exp.id} className="bg-white rounded-3xl border border-[#F1EBEB] p-6 shadow-xs space-y-3 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1EBEB] pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-base text-[#18181B]">{exp.title}</h3>
                          {exp.current && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              Current Role
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-bold text-[#761A30] mt-0.5">
                          {exp.company} {exp.location ? `• ${exp.location}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#71717A] px-3 py-1 rounded-full bg-[#FAFAFA] border border-[#E4E4E7]">
                          {exp.startDate} – {exp.current ? 'Present' : (exp.endDate || 'Present')}
                        </span>
                        <button
                          onClick={() => handleEditExperience(exp)}
                          className="p-2 rounded-full text-[#761A30] hover:bg-[#FAF3F5] transition-colors"
                          title="Edit Experience"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp._id || exp.id!)}
                          className="p-2 rounded-full text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete Experience"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    {Array.isArray(exp.description) && exp.description.length > 0 && (
                      <ul className="list-disc list-inside text-xs sm:text-sm text-[#52525B] space-y-1.5 pl-1 leading-relaxed">
                        {exp.description.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies Tag Chips */}
                    {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F1EBEB]/60">
                        {exp.technologies.map((t, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] text-[11px] font-bold border border-[#F4ECEE]">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: EDUCATION & CERTIFICATIONS */}
        {(activeTab === 'education' || activeTab === 'certifications') && (
          <div className="space-y-8">
            
            {/* Education Block */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#F1EBEB] shadow-xs">
                <div>
                  <h2 className="text-xl font-black text-[#18181B] tracking-tight">Academic Education</h2>
                  <p className="text-xs text-[#71717A]">University degree, institution, and major fields of study</p>
                </div>

                <button
                  onClick={handleOpenNewEducation}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {education.map((edu) => (
                  <div key={edu._id || edu.id} className="bg-white rounded-3xl border border-[#F1EBEB] p-6 shadow-xs space-y-3 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#71717A] px-2.5 py-0.5 rounded-full bg-[#FAFAFA] border border-[#E4E4E7]">
                          {edu.startDate} – {edu.endDate || 'Present'}
                        </span>
                        <button onClick={() => handleEditEducation(edu)} className="p-1.5 rounded-lg text-[#761A30] hover:bg-[#FAF3F5]">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteEducation(edu._id || edu.id!)} className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-base text-[#18181B]">{edu.degree}</h3>
                      <p className="text-xs font-bold text-[#761A30]">{edu.institution}</p>
                    </div>

                    {edu.fieldOfStudy && <p className="text-xs text-[#52525B]">Field: {edu.fieldOfStudy}</p>}
                    {edu.grade && <p className="text-xs text-[#71717A]">Grade/Status: {edu.grade}</p>}
                    {edu.activities && <p className="text-xs text-[#71717A] italic">Role/Activities: {edu.activities}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Block */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#F1EBEB] shadow-xs">
                <div>
                  <h2 className="text-xl font-black text-[#18181B] tracking-tight">Certifications & Credentials</h2>
                  <p className="text-xs text-[#71717A]">Professional technical certifications and issuing organizations</p>
                </div>

                <button
                  onClick={handleOpenNewCertification}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certification</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert) => (
                  <div key={cert._id || cert.id} className="bg-white rounded-3xl border border-[#F1EBEB] p-6 shadow-xs space-y-3 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <button onClick={() => handleEditCertification(cert)} className="p-1.5 rounded-lg text-[#761A30] hover:bg-[#FAF3F5]">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteCertification(cert._id || cert.id!)} className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-[#18181B]">{cert.name}</h3>
                      <p className="text-xs font-bold text-[#761A30]">{cert.issuer}</p>
                      <p className="text-xs text-[#71717A] mt-1">Issued: {cert.issueDate}</p>
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-bold text-[#761A30] hover:underline pt-1"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 6: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#F1EBEB] shadow-xs">
              <div>
                <h1 className="text-2xl font-black text-[#18181B] tracking-tight">Services & Technical Offerings</h1>
                <p className="text-xs text-[#71717A] mt-0.5">Pillars of software development, networking, and digital systems engineering</p>
              </div>

              <button
                onClick={handleOpenNewService}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((srv) => (
                <div key={srv._id || srv.id} className="bg-white rounded-3xl border border-[#F1EBEB] p-6 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                        <Layers className="w-6 h-6" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <button onClick={() => handleEditService(srv)} className="p-1.5 rounded-lg text-[#761A30] hover:bg-[#FAF3F5]">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteService(srv._id || srv.id!)} className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-[#18181B]">{srv.title}</h3>
                    <p className="text-xs text-[#52525B] leading-relaxed">{srv.description}</p>
                    
                    {Array.isArray(srv.features) && (
                      <div className="pt-2 border-t border-[#F1EBEB] space-y-1">
                        {srv.features.map((feat, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-[#71717A]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#761A30]" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: INQUIRIES & MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#F1EBEB] shadow-xs">
              <div>
                <h1 className="text-2xl font-black text-[#18181B] tracking-tight">Contact Inquiries Inbox</h1>
                <p className="text-xs text-[#71717A] mt-0.5">Manage and respond to prospective clients, employers, and collaborators</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-[#FAF3F5] text-[#761A30] font-bold text-xs border border-[#F4ECEE]">
                  Total: {messages.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-bold text-xs border border-amber-200">
                  Unread: {unreadMessagesCount}
                </span>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-[#F1EBEB] p-8 space-y-3">
                <Mail className="w-10 h-10 text-[#A1A1AA] mx-auto" />
                <h3 className="font-bold text-[#18181B] text-base">Inbox is Empty</h3>
                <p className="text-xs text-[#71717A]">No submissions received via the portfolio contact form yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg._id || msg.id}
                    className={`p-6 rounded-3xl border transition-all space-y-3 ${
                      msg.read ? 'bg-white border-[#F1EBEB]' : 'bg-[#FAF3F5]/80 border-[#F4ECEE] shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1EBEB] pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-sm text-[#18181B]">{msg.name}</h3>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full bg-[#761A30] text-white text-[10px] font-bold">Unread</span>
                          )}
                        </div>
                        <p className="text-xs text-[#71717A]">Email: <span className="font-bold text-[#18181B]">{msg.email}</span></p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {msg.createdAt && (
                          <span className="text-[11px] font-mono text-[#71717A]">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        )}
                        <button
                          onClick={() => handleToggleRead(msg._id || msg.id!, !!msg.read)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                            msg.read 
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                          }`}
                        >
                          {msg.read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg._id || msg.id!)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#761A30]">Subject: {msg.subject}</p>
                      <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed whitespace-pre-line bg-white/70 p-4 rounded-2xl border border-[#F1EBEB]">
                        {msg.message}
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white text-xs font-bold transition-all shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Reply via Email</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 8: PORTFOLIO SETTINGS */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-5xl space-y-6 animate-in fade-in duration-300">
            
            {/* Header Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F1EBEB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF3F5] text-[#761A30] text-[10px] font-black uppercase tracking-wider mb-2">
                  <User className="w-3 h-3" />
                  <span>Developer Identity & Public Presence</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight">Portfolio Profile & Settings</h1>
                <p className="text-xs sm:text-sm text-[#71717A] mt-1">
                  Manage your official profile portrait from gallery, personal biography, contact channels, and credentials.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Settings</span>
              </button>
            </div>

            {/* SECTION 1: PROFILE PICTURE & DEVELOPER PORTRAIT (GALLERY UPLOAD) */}
            <div className="bg-white rounded-3xl border border-[#F1EBEB] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1EBEB] pb-4">
                <div>
                  <h2 className="text-lg font-black text-[#18181B] flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-[#761A30]" />
                    <span>Profile Picture & Developer Portrait</span>
                  </h2>
                  <p className="text-xs text-[#71717A] mt-0.5">
                    Upload a high-resolution photo from your gallery or choose from curated professional portrait styles.
                  </p>
                </div>
                {imageMeta && (
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{imageMeta.name} ({imageMeta.sizeKb} KB)</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Live Arched Hero Preview */}
                <div className="lg:col-span-5 bg-gradient-to-b from-[#FDFBFB] to-[#F7F2F4] p-5 rounded-3xl border border-[#F1EBEB] flex flex-col items-center text-center">
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#761A30] mb-3 flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Public Hero Preview</span>
                  </div>

                  {/* Arched Burgundy Container matching main site Hero */}
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-t-[100px] sm:rounded-t-[120px] rounded-b-[28px] overflow-hidden p-1.5 bg-gradient-to-b from-[#761A30] via-[#5E1426] to-[#2B0811] shadow-xl ring-4 ring-[#761A30]/10">
                    <div className="w-full h-full rounded-t-[94px] sm:rounded-t-[114px] rounded-b-[22px] overflow-hidden bg-[#1E0911] relative">
                      <img
                        src={settings.profileImage && !settings.profileImage.startsWith('/src/assets/images/') ? settings.profileImage : defaultHeroPortrait}
                        alt={settings.fullName || 'Elieza Mwakyoma'}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultHeroPortrait;
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>

                    {/* Floating Availability Badge */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 shadow-md flex items-center space-x-1.5 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-[#18181B]">Available For Hire</span>
                    </div>
                  </div>

                  {/* Circle Avatar Mini Preview */}
                  <div className="mt-4 flex items-center space-x-3 bg-white px-4 py-2 rounded-2xl border border-[#E4E4E7] shadow-xs">
                    <img
                      src={settings.profileImage && !settings.profileImage.startsWith('/src/assets/images/') ? settings.profileImage : defaultHeroPortrait}
                      alt="Avatar"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = defaultHeroPortrait;
                      }}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#761A30]"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#18181B] leading-none">{settings.fullName || 'Elieza Mwakyoma'}</p>
                      <p className="text-[10px] text-[#71717A] mt-0.5 leading-none">Avatar Format (Navbar/Bio)</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetProfileImage}
                    className="mt-3 inline-flex items-center space-x-1.5 text-xs font-bold text-[#71717A] hover:text-[#761A30] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Default Official Portrait</span>
                  </button>
                </div>

                {/* Right: Upload Dropzone & Controls */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={profileImageInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleProfileImageFile(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingProfile(true);
                    }}
                    onDragLeave={() => setIsDraggingProfile(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingProfile(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleProfileImageFile(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => profileImageInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                      isDraggingProfile
                        ? 'border-[#761A30] bg-[#FAF3F5] scale-[1.01]'
                        : 'border-[#E4E4E7] bg-[#FAFAFA] hover:border-[#761A30] hover:bg-[#FAF3F5]/40'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center mx-auto mb-3 shadow-xs">
                      {isProcessingImage ? (
                        <RefreshCw className="w-7 h-7 animate-spin" />
                      ) : (
                        <UploadCloud className="w-7 h-7" />
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-[#18181B]">
                      {isProcessingImage ? 'Optimizing image...' : 'Upload Picture from Device Gallery'}
                    </h3>
                    <p className="text-xs text-[#71717A] max-w-sm mx-auto mt-1 leading-relaxed">
                      Drag and drop your photo here, or click to open your phone gallery or file picker. Supports JPG, PNG, WEBP, and HEIC.
                    </p>
                    <button
                      type="button"
                      className="mt-4 px-6 py-2.5 rounded-full bg-[#761A30] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5E1426] transition-all shadow-xs cursor-pointer inline-flex items-center space-x-2"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Choose From Gallery</span>
                    </button>
                  </div>

                  {/* Direct Image URL fallback */}
                  <div className="space-y-1 pt-1">
                    <label className="text-xs font-bold text-[#18181B]">Custom Direct Image URL (Optional)</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={settings.profileImage || ''}
                        onChange={(e) => setSettings({ ...settings, profileImage: e.target.value })}
                        placeholder="https://..."
                        className="flex-1 p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none focus:border-[#761A30]"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* SECTION 2: BIOGRAPHY & GENERAL SETTINGS */}
            <div className="bg-white rounded-3xl border border-[#F1EBEB] p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-black text-[#18181B] border-b border-[#F1EBEB] pb-3">
                General Profile Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18181B]">Full Name</label>
                  <input
                    type="text"
                    value={settings.fullName || ''}
                    onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
                    className="w-full p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18181B]">Professional Title</label>
                  <input
                    type="text"
                    value={settings.title || ''}
                    onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                    className="w-full p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#18181B]">Biography & Summary</label>
                <textarea
                  rows={4}
                  value={settings.bio || ''}
                  onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                  className="w-full p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#761A30] leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18181B]">Location / Base</label>
                  <input
                    type="text"
                    value={settings.location || 'Dar es Salaam / Morogoro, Tanzania'}
                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                    placeholder="Dar es Salaam / Morogoro, Tanzania"
                    className="w-full p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18181B]">Phone Number / WhatsApp</label>
                  <input
                    type="text"
                    value={settings.phone || '+255 620 673 349 / +255 744 577 007'}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    placeholder="+255 620 673 349"
                    className="w-full p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18181B]">CV / Resume Download URL</label>
                  <input
                    type="text"
                    value={settings.cvUrl || ''}
                    onChange={(e) => setSettings({ ...settings, cvUrl: e.target.value })}
                    placeholder="/cv/Elieza_Mwakyoma_CV.pdf"
                    className="w-full p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18181B]">Public Contact Email</label>
                  <input
                    type="email"
                    value={settings.socialLinks?.email || ''}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      socialLinks: { ...settings.socialLinks, email: e.target.value } 
                    })}
                    placeholder="eliezaeliezer1318@gmail.com"
                    className="w-full p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18181B]">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={settings.socialLinks?.github || ''}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      socialLinks: { ...settings.socialLinks, github: e.target.value } 
                    })}
                    placeholder="https://github.com/eliezamwakyoma"
                    className="w-full p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18181B]">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    value={settings.socialLinks?.linkedin || ''}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value } 
                    })}
                    placeholder="https://linkedin.com/in/eliezamwakyoma"
                    className="w-full p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  />
                </div>
              </div>

              {/* STATS COUNTERS */}
              <div className="pt-4 border-t border-[#F1EBEB] space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-[#761A30]">
                  Portfolio Statistics & Metrics (Displayed on Hero/About)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#FAFAFA] rounded-2xl border border-[#E4E4E7] space-y-1">
                    <span className="text-[10px] font-bold text-[#71717A]">Projects Completed</span>
                    <input
                      type="number"
                      value={settings.stats?.projectsCompleted ?? 12}
                      onChange={(e) => setSettings({
                        ...settings,
                        stats: { ...settings.stats, projectsCompleted: Number(e.target.value) }
                      })}
                      className="w-full font-bold text-sm bg-transparent focus:outline-none text-[#18181B]"
                    />
                  </div>
                  <div className="p-3 bg-[#FAFAFA] rounded-2xl border border-[#E4E4E7] space-y-1">
                    <span className="text-[10px] font-bold text-[#71717A]">Tech Mastered</span>
                    <input
                      type="number"
                      value={settings.stats?.technologiesMastered ?? 18}
                      onChange={(e) => setSettings({
                        ...settings,
                        stats: { ...settings.stats, technologiesMastered: Number(e.target.value) }
                      })}
                      className="w-full font-bold text-sm bg-transparent focus:outline-none text-[#18181B]"
                    />
                  </div>
                  <div className="p-3 bg-[#FAFAFA] rounded-2xl border border-[#E4E4E7] space-y-1">
                    <span className="text-[10px] font-bold text-[#71717A]">Years Experience</span>
                    <input
                      type="number"
                      value={settings.stats?.yearsExperience ?? 3}
                      onChange={(e) => setSettings({
                        ...settings,
                        stats: { ...settings.stats, yearsExperience: Number(e.target.value) }
                      })}
                      className="w-full font-bold text-sm bg-transparent focus:outline-none text-[#18181B]"
                    />
                  </div>
                  <div className="p-3 bg-[#FAFAFA] rounded-2xl border border-[#E4E4E7] space-y-1">
                    <span className="text-[10px] font-bold text-[#71717A]">Certifications</span>
                    <input
                      type="number"
                      value={settings.stats?.certificationsCount ?? 5}
                      onChange={(e) => setSettings({
                        ...settings,
                        stats: { ...settings.stats, certificationsCount: Number(e.target.value) }
                      })}
                      className="w-full font-bold text-sm bg-transparent focus:outline-none text-[#18181B]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1EBEB] flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-8 py-3.5 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Save Profile Settings
                </button>
              </div>

            </div>

            {/* SECTION 3: LIQUID NAVIGATION ENGINE & AESTHETIC CONTROLS */}
            <div className="bg-white rounded-3xl border border-[#F1EBEB] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1EBEB] pb-4">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FAF3F5] text-[#761A30] text-[10px] font-black uppercase tracking-wider mb-2">
                    <Droplets className="w-3 h-3" />
                    <span>Dynamic Glass Engine</span>
                  </div>
                  <h2 className="text-xl font-black text-[#18181B] tracking-tight">Liquid Navigation Architecture</h2>
                  <p className="text-xs text-[#71717A] mt-0.5">
                    Configure real-time frosted glassmorphism, mercury indicator physics, floating island geometry, and mobile dock.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCustomizerOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#FAF3F5] hover:bg-[#761A30] text-[#761A30] hover:text-white border border-[#F4ECEE] text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Open Visual Customizer</span>
                </button>
              </div>

              {/* Theme Grid */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#18181B] flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#761A30]" />
                  <span>Active Liquid Theme</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'crystal' as const, label: 'Crystal Glass', desc: 'Frosted Translucent' },
                    { id: 'burgundy' as const, label: 'Burgundy Velvet', desc: 'Signature Wine Glass' },
                    { id: 'minimal' as const, label: 'Minimal Pure', desc: 'Clean Borderless' },
                    { id: 'dark-glass' as const, label: 'Dark Obsidian', desc: 'Futuristic Stealth' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        updateLiquidConfig({ theme: t.id });
                        notify(`Applied "${t.label}" theme`);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        liquidConfig.theme === t.id
                          ? 'border-[#761A30] bg-[#FAF3F5] ring-2 ring-[#761A30]/20'
                          : 'border-[#E4E4E7] bg-[#FAFAFA] hover:border-[#761A30]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#18181B]">{t.label}</span>
                        {liquidConfig.theme === t.id && <Check className="w-3.5 h-3.5 text-[#761A30]" />}
                      </div>
                      <span className="text-[10px] text-[#71717A] mt-0.5 block">{t.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode & Physics Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#18181B]">Navigation Geometry Mode</label>
                  <select
                    value={liquidConfig.mode}
                    onChange={(e) => {
                      updateLiquidConfig({ mode: e.target.value as any });
                      notify('Navigation geometry mode updated');
                    }}
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs font-bold text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  >
                    <option value="island">Dynamic Floating Island (Morphs on Scroll)</option>
                    <option value="floating-pill">Always Floating Pill (Centered Capsule)</option>
                    <option value="docked">Docked Glass Bar (Edge-to-Edge)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#18181B]">Spring Dynamic Physics</label>
                  <select
                    value={liquidConfig.physics}
                    onChange={(e) => {
                      updateLiquidConfig({ physics: e.target.value as any });
                      notify('Liquid spring physics updated');
                    }}
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs font-bold text-[#18181B] focus:outline-none focus:border-[#761A30]"
                  >
                    <option value="bouncy">Bouncy Mercury (Elastic Spring)</option>
                    <option value="smooth">Silk Flow (Gentle Ease)</option>
                    <option value="snappy">Snappy Instant (Tactile Quick)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={liquidConfig.showMobileLiquidDock}
                    onChange={(e) => updateLiquidConfig({ showMobileLiquidDock: e.target.checked })}
                    className="w-4 h-4 accent-[#761A30] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#18181B]">Mobile Floating Dock</span>
                </label>

                <label className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={liquidConfig.showGlow}
                    onChange={(e) => updateLiquidConfig({ showGlow: e.target.checked })}
                    className="w-4 h-4 accent-[#761A30] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#18181B]">Specular Ambient Glow</span>
                </label>

                <label className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={liquidConfig.compactOnScroll}
                    onChange={(e) => updateLiquidConfig({ compactOnScroll: e.target.checked })}
                    className="w-4 h-4 accent-[#761A30] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#18181B]">Compact On Scroll</span>
                </label>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* 1. PROJECT MODAL */}
      {/* ========================================================================= */}
      {modalType === 'project' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-4">
              <div>
                <h2 className="text-xl font-black text-[#18181B] tracking-tight">
                  {isNew ? 'Publish New Project' : 'Edit Project Details'}
                </h2>
                <p className="text-xs text-[#71717A]">Configure project case study, screenshots, links, and tags</p>
              </div>
              <button
                onClick={() => { setModalType(null); setEditingItem(null); }}
                className="w-8 h-8 rounded-full bg-[#FAFAFA] hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Smart Hospital Queue System"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Domain Category *</label>
                  <select
                    value={editingItem.category || 'Web Development'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  >
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Short Description / Executive Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Overview of the system, problem it solves, and technical architecture..."
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#18181B]">Screenshot / Cover Image</label>
                    <button
                      type="button"
                      onClick={() => projectImageInputRef.current?.click()}
                      className="text-[11px] font-bold text-[#761A30] hover:underline inline-flex items-center space-x-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload from Gallery</span>
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={projectImageInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleProjectImageFile(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={editingItem.image || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      placeholder="https://images.unsplash.com/... or upload"
                      className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                    />
                    {editingItem.image && (
                      <img
                        src={editingItem.image}
                        alt="Preview"
                        className="w-11 h-11 rounded-xl object-cover border border-black/10 shrink-0"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-1 flex flex-col justify-end">
                  <label className="flex items-center space-x-2 p-3 rounded-2xl bg-[#FAF3F5] border border-[#F4ECEE] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingItem.featured}
                      onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                      className="w-4 h-4 text-[#761A30] rounded focus:ring-[#761A30]"
                    />
                    <span className="text-xs font-bold text-[#761A30]">Highlight as Featured Project</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={editingItem.githubUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Live Demo / Deployment URL</label>
                  <input
                    type="text"
                    value={editingItem.liveUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>
              </div>

              {/* Technologies Tag Editor */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#18181B]">Technologies & Frameworks</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempTechInput}
                    onChange={(e) => setTempTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (tempTechInput.trim()) {
                          const current = Array.isArray(editingItem.technologies) ? editingItem.technologies : [];
                          setEditingItem({ ...editingItem, technologies: [...current, tempTechInput.trim()] });
                          setTempTechInput('');
                        }
                      }
                    }}
                    placeholder="Type tech and press Add (e.g. React, PostgreSQL, Cisco IOS)"
                    className="flex-1 p-2.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (tempTechInput.trim()) {
                        const current = Array.isArray(editingItem.technologies) ? editingItem.technologies : [];
                        setEditingItem({ ...editingItem, technologies: [...current, tempTechInput.trim()] });
                        setTempTechInput('');
                      }
                    }}
                    className="px-4 py-2 rounded-2xl bg-[#FAF3F5] text-[#761A30] font-bold text-xs hover:bg-[#761A30] hover:text-white border border-[#F4ECEE] transition-all"
                  >
                    Add Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {Array.isArray(editingItem.technologies) && editingItem.technologies.map((t: string, idx: number) => (
                    <span key={idx} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#FAF3F5] text-[#761A30] text-xs font-bold border border-[#F4ECEE]">
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingItem.technologies.filter((_: any, i: number) => i !== idx);
                          setEditingItem({ ...editingItem, technologies: updated });
                        }}
                        className="hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1EBEB] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => { setModalType(null); setEditingItem(null); }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-[#52525B] hover:bg-[#FAFAFA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  {isNew ? 'Publish Project' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SKILL MODAL */}
      {/* ========================================================================= */}
      {modalType === 'skill' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-3">
              <h3 className="font-bold text-base text-[#18181B]">{isNew ? 'Add Technical Skill' : 'Edit Skill'}</h3>
              <button onClick={() => setModalType(null)}><X className="w-4 h-4 text-[#71717A]" /></button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. TypeScript, Cisco Networking, PostgreSQL"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Category</label>
                <select
                  value={editingItem.category || 'Frontend'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                >
                  {['Languages', 'Frontend', 'Backend', 'Databases', 'DevOps & Tools', 'Network & Systems', 'Other Areas'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Proficiency Level</span>
                  <span className="text-[#761A30]">{editingItem.proficiency || 80}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={editingItem.proficiency || 80}
                  onChange={(e) => setEditingItem({ ...editingItem, proficiency: Number(e.target.value) })}
                  className="w-full accent-[#761A30]"
                />
              </div>

              <div className="pt-3 border-t border-[#F1EBEB] flex justify-end space-x-2">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 text-xs font-bold text-[#71717A]">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-[#761A30] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. EXPERIENCE MODAL */}
      {/* ========================================================================= */}
      {modalType === 'experience' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-4">
              <div>
                <h2 className="text-xl font-black text-[#18181B] tracking-tight">
                  {isNew ? 'Add Work Experience' : 'Edit Experience Record'}
                </h2>
                <p className="text-xs text-[#71717A]">Document your roles, technical responsibilities, and achievements</p>
              </div>
              <button
                onClick={() => { setModalType(null); setEditingItem(null); }}
                className="w-8 h-8 rounded-full bg-[#FAFAFA] hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveExperience} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Job Title / Role *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="e.g. Full-Stack Developer & Network Specialist"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.company || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    placeholder="e.g. St. Joseph Technology Lab"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Location</label>
                  <input
                    type="text"
                    value={editingItem.location || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="Dar es Salaam, Tanzania"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Start Date *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.startDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                    placeholder="e.g. Jan 2023 or 2023"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">End Date</label>
                  <input
                    type="text"
                    disabled={!!editingItem.current}
                    value={editingItem.current ? 'Present' : (editingItem.endDate || '')}
                    onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                    placeholder="e.g. Dec 2024 or Present"
                    className={`w-full p-3 rounded-2xl border text-sm focus:outline-none focus:border-[#761A30] ${
                      editingItem.current ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-[#FAFAFA] border-[#E4E4E7]'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="flex items-center space-x-2 p-3 rounded-2xl bg-[#FAF3F5] border border-[#F4ECEE] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!editingItem.current}
                    onChange={(e) => setEditingItem({ 
                      ...editingItem, 
                      current: e.target.checked,
                      endDate: e.target.checked ? 'Present' : '' 
                    })}
                    className="w-4 h-4 text-[#761A30] rounded focus:ring-[#761A30]"
                  />
                  <span className="text-xs font-bold text-[#761A30]">I am currently working in this role</span>
                </label>
              </div>

              {/* Responsibilities & Achievements List */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#18181B]">Key Responsibilities & Achievements</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempDescInput}
                    onChange={(e) => setTempDescInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (tempDescInput.trim()) {
                          const current = Array.isArray(editingItem.description) ? editingItem.description : [];
                          setEditingItem({ ...editingItem, description: [...current, tempDescInput.trim()] });
                          setTempDescInput('');
                        }
                      }
                    }}
                    placeholder="Add a bullet point (e.g. Designed secure VLAN subnets for campus laboratories)"
                    className="flex-1 p-2.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (tempDescInput.trim()) {
                        const current = Array.isArray(editingItem.description) ? editingItem.description : [];
                        setEditingItem({ ...editingItem, description: [...current, tempDescInput.trim()] });
                        setTempDescInput('');
                      }
                    }}
                    className="px-4 py-2 rounded-2xl bg-[#FAF3F5] text-[#761A30] font-bold text-xs hover:bg-[#761A30] hover:text-white border border-[#F4ECEE] transition-all"
                  >
                    Add Point
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  {Array.isArray(editingItem.description) && editingItem.description.map((desc: string, idx: number) => (
                    <div key={idx} className="flex items-start justify-between p-2.5 rounded-xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs text-[#52525B]">
                      <span className="flex-1 pr-2 leading-relaxed">• {desc}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingItem.description.filter((_: any, i: number) => i !== idx);
                          setEditingItem({ ...editingItem, description: updated });
                        }}
                        className="text-rose-500 hover:text-rose-700 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#18181B]">Technologies & Tools Used</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempTechInput}
                    onChange={(e) => setTempTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (tempTechInput.trim()) {
                          const current = Array.isArray(editingItem.technologies) ? editingItem.technologies : [];
                          setEditingItem({ ...editingItem, technologies: [...current, tempTechInput.trim()] });
                          setTempTechInput('');
                        }
                      }
                    }}
                    placeholder="Type tech and press Enter (e.g. React, Docker, Cisco Packet Tracer)"
                    className="flex-1 p-2.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (tempTechInput.trim()) {
                        const current = Array.isArray(editingItem.technologies) ? editingItem.technologies : [];
                        setEditingItem({ ...editingItem, technologies: [...current, tempTechInput.trim()] });
                        setTempTechInput('');
                      }
                    }}
                    className="px-4 py-2 rounded-2xl bg-[#FAF3F5] text-[#761A30] font-bold text-xs hover:bg-[#761A30] hover:text-white border border-[#F4ECEE] transition-all"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {Array.isArray(editingItem.technologies) && editingItem.technologies.map((t: string, idx: number) => (
                    <span key={idx} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#FAF3F5] text-[#761A30] text-xs font-bold border border-[#F4ECEE]">
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingItem.technologies.filter((_: any, i: number) => i !== idx);
                          setEditingItem({ ...editingItem, technologies: updated });
                        }}
                        className="hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1EBEB] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => { setModalType(null); setEditingItem(null); }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-[#52525B] hover:bg-[#FAFAFA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  {isNew ? 'Save Experience' : 'Update Experience'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. EDUCATION MODAL */}
      {/* ========================================================================= */}
      {modalType === 'education' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-3">
              <h3 className="font-bold text-base text-[#18181B]">{isNew ? 'Add Academic Education' : 'Edit Education'}</h3>
              <button onClick={() => setModalType(null)}><X className="w-4 h-4 text-[#71717A]" /></button>
            </div>

            <form onSubmit={handleSaveEducation} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Degree Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.degree || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                  placeholder="e.g. B.Sc. in Computer Science"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Institution / University *</label>
                <input
                  type="text"
                  required
                  value={editingItem.institution || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                  placeholder="e.g. St. Joseph University in Tanzania"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Start Year *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.startDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                    placeholder="2021"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">End Year / Expected</label>
                  <input
                    type="text"
                    value={editingItem.endDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                    placeholder="2024"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Field of Study</label>
                <input
                  type="text"
                  value={editingItem.fieldOfStudy || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, fieldOfStudy: e.target.value })}
                  placeholder="e.g. Software Systems & Network Engineering"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Grade / Honors</label>
                <input
                  type="text"
                  value={editingItem.grade || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, grade: e.target.value })}
                  placeholder="e.g. First Class Honours / Distinction"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="pt-3 border-t border-[#F1EBEB] flex justify-end space-x-2">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 text-xs font-bold text-[#71717A]">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-[#761A30] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CERTIFICATION MODAL */}
      {/* ========================================================================= */}
      {modalType === 'certification' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-3">
              <h3 className="font-bold text-base text-[#18181B]">{isNew ? 'Add Technical Certification' : 'Edit Certification'}</h3>
              <button onClick={() => setModalType(null)}><X className="w-4 h-4 text-[#71717A]" /></button>
            </div>

            <form onSubmit={handleSaveCertification} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Certification Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. CCNA Routing and Switching / AWS Cloud"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Issuing Organization *</label>
                <input
                  type="text"
                  required
                  value={editingItem.issuer || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                  placeholder="e.g. Cisco Systems, Google, Oracle"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Issue Date / Year *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.issueDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, issueDate: e.target.value })}
                    placeholder="2024"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#18181B]">Expiration Date</label>
                  <input
                    type="text"
                    value={editingItem.expirationDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, expirationDate: e.target.value })}
                    placeholder="No Expiration or 2027"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Credential Verification URL</label>
                <input
                  type="text"
                  value={editingItem.credentialUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, credentialUrl: e.target.value })}
                  placeholder="https://www.credly.com/..."
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#18181B]">Certificate Badge / Seal Image (Optional)</label>
                  <button
                    type="button"
                    onClick={() => certImageInputRef.current?.click()}
                    className="text-[11px] font-bold text-[#761A30] hover:underline inline-flex items-center space-x-1"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload from Gallery</span>
                  </button>
                </div>
                <input
                  type="file"
                  ref={certImageInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleCertImageFile(e.target.files[0]);
                    }
                  }}
                />
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={editingItem.image || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    placeholder="https://... or upload from gallery"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                  />
                  {editingItem.image && (
                    <img
                      src={editingItem.image}
                      alt="Badge"
                      className="w-11 h-11 rounded-xl object-cover border border-black/10 shrink-0"
                    />
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1EBEB] flex justify-end space-x-2">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 text-xs font-bold text-[#71717A]">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-[#761A30] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SERVICE MODAL */}
      {/* ========================================================================= */}
      {modalType === 'service' && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-3">
              <h3 className="font-bold text-base text-[#18181B]">{isNew ? 'Add Service Offering' : 'Edit Service'}</h3>
              <button onClick={() => setModalType(null)}><X className="w-4 h-4 text-[#71717A]" /></button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Enterprise Full-Stack Web Development"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Describe your capabilities, workflow, and deliverables..."
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-sm focus:outline-none focus:border-[#761A30]"
                />
              </div>

              {/* Service Features Tag Editor */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#18181B]">Key Deliverables / Features</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempFeatureInput}
                    onChange={(e) => setTempFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (tempFeatureInput.trim()) {
                          const current = Array.isArray(editingItem.features) ? editingItem.features : [];
                          setEditingItem({ ...editingItem, features: [...current, tempFeatureInput.trim()] });
                          setTempFeatureInput('');
                        }
                      }
                    }}
                    placeholder="e.g. Responsive UI, REST API, Database Integration"
                    className="flex-1 p-2.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (tempFeatureInput.trim()) {
                        const current = Array.isArray(editingItem.features) ? editingItem.features : [];
                        setEditingItem({ ...editingItem, features: [...current, tempFeatureInput.trim()] });
                        setTempFeatureInput('');
                      }
                    }}
                    className="px-4 py-2 rounded-2xl bg-[#FAF3F5] text-[#761A30] font-bold text-xs hover:bg-[#761A30] hover:text-white border border-[#F4ECEE] transition-all"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {Array.isArray(editingItem.features) && editingItem.features.map((feat: string, idx: number) => (
                    <span key={idx} className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#FAF3F5] text-[#761A30] text-xs font-bold border border-[#F4ECEE]">
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingItem.features.filter((_: any, i: number) => i !== idx);
                          setEditingItem({ ...editingItem, features: updated });
                        }}
                        className="hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1EBEB] flex justify-end space-x-2">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 text-xs font-bold text-[#71717A]">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-[#761A30] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <footer className="w-full py-6 text-center text-xs text-[#71717A] border-t border-[#F1EBEB] mt-12">
        <p>© {new Date().getFullYear()} Elieza Mwakyoma. Admin Portal • St. Joseph University in Tanzania.</p>
      </footer>

    </div>
  );
};
