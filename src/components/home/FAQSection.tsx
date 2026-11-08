import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Search } from 'lucide-react';
import { FAQItem } from '../../types';
import { fetchFAQs } from '../../services/api';

interface FAQSectionProps {
  isFullPage?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ isFullPage = false }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchFAQs()
      .then((data) => setFaqs(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className={`py-20 ${isFullPage ? 'bg-light-bg' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-airtel-red mb-3">
            Aide & Information
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight font-display mb-4">
            Questions Fréquemment Posées
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Tout ce que vous devez savoir sur la Grande Tombola Cash de Décembre 2026 d'Airtel, les calendriers de distribution des prix et les normes de sécurité.
          </p>
        </div>

        {/* Search & Category Filter (shown especially in full page) */}
        {isFullPage && (
          <div className="mb-10 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des questions (ex. prix, frais, vérification)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-airtel-red text-sm"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-semibold">
              {[
                { label: 'Toutes les Questions', value: 'all' },
                { label: 'Général', value: 'general' },
                { label: 'Prix ($ USD)', value: 'prizes' },
                { label: 'Participation', value: 'participation' },
                { label: 'Vérification & Sécurité', value: 'verification' },
                { label: 'Support', value: 'support' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedCategory(tab.value)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                    selectedCategory === tab.value
                      ? 'bg-airtel-red text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Expandable Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-white border-airtel-red/40 shadow-md ring-1 ring-airtel-red/20'
                    : 'bg-white hover:bg-rose-50/30 border-stone-200/80 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  type="button"
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-stone-900 font-display">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-airtel-red text-white rotate-180' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8">
              <HelpCircle className="w-10 h-10 text-stone-400 mx-auto mb-2" />
              <p className="text-stone-600 font-semibold">Aucune question trouvée correspondant à votre recherche.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-3 text-xs text-airtel-red font-bold hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Security Alert Note at bottom */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-airtel-red flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-stone-800">
            <strong>Rappel de Sécurité :</strong> Les représentants officiels d'Airtel ne vous demanderont jamais vos mots de passe, codes PIN Airtel Money ou codes de validation OTP reçus par SMS. Aucun frais de participation ni charge de paiement n'est requis.
          </div>
        </div>

      </div>
    </section>
  );
};

