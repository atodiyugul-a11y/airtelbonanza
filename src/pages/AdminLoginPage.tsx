import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('AirtelBonanza2026!');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-airtel-red text-white shadow-festive mb-4">
          <Shield className="w-8 h-8 text-gold" />
        </div>
        <div className="flex items-baseline justify-center gap-1.5 mb-1">
          <span className="text-3xl font-black text-airtel-red lowercase font-display">airtel</span>
          <span className="text-xs font-bold uppercase tracking-wider text-gold bg-stone-900 px-2 py-0.5 rounded border border-stone-800">2026</span>
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight font-display">
          Campaign Administration
        </h2>
        <p className="mt-1 text-xs text-stone-400">
          Protected Control Center for Airtel December Cash Bonanza 2026
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-stone-900/90 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl border border-stone-800 sm:px-10">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                Administrator Username
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-stone-950 border border-stone-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-airtel-red focus:border-transparent placeholder-stone-600"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-stone-950 border border-stone-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-airtel-red focus:border-transparent placeholder-stone-600"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-[11px] text-stone-400">
              <p className="font-semibold text-stone-300 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold" />
                Administrator Access:
              </p>
              <p>Username: <code className="text-gold">admin</code></p>
              <p>Password: <code className="text-gold">AirtelBonanza2026!</code></p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-airtel-red hover:bg-airtel-darkred text-white shadow-festive transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{submitting ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-800 text-center">
            <Link
              to="/"
              className="text-xs text-stone-400 hover:text-white transition flex items-center justify-center gap-1"
            >
              <span>← Back to Campaign Public View</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

