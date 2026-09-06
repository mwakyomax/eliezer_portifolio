import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { sendContactMessage, settings } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await sendContactMessage(formData);
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="inline-block w-full max-w-xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl z-10 border border-[#F1EBEB] p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F1EBEB]">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#761A30]">Let's Collaborate</span>
              <h3 className="text-xl font-extrabold text-[#18181B]">Get in Touch with Elieza</h3>
              <p className="text-xs text-[#71717A] mt-0.5">Available for full-stack engineering roles, contracts, and software inquiries.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#71717A] hover:text-[#18181B] hover:bg-[#F4ECEE]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-[#18181B]">Message Delivered!</h4>
              <p className="text-xs text-[#71717A]">Thank you for reaching out. Elieza will respond to your message promptly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#18181B] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30] focus:ring-1 focus:ring-[#761A30]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#18181B] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30] focus:ring-1 focus:ring-[#761A30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18181B] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Project Inquiry / Job Opportunity / Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30] focus:ring-1 focus:ring-[#761A30]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18181B] mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your project, role, or questions for Elieza..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30] focus:ring-1 focus:ring-[#761A30]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{loading ? 'Sending Message...' : 'Send Message to Elieza'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* Quick Direct Info */}
          <div className="mt-6 pt-4 border-t border-[#F1EBEB] flex flex-wrap items-center justify-between text-[11px] text-[#71717A] gap-2">
            <span>Direct: <strong className="text-[#18181B]">{settings.email}</strong></span>
            <span>Location: <strong className="text-[#18181B]">{settings.location}</strong></span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
