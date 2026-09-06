import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Layers, 
  Database, 
  Terminal, 
  Network,
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const TechnicalStack: React.FC = () => {
  const { skills, experiences, educations, certifications } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'skills' | 'experience' | 'education' | 'certifications'>('skills');

  // Group skills by category
  const skillCategories = [
    { id: 'Languages', label: 'Languages', icon: Code2 },
    { id: 'Frontend', label: 'Frontend', icon: Layout },
    { id: 'Backend', label: 'Backend & APIs', icon: Layers },
    { id: 'Databases', label: 'Databases', icon: Database },
    { id: 'DevOps & Tools', label: 'DevOps & Tools', icon: Terminal },
    { id: 'Network & Systems', label: 'Network & Systems', icon: Network }
  ];

  return (
    <section id="technical-skills" className="py-12 sm:py-16 bg-[#FAF8F8]/60 border-y border-[#F1EBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF3F5] text-[#761A30] text-[11px] font-black uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#18181B] tracking-tight">
            Technical Stack & Experience
          </h2>
          <p className="text-xs sm:text-sm text-[#71717A] max-w-xl mx-auto">
            A comprehensive overview of programming languages, frameworks, developer tools, work history, and academic credentials.
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-[#761A30] text-white shadow-md'
                  : 'bg-white text-[#52525B] hover:bg-[#FAF3F5] hover:text-[#761A30] border border-[#E4E4E7]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Skill Matrix ({skills.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-[#761A30] text-white shadow-md'
                  : 'bg-white text-[#52525B] hover:bg-[#FAF3F5] hover:text-[#761A30] border border-[#E4E4E7]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience ({experiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-[#761A30] text-white shadow-md'
                  : 'bg-white text-[#52525B] hover:bg-[#FAF3F5] hover:text-[#761A30] border border-[#E4E4E7]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education ({educations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certifications')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'certifications'
                  ? 'bg-[#761A30] text-white shadow-md'
                  : 'bg-white text-[#52525B] hover:bg-[#FAF3F5] hover:text-[#761A30] border border-[#E4E4E7]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certifications ({certifications.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300 text-left">
            {skillCategories.map((cat) => {
              const CategoryIcon = cat.icon;
              const catSkills = skills.filter((s) => {
                const sCat = (s.category || '').toLowerCase();
                const cId = cat.id.toLowerCase();
                if (sCat.includes(cId)) return true;
                if (cat.id === 'DevOps & Tools' && (sCat.includes('tool') || sCat.includes('devops') || sCat.includes('platform'))) return true;
                if (cat.id === 'Languages' && sCat.includes('language')) return true;
                if (cat.id === 'Network & Systems' && (sCat.includes('network') || sCat.includes('system') || sCat.includes('cisco') || sCat.includes('routing'))) return true;
                return false;
              });
              
              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-3xl p-6 border border-[#F1EBEB] shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 pb-3 border-b border-[#F4ECEE]">
                      <div className="w-8 h-8 rounded-xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-black text-[#18181B]">{cat.label}</h3>
                    </div>

                    <div className="space-y-3">
                      {catSkills.map((sk) => {
                        const prof = sk.proficiency ?? (sk as any).level ?? 85;
                        return (
                          <div key={sk._id || sk.name} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-[#18181B]">{sk.name}</span>
                              <span className="text-[#761A30]">{prof}%</span>
                            </div>
                            <div className="w-full bg-[#F4F4F5] h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-[#761A30] h-full rounded-full transition-all duration-500"
                                style={{ width: `${prof}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] text-[#71717A] flex items-center justify-between border-t border-[#F4ECEE]">
                    <span>{catSkills.length} Technologies</span>
                    <span className="font-bold text-[#761A30]">Active Competency</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 text-left">
            {experiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1EBEB] shadow-xs space-y-4 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-[#F4ECEE]">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#761A30] bg-[#FAF3F5] px-2.5 py-1 rounded-full">
                      {exp.current ? 'Current Position' : 'Completed'}
                    </span>
                    <h3 className="text-lg font-black text-[#18181B] mt-1.5">{exp.title}</h3>
                    <p className="text-xs font-bold text-[#71717A]">{exp.company} • {exp.location}</p>
                  </div>
                  <div className="text-xs font-extrabold text-[#761A30] bg-[#FAF8F8] px-3 py-1.5 rounded-xl border border-[#E4E4E7] self-start sm:self-center">
                    {exp.startDate} — {exp.endDate}
                  </div>
                </div>

                <div className="space-y-2">
                  {Array.isArray(exp.description) ? (
                    exp.description.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-[#52525B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#761A30] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#52525B] leading-relaxed">{exp.description}</p>
                  )}
                </div>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold bg-[#FAF3F5] text-[#761A30] px-2.5 py-1 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300 text-left">
            {educations.map((edu) => (
              <div
                key={edu._id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1EBEB] shadow-xs space-y-4 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-[#F4ECEE]">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#761A30] bg-[#FAF3F5] px-2.5 py-1 rounded-full">
                      Higher Education
                    </span>
                    <h3 className="text-lg font-black text-[#18181B] mt-1.5">{edu.degree}</h3>
                    <p className="text-xs font-bold text-[#71717A]">{edu.institution}</p>
                  </div>
                  <div className="text-xs font-extrabold text-[#761A30] bg-[#FAF8F8] px-3 py-1.5 rounded-xl border border-[#E4E4E7] self-start sm:self-center">
                    {edu.startDate} — {edu.endDate}
                  </div>
                </div>

                {edu.grade && (
                  <p className="text-xs font-bold text-[#18181B]">
                    Academic Standing: <span className="text-[#761A30]">{edu.grade}</span>
                  </p>
                )}

                {edu.activities && (
                  <p className="text-xs text-[#52525B]">
                    Activities: {edu.activities}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in duration-300 text-left">
            {certifications.map((cert) => (
              <div
                key={cert._id}
                className="bg-white rounded-3xl p-6 border border-[#F1EBEB] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-black text-[#18181B] leading-snug">{cert.name}</h4>
                  <p className="text-xs text-[#71717A]">{cert.issuer} • Issued {cert.issueDate}</p>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#761A30] hover:text-[#5E1426] pt-2 border-t border-[#F4ECEE]"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
