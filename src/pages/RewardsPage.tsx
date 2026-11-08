import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Zap, Clock, Star, Trophy, CheckCircle, ArrowRight, X, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { RewardCategory } from '../types';
import { registerSubscriber } from '../services/api';

export const RewardsPage: React.FC = () => {
  const { rewards, loading } = useCampaign();
  const [selectedReward, setSelectedReward] = useState<RewardCategory | null>(null);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('CD');
  const [submitting, setSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [submittedFullNumber, setSubmittedFullNumber] = useState('');

  const countries = [
    { code: 'CD', name: 'RD Congo (RDC)', prefix: '+243', placeholder: '99 123 4567' },
    { code: 'CG', name: 'Congo (Brazzaville)', prefix: '+242', placeholder: '05 123 4567' },
    { code: 'KE', name: 'Kenya', prefix: '+254', placeholder: '712 345 678' },
    { code: 'NG', name: 'Nigeria', prefix: '+234', placeholder: '802 123 4567' },
    { code: 'UG', name: 'Ouganda', prefix: '+256', placeholder: '752 123 456' },
    { code: 'TZ', name: 'Tanzanie', prefix: '+255', placeholder: '784 123 456' },
    { code: 'ZM', name: 'Zambie', prefix: '+260', placeholder: '97 123 4567' },
    { code: 'RW', name: 'Rwanda', prefix: '+250', placeholder: '732 123 456' },
    { code: 'MW', name: 'Malawi', prefix: '+265', placeholder: '99 123 4567' },
    { code: 'MG', name: 'Madagascar', prefix: '+261', placeholder: '33 12 345 67' },
    { code: 'GA', name: 'Gabon', prefix: '+241', placeholder: '07 12 34 56' },
    { code: 'TD', name: 'Tchad', prefix: '+235', placeholder: '66 12 34 56' },
    { code: 'NE', name: 'Niger', prefix: '+227', placeholder: '90 12 34 56' },
    { code: 'SC', name: 'Seychelles', prefix: '+248', placeholder: '2 51 23 45' },
    { code: 'IN', name: 'Inde', prefix: '+91', placeholder: '98123 45678' },
  ];

  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'zap':      return <Zap className="w-7 h-7" />;
      case 'clock':    return <Clock className="w-7 h-7" />;
      case 'sparkles': return <Star className="w-7 h-7" />;
      case 'trophy':
      default:         return <Trophy className="w-7 h-7" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400 text-sm">
        Chargement des catégories de prix…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-airtel-red mb-3">
            Décembre 2026 · Récompenses en USD
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-display mb-4">
            Catégories de Récompenses Cash
          </h1>
          <p className="text-stone-500 text-sm leading-relaxed">
            Quatre catégories de prix conçues pour récompenser les abonnés Airtel tout au long de la saison festive. Tous les montants sont en USD.
          </p>
        </div>

        {/* 2×2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {rewards.map((reward, index) => {
            const isGrand = reward.id === 'grand';
            return (
              <div
                key={reward.id}
                className={`relative rounded-xl p-7 sm:p-8 flex flex-col justify-between border transition-shadow duration-200 hover:shadow-md ${
                  isGrand
                    ? 'bg-stone-900 text-white border-stone-700'
                    : 'bg-white text-stone-900 border-stone-200'
                }`}
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isGrand ? 'bg-gold/20 text-gold' : 'bg-rose-50 text-airtel-red'
                    }`}>
                      {getIcon(reward.iconName)}
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isGrand ? 'bg-gold/20 text-gold' : 'bg-rose-100 text-airtel-red'
                    }`}>
                      {reward.badgeTag}
                    </span>
                  </div>

                  <h2 className={`text-xl font-black uppercase tracking-tight mb-2 font-display ${
                    isGrand ? 'text-white' : 'text-stone-900'
                  }`}>
                    {reward.title}
                  </h2>

                  <p className={`text-sm leading-relaxed mb-6 ${
                    isGrand ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    {reward.description}
                  </p>

                  {/* Prize Range */}
                  <div className={`px-5 py-4 rounded-lg mb-6 ${
                    isGrand ? 'bg-white/5 border border-gold/20' : 'bg-stone-50 border border-stone-200'
                  }`}>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider block mb-1 ${
                      isGrand ? 'text-gold/70' : 'text-stone-400'
                    }`}>
                      Fourchette de Prix (USD)
                    </span>
                    <span className={`text-2xl sm:text-3xl font-black font-display ${
                      isGrand ? 'text-gold' : 'text-stone-900'
                    }`}>
                      {reward.prizeRangeDisplay}
                    </span>
                  </div>

                  {/* Details list */}
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isGrand ? 'text-gold/70' : 'text-emerald-500'}`} />
                      <span className={isGrand ? 'text-stone-400' : 'text-stone-600'}>
                        Fréquence de tirage : <strong className={isGrand ? 'text-stone-200' : 'text-stone-800'}>{reward.drawFrequency}</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isGrand ? 'text-gold/70' : 'text-emerald-500'}`} />
                      <span className={isGrand ? 'text-stone-400' : 'text-stone-600'}>
                        Devise : <strong className={isGrand ? 'text-stone-200' : 'text-stone-800'}>USD (Dollars Américains)</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isGrand ? 'text-gold/70' : 'text-emerald-500'}`} />
                      <span className={isGrand ? 'text-stone-400' : 'text-stone-600'}>
                        {reward.eligibilityNote}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => setSelectedReward(reward)}
                  className={`w-full py-3 px-5 rounded-lg font-semibold text-sm uppercase tracking-wider transition-colors duration-150 flex items-center justify-center gap-2 ${
                    isGrand
                      ? 'bg-gold text-stone-900 hover:brightness-110'
                      : 'bg-airtel-red text-white hover:bg-airtel-darkred'
                  }`}
                >
                  {reward.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Policy note */}
        <div className="rounded-xl bg-white border border-stone-200 p-6 sm:p-8">
          <h3 className="text-base font-bold text-stone-900 mb-2">Politique de Distribution des Prix</h3>
          <p className="text-sm text-stone-500 leading-relaxed">
            Tous les prix sont libellés en USD, à partir de 500 $ jusqu'à 200 000 $. Les versements sont effectués directement via les canaux bancaires et Airtel Money officiellement agréés d'Airtel. Aucun gagnant ne sera jamais invité à payer des frais ou à divulguer ses identifiants pour recevoir son prix.
          </p>
        </div>

      </div>

      {/* Detail Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl border border-stone-200">
            <button
              onClick={() => setSelectedReward(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-rose-50 text-airtel-red flex items-center justify-center">
                {getIcon(selectedReward.iconName)}
              </div>
              <div>
                <h3 className="text-lg font-black uppercase text-stone-900 font-display">{selectedReward.title}</h3>
                <p className="text-sm font-black text-airtel-red font-display">{selectedReward.prizeRangeDisplay} USD</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-stone-600 bg-stone-50 p-4 rounded-lg border border-stone-200 mb-5">
              <p><strong className="text-stone-800">Description :</strong> {selectedReward.description}</p>
              <p><strong className="text-stone-800">Fréquence de tirage :</strong> {selectedReward.drawFrequency}</p>
              <p><strong className="text-stone-800">Éligibilité :</strong> {selectedReward.eligibilityNote}</p>
            </div>

            {/* Quick Phone Registration for this prize tier */}
            <div className="mb-5 p-4 rounded-xl bg-rose-50/50 border border-rose-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-airtel-red">
                <Phone className="w-3.5 h-3.5" />
                <span>Entrez votre numéro pour ce Palier</span>
              </div>
              <p className="text-xs text-stone-500">
                Soumettez votre numéro mobile pour vérifier l'éligibilité auprès des administrateurs de la campagne.
              </p>
              {!registeredSuccess ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const rawDigits = phone.replace(/[^0-9]/g, '');
                    if (!rawDigits) return;
                    const fullNumber = `${selectedCountry.prefix}${rawDigits.replace(/^0+/, '')}`;
                    setSubmitting(true);
                    try {
                      await registerSubscriber(fullNumber, countryCode, selectedReward.title);
                      setSubmittedFullNumber(fullNumber);
                      setRegisteredSuccess(true);
                    } catch (err) {
                      alert("Échec de l'enregistrement du numéro.");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  className="space-y-2.5"
                >
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full py-1.5 px-2.5 bg-white border border-stone-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-airtel-red"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>{c.name} ({c.prefix})</option>
                    ))}
                  </select>

                  <div className="flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-stone-200 bg-stone-100 text-stone-800 font-mono font-bold text-xs select-none">
                      {selectedCountry.prefix}
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={selectedCountry.placeholder}
                      className="w-full pl-2.5 pr-3 py-2 bg-white border border-stone-200 rounded-r-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-airtel-red font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2 px-3 rounded-lg bg-airtel-red hover:bg-airtel-darkred text-white font-semibold text-xs transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    <span>{submitting ? 'Enregistrement...' : 'S\'inscrire au Tirage'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Numéro <strong className="font-mono">{submittedFullNumber}</strong> enregistré !</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedReward(null);
                setRegisteredSuccess(false);
                setPhone('');
              }}
              className="w-full py-3 rounded-lg bg-stone-900 text-white font-semibold text-sm hover:bg-airtel-red transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
