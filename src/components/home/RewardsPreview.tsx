import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Clock, Star, Trophy, ArrowRight } from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';
import { ExploreRewardsModal } from '../common/ExploreRewardsModal';

export const RewardsPreview: React.FC = () => {
  const { rewards, loading } = useCampaign();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'zap':   return <Zap className="w-5 h-5" />;
      case 'clock': return <Clock className="w-5 h-5" />;
      case 'sparkles': return <Star className="w-5 h-5" />;
      case 'trophy':
      default:      return <Trophy className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-400 text-sm">
          Loading reward categories…
        </div>
      </section>
    );
  }

  return (
    <section id="rewards" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-airtel-red mb-3">
            December 2026 Campaign
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-display mb-4">
            Cash Reward Categories
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            All prizes are denominated in USD, starting from $500 up to $200,000. Four tiers of cash rewards across the December campaign window.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {rewards.map((reward, index) => {
            const isGrand = reward.id === 'grand';
            return (
              <div
                key={reward.id}
                className={`relative rounded-xl p-6 flex flex-col justify-between border transition-shadow duration-200 hover:shadow-md ${
                  isGrand
                    ? 'bg-stone-900 text-white border-stone-700'
                    : 'bg-white text-stone-900 border-stone-200'
                }`}
              >
                {/* Top Row: Icon + Tier label */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isGrand ? 'bg-gold/20 text-gold' : 'bg-rose-50 text-airtel-red'
                    }`}>
                      {getIcon(reward.iconName)}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      isGrand ? 'text-stone-400' : 'text-stone-400'
                    }`}>
                      Tier 0{index + 1}
                    </span>
                  </div>

                  <h3 className={`text-base font-black uppercase tracking-tight mb-1.5 font-display ${
                    isGrand ? 'text-white' : 'text-stone-900'
                  }`}>
                    {reward.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-5 ${
                    isGrand ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    {reward.description}
                  </p>

                  {/* Prize Range */}
                  <div className={`px-4 py-3 rounded-lg mb-4 ${
                    isGrand ? 'bg-white/5 border border-gold/20' : 'bg-stone-50 border border-stone-200'
                  }`}>
                    <span className={`block text-[10px] font-semibold uppercase tracking-wider mb-1 ${
                      isGrand ? 'text-gold/70' : 'text-stone-400'
                    }`}>
                      Prize Range (USD)
                    </span>
                    <span className={`text-xl font-black font-display ${
                      isGrand ? 'text-gold' : 'text-stone-900'
                    }`}>
                      {reward.prizeRangeDisplay}
                    </span>
                  </div>

                  <p className={`text-[11px] flex items-center gap-1.5 mb-5 ${
                    isGrand ? 'text-stone-500' : 'text-stone-400'
                  }`}>
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    {reward.drawFrequency}
                  </p>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(reward.title);
                    setModalOpen(true);
                  }}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-xs uppercase tracking-wider transition-colors duration-150 flex items-center justify-center gap-2 ${
                    isGrand
                      ? 'bg-gold text-stone-900 hover:brightness-110'
                      : 'bg-airtel-red text-white hover:bg-airtel-darkred'
                  }`}
                >
                  {reward.buttonText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-stone-400">
          Prize amounts are subject to official campaign terms. All payouts administered through authorized Airtel channels.
        </p>

      </div>

      {/* Explore Rewards Phone Capture Modal */}
      <ExploreRewardsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryTitle={selectedCategory}
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
