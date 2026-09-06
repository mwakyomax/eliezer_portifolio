import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Layout, Server, Database, Terminal, Shield, Cpu, Layers, GitBranch, Smartphone, Wifi, Network } from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
  loading?: boolean;
}

const CATEGORIES = [
  'All',
  'Programming Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Tools & Platforms',
  'Network & Systems',
  'Other Areas',
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Programming Languages': return Code;
    case 'Frontend': return Layout;
    case 'Backend': return Server;
    case 'Databases': return Database;
    case 'Tools & Platforms': return Terminal;
    case 'Network & Systems': return Network;
    case 'Other Areas': return Cpu;
    default: return Layers;
  }
};

export const Skills: React.FC<SkillsProps> = ({ skills, loading }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  // Group skills by category when 'All' is selected
  const categoriesPresent = Array.from(new Set(skills.map(s => s.category))) as string[];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-xs font-mono tracking-widest text-blue-400 uppercase font-semibold">
            Technical Expertise
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            Skills & Competencies
          </h3>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base">
            Languages, frameworks, databases, and engineering tools mastered throughout academic studies and software development projects.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="skills-category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-slate-800/40 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : activeCategory !== 'All' ? (
          /* Single Category Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill._id || skill.id || skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  {skill.name}
                </h4>
                <span className="text-[10px] font-mono text-slate-400 mt-1">
                  {skill.category}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Grouped by Category View */
          <div className="space-y-12">
            {categoriesPresent.map((category) => {
              const Icon = getCategoryIcon(category);
              const catSkills = skills.filter((s) => s.category === category);
              if (catSkills.length === 0) return null;

              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                    <Icon className="w-5 h-5 text-blue-400" />
                    <h4 className="text-lg font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                      {category}
                    </h4>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 dark:bg-slate-800 light:bg-slate-100 px-2 py-0.5 rounded-full">
                      {catSkills.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {catSkills.map((skill) => (
                      <div
                        key={skill._id || skill.id || skill.name}
                        className="p-3.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-blue-500/40 hover:bg-slate-800/50 transition-all flex items-center space-x-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Code className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 truncate">
                            {skill.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {skill.level ? `${skill.level}%` : 'Proficient'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
