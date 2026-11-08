import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle, Search, ShieldCheck, Filter, UserCheck, Calendar } from 'lucide-react';
import { Winner } from '../types';
import { fetchWinners } from '../services/api';
import { TicketVerifierModal } from '../components/common/TicketVerifierModal';

export const WinnersPage: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifierOpen, setVerifierOpen] = useState(false);

  const loadWinners = async () => {
    try {
      setLoading(true);
      const data = await fetchWinners(selectedCategory, searchQuery);
      setWinners(data);
    } catch (err) {
      console.error('Failed to load winners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadWinners(); }, [selectedCategory, searchQuery]);

  const categories = [
    { label: 'Tous les Paliers', value: 'all' },
    { label: 'Instantané (500–1 000 $)', value: 'Récompenses Cash Instantanées' },
    { label: 'Quotidien (1 000–5 000 $)', value: 'Récompenses Cash Quotidiennes' },
    { label: 'Hebdomadaire (5 000–10 000 $)', value: 'Récompenses Cash Hebdomadaires' },
    { label: 'Grand Prix de Noël', value: 'Grand Prix de Noël' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-airtel-red mb-2">Palmarès Officiel</p>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-display">
              Célébrons Nos Gagnants
            </h1>
            <p className="text-stone-500 text-sm mt-2 max-w-xl leading-relaxed">
              Seuls les gagnants officiellement vérifiés et authentifiés sont publiés après des contrôles d'audit stricts.
            </p>
          </div>
          <button
            onClick={() => setVerifierOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-airtel-red text-white transition-colors flex-shrink-0"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Vérifier un Code d'Annonce
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-7 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, pays ou référence…"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-airtel-red text-sm"
              />
            </div>
            <div className="md:col-span-5 flex items-center gap-2">
              <Filter className="w-4 h-4 text-stone-400 flex-shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-airtel-red text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-airtel-red text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Winners Grid */}
        {loading ? (
          <div className="text-center py-16 text-stone-400 text-sm">Chargement des gagnants…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {winners.map((winner) => (
              <div
                key={winner.id}
                className="bg-white rounded-xl p-5 border border-stone-200 hover:shadow-sm transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      Vérifié
                    </span>
                    <span className="text-[11px] text-stone-400">{winner.prizeCategory}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-airtel-red text-white flex items-center justify-center font-black text-base flex-shrink-0">
                      {winner.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-stone-900">{winner.name}</p>
                      <p className="text-xs text-stone-400">{winner.country} · <span className="font-mono">{winner.ticketOrRefNumber}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-stone-50 border border-stone-200">
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wide text-stone-400">Prix Attribué</span>
                      <span className="text-lg font-black text-airtel-red font-display">
                        {winner.prizeAmount.toLocaleString()} $ USD
                      </span>
                    </div>
                    <Trophy className="w-6 h-6 text-gold" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {winner.dateAnnounced}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <UserCheck className="w-3.5 h-3.5" />
                    Confirmé
                  </span>
                </div>
              </div>
            ))}

            {winners.length === 0 && !loading && (
              <div className="col-span-full py-16 text-center bg-white rounded-xl border border-stone-200">
                <Trophy className="w-10 h-10 text-stone-200 mx-auto mb-3" />
                <p className="text-sm font-semibold text-stone-500">Aucun gagnant ne correspond à vos critères</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-3 text-xs text-airtel-red font-semibold hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        )}

        {/* Verification Policy */}
        <div id="verification" className="rounded-xl bg-white border border-stone-200 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 mb-2">Politique de Vérification Officielle</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Seuls les gagnants vérifiés et autorisés sont publiés. Chaque entrée est auditée en fonction du statut d'abonné, des conditions de validation de la campagne et des contrôles anti-fraude. Airtel ne reconnaît aucune réclamation tierce non vérifiée.
              </p>
            </div>
          </div>
        </div>

      </div>

      <TicketVerifierModal isOpen={verifierOpen} onClose={() => setVerifierOpen(false)} />
    </div>
  );
};
