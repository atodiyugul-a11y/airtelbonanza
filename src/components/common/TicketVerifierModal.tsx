import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, X, Trophy, ShieldCheck } from 'lucide-react';
import { fetchWinners } from '../../services/api';
import { Winner } from '../../types';
import { triggerFestiveConfetti } from './FestiveDecorations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TicketVerifierModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [refInput, setRefInput] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<{ found: boolean; winner?: Winner } | null>(null);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim()) return;

    setSearching(true);
    setResult(null);

    try {
      const winners = await fetchWinners('all', refInput.trim());
      const match = winners.find(
        (w) => w.ticketOrRefNumber.toLowerCase() === refInput.trim().toLowerCase()
      );

      if (match) {
        setResult({ found: true, winner: match });
        triggerFestiveConfetti();
      } else {
        setResult({ found: false });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-stone-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-airtel-red border border-rose-100 flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-stone-900 font-display">
            Vérifier le Code de Référence Gagnant
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Vérifiez n'importe quel numéro de référence d'annonce auprès du registre officiel de la campagne.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleVerify} className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              required
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              placeholder="ex. BONANZA-KE-8492 ou BONANZA-ZW-0012"
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-airtel-red"
            />
          </div>

          <button
            type="submit"
            disabled={searching}
            className="w-full py-3 px-4 rounded-xl bg-airtel-red hover:bg-airtel-darkred text-white font-black text-xs uppercase tracking-wider shadow-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{searching ? 'Vérification dans le registre...' : 'Vérifier le Code de Référence'}</span>
          </button>
        </form>

        {/* Quick Demo Samples */}
        <div className="mb-6 p-3 rounded-xl bg-stone-50 border border-stone-100 text-[11px] text-stone-500">
          <span className="font-bold text-stone-700 block mb-1">Exemples de codes de référence à tester :</span>
          <div className="flex flex-wrap gap-1.5">
            {['BONANZA-KE-8492', 'BONANZA-SN-7721', 'BONANZA-ZW-0012'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setRefInput(code)}
                className="px-2 py-0.5 rounded bg-white border border-stone-200 font-mono text-airtel-red hover:bg-rose-50"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Result */}
        {result && (
          <div className="animate-in fade-in">
            {result.found && result.winner ? (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-stone-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-black text-sm uppercase tracking-wide">
                  <CheckCircle className="w-5 h-5" />
                  <span>Enregistrement de Gagnant Authentifié Trouvé</span>
                </div>

                <div className="bg-white/80 p-4 rounded-xl border border-emerald-100 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Gagnant :</span>
                    <strong className="text-stone-900 text-sm">{result.winner.name}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Pays :</span>
                    <strong className="text-stone-900">{result.winner.country}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Catégorie :</span>
                    <strong className="text-stone-900">{result.winner.prizeCategory}</strong>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-emerald-100">
                    <span className="text-stone-500 font-bold">Montant du Prix :</span>
                    <span className="text-base font-black text-airtel-red">
                      {result.winner.prizeAmount.toLocaleString()} $ USD
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-800">
                  ✔ <strong>Note de sécurité :</strong> Le service client officiel effectue le versement du prix sans jamais vous demander votre code secret PIN Airtel Money.
                </p>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span>Aucun Enregistrement Vérifié Correspondant</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Le code de référence saisi n'a pas été trouvé dans le registre officiel. Veuillez vérifier l'orthographe ou vous méfier des messages frauduleux non autorisés.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

