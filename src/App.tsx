import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LiquidNavProvider } from './context/LiquidNavContext';
import { Home } from './pages/Home';

const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-slate-400 font-mono text-sm">
        Verifying admin session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <LiquidNavProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/login" 
                element={
                  <Suspense fallback={<div className="min-h-screen bg-[#FDFBFB] flex items-center justify-center text-xs font-semibold text-[#761A30]">Loading Portal...</div>}>
                    <Login />
                  </Suspense>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedAdminRoute>
                    <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center text-slate-400 font-mono text-xs">Loading Admin Panel...</div>}>
                      <AdminDashboard />
                    </Suspense>
                  </ProtectedAdminRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </LiquidNavProvider>
      </ShopProvider>
    </AuthProvider>
  );
}

