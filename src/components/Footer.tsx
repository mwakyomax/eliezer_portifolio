import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Heart, 
  Send,
  ExternalLink,
  Shield
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { settings, setIsContactOpen } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#180C11] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid matching mockup footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 text-left">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#761A30] flex items-center justify-center text-white font-serif font-black text-xl shadow-md border border-white/10">
                E
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="font-serif font-black text-2xl tracking-tight text-white">
                  Elieza
                </span>
                <span className="w-2 h-2 rounded-full bg-[#761A30]" />
              </div>
            </div>

            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              Software developer and networker with a Bachelor of Science in Computer Science from St. Joseph University in Tanzania. Building robust full-stack web platforms, network architectures, and offline-first mobile apps.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={settings.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#761A30] text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#761A30] text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#761A30] text-white/80 hover:text-white flex items-center justify-center transition-all border border-white/10"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('popular-domains')} className="hover:text-white transition-colors">
                  Core Disciplines
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('featured-projects')} className="hover:text-white transition-colors">
                  Featured Projects
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('technical-skills')} className="hover:text-white transition-colors">
                  Technical Stack
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('tech-journal')} className="hover:text-white transition-colors">
                  Engineering Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Specializations */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-200">
              Domains
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>Full-Stack Web (MERN)</li>
              <li>Mobile Development (Android)</li>
              <li>Algorithms & Priority Queue Systems</li>
              <li>Relational Databases (MySQL)</li>
              <li>DevOps & Linux Networking</li>
              <li>UI/UX Design & Prototyping</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-200">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#761A30] flex-shrink-0" />
                <span>{settings.location}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#761A30] flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors truncate">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#761A30] flex-shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white text-[11px] font-bold tracking-wide uppercase transition-all flex items-center space-x-1.5"
                >
                  <span>Send Direct Message</span>
                  <Send className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Elieza Mwakyoma. All rights reserved.</p>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/admin"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-[11px] font-mono border border-white/5 hover:border-white/20"
              title="Admin Authentication Portal"
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>Admin Portal</span>
            </Link>
            <span>St. Joseph University in Tanzania</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
