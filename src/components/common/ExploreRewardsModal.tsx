import React, { useState } from 'react';
import { Phone, CheckCircle2, AlertCircle, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { registerSubscriber } from '../../services/api';

interface ExploreRewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTitle?: string;
  onSuccess?: () => void;
}

export const ExploreRewardsModal: React.FC<ExploreRewardsModalProps> = ({
  isOpen,
  onClose,
  categoryTitle,
  onSuccess
}) => {
  const countries = [
    { code: 'CD', name: 'DR Congo (DRC)', prefix: '+243', placeholder: '99 123 4567' },
    { code: 'CG', name: 'Congo (Brazzaville)', prefix: '+242', placeholder: '05 123 4567' },
    { code: 'KE', name: 'Kenya', prefix: '+254', placeholder: '712 345 678' },
    { code: 'NG', name: 'Nigeria', prefix: '+234', placeholder: '802 123 4567' },
    { code: 'UG', name: 'Uganda', prefix: '+256', placeholder: '752 123 456' },
    { code: 'TZ', name: 'Tanzania', prefix: '+255', placeholder: '784 123 456' },
    { code: 'ZM', name: 'Zambia', prefix: '+260', placeholder: '97 123 4567' },
    { code: 'RW', name: 'Rwanda', prefix: '+250', placeholder: '732 123 456' },
    { code: 'MW', name: 'Malawi', prefix: '+265', placeholder: '99 123 4567' },
    { code: 'MG', name: 'Madagascar', prefix: '+261', placeholder: '33 12 345 67' },
    { code: 'GA', name: 'Gabon', prefix: '+241', placeholder: '07 12 34 56' },
    { code: 'TD', name: 'Chad', prefix: '+235', placeholder: '66 12 34 56' },
    { code: 'NE', name: 'Niger', prefix: '+227', placeholder: '90 12 34 56' },
    { code: 'SC', name: 'Seychelles', prefix: '+248', placeholder: '2 51 23 45' },
    { code: 'IN', name: 'India', prefix: '+91', placeholder: '98123 45678' },
  ];

  const [countryCode, setCountryCode] = useState('KE');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawDigits = phone.replace(/[^0-9]/g, '');
    if (!rawDigits) {
      setError('Please enter your mobile number.');
      return;
    }

    // Combine prefix and subscriber number cleanly
    const fullNumber = `${selectedCountry.prefix}${rawDigits.replace(/^0+/, '')}`;

    setLoading(true);
    setError(null);

    try {
      await registerSubscriber(fullNumber, countryCode, categoryTitle || 'All Rewards');
      setSubmittedPhone(fullNumber);
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit mobile number.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPhone('');
    setSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl border border-stone-200">
        <button
          onClick={handleReset}
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-airtel-red block mb-1">
                Airtel December Cash Bonanza 2026
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight font-display">
                Explore Cash Rewards
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
                Enter your mobile number starting with your country code to register your line for official December draw announcements.
              </p>
              {categoryTitle && (
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-airtel-red text-xs font-semibold">
                  <span>Category: {categoryTitle}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Country & Dial Code
                </label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-airtel-red"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.prefix})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Airtel Mobile Number
                </label>
                <div className="flex rounded-lg shadow-sm">
                  {/* Fixed country code badge */}
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
                      className="w-full pl-3 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-r-lg text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-airtel-red font-mono"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  Full format: <span className="font-mono text-stone-600 font-bold">{selectedCountry.prefix} {phone || selectedCountry.placeholder}</span>
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-airtel-red hover:bg-airtel-darkred text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? 'Submitting Line Details...' : 'Continue to Rewards'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Official verification · No fees required · We never ask for PINs</span>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-stone-900 tracking-tight font-display">
                Number Registered!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
                Your Airtel line <span className="font-mono font-bold text-stone-900">{submittedPhone}</span> is logged with the campaign team.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-500">
              Draw announcements and grand prize payout: <strong>December 25, 2026</strong>.
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 rounded-lg bg-stone-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-airtel-red transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
