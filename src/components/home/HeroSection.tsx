import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';
import { ExploreRewardsModal } from '../common/ExploreRewardsModal';

export const HeroSection: React.FC = () => {
  const { campaign } = useCampaign();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const headline = campaign?.headline || "CE DÉCEMBRE, VOTRE CHANCE POURRAIT VOUS RAPPORTER GROS !";
  const subheadline = campaign?.subheadline || "Célébrez les fêtes de fin d'année avec des opportunités uniques de remporter des prix exceptionnels en espèces. Découvrez des récompenses instantanées, des surprises quotidiennes, des tirages hebdomadaires et un grand jackpot spectaculaire.";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-airtel-red via-[#c40000] to-[#8b0000] text-white">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">

          {/* Left: Text Content */}
          <div className="space-y-7 text-center lg:text-left">

            {/* Eyebrow */}
            <p className="text-sm font-semibold uppercase tracking-widest text-rose-200">
              Campagne Officielle Airtel Décembre · 2026
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] text-white font-display">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-rose-100 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md font-bold text-sm uppercase tracking-wider bg-white text-airtel-red hover:bg-gold hover:text-stone-900 transition-colors duration-200 shadow-lg"
              >
                Explorer les Récompenses Cash
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-semibold text-sm uppercase tracking-wider bg-transparent border border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-200"
              >
                Comment Participer
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-rose-200/80 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Promotion Officielle · Récompenses en USD · Aucun Frais de Participation</span>
            </div>
          </div>

          {/* Right: Prize Summary Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 space-y-5 shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-rose-200">Catégories de Prix</p>

              <div className="space-y-3">
                {[
                  { label: 'Cash Instantané', range: '500 $ – 1 000 $' },
                  { label: 'Cash Quotidien', range: '1 000 $ – 5 000 $' },
                  { label: 'Cash Hebdomadaire', range: '5 000 $ – 10 000 $' },
                  { label: 'Grand Prix de Noël', range: '50 000 $ – 200 000 $', highlight: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg ${
                      item.highlight
                        ? 'bg-gold/20 border border-gold/40'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <span className={`text-sm font-semibold ${item.highlight ? 'text-gold' : 'text-white'}`}>
                      {item.label}
                    </span>
                    <span className={`text-sm font-black font-display ${item.highlight ? 'text-gold' : 'text-white'}`}>
                      {item.range}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-rose-200/70 leading-relaxed pt-1">
                Tous les prix sont en USD. Soumis aux conditions officielles et à l'éligibilité régionale.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Explore Rewards Phone Capture Modal */}
      <ExploreRewardsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryTitle="Toutes les Récompenses Cash"
        onSuccess={() => {
          setTimeout(() => {
            setModalOpen(false);
            navigate('/rewards');
          }, 1400);
        }}
      />
    </section>
  );
};
