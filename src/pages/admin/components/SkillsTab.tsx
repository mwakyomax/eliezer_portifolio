import React, { useState } from 'react';
import { Code2, Plus, Search, Edit, Trash2, X, Filter } from 'lucide-react';
import { Skill } from '../../../types';

interface SkillsTabProps {
  skills: Skill[];
  onOpenNewSkill: () => void;
  onEditSkill: (skill: Skill) => void;
  onDeleteSkill: (id: string) => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({
  skills,
  onOpenNewSkill,
  onEditSkill,
  onDeleteSkill,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'DevOps & Tools', 'Network & Systems'];

  const filteredSkills = skills.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = searchQuery === '' || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-[#18181B] tracking-tight">
              Technical Skills & Proficiencies
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-black text-xs border border-[#F4ECEE]">
              {skills.length} Total
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Maintain your competencies across programming languages, backend architecture, databases, and network engineering.
          </p>
        </div>

        <button
          onClick={onOpenNewSkill}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skill (e.g. TypeScript, Cisco, React, Docker)..."
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

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          <Filter className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" />
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? skills.length 
              : skills.filter(s => s.category === cat).length;
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

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#EAE3E5] text-center space-y-3">
          <Code2 className="w-10 h-10 mx-auto text-[#A1A1AA]" />
          <h3 className="text-base font-bold text-[#18181B]">No skills found</h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            Try adjusting your search criteria or add a new technical skill.
          </p>
          <button
            onClick={onOpenNewSkill}
            className="px-4 py-2 rounded-full bg-[#761A30] text-white text-xs font-bold hover:bg-[#5E1426]"
          >
            Add New Skill
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            const id = skill._id || skill.id;
            const proficiency = skill.proficiency || 80;
            return (
              <div
                key={id}
                className="p-5 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-bold text-[10px] border border-[#F4ECEE]">
                      {skill.category || 'Engineering'}
                    </span>
                    <h3 className="font-bold text-base text-[#18181B] mt-2 group-hover:text-[#761A30] transition-colors">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onEditSkill(skill)}
                      className="p-1.5 rounded-lg bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white transition-colors"
                      title="Edit Skill"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteSkill(id)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Proficiency Visual Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#71717A]">Proficiency</span>
                    <span className="text-[#761A30]">{proficiency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#761A30] to-[#9C2746] transition-all duration-500"
                      style={{ width: `${proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
