import React from 'react';
import { GraduationCap, Plus, Edit, Trash2, Calendar, Award } from 'lucide-react';
import { Education } from '../../../types';

interface EducationTabProps {
  education: Education[];
  onOpenNewEducation: () => void;
  onEditEducation: (edu: Education) => void;
  onDeleteEducation: (id: string) => void;
}

export const EducationTab: React.FC<EducationTabProps> = ({
  education,
  onOpenNewEducation,
  onEditEducation,
  onDeleteEducation,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-[#18181B] tracking-tight">
              Academic Education & Degrees
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-black text-xs border border-[#F4ECEE]">
              {education.length} Records
            </span>
          </div>
          <p className="text-xs text-[#71717A] mt-1">
            Display your university degrees, coursework, honors, and academic achievements.
          </p>
        </div>

        <button
          onClick={onOpenNewEducation}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#EAE3E5] text-center space-y-3">
          <GraduationCap className="w-10 h-10 mx-auto text-[#A1A1AA]" />
          <h3 className="text-base font-bold text-[#18181B]">No academic records</h3>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            Add your degree and university background.
          </p>
          <button
            onClick={onOpenNewEducation}
            className="px-4 py-2 rounded-full bg-[#761A30] text-white text-xs font-bold hover:bg-[#5E1426]"
          >
            Add Degree
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => {
            const id = edu._id || edu.id;
            return (
              <div
                key={id}
                className="p-6 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3F5] text-[#761A30] font-bold text-[10px] border border-[#F4ECEE]">
                      Academic Degree
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onEditEducation(edu)}
                        className="p-1.5 rounded-lg bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white transition-colors"
                        title="Edit Education"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteEducation(id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete Education"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-serif font-black text-lg text-[#18181B]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-bold text-[#761A30]">
                    {edu.institution}
                  </p>
                  {edu.fieldOfStudy && (
                    <p className="text-xs text-[#52525B]">
                      Field: {edu.fieldOfStudy}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#F1EBEB] flex items-center justify-between text-xs text-[#71717A]">
                  <span className="flex items-center space-x-1 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-[#A1A1AA]" />
                    <span>{edu.startDate} – {edu.endDate || 'Present'}</span>
                  </span>
                  {edu.grade && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold text-[11px] border border-amber-200">
                      {edu.grade}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
