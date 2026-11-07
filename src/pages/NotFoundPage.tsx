import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-md mx-auto space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-airtel-red border border-rose-100 flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-stone-900 font-display">404 - Page Not Found</h1>
        <p className="text-stone-600 text-sm">
          The requested page could not be located in the Airtel December Cash Bonanza 2026 directory.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-airtel-red text-white text-xs font-bold uppercase tracking-wider hover:bg-airtel-darkred transition shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return To Homepage</span>
        </Link>
      </div>
    </div>
  );
};

