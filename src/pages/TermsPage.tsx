import React, { useState, useEffect } from 'react';
import { fetchContent } from '../services/api';
import { ContentPage } from '../types';
import { FileText, Calendar, ShieldCheck } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const [content, setContent] = useState<ContentPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent('terms')
      .then(setContent)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-airtel-red mb-2">Legal & Governance</p>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-display mb-3">
            Terms & Conditions
          </h1>
          <p className="text-stone-500 text-sm">
            Official promotional rules, eligibility guidelines, and campaign governance.
          </p>
        </div>

        {/* Official notice */}
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3 mb-7">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-900 leading-relaxed">
            <strong>Official Airtel Promotional Rules:</strong> The Airtel December Cash Bonanza 2026 is officially authorized across participating telecommunications operations. All qualifying rewards from $500 to $200,000 USD are administered through verified Airtel channels without any processing fees.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-10">
          {loading ? (
            <div className="py-12 text-center text-stone-400 text-sm">Loading terms and conditions…</div>
          ) : (
            <div className="space-y-8">
              {content?.content.split('### ').filter(Boolean).map((section, idx) => {
                const lines = section.split('\n');
                const title = lines[0];
                const body = lines.slice(1).join('\n');
                return (
                  <div key={idx} className="pb-7 border-b border-stone-100 last:border-b-0 last:pb-0">
                    <h3 className="text-sm font-bold text-airtel-red uppercase tracking-wide mb-3">
                      {title}
                    </h3>
                    <div className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                      {body}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Last Updated: {content?.lastUpdated ? new Date(content.lastUpdated).toLocaleDateString() : 'December 2026'}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Airtel Campaign Compliance
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
