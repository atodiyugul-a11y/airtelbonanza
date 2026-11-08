import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export const HowItWorksPreview: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Découvrir la Promotion',
      description: "Explorez les catégories de récompenses, le calendrier et les conditions officielles de la campagne à travers les canaux autorisés d'Airtel.",
      icon: <Search className="w-6 h-6 text-airtel-red" />,
    },
    {
      number: '02',
      title: 'Consulter les Conditions Officielles',
      description: "Lisez les critères d'éligibilité régionaux, les conditions de conformité et les directives publiées sur airtel.com.",
      icon: <FileText className="w-6 h-6 text-airtel-red" />,
    },
    {
      number: '03',
      title: 'Suivre le Processus Autorisé',
      description: 'Participez via les plateformes officielles Airtel et consultez la section des gagnants vérifiés pour les résultats confirmés.',
      icon: <CheckCircle2 className="w-6 h-6 text-airtel-red" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-airtel-red mb-3">
            Simple & Transparent
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-display mb-4">
            Comment Fonctionne la Campagne
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Trois étapes simples pour comprendre la Grande Tombola Cash de Décembre.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative rounded-xl bg-stone-50 border border-stone-200 p-7 hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-5xl font-black text-stone-100 font-display leading-none select-none">
                  {step.number}
                </span>
                <div className="w-11 h-11 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">{step.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Anti-fraud callout */}
        <div className="mt-10 rounded-xl bg-stone-900 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Avertissement de Protection du Consommateur</h4>
              <p className="text-xs text-stone-400 leading-relaxed max-w-xl">
                Airtel ne vous demandera <strong className="text-white">jamais</strong> votre code PIN Airtel Money, vos codes OTP ou vos mots de passe. Ne payez jamais de frais à un agent pour recevoir un prix. Les détails officiels de participation sont disponibles exclusivement via les canaux autorisés Airtel.
              </p>
            </div>
          </div>
          <Link
            to="/how-it-works"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-white text-stone-900 hover:bg-gold transition-colors duration-150"
          >
            Guide Complet
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
