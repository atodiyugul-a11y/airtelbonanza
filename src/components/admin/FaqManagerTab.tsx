import React, { useState, useEffect } from 'react';
import { FAQItem } from '../../types';
import { fetchFAQs, addFAQ, updateFAQ, deleteFAQ } from '../../services/api';
import { HelpCircle, Plus, Edit2, Trash2, CheckCircle, AlertCircle, X, Save } from 'lucide-react';

export const FaqManagerTab: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Form state
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState<'general' | 'prizes' | 'participation' | 'verification' | 'support'>('general');

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const data = await fetchFAQs();
      setFaqs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const openAddModal = () => {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    setCategory('general');
    setModalOpen(true);
  };

  const openEditModal = (faq: FAQItem) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      if (editingFaq) {
        await updateFAQ(editingFaq.id, { question, answer, category });
        setFeedback({ type: 'success', msg: 'Question FAQ mise à jour avec succès.' });
      } else {
        await addFAQ({ question, answer, category, displayOrder: faqs.length + 1 });
        setFeedback({ type: 'success', msg: 'Nouvelle question FAQ créée.' });
      }

      setModalOpen(false);
      loadFaqs();
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || 'Opération échouée.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, q: string) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer la question : "${q}" ?`)) return;
    try {
      await deleteFAQ(id);
      setFeedback({ type: 'success', msg: 'Question FAQ supprimée.' });
      loadFaqs();
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || 'Échec de la suppression.' });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h2 className="text-xl font-black uppercase text-stone-900 font-display">
            Gestion des Questions Fréquentes
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Gérez les FAQs officielles, explications des récompenses et alertes anti-fraude.
          </p>
        </div>

        <button
          onClick={openAddModal}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-airtel-red hover:bg-airtel-darkred text-white text-xs font-black uppercase tracking-wider shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une FAQ</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4 hover:border-airtel-red/40 transition"
          >
            <div className="space-y-2 flex-grow">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                  #{idx + 1} • {faq.category}
                </span>
              </div>
              <h3 className="font-bold text-sm text-stone-900 font-display">
                {faq.question}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
              <button
                onClick={() => openEditModal(faq)}
                className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                title="Modifier la FAQ"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(faq.id, faq.question)}
                className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50"
                title="Supprimer la FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl border border-stone-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black uppercase text-stone-900 font-display mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-airtel-red" />
              {editingFaq ? 'Modifier la FAQ' : 'Nouvelle Question FAQ'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="ex. Comment vérifier une annonce de gagnant ?"
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Catégorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl"
                >
                  <option value="general">Général</option>
                  <option value="prizes">Prix ($ USD)</option>
                  <option value="participation">Participation</option>
                  <option value="verification">Vérification &amp; Sécurité</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Réponse</label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Explication officielle de la campagne..."
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-1/2 py-2.5 rounded-xl bg-airtel-red hover:bg-airtel-darkred text-white font-bold transition disabled:opacity-50"
                >
                  {saving ? 'Sauvegarde...' : 'Enregistrer la FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
