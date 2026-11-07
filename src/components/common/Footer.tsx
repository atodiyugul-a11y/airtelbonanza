import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ExternalLink, Mail, Phone, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 pt-14 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-stone-800">

          {/* Brand */}
          <div className="space-y-4">
            <div>
              <span className="text-2xl font-black tracking-tight text-airtel-red lowercase font-display block">
                airtel
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 block mt-0.5">
                December Cash Bonanza 2026
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              A December cash rewards campaign featuring instant, daily, weekly, and grand prize categories starting from $500 up to $200,000 USD.
            </p>
            <a
              href="https://www.airtel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-400 hover:text-white transition-colors group"
            >
              airtel.com
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Campaign</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/rewards" className="hover:text-white transition-colors">Cash Rewards</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/winners" className="hover:text-white transition-colors">Verified Winners</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/how-it-works#safety" className="hover:text-white transition-colors">Anti-Fraud Guidelines</Link></li>
              <li><Link to="/winners#verification" className="hover:text-white transition-colors">Winner Verification</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contact</h5>
            <div className="space-y-3 text-xs">
              <p className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                <a href="https://www.airtel.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.airtel.com</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                bonanza2026@airtel.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                Dial 100 on your Airtel line
              </p>
            </div>
          </div>
        </div>

        {/* Anti-fraud + Copyright */}
        <div className="pt-8 space-y-5">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-stone-900 border border-stone-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-stone-400 leading-relaxed">
              <strong className="text-stone-200">Security Notice:</strong>{' '}
              Airtel will <strong className="text-white">never</strong> request your Airtel Money PIN, banking passwords, or OTP codes. We will never charge fees to claim prizes. All payouts ($500 to $200,000 USD) are disbursed directly through authorized Airtel channels.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-3">
            <p>© 2026 Airtel December Cash Bonanza. All rights reserved.</p>
            <p className="text-stone-700">Official Airtel Telecommunications Promotional Campaign</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
