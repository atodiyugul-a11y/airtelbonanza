import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CountdownSection } from '../components/home/CountdownSection';
import { RewardsPreview } from '../components/home/RewardsPreview';
import { HowItWorksPreview } from '../components/home/HowItWorksPreview';
import { WinnersPreview } from '../components/home/WinnersPreview';
import { FAQSection } from '../components/home/FAQSection';
import { LiveEligibilityChecker } from '../components/common/LiveEligibilityChecker';
import { ExploreRewardsModal } from '../components/common/ExploreRewardsModal';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <CountdownSection />
      <RewardsPreview />

      {/* Eligibility Checker */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <LiveEligibilityChecker />
        </div>
      </section>

      <HowItWorksPreview />
      <WinnersPreview />
      <FAQSection isFullPage={false} />

      {/* CTA Banner */}
      <section className="bg-airtel-red py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-200">
            Official December 2026 Campaign
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-display">
            Ready to Explore the December Bonanza?
          </h2>
          <p className="text-rose-100 text-sm max-w-xl mx-auto leading-relaxed">
            Discover all four prize categories from $500 up to $200,000 USD, or browse the verified winners showcase.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md font-bold text-sm uppercase tracking-wider bg-white text-airtel-red hover:bg-gold hover:text-stone-900 transition-colors shadow-lg"
            >
              Explore Cash Rewards
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/winners"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md font-semibold text-sm uppercase tracking-wider border border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all"
            >
              View Winners
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Rewards Phone Capture Modal */}
      <ExploreRewardsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryTitle="All Cash Rewards"
        onSuccess={() => {
          setTimeout(() => {
            setModalOpen(false);
            navigate('/rewards');
          }, 1400);
        }}
      />
    </div>
  );
};
