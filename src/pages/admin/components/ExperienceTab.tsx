import React from 'react';
import { Briefcase, Plus, Edit, Trash2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { Experience } from '../../../types';

interface ExperienceTabProps {
  experience: Experience[];
  onOpenNewExperience: () => void;
  onEditExperience: (exp: Experience) => void;
  onDeleteExperience: (id: string) => void;
}

export const ExperienceTab: React.FC<ExperienceTabProps> = ({
  experience,
  onOpenNewExperience,
  onEditExperience,
  onDeleteExperience,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-[#18181B] tracking-tight">
              Work Experience & Career Milestones
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-black text-xs border border-[#F4ECEE]">
              {experience.length} Roles
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Chronicle your industry roles, technical responsibilities, leadership achievements, and network deployments.
          </p>
        </div>

        <button
          onClick={onOpenNewExperience}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Experience Timeline Cards */}
      {experience.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#EAE3E5] text-center space-y-3">
          <Briefcase className="w-10 h-10 mx-auto text-[#A1A1AA]" />
          <h3 className="text-base font-bold text-[#18181B]">No work experience records</h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            Document your professional roles and technical contributions.
          </p>
          <button
            onClick={onOpenNewExperience}
            className="px-4 py-2 rounded-full bg-[#761A30] text-white text-xs font-bold hover:bg-[#5E1426]"
          >
            Add First Role
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => {
            const id = exp._id || exp.id;
            return (
              <div
                key={id}
                className="p-6 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <h3 className="font-serif font-black text-lg text-[#18181B]">
                        {exp.title}
                      </h3>
                      {exp.current && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                          Current Role
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-xs font-bold text-[#71717A] flex-wrap gap-y-1">
                      <span className="text-[#761A30] font-black text-sm">{exp.company}</span>
                      {exp.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-[#A1A1AA]" />
                          <span>{exp.location}</span>
                        </span>
                      )}
                      <span className="flex items-center space-x-1 text-[#52525B]">
                        <Calendar className="w-3 h-3 text-[#A1A1AA]" />
                        <span>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-start">
                    <button
                      onClick={() => onEditExperience(exp)}
                      className="p-2 rounded-xl bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white transition-colors"
                      title="Edit Experience"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteExperience(id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bullet Points / Responsibilities */}
                {Array.isArray(exp.description) && exp.description.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-[#F1EBEB]">
                    {exp.description.map((desc: string, i: number) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-[#52525B]">
                        <span className="text-[#761A30] font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{desc}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Chips */}
                {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] text-[10px] font-bold border border-[#F4ECEE]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
