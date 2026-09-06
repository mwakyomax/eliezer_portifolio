import React from 'react';
import { motion } from 'motion/react';
import { Layout, Database, Server, Smartphone, Cpu, Shield, Code, CheckCircle2 } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  loading?: boolean;
}

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'layout': return Layout;
    case 'database': return Database;
    case 'server': return Server;
    case 'smartphone': return Smartphone;
    case 'cpu': return Cpu;
    case 'shield': return Shield;
    default: return Code;
  }
};

export const Services: React.FC<ServicesProps> = ({ services, loading }) => {
  return (
    <section id="services" className="py-24 bg-[#020617] text-slate-300 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase font-semibold">
            Technical Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Services & Offerings
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Professional software engineering solutions available for freelance, internships, and client engagements.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = getServiceIcon(service.icon);
              return (
                <motion.div
                  key={service._id || service.id || service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-3xl bg-[#0f172a] border border-white/5 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-900/20 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center text-xs font-semibold text-blue-400 space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Production Quality Delivered</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
