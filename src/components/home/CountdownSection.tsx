import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
}

export const CountdownSection: React.FC = () => {
  const { campaign } = useCampaign();

  const closingDateStr = campaign?.closingDate || '2026-12-31T23:59:59.000Z';

  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(closingDateStr).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0 || isNaN(target)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isEnded: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [closingDateStr]);

  const formattedClosingDate = new Date(closingDateStr).toLocaleDateString('fr-FR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left: Title */}
          <div className="text-center md:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-airtel-red">
              <Clock className="w-3.5 h-3.5" />
              Période de la Campagne
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
              {timeLeft.isEnded ? 'Campagne Terminée' : 'Clôture du Grand Tirage de Noël dans'}
            </h2>
            <p className="text-xs text-stone-400 flex items-center justify-center md:justify-start gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Clôture de la Tombola & Distribution du Grand Prix : <strong className="text-stone-600 ml-1">25 Décembre 2026</strong>
            </p>
          </div>

          {/* Right: Timer or Ended */}
          {timeLeft.isEnded ? (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-3 w-full md:w-auto">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">La Grande Tombola Cash de Décembre 2026 est officiellement terminée.</p>
                <p className="text-xs text-amber-700 mt-0.5">Consultez la section Gagnants pour voir tous les bénéficiaires validés.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 w-full md:w-auto">
              {[
                { label: 'Jours', value: timeLeft.days },
                { label: 'Heures', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Secondes', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 min-w-[70px]"
                >
                  <span className="text-2xl sm:text-3xl font-black text-airtel-red font-display tracking-tight">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
