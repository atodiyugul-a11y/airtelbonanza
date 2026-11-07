import React, { useState } from 'react';
import { CampaignConfig } from '../../types';
import { updateCampaign } from '../../services/api';
import { Image, CheckCircle, AlertCircle, Sparkles, UploadCloud, Eye } from 'lucide-react';

interface Props {
  campaign: CampaignConfig;
  onRefresh: () => void;
}

export const BannerManagerTab: React.FC<Props> = ({ campaign, onRefresh }) => {
  const [activeBanner, setActiveBanner] = useState(campaign.activeBannerUrl || '/banners/festive-hero.jpg');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const bannerTemplates = [
    {
      id: 'festive-hero',
      name: 'Festive Crimson & Gold Bonanza',
      url: '/banners/festive-hero.jpg',
      description: 'Classic Airtel red gradient with gold gift boxes, stars, and floating cash coins.',
      theme: 'Crimson & Gold'
    },
    {
      id: 'holiday-lights',
      name: 'Holiday Lights & New Year Eve Gala',
      url: '/banners/holiday-lights.jpg',
      description: 'Festive holiday lights and confetti celebrating the Grand Prize jackpot.',
      theme: 'Holiday Gala'
    },
    {
      id: 'december-drops',
      name: 'Daily Cash Surprise Drops',
      url: '/banners/december-drops.jpg',
      description: 'Highlighting daily and instant cash rewards starting from $100 USD.',
      theme: 'Cash Drops'
    }
  ];

  const handleSelectBanner = async (url: string) => {
    setActiveBanner(url);
    setSaving(true);
    setFeedback(null);

    try {
      await updateCampaign({ activeBannerUrl: url });
      setFeedback('Active promotional banner theme updated!');
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-stone-200">
        <h2 className="text-xl font-black uppercase text-stone-900 font-display">
          Promotional Banners & Creative Assets
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Select or configure the promotional banner theme displayed across marketing landing channels.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bannerTemplates.map((template) => {
          const isSelected = activeBanner === template.url;
          return (
            <div
              key={template.id}
              className={`rounded-2xl p-6 border transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-red-50/50 border-airtel-red ring-2 ring-airtel-red/20 shadow-md'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
              onClick={() => handleSelectBanner(template.url)}
            >
              <div>
                <div className="h-32 rounded-xl bg-gradient-to-br from-airtel-red via-[#cc0000] to-airtel-deepred flex items-center justify-center text-white mb-4 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="text-center p-3 relative z-10">
                    <Sparkles className="w-6 h-6 text-gold mx-auto mb-1 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider block font-display">
                      AIRTEL DECEMBER CASH BONANZA
                    </span>
                    <span className="text-[10px] text-rose-200 font-semibold">{template.theme}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-stone-900">{template.name}</h3>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-airtel-red text-white uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-500 leading-relaxed">
                  {template.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-medium">Standard 1200x630</span>
                <button
                  type="button"
                  disabled={isSelected || saving}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    isSelected
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-900 text-white hover:bg-airtel-red'
                  }`}
                >
                  {isSelected ? 'Applied' : 'Apply Theme'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

