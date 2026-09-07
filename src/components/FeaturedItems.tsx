import React, { useState } from 'react';
import { 
  Bookmark, 
  ExternalLink, 
  Eye, 
  Star, 
  Github, 
  ArrowRight, 
  Check, 
  Layers, 
  Terminal,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';

export const FeaturedItems: React.FC = () => {
  const { 
    projects, 
    selectedCategory, 
    setSelectedCategory, 
    setActiveProject, 
    toggleBookmark, 
    isBookmarked,
    showToast 
  } = usePortfolio();

  const [visibleCount, setVisibleCount] = useState<number>(8);

  const categories = ['All', 'Web Development', 'Mobile', 'Networking', 'Algorithms', 'Database', 'DevOps', 'UI/UX'];

  // Filter projects by active category
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section id="featured-projects" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup "Featured Item" */}
        <div className="text-center space-y-2 mb-8 sm:mb-12">
          <p className="font-serif italic text-lg sm:text-xl text-[#761A30] font-normal">
            Portfolio Showcase
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#18181B] tracking-tight">
            Featured Projects & Implementations
          </h2>
          <p className="text-xs sm:text-sm text-[#71717A] max-w-xl mx-auto">
            Practical software applications, algorithmic solutions, and production web systems engineered by Elieza.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#761A30] text-white shadow-md'
                      : 'bg-white text-[#52525B] hover:bg-[#FAF3F5] hover:text-[#761A30] border border-[#E4E4E7]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 8-Card Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProjects.map((project) => {
            const bookmarked = isBookmarked(project.id || project._id || '');

            return (
              <div
                key={project._id || project.id}
                onClick={() => setActiveProject(project)}
                className="group relative bg-[#FAF8F8] rounded-3xl p-4 border border-[#F1EBEB] hover:border-[#761A30]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Image Container with Top Badges */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top-Left Category Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide text-[#761A30] shadow-xs">
                    {project.category}
                  </div>

                  {/* Top-Right Bookmark Heart/Save Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(project.id || project._id || '');
                    }}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
                      bookmarked
                        ? 'bg-[#761A30] text-white'
                        : 'bg-white/90 text-[#71717A] hover:text-[#761A30] hover:bg-white'
                    }`}
                    title={bookmarked ? 'Remove from saved dock' : 'Save to project dock'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick Action Overlay Hint */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project);
                      }}
                      className="px-3 py-1.5 rounded-full bg-white text-[#18181B] font-bold text-xs shadow-lg flex items-center space-x-1 hover:bg-[#FAF3F5] hover:text-[#761A30]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="space-y-2 text-left">
                  {/* Origin & Discipline */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#71717A]">
                    <span className="truncate">{project.category}</span>
                    <span className="inline-flex items-center text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Active
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-black text-[#18181B] group-hover:text-[#761A30] transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  {/* Tech stack badge pills */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-bold bg-white px-2 py-0.5 rounded-md text-[#52525B] border border-[#E4E4E7]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[9px] font-bold text-[#71717A] py-0.5">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer Row: Code & Live Link Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E4E4E7] mt-2">
                    <span className="text-[11px] font-extrabold text-[#761A30] tracking-wide uppercase">
                      Case Study
                    </span>

                    <div className="flex items-center space-x-1.5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg bg-white text-[#52525B] hover:text-[#761A30] hover:bg-[#FAF3F5] border border-[#E4E4E7] transition-colors cursor-pointer"
                          title="Open Live Deployment"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-white text-[#52525B] hover:text-[#761A30] hover:bg-[#FAF3F5] border border-[#E4E4E7] transition-colors cursor-pointer"
                        title="View Source on GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button matching mockup */}
        {filteredProjects.length > visibleCount && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-8 py-3.5 rounded-full bg-[#FAF3F5] hover:bg-[#761A30] text-[#761A30] hover:text-white font-black text-xs tracking-wider uppercase transition-all border border-[#F4ECEE] shadow-xs"
            >
              Load More Projects ({filteredProjects.length - visibleCount} remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
