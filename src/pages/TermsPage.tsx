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
          <p className="text-xs font-bold uppercase tracking-widest text-airtel-red mb-2">Mentions Légales &amp; Gouvernance</p>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-display mb-3">
            Termes &amp; Conditions
          </h1>
          <p className="text-stone-500 text-sm">
            Règles promotionnelles officielles, critères d'éligibilité et gouvernance de la campagne.
          </p>
        </div>

        {/* Official notice */}
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3 mb-7">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-900 leading-relaxed">
            <strong>Règlement Officiel Airtel :</strong> La Grande Tombola Cash de Décembre 2026 d'Airtel est officiellement autorisée dans toutes les opérations télécoms participantes. Toutes les récompenses éligibles de 500 $ à 200 000 $ USD sont gérées par les canaux Airtel vérifiés, sans frais de traitement.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-10">
          {loading ? (
            <div className="py-12 text-center text-stone-400 text-sm">Chargement des termes et conditions…</div>
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
              Dernière mise à jour : {content?.lastUpdated ? new Date(content.lastUpdated).toLocaleDateString('fr-FR') : 'Décembre 2026'}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Conformité Campagne Airtel
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
