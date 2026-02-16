'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in sessionStorage
        window.sessionStorage.setItem('adminToken', data.token);
        window.sessionStorage.setItem('adminUser', JSON.stringify(data.user));
        router.push('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-float"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
            <Lock className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-300">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                required
              />
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                required
              />
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying...</span>
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
