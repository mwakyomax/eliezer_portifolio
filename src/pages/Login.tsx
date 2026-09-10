import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowLeft, AlertCircle, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { loginAdmin } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      const res = await loginAdmin({ email: cleanEmail, password: cleanPassword });
      if (res.data.success && res.data.token && res.data.admin) {
        login(res.data.token, res.data.admin);
        navigate('/admin');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid admin credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-[#18181B] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Ambient Blobs matching public site */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FAF3F5] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#FFF8F9] rounded-full blur-3xl -z-10 opacity-80 pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#52525B] hover:text-[#761A30] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-[#E4E4E7] flex items-center justify-center group-hover:border-[#761A30] group-hover:bg-[#FAF3F5] transition-all shadow-xs">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Return to Portfolio</span>
        </Link>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-[#71717A]">Admin Gateway</span>
        </div>
      </header>

      {/* Center Login Box */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#F1EBEB] shadow-xl p-6 sm:p-8 space-y-6 relative">
          
          {/* Brand Monogram & Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#761A30] to-[#4D0E1D] flex items-center justify-center text-white font-serif font-black text-2xl shadow-md">
                  E
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#761A30] text-white rounded-full flex items-center justify-center border-2 border-white text-[10px]">
                  <Shield className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FAF3F5] border border-[#F4ECEE] text-[#761A30] text-[11px] font-bold tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Admin Authentication</span>
              </div>
              <h1 className="text-2xl font-black text-[#18181B] tracking-tight">
                Elieza Mwakyoma
              </h1>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#18181B] flex items-center justify-between">
                <span>Admin Email / Username</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-[#18181B] placeholder-[#A1A1AA] text-sm focus:outline-none focus:border-[#761A30] focus:ring-2 focus:ring-[#761A30]/10 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#18181B]">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-semibold text-[#761A30] hover:text-[#5E1426] flex items-center space-x-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-[#18181B] placeholder-[#A1A1AA] text-sm focus:outline-none focus:border-[#761A30] focus:ring-2 focus:ring-[#761A30]/10 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              id="admin-login-submit-btn"
              className="w-full py-3.5 rounded-full font-bold text-white bg-[#761A30] hover:bg-[#5E1426] shadow-md hover:shadow-lg transition-all text-sm uppercase tracking-wider active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer note */}
      <footer className="w-full py-6 text-center text-xs text-[#71717A] border-t border-[#F1EBEB]">
        <p>© {new Date().getFullYear()} Elieza Mwakyoma. St. Joseph University in Tanzania.</p>
      </footer>
    </div>
  );
};

