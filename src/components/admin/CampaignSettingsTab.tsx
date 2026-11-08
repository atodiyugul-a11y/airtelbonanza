import React, { useState } from 'react';
import { CampaignConfig } from '../../types';
import { updateCampaign } from '../../services/api';
import { Save, CheckCircle, AlertCircle, Calendar, Eye, EyeOff, Bell, Sparkles } from 'lucide-react';

interface Props {
  campaign: CampaignConfig;
  onRefresh: () => void;
}

export const CampaignSettingsTab: React.FC<Props> = ({ campaign, onRefresh }) => {
  const [formData, setFormData] = useState<CampaignConfig>({ ...campaign });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: keyof CampaignConfig, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await updateCampaign(formData);
      setMessage({ type: 'success', text: 'Configuration de campagne sauvegardée et en ligne sur le portail !' });
      onRefresh();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Échec de la mise à jour de la configuration.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h2 className="text-xl font-black uppercase text-stone-900 font-display">
            Paramètres Principaux de la Campagne
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Configurez les titres de la campagne, les dates de clôture, le statut de publication et les alertes.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-airtel-red hover:bg-airtel-darkred text-white text-xs font-black uppercase tracking-wider shadow-sm transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Sauvegarde...' : 'Sauvegarder la Configuration'}</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Publication Status & Visibility Card */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-airtel-red" />
            Publication &amp; Visibilité Live
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-stone-200">
            <div>
              <span className="font-bold text-sm text-stone-900 block">
                Statut de Publication de la Campagne
              </span>
              <span className="text-xs text-stone-500">
                Lorsqu'activé, la campagne est publiquement accessible. Désactiver affiche le mode maintenance.
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => handleChange('isPublished', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className="ml-3 text-xs font-bold uppercase text-stone-700">
                {formData.isPublished ? 'Publié' : 'Mode Brouillon'}
              </span>
            </label>
          </div>
        </div>

        {/* Campaign Dates & Countdown Target */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-airtel-red" />
            Dates de Campagne &amp; Cible du Compte à Rebours
          </h3>
          <p className="text-xs text-stone-500">
            Le compte à rebours est calculé dynamiquement à partir de la date de clôture configurée ci-dessous.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Date &amp; Heure de Début de Campagne
              </label>
              <input
                type="datetime-local"
                value={formData.startDate ? formData.startDate.substring(0, 16) : ''}
                onChange={(e) => handleChange('startDate', new Date(e.target.value).toISOString())}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-airtel-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Date &amp; Heure de Clôture (Cible du Compte à Rebours)
              </label>
              <input
                type="datetime-local"
                value={formData.closingDate ? formData.closingDate.substring(0, 16) : ''}
                onChange={(e) => handleChange('closingDate', new Date(e.target.value).toISOString())}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-airtel-red"
              />
            </div>
          </div>
        </div>

        {/* Hero Branding & Copy */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-airtel-red" />
            Titres Promotionnels &amp; Contenu
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Titre de la Campagne
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-airtel-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Titre Héro (Grande Bannière)
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => handleChange('headline', e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-airtel-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Sous-titre Héro
              </label>
              <textarea
                rows={3}
                value={formData.subheadline}
                onChange={(e) => handleChange('subheadline', e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-airtel-red"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Texte du Badge Prominent
                </label>
                <input
                  type="text"
                  value={formData.badgeText}
                  onChange={(e) => handleChange('badgeText', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-airtel-red"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Devise Standard
                </label>
                <input
                  type="text"
                  disabled
                  value="USD ($ Dollar Américain)"
                  className="w-full px-4 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-sm text-stone-500 font-semibold cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Live Announcement Banner */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-airtel-red" />
            Bannière d'Annonce Live en Haut de Page
          </h3>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-stone-200 mb-4">
            <div>
              <span className="font-bold text-sm text-stone-900 block">Afficher la Bannière d'Annonce</span>
              <span className="text-xs text-stone-500">Affiche le ticker officiel live en haut du site web</span>
            </div>
            <input
              type="checkbox"
              checked={formData.bannerNoticeEnabled}
              onChange={(e) => handleChange('bannerNoticeEnabled', e.target.checked)}
              className="w-5 h-5 text-airtel-red rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Message d'Annonce Live
            </label>
            <textarea
              rows={2}
              value={formData.bannerNotice}
              onChange={(e) => handleChange('bannerNotice', e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-airtel-red"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-airtel-red hover:bg-airtel-darkred text-white text-xs font-black uppercase tracking-wider shadow-md transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Sauvegarde...' : 'Sauvegarder Tous les Paramètres'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
