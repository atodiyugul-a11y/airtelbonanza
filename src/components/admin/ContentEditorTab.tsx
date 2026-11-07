import React, { useState, useEffect } from 'react';
import { ContentPage } from '../../types';
import { fetchContent, updateContent } from '../../services/api';
import { FileText, Shield, Save, CheckCircle, AlertCircle } from 'lucide-react';

export const ContentEditorTab: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'terms' | 'privacy'>('terms');
  const [contentPage, setContentPage] = useState<ContentPage | null>(null);
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const loadData = async (type: 'terms' | 'privacy') => {
    try {
      setLoading(true);
      setFeedback(null);
      const data = await fetchContent(type);
      setContentPage(data);
      setTitle(data.title);
      setBodyText(data.content);
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || 'Failed to load page content.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedType);
  }, [selectedType]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const updated = await updateContent(selectedType, bodyText, title);
      setContentPage(updated);
      setFeedback({ type: 'success', msg: `${selectedType === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'} updated successfully.` });
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || 'Failed to save changes.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Type Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h2 className="text-xl font-black uppercase text-stone-900 font-display">
            Legal & Policy Content Editor
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Maintain the official campaign terms, concept disclosures, and subscriber data privacy policies.
          </p>
        </div>

        {/* Toggle buttons */}
        <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedType('terms')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              selectedType === 'terms'
                ? 'bg-white text-airtel-red shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('privacy')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              selectedType === 'privacy'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
        </div>
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

      {loading ? (
        <div className="py-12 text-center text-xs text-stone-400">Loading document...</div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Document Display Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-airtel-red"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Document Body Content (Markdown format supported)
              </label>
              <span className="text-[10px] text-stone-400">Use '### Heading' for sections</span>
            </div>
            <textarea
              rows={16}
              required
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="w-full p-4 bg-white border border-stone-200 rounded-xl text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-airtel-red"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-airtel-red hover:bg-airtel-darkred text-white text-xs font-black uppercase tracking-wider shadow-sm transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Publishing Changes...' : 'Save & Publish Document'}</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

