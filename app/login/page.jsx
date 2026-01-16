'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


function LogIn({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  );
}

function Lock({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function Mail({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
 
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
  
    if (validateForm()) {
      alert('Login Successful! (Demo Mode)');
      sessionStorage.setItem('loggedIn', 'true');
  
      setTimeout(() => {
        router.replace('/');
      }, 100);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-amber-600/10 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-slate-700/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-5" 
           style={{
             backgroundImage: `linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}>
      </div>

      <div className={`relative w-full max-w-md transition-all duration-1000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        
        <div className="backdrop-blur-xl bg-slate-900/60 rounded-3xl border border-amber-500/20 shadow-2xl shadow-amber-500/10 overflow-hidden">
          
          <div className="p-8 text-center border-b border-slate-700/50 bg-gradient-to-r from-slate-800/40 to-slate-900/40">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/50">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-slate-400 font-light">
              Sign in to access your Lead Management Dashboard
            </p>
          </div>

          
          <div className="p-8">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-amber-400 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400/70" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-12 pr-4 h-12 bg-slate-800/50 border ${
                      errors.email ? 'border-red-500/50' : 'border-slate-700/50'
                    } text-slate-100 placeholder-slate-500 focus:bg-slate-800/70 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 rounded-xl`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <span className="text-red-400">⚠</span> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-amber-400 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400/70" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 h-12 bg-slate-800/50 border ${
                      errors.password ? 'border-red-500/50' : 'border-slate-700/50'
                    } text-slate-100 placeholder-slate-500 focus:bg-slate-800/70 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 rounded-xl`}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
                    <span className="text-red-400">⚠</span> {errors.password}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="group relative w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/50 hover:shadow-amber-500/80 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Sign In
                </span>
              </button>
            </div>

            <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <p className="text-center text-sm text-slate-400">
                <span className="text-amber-400 font-semibold">Demo credentials:</span> any email and password (6+ chars)
              </p>
            </div>
          </div>
        </div>

  
        <p className="text-center mt-6 text-slate-500 text-sm">
          Secure authentication powered by enterprise-grade encryption
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.15);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.95);
          }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}