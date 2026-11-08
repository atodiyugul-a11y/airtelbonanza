import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, CheckCircle, ArrowRight } from 'lucide-react';
import { Winner } from '../../types';
import { fetchWinners } from '../../services/api';

export const WinnersPreview: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWinners('all')
      .then((data) => setWinners(data.slice(0, 6)))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="winners" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-airtel-red mb-3">
            Gagnants Vérifiés
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-display mb-4">
            Célébrons Nos Gagnants
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Seuls les gagnants officiellement vérifiés et authentifiés sont publiés après contrôle d'identité et audit.
          </p>
        </div>

        {/* Winners Grid */}
        {loading ? (
          <div className="text-center text-stone-400 text-sm py-12">Chargement des gagnants…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {winners.map((winner) => (
              <div
                key={winner.id}
                className="bg-white rounded-xl p-5 border border-stone-200 hover:shadow-sm transition-shadow duration-200 flex flex-col justify-between"
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      Vérifié
                    </span>
                    <span className="text-[11px] text-stone-400 font-medium">{winner.prizeCategory}</span>
                  </div>

                  {/* Winner identity */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-airtel-red text-white flex items-center justify-center font-black text-base flex-shrink-0">
                      {winner.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-stone-900">{winner.name}</p>
                      <p className="text-xs text-stone-400">{winner.country}</p>
                    </div>
                  </div>

                  {/* Prize */}
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-stone-50 border border-stone-200">
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                        Prix Attribué
                      </span>
                      <span className="text-lg font-black text-airtel-red font-display">
                        {winner.prizeAmount.toLocaleString()} $ USD
                      </span>
                    </div>
                    <Trophy className="w-6 h-6 text-gold" />
                  </div>
                </div>

                {/* Footer */}
                <p className="mt-4 text-xs text-stone-400">
                  Annoncé le : <strong className="text-stone-600">{winner.dateAnnounced}</strong>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/winners"
            className="inline-flex items-center gap-2 text-sm font-semibold text-airtel-red hover:text-airtel-darkred transition-colors"
          >
            Voir Tous les Gagnants & Rechercher dans les Archives
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
