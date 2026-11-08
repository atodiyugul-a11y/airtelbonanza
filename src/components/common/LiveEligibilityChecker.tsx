import React, { useState } from 'react';
import { ShieldCheck, Phone, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const LiveEligibilityChecker: React.FC = () => {
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

  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('CD');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawDigits = phone.replace(/[^0-9]/g, '');
    if (!rawDigits) {
      setError('Veuillez fournir un numéro mobile Airtel valide.');
      return;
    }

    const fullNumber = `${selectedCountry.prefix}${rawDigits.replace(/^0+/, '')}`;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/entry/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullNumber, countryCode }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Échec de la vérification du numéro mobile.');
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur réseau. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-display">
          Vérifiez Vos Participations à la Promotion
        </h2>
        <p className="text-sm text-stone-500 max-w-lg mx-auto leading-relaxed">
          Les abonnés Airtel actifs accumulent des participations grâce à leur utilisation quotidienne. Entrez votre numéro Airtel pour vérifier vos participations pour le prochain tirage.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleCheck} className="max-w-2xl mx-auto space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">

          {/* Country */}
          <div className="sm:col-span-5">
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">
              Pays & Indicatif
            </label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-airtel-red"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>{c.name} ({c.prefix})</option>
              ))}
            </select>
          </div>

          {/* Phone */}
          <div className="sm:col-span-7">
            <label className="block text-xs font-semibold text-stone-600 mb-1.5">
              Numéro Mobile Airtel
            </label>
            <div className="flex rounded-lg shadow-sm">
              <span className="inline-flex items-center px-3.5 rounded-l-lg border border-r-0 border-stone-200 bg-stone-100 text-stone-800 font-mono font-bold text-xs sm:text-sm select-none">
                {selectedCountry.prefix}
              </span>
              <div className="relative flex-1">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={selectedCountry.placeholder}
                  className="w-full pl-3 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-r-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-airtel-red font-mono"
                />
              </div>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Numéro complet : <span className="font-mono text-stone-600 font-bold">{selectedCountry.prefix} {phone || selectedCountry.placeholder}</span>
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg bg-airtel-red hover:bg-airtel-darkred text-white font-semibold text-sm transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Vérification en cours…' : "Vérifier l'Éligibilité & les Participations"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="max-w-2xl mx-auto p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Ligne Vérifiée & Active
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wider">
              Confirmé
            </span>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">{result.message}</p>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-lg border border-emerald-100">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block">Total Participations</span>
              <span className="text-lg font-black text-airtel-red font-display">{result.qualifyingEntries}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-emerald-100">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block">Région</span>
              <span className="text-sm font-bold text-stone-800">{result.country}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-emerald-100">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block">Réf. ID</span>
              <span className="text-xs font-mono font-bold text-stone-700">{result.referenceCode}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-white p-2.5 rounded-lg border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            {result.securityNotice}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        Vérification sécurisée sur le réseau Airtel · Aucun frais requis
      </p>
    </div>
  );
};
