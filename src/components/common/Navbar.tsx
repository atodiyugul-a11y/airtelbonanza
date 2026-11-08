import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Récompenses Cash', path: '/rewards' },
    { name: 'Comment Participer', path: '/how-it-works' },
    { name: 'Gagnants', path: '/winners' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Conditions', path: '/terms' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-200 shadow-sm">
      {/* Campaign Alert Bar */}
      <div className="bg-airtel-red text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
          AIRTEL GRANDE TOMBOLA DE DÉCEMBRE 2026 — Tirage du Grand Prix : 25 Décembre · Récompenses Cash à partir de 500 $ USD
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-airtel-red/40 rounded-lg p-1">
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tight text-airtel-red lowercase font-display">
                airtel
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                Grande Tombola de Décembre
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    active
                      ? 'bg-airtel-red text-white'
                      : 'text-stone-600 hover:text-airtel-red hover:bg-rose-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Admin Button — hidden from public nav */}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 rounded-md text-stone-600 hover:text-airtel-red hover:bg-rose-50 focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-100 bg-white px-4 pt-3 pb-5 shadow-md">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-airtel-red text-white'
                      : 'text-stone-700 hover:bg-rose-50 hover:text-airtel-red'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
