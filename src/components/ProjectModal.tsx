import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Lightbulb, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 dark:bg-slate-900 light:bg-white rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header Image & Close */}
          <div className="relative aspect-video w-full bg-slate-950 shrink-0">
            <img
              src={project.image || 'https://picsum.photos/seed/modal/800/450'}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

            <button
              onClick={onClose}
              id="close-project-modal-btn"
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-600/90 text-white text-xs font-mono font-medium">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured Project</span>
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-300 dark:text-slate-300 light:text-slate-700">
            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-sm font-mono uppercase text-blue-400 font-semibold tracking-wider">
                Overview & Summary
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-200 dark:text-slate-200 light:text-slate-800">
                {project.description}
              </p>
            </div>

            {/* Problem Statement & Solution */}
            {(project.problemStatement || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.problemStatement && (
                  <div className="p-4 rounded-2xl bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs uppercase tracking-wider font-mono">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span>Problem Statement</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      {project.problemStatement}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="p-4 rounded-2xl bg-blue-950/30 dark:bg-blue-950/30 light:bg-blue-50 border border-blue-500/20 dark:border-blue-500/20 light:border-blue-200 space-y-2">
                    <div className="flex items-center space-x-2 text-blue-400 font-semibold text-xs uppercase tracking-wider font-mono">
                      <Lightbulb className="w-4 h-4 text-blue-400" />
                      <span>Engineered Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-mono uppercase text-blue-400 font-semibold tracking-wider">
                  Key Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-100 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-start space-x-2.5 text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono uppercase text-blue-400 font-semibold tracking-wider">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-800 dark:bg-slate-800 light:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700 dark:border-slate-700 light:border-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/50 dark:bg-slate-950/50 light:bg-slate-50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors flex items-center space-x-2 border border-slate-700"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repo</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-600/20 transition-all flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm text-slate-400 hover:text-slate-200"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
