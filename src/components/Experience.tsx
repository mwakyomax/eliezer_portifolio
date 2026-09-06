import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
  experience: ExperienceType[];
  loading?: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ experience, loading }) => {
  return (
    <section id="experience" className="py-24 bg-[#090d16] text-slate-300 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase font-semibold">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work & Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Software development leadership, engineering internships, and practical IT roles.
          </p>
        </div>

        {/* Timeline List */}
        {loading ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="h-40 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-violet-600 before:to-transparent">
            {experience.map((item, index) => (
              <motion.div
                key={item._id || item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12"
              >
                {/* Timeline Dot Icon */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-blue-500 bg-[#020617] text-blue-400 shadow-lg shadow-blue-900/30 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Briefcase className="w-4 h-4" />
                </div>

                {/* Timeline Content Card */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 sm:p-8 rounded-3xl bg-[#0f172a] border border-white/5 hover:border-blue-500/30 shadow-xl transition-all space-y-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-mono font-medium border border-blue-500/20">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.startDate} — {item.endDate}</span>
                    </span>
                    <h3 className="text-xl font-bold text-white pt-2">
                      {item.position}
                    </h3>
                    <div className="text-sm font-semibold text-violet-400 flex items-center space-x-2">
                      <span>{item.organization}</span>
                      {item.location && (
                        <>
                          <span>•</span>
                          <span className="text-slate-400 text-xs flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{item.location}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Responsibilities */}
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {item.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-400">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/5 text-slate-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
