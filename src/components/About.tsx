import React from 'react';
import { motion } from 'motion/react';
import { User, Target, Award, Code, Database, Shield, Cpu, BookOpen, Layers } from 'lucide-react';
import { PortfolioSettings } from '../types';
import defaultProfilePic from '../assets/images/elieza_official_portrait_1788279969619.jpg';

interface AboutProps {
  settings?: PortfolioSettings;
}

export const About: React.FC<AboutProps> = ({ settings }) => {
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [settings?.profileImage]);

  const profileImage = React.useMemo(() => {
    if (imgError) return defaultProfilePic;
    const img = settings?.profileImage;
    if (!img) return defaultProfilePic;
    if (img.startsWith('/src/assets/images/') || img.includes('elieza_official_portrait')) {
      return defaultProfilePic;
    }
    return img;
  }, [settings?.profileImage, imgError]);

  const stats = settings?.statistics || {
    projectsCompleted: 12,
    technologiesMastered: 18,
    yearsExperience: 3,
    certificationsCount: 5,
  };

  const interests = [
    { title: 'Software Development', icon: Code },
    { title: 'Full-Stack Web Dev', icon: Layers },
    { title: 'Database Systems', icon: Database },
    { title: 'Mobile Applications', icon: User },
    { title: 'Computer Networking', icon: Cpu },
    { title: 'Cybersecurity', icon: Shield },
    { title: 'Algorithms & Data Structures', icon: Cpu },
    { title: 'Information Systems', icon: BookOpen },
  ];

  return (
    <section id="about" className="py-20 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-mono tracking-widest text-blue-400 uppercase font-semibold">
            Get To Know Me
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
            About Elieza Mwakyoma
          </h3>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base">
            Software developer and networker holding a Bachelor of Science in Computer Science, driven by clean architecture, network design, practical problem solving, and technological innovation.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950 shadow-xl group">
              <img
                src={profileImage}
                alt="Elieza Mwakyoma Profile"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-md border border-slate-800 dark:border-slate-800 light:border-slate-200">
                <p className="text-xs font-mono text-blue-400 uppercase font-bold">Qualification</p>
                <p className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">Bachelor of Science in Computer Science</p>
                <p className="text-xs text-slate-400">St. Joseph University in Tanzania (SJUIT)</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed text-base">
              <p>
                I am a passionate software developer and networker holding a Bachelor of Science in Computer Science with a strong foundation in full-stack web applications, database design, computer networking (TCP/IP, routing, switching, packet inspection), and cybersecurity fundamentals.
              </p>
              <p>
                My focus centers on taking complex software and network challenges and engineering practical, robust digital systems. Whether architecting REST APIs with Node.js/Express, building reactive user interfaces in React, configuring Cisco networks, or designing relational and document database schemas in MySQL and MongoDB, I prioritize reliability, speed, and clean code.
              </p>
            </div>

            {/* Career Objective */}
            <div className="p-5 rounded-2xl bg-blue-950/30 dark:bg-blue-950/30 light:bg-blue-50/80 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-200 space-y-2">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Career Objective</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                To become a highly skilled software engineer, contributing to real-world technology projects, solving critical challenges, and building scalable digital solutions across enterprise and startup environments.
              </p>
            </div>

            {/* Technical Interests Badges */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Core Technical Focus Areas</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {interests.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-2.5 rounded-xl bg-slate-800/50 dark:bg-slate-800/50 light:bg-white border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 flex items-center space-x-2 text-xs font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 hover:border-blue-500/40 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Configurable Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
              <div className="p-4 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">{stats.projectsCompleted}+</span>
                <p className="text-xs text-slate-400 mt-1 font-medium">Projects Built</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">{stats.technologiesMastered}+</span>
                <p className="text-xs text-slate-400 mt-1 font-medium">Technologies</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">{stats.yearsExperience}+</span>
                <p className="text-xs text-slate-400 mt-1 font-medium">Years Learning</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-violet-400">{stats.certificationsCount}+</span>
                <p className="text-xs text-slate-400 mt-1 font-medium">Certifications</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
