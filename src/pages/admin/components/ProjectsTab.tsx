import React, { useState } from 'react';
import { 
  FolderKanban, Plus, Search, Edit, Trash2, ExternalLink, 
  Github, Star, LayoutGrid, List, X, Sparkles, Filter
} from 'lucide-react';
import { Project } from '../../../types';

interface ProjectsTabProps {
  projects: Project[];
  onOpenNewProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string, title: string) => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  onOpenNewProject,
  onEditProject,
  onDeleteProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories = ['All', 'Web Development', 'Mobile Development', 'Network & Systems', 'Other'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(p.technologies) && p.technologies.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-[#18181B] tracking-tight">
              Published Projects
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-black text-xs border border-[#F4ECEE]">
              {projects.length} Total
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Showcase your full-stack web applications, networking configurations, and mobile software.
          </p>
        </div>

        <button
          onClick={onOpenNewProject}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Project</span>
        </button>
      </div>

      {/* Filter and View Controls Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, description, or tech stack..."
              className="w-full pl-9 pr-8 py-2.5 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#18181B]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Toggle: Grid vs Table */}
          <div className="flex items-center space-x-1 p-1 rounded-2xl bg-[#F4F4F5] self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#761A30] shadow-xs'
                  : 'text-[#71717A] hover:text-[#18181B]'
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#761A30] shadow-xs'
                  : 'text-[#71717A] hover:text-[#18181B]'
              }`}
              title="Table List View"
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          <Filter className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" />
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? projects.length 
              : projects.filter(p => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#761A30] text-white shadow-xs'
                    : 'bg-[#FAFAFA] text-[#52525B] hover:bg-[#FAF3F5] hover:text-[#761A30] border border-[#E4E4E7]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Content: Grid View or Table View */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#EAE3E5] text-center space-y-3">
          <FolderKanban className="w-10 h-10 mx-auto text-[#A1A1AA]" />
          <h3 className="text-base font-bold text-[#18181B]">No matching projects found</h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            Try adjusting your search query or category filter, or publish a new project case study.
          </p>
          <div className="pt-2 flex justify-center gap-2">
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 rounded-full bg-[#FAFAFA] border border-[#E4E4E7] text-xs font-bold text-[#52525B] hover:bg-slate-100"
              >
                Clear Filters
              </button>
            )}
            <button
              onClick={onOpenNewProject}
              className="px-4 py-2 rounded-full bg-[#761A30] text-white text-xs font-bold hover:bg-[#5E1426]"
            >
              Publish New Project
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const id = project._id || project.id;
            return (
              <div
                key={id}
                className="rounded-3xl bg-white border border-[#EAE3E5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Project Image Header */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                      <FolderKanban className="w-12 h-12 stroke-[1.2]" />
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#761A30] font-black text-[10px] tracking-wide uppercase shadow-xs">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-900 font-black text-[10px] flex items-center space-x-1 shadow-xs">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif font-black text-lg text-[#18181B] group-hover:text-[#761A30] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#52525B] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {Array.isArray(project.technologies) && project.technologies.slice(0, 4).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] text-[10px] font-bold border border-[#F4ECEE]"
                      >
                        {tech}
                      </span>
                    ))}
                    {Array.isArray(project.technologies) && project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Bottom Actions Bar */}
                  <div className="pt-3 border-t border-[#F1EBEB] flex items-center justify-between">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#52525B] hover:text-[#18181B]"
                        title="Open GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Repository</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-[#A1A1AA]">No Repo link</span>
                    )}

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => onEditProject(project)}
                        className="p-2 rounded-xl bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(id, project.title)}
                        className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-3xl border border-[#EAE3E5] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9FA] text-[#71717A] uppercase text-[10px] font-black tracking-wider border-b border-[#F1EBEB]">
                <tr>
                  <th className="px-6 py-3.5">Project</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Technologies</th>
                  <th className="px-6 py-3.5">Featured</th>
                  <th className="px-6 py-3.5">GitHub Repository</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1EBEB]">
                {filteredProjects.map((project) => {
                  const id = project._id || project.id;
                  return (
                    <tr key={id} className="hover:bg-[#FAF9FA] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-12 h-12 rounded-xl object-cover border border-black/10 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                              <FolderKanban className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-sm text-[#18181B] truncate max-w-xs">{project.title}</p>
                            <p className="text-[11px] text-[#71717A] truncate max-w-xs">{project.description}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#FAF3F5] text-[#761A30] font-bold text-[10px]">
                          {project.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((t: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-[#52525B] text-[10px]">
                              {t}
                            </span>
                          ))}
                          {Array.isArray(project.technologies) && project.technologies.length > 3 && (
                            <span className="text-[10px] text-slate-500 font-bold">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {project.featured ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                            <Star className="w-3 h-3 fill-current" />
                            <span>Featured</span>
                          </span>
                        ) : (
                          <span className="text-[#A1A1AA] text-[11px]">Standard</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1 text-[#761A30] font-bold hover:underline"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>GitHub Repository</span>
                          </a>
                        ) : (
                          <span className="text-[#A1A1AA]">—</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => onEditProject(project)}
                            className="p-1.5 rounded-lg bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white transition-colors"
                            title="Edit Project"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteProject(id, project.title)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
