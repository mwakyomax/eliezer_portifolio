import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { processGalleryImage } from '../../utils/imageUtils';
import { SEO } from '../../components/SEO';
import { 
  PROJECTS_DATA,
  SKILLS_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  SERVICES_DATA,
  PORTFOLIO_SETTINGS,
  DEFAULT_PROFILE_IMAGE
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
import { 
  Project, Skill, Experience, Education, Certification, 
  Service, Message, PortfolioSettings 
} from '../../types';

// Admin Subcomponents
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { OverviewTab } from './components/OverviewTab';
import { ProjectsTab } from './components/ProjectsTab';
import { SkillsTab } from './components/SkillsTab';
import { ExperienceTab } from './components/ExperienceTab';
import { EducationTab } from './components/EducationTab';
import { CertificationsTab } from './components/CertificationsTab';
import { ServicesTab } from './components/ServicesTab';
import { MessagesTab } from './components/MessagesTab';
import { SettingsTab } from './components/SettingsTab';
import { AdminModals } from './components/AdminModals';

export const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { updateSettingsState } = usePortfolio();
  const navigate = useNavigate();

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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

  // Gallery and Image Upload States
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);
  const certImageInputRef = useRef<HTMLInputElement>(null);
  const [imageMeta, setImageMeta] = useState<{ sizeKb?: number; width?: number; height?: number; name?: string } | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);

  // Modal / Form state
  const [modalType, setModalType] = useState<string | null>(null);
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
          ? ` (${counts.projects} projects, ${counts.skills} skills, ${counts.experience} experiences)`
          : '';
        notify(`Database successfully synchronized!${countInfo}`);
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
    if (window.confirm('Delete this education entry?')) {
      try {
        await deleteEducation(id);
        setEducation(education.filter((e) => e._id !== id && e.id !== id));
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
      issuer: 'Cisco',
      issueDate: '2024',
      expirationDate: '2027',
      credentialUrl: '',
      image: ''
    });
    setModalType('certification');
  };

  const handleEditCertification = (c: Certification) => {
    setIsNew(false);
    setEditingItem({ ...c });
    setModalType('certification');
  };

  const handleSaveCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        const res = await createCertification(editingItem);
        if (res.data.success) {
          setCertifications([...certifications, res.data.data]);
          notify('Certification added!');
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
        notify('Certification deleted.');
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
      icon: 'Layers',
      features: ['Technical architecture design', 'Full-cycle implementation']
    });
    setTempFeatureInput('');
    setModalType('service');
  };

  const handleEditService = (s: Service) => {
    setIsNew(false);
    setEditingItem({ ...s, features: Array.isArray(s.features) ? [...s.features] : [] });
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
          notify('Service added successfully!');
        }
      } else {
        const id = editingItem._id || editingItem.id;
        const res = await updateService(id, editingItem);
        if (res.data.success) {
          setServices(services.map((s) => (s._id === id || s.id === id ? res.data.data : s)));
          notify('Service updated!');
        }
      }
      setModalType(null);
      setEditingItem(null);
    } catch (err: any) {
      notify('Error saving service', 'error');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Delete this service?')) {
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
  const handleToggleMessageRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await toggleMessageRead(id, !currentRead);
      if (res.data.success) {
        setMessages(messages.map((m) => (m._id === id || m.id === id ? { ...m, read: !currentRead } : m)));
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
        setMessages(messages.filter((m) => m._id !== id && m.id !== id));
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

      try {
        const { _id, id, __v, createdAt, updatedAt, ...cleanUpdate } = newSettings;
        const res = await updateSettings(cleanUpdate);
        if (res.data.success) {
          updateSettingsState(res.data.data);
          notify(`Profile photo updated!`);
        } else {
          notify(`Photo loaded! Click "Save Settings" to finalize.`);
        }
      } catch (saveErr) {
        notify(`Photo loaded (${result.sizeKb} KB)! Click "Save Settings" to apply.`);
      }
    } catch (err: any) {
      notify(err.message || 'Failed to process selected image', 'error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleResetOriginalPhoto = async () => {
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
      notify('Reset to original Elieza portrait.');
    }
  };

  const handleRemoveProfileImage = async () => {
    if (settings) {
      const newSettings = {
        ...settings,
        profileImage: ''
      };
      setSettings(newSettings);
      updateSettingsState(newSettings);
      setImageMeta(null);
      try {
        const { _id, id, __v, createdAt, updatedAt, ...cleanUpdate } = newSettings;
        await updateSettings(cleanUpdate);
      } catch (e) {}
      notify('Profile photo removed.');
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
        notify('Portfolio profile and settings saved successfully!');
      } else {
        notify(res.data.message || 'Failed to save settings', 'error');
      }
    } catch (err: any) {
      notify(err.response?.data?.message || err.message || 'Failed to save settings', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF9FA] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#761A30] text-white flex items-center justify-center shadow-lg animate-pulse">
          <span className="font-serif font-black text-2xl">E</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-[#71717A]">
          <RefreshCw className="w-4 h-4 text-[#761A30] animate-spin" />
          <span>Synchronizing Admin Console...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9FA] text-[#18181B] flex font-sans">
      <SEO 
        title="Admin Console • Elieza Mwakyoma" 
        description="Executive administration console for managing portfolio projects, credentials, and client inquiries."
      />

      {/* Floating Status Notification Toast */}
      {statusMsg && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className={`px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs font-bold border ${
            statusType === 'success'
              ? 'bg-slate-900 text-white border-slate-800'
              : 'bg-rose-950 text-white border-rose-900'
          }`}>
            {statusType === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{statusMsg}</span>
            <button onClick={() => setStatusMsg('')} className="text-white/60 hover:text-white ml-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Left Sidebar (Desktop Fixed Sticky) */}
      <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-[#EFE9EB] h-screen sticky top-0 z-30 shadow-2xs">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          projectsCount={projects.length}
          skillsCount={skills.length}
          experienceCount={experience.length}
          educationCount={education.length}
          certificationsCount={certifications.length}
          servicesCount={services.length}
          messagesCount={messages.length}
          unreadMessagesCount={unreadMessagesCount}
          settings={settings}
          isSeeding={isSeeding}
          onSeedDatabase={handleSeedDatabase}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Drawer (When Open) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          {/* Drawer container */}
          <div className="relative w-72 max-w-[80vw] h-full bg-white z-10 shadow-2xl animate-in slide-in-from-left duration-300">
            <AdminSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              closeMobileMenu={() => setMobileMenuOpen(false)}
              projectsCount={projects.length}
              skillsCount={skills.length}
              experienceCount={experience.length}
              educationCount={education.length}
              certificationsCount={certifications.length}
              servicesCount={services.length}
              messagesCount={messages.length}
              unreadMessagesCount={unreadMessagesCount}
              settings={settings}
              isSeeding={isSeeding}
              onSeedDatabase={handleSeedDatabase}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main Right Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header with breadcrumbs and actions */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          unreadMessagesCount={unreadMessagesCount}
          onSelectTab={setActiveTab}
          onOpenNewProject={handleOpenNewProject}
          isSeeding={isSeeding}
          onSeedDatabase={handleSeedDatabase}
          settings={settings}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'dashboard' && (
            <OverviewTab
              projects={projects}
              skills={skills}
              experience={experience}
              messages={messages}
              settings={settings}
              onNavigateTab={setActiveTab}
              onOpenNewProject={handleOpenNewProject}
              onOpenNewExperience={handleOpenNewExperience}
              onToggleMessageRead={handleToggleMessageRead}
              onSeedDatabase={handleSeedDatabase}
              isSeeding={isSeeding}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              projects={projects}
              onOpenNewProject={handleOpenNewProject}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsTab
              skills={skills}
              onOpenNewSkill={handleOpenNewSkill}
              onEditSkill={handleEditSkill}
              onDeleteSkill={handleDeleteSkill}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceTab
              experience={experience}
              onOpenNewExperience={handleOpenNewExperience}
              onEditExperience={handleEditExperience}
              onDeleteExperience={handleDeleteExperience}
            />
          )}

          {activeTab === 'education' && (
            <EducationTab
              education={education}
              onOpenNewEducation={handleOpenNewEducation}
              onEditEducation={handleEditEducation}
              onDeleteEducation={handleDeleteEducation}
            />
          )}

          {activeTab === 'certifications' && (
            <CertificationsTab
              certifications={certifications}
              onOpenNewCertification={handleOpenNewCertification}
              onEditCertification={handleEditCertification}
              onDeleteCertification={handleDeleteCertification}
            />
          )}

          {activeTab === 'services' && (
            <ServicesTab
              services={services}
              onOpenNewService={handleOpenNewService}
              onEditService={handleEditService}
              onDeleteService={handleDeleteService}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesTab
              messages={messages}
              onToggleRead={handleToggleMessageRead}
              onDeleteMessage={handleDeleteMessage}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              settings={settings}
              onUpdateSettings={setSettings}
              onSaveSettings={handleSaveSettings}
              onResetOriginalPhoto={handleResetOriginalPhoto}
              onRemovePhoto={handleRemoveProfileImage}
              onFileSelect={handleProfileImageFile}
              profileInputRef={profileImageInputRef}
              isProcessingImage={isProcessingImage}
              imageMeta={imageMeta}
              notify={notify}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-xs text-[#71717A] border-t border-[#F1EBEB] mt-auto">
          <p>© {new Date().getFullYear()} Elieza Mwakyoma. Executive Admin Console • St. Joseph University in Tanzania.</p>
        </footer>
      </div>

      {/* Reusable Modals & Dialogs */}
      <AdminModals
        modalType={modalType}
        setModalType={setModalType}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        isNew={isNew}
        tempTechInput={tempTechInput}
        setTempTechInput={setTempTechInput}
        tempDescInput={tempDescInput}
        setTempDescInput={setTempDescInput}
        tempFeatureInput={tempFeatureInput}
        setTempFeatureInput={setTempFeatureInput}
        projectImageInputRef={projectImageInputRef}
        certImageInputRef={certImageInputRef}
        handleProjectImageFile={handleProjectImageFile}
        handleCertImageFile={handleCertImageFile}
        handleSaveProject={handleSaveProject}
        handleSaveSkill={handleSaveSkill}
        handleSaveExperience={handleSaveExperience}
        handleSaveEducation={handleSaveEducation}
        handleSaveCertification={handleSaveCertification}
        handleSaveService={handleSaveService}
      />
    </div>
  );
};
