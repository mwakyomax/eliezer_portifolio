import React from 'react';
import { X, Upload, Trash2, Plus, Star } from 'lucide-react';

interface AdminModalsProps {
  modalType: string | null;
  setModalType: (type: string | null) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  isNew: boolean;
  tempTechInput: string;
  setTempTechInput: (val: string) => void;
  tempDescInput: string;
  setTempDescInput: (val: string) => void;
  tempFeatureInput: string;
  setTempFeatureInput: (val: string) => void;
  projectImageInputRef: React.RefObject<HTMLInputElement>;
  certImageInputRef: React.RefObject<HTMLInputElement>;
  handleProjectImageFile: (file: File) => void;
  handleCertImageFile: (file: File) => void;
  handleSaveProject: (e: React.FormEvent) => void;
  handleSaveSkill: (e: React.FormEvent) => void;
  handleSaveExperience: (e: React.FormEvent) => void;
  handleSaveEducation: (e: React.FormEvent) => void;
  handleSaveCertification: (e: React.FormEvent) => void;
  handleSaveService: (e: React.FormEvent) => void;
}

export const AdminModals: React.FC<AdminModalsProps> = ({
  modalType,
  setModalType,
  editingItem,
  setEditingItem,
  isNew,
  tempTechInput,
  setTempTechInput,
  tempDescInput,
  setTempDescInput,
  tempFeatureInput,
  setTempFeatureInput,
  projectImageInputRef,
  certImageInputRef,
  handleProjectImageFile,
  handleCertImageFile,
  handleSaveProject,
  handleSaveSkill,
  handleSaveExperience,
  handleSaveEducation,
  handleSaveCertification,
  handleSaveService,
}) => {
  if (!modalType || !editingItem) return null;

  const closeModal = () => {
    setModalType(null);
    setEditingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      {/* 1. PROJECT MODAL */}
      {modalType === 'project' && (
        <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-4">
            <div>
              <h2 className="text-xl font-black text-[#18181B] tracking-tight">
                {isNew ? 'Publish New Project' : 'Edit Project Details'}
              </h2>
              <p className="text-xs text-[#71717A]">Configure project case study, screenshots, repository link, and tags</p>
            </div>
            <button
              onClick={closeModal}
              className="w-8 h-8 rounded-full bg-[#FAFAFA] hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] flex items-center justify-center transition-colors cursor-pointer"
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
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Domain Category *</label>
                <select
                  value={editingItem.category || 'Web Development'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                >
                  {['Web Development', 'Mobile Development', 'Network & Systems', 'Other'].map((cat) => (
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#18181B]">Screenshot / Cover Image</label>
                  <button
                    type="button"
                    onClick={() => projectImageInputRef.current?.click()}
                    className="text-[11px] font-bold text-[#761A30] hover:underline inline-flex items-center space-x-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload File</span>
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
                    placeholder="https://... or upload"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                  />
                  {editingItem.image && (
                    <img
                      src={editingItem.image}
                      alt="Preview"
                      className="w-10 h-10 rounded-xl object-cover border border-black/10 shrink-0"
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

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#18181B]">GitHub Repository URL</label>
              <input
                type="text"
                value={editingItem.githubUrl || ''}
                onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
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
                  className="px-4 py-2 rounded-2xl bg-[#FAF3F5] text-[#761A30] font-bold text-xs hover:bg-[#761A30] hover:text-white border border-[#F4ECEE] transition-all cursor-pointer"
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
                onClick={closeModal}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-[#52525B] hover:bg-[#FAFAFA] cursor-pointer"
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
      )}

      {/* 2. SKILL MODAL */}
      {modalType === 'skill' && (
        <div className="bg-white w-full max-w-md rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-3">
            <h3 className="font-bold text-base text-[#18181B]">{isNew ? 'Add Technical Skill' : 'Edit Skill'}</h3>
            <button onClick={closeModal} className="cursor-pointer"><X className="w-4 h-4 text-[#71717A]" /></button>
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#18181B]">Category</label>
              <select
                value={editingItem.category || 'Frontend'}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
              <button type="button" onClick={closeModal} className="px-4 py-2 text-xs font-bold text-[#71717A] cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 rounded-full bg-[#761A30] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer">
                Save Skill
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. EXPERIENCE MODAL */}
      {modalType === 'experience' && (
        <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-4">
            <div>
              <h2 className="text-xl font-black text-[#18181B] tracking-tight">
                {isNew ? 'Add Work Experience' : 'Edit Experience Record'}
              </h2>
              <p className="text-xs text-[#71717A]">Document your roles, technical responsibilities, and achievements</p>
            </div>
            <button
              onClick={closeModal}
              className="w-8 h-8 rounded-full bg-[#FAFAFA] hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] flex items-center justify-center transition-colors cursor-pointer"
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
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                  className={`w-full p-3 rounded-2xl border text-xs focus:outline-none focus:border-[#761A30] ${
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

            {/* Responsibilities */}
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
                  className="px-4 py-2 rounded-2xl bg-[#FAF3F5] text-[#761A30] font-bold text-xs hover:bg-[#761A30] hover:text-white border border-[#F4ECEE] transition-all cursor-pointer"
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
                      className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer"
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
                  className="px-4 py-2 rounded-2xl bg-[#FAF3F5] text-[#761A30] font-bold text-xs hover:bg-[#761A30] hover:text-white border border-[#F4ECEE] transition-all cursor-pointer"
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
                onClick={closeModal}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-[#52525B] hover:bg-[#FAFAFA] cursor-pointer"
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
      )}

      {/* 4. EDUCATION MODAL */}
      {modalType === 'education' && (
        <div className="bg-white w-full max-w-lg rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-3">
            <h3 className="font-bold text-base text-[#18181B]">{isNew ? 'Add Academic Education' : 'Edit Education'}</h3>
            <button onClick={closeModal} className="cursor-pointer"><X className="w-4 h-4 text-[#71717A]" /></button>
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">End Year / Expected</label>
                <input
                  type="text"
                  value={editingItem.endDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                  placeholder="2024"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#18181B]">Grade / Honors</label>
              <input
                type="text"
                value={editingItem.grade || ''}
                onChange={(e) => setEditingItem({ ...editingItem, grade: e.target.value })}
                placeholder="e.g. First Class Honours / Distinction"
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="pt-3 border-t border-[#F1EBEB] flex justify-end space-x-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-xs font-bold text-[#71717A] cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 rounded-full bg-[#761A30] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer">
                Save Education
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. CERTIFICATION MODAL */}
      {modalType === 'certification' && (
        <div className="bg-white w-full max-w-lg rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-3">
            <h3 className="font-bold text-base text-[#18181B]">{isNew ? 'Add Technical Certification' : 'Edit Certification'}</h3>
            <button onClick={closeModal} className="cursor-pointer"><X className="w-4 h-4 text-[#71717A]" /></button>
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">Expiration Date</label>
                <input
                  type="text"
                  value={editingItem.expirationDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, expirationDate: e.target.value })}
                  placeholder="No Expiration or 2027"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#18181B]">Certificate Badge / Seal Image (Optional)</label>
                <button
                  type="button"
                  onClick={() => certImageInputRef.current?.click()}
                  className="text-[11px] font-bold text-[#761A30] hover:underline inline-flex items-center space-x-1 cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
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
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                />
                {editingItem.image && (
                  <img
                    src={editingItem.image}
                    alt="Badge"
                    className="w-10 h-10 rounded-xl object-cover border border-black/10 shrink-0"
                  />
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1EBEB] flex justify-end space-x-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 text-xs font-bold text-[#71717A] cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 rounded-full bg-[#761A30] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer">
                Save Certification
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. SERVICE MODAL */}
      {modalType === 'service' && (
        <div className="bg-white w-full max-w-lg rounded-3xl border border-[#F1EBEB] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-3">
            <h3 className="font-bold text-base text-[#18181B]">{isNew ? 'Add Service Offering' : 'Edit Service'}</h3>
            <button onClick={closeModal} className="cursor-pointer"><X className="w-4 h-4 text-[#71717A]" /></button>
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
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
                  className="px-4 py-2 rounded-2xl bg-[#FAF3F5] text-[#761A30] font-bold text-xs hover:bg-[#761A30] hover:text-white border border-[#F4ECEE] transition-all cursor-pointer"
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
              <button type="button" onClick={closeModal} className="px-4 py-2 text-xs font-bold text-[#71717A] cursor-pointer">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 rounded-full bg-[#761A30] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer">
                Save Service
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
