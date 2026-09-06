import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar } from 'lucide-react';
import { Education as EducationType } from '../types';

interface EducationProps {
  education: EducationType[];
  loading?: boolean;
}

export const Education: React.FC<EducationProps> = ({ education, loading }) => {
  return (
    <section id="education" className="py-24 bg-[#020617] text-slate-300 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase font-semibold">
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Qualifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Degree programs and academic achievements in Computer Science.
          </p>
        </div>

        {loading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="h-36 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8">
            {education.map((item, idx) => (
              <motion.div
                key={item._id || item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-3xl bg-[#0f172a] border border-white/5 hover:border-blue-500/30 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                      <h3 className="text-xl font-extrabold text-white">
                        {item.degree}
                      </h3>
                    </div>
                    <p className="text-sm font-semibold text-violet-400 pl-8">
                      {item.institution}
                    </p>
                  </div>

                  <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-mono font-medium border border-blue-500/20 self-start md:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.startYear} — {item.endYear}</span>
                  </span>
                </div>

                {item.description && (
                  <p className="mt-6 text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
