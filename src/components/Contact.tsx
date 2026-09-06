import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, Phone } from 'lucide-react';
import { sendMessage } from '../services/api';
import { PortfolioSettings } from '../types';

interface ContactProps {
  settings?: PortfolioSettings;
}

export const Contact: React.FC<ContactProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  const socialLinks = settings?.socialLinks || {
    github: 'https://github.com/mwakyomax',
    linkedin: 'https://linkedin.com/in/eliezamwakyoma',
    email: 'eliezaeliezer1318@gmail.com',
  };

  const contactInfo = settings?.contactInfo || {
    location: 'Dar es Salaam, Tanzania',
    phone: '+255 629 899 017',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ loading: false, success: false, message: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ loading: true });

    try {
      const res = await sendMessage(formData);
      if (res.data.success) {
        setStatus({
          loading: false,
          success: true,
          message: res.data.message || 'Thank you! Your message has been sent successfully.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          loading: false,
          success: false,
          message: 'Failed to send message. Please try again.',
        });
      }
    } catch (err: any) {
      setStatus({
        loading: false,
        success: false,
        message: err.response?.data?.message || 'Server connection error. Please try again later.',
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#090d16] text-slate-300 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-blue-400 font-mono text-xs tracking-widest uppercase font-semibold">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Elieza Mwakyoma
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have an internship role, software project, or collaboration opportunity? Send a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Details & Links */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#0f172a] border border-white/5 space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-mono font-semibold">Email</p>
                    <a href={`mailto:${socialLinks.email}`} className="font-semibold text-white hover:text-blue-400 transition-colors">
                      {socialLinks.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-mono font-semibold">Location</p>
                    <p className="font-semibold text-white">{contactInfo.location}</p>
                  </div>
                </div>

                {contactInfo.phone && (
                  <div className="flex items-center space-x-3 text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-mono font-semibold">Phone</p>
                      <p className="font-semibold text-white">{contactInfo.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-white/5 space-y-3">
                <p className="text-xs font-mono text-slate-500 uppercase font-semibold">Connect Online</p>
                <div className="flex items-center space-x-3">
                  {socialLinks.github && (
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white text-slate-300 transition-all border border-white/5"
                      title="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white text-slate-300 transition-all border border-white/5"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[#0f172a] border border-white/5 space-y-6">
              <h3 className="text-xl font-bold text-white">Send a Message</h3>

              {status.message && (
                <div className={`p-4 rounded-xl text-xs sm:text-sm flex items-center space-x-2 ${
                  status.success ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {status.success ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <span>{status.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@techrecruitment.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Software Engineering Internship Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-400">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-[#020617] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                id="contact-submit-btn"
                className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {status.loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
