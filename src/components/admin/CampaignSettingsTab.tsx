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
      setMessage({ type: 'success', text: 'Campaign configuration saved and live on portal!' });
      onRefresh();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update campaign configuration.' });
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
            Campaign Master Settings
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Configure campaign headlines, closing dates for countdown, publication status and alerts.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-airtel-red hover:bg-airtel-darkred text-white text-xs font-black uppercase tracking-wider shadow-sm transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Changes...' : 'Save Configuration'}</span>
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
            Publication & Live Visibility
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-stone-200">
            <div>
              <span className="font-bold text-sm text-stone-900 block">
                Campaign Publication Status
              </span>
              <span className="text-xs text-stone-500">
                When enabled, the campaign is publicly active. Unpublishing will display maintenance mode.
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
                {formData.isPublished ? 'Published' : 'Draft Mode'}
              </span>
            </label>
          </div>
        </div>

        {/* Campaign Dates & Countdown Target */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-stone-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-airtel-red" />
            Campaign Window & Countdown Clock Target
          </h3>
          <p className="text-xs text-stone-500">
            The countdown timer calculates dynamically from the closing date configured below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Campaign Start Date & Time
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
                Campaign Closing Date & Time (Countdown Clock Target)
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
            Promotional Headlines & Copy
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Campaign Title
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
                Hero Headline (Large Banner)
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
                Hero Subheadline Description
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
                  Prominent Badge Text
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
                  Currency Standard
                </label>
                <input
                  type="text"
                  disabled
                  value="USD ($ United States Dollars)"
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
            Top Live Announcement Banner
          </h3>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-stone-200 mb-4">
            <div>
              <span className="font-bold text-sm text-stone-900 block">Show Top Announcement Banner</span>
              <span className="text-xs text-stone-500">Displays official live ticker banner across top of website</span>
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
              Live Announcement Message
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
            <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};

