import React, { useState } from 'react';
import { RewardCategory } from '../../types';
import { updateReward } from '../../services/api';
import { Save, CheckCircle, AlertCircle, DollarSign, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

interface Props {
  rewards: RewardCategory[];
  onRefresh: () => void;
}

export const RewardsManagerTab: React.FC<Props> = ({ rewards, onRefresh }) => {
  const [categories, setCategories] = useState<RewardCategory[]>([...rewards]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; success: boolean; msg: string } | null>(null);

  const handleFieldChange = (id: string, field: keyof RewardCategory, value: any) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = async (category: RewardCategory) => {
    if (category.minAmount < 100) {
      setFeedback({ id: category.id, success: false, msg: 'Prizes must start from at least $100 USD.' });
      return;
    }
    if (category.minAmount > category.maxAmount) {
      setFeedback({ id: category.id, success: false, msg: 'Min amount cannot exceed Max amount.' });
      return;
    }

    setSavingId(category.id);
    setFeedback(null);

    try {
      await updateReward(category.id, {
        title: category.title,
        minAmount: Number(category.minAmount),
        maxAmount: Number(category.maxAmount),
        description: category.description,
        buttonText: category.buttonText,
        enabled: category.enabled,
        drawFrequency: category.drawFrequency,
        eligibilityNote: category.eligibilityNote,
        badgeTag: category.badgeTag
      });
      setFeedback({ id: category.id, success: true, msg: 'Category updated successfully!' });
      onRefresh();
    } catch (err: any) {
      setFeedback({ id: category.id, success: false, msg: err.message || 'Failed to update category.' });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-200">
        <h2 className="text-xl font-black uppercase text-stone-900 font-display">
          Prize Categories Configuration
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          Configure the 4 prize reward tiers, customize USD prize ranges starting from $100, and toggle tier availability.
        </p>
      </div>

      {/* Categories Cards */}
      <div className="space-y-6">
        {categories.map((cat, idx) => {
          const isSaving = savingId === cat.id;
          const status = feedback?.id === cat.id ? feedback : null;

          return (
            <div
              key={cat.id}
              className={`rounded-2xl border p-6 transition-all ${
                cat.enabled
                  ? 'bg-white border-stone-200 shadow-sm'
                  : 'bg-stone-100/60 border-stone-300 opacity-80'
              }`}
            >
              {/* Top Row: Category Title & Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-airtel-red text-white flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-black text-base text-stone-900 uppercase font-display">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] text-stone-400 font-mono">ID: {cat.id}</span>
                  </div>
                </div>

                {/* Enable/Disable Toggle */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-stone-600">
                    {cat.enabled ? 'Enabled on Site' : 'Disabled / Hidden'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleFieldChange(cat.id, 'enabled', !cat.enabled)}
                    className="focus:outline-none"
                  >
                    {cat.enabled ? (
                      <ToggleRight className="w-8 h-8 text-emerald-600" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-stone-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Status alert if any */}
              {status && (
                <div
                  className={`my-4 p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
                    status.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {status.success ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                  <span>{status.msg}</span>
                </div>
              )}

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                
                {/* Min Amount USD */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Min Prize ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                    <input
                      type="number"
                      min={100}
                      value={cat.minAmount}
                      onChange={(e) => handleFieldChange(cat.id, 'minAmount', Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold"
                    />
                  </div>
                </div>

                {/* Max Amount USD */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Max Prize ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
                    <input
                      type="number"
                      min={100}
                      value={cat.maxAmount}
                      onChange={(e) => handleFieldChange(cat.id, 'maxAmount', Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold"
                    />
                  </div>
                </div>

                {/* Button Text */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Action Button Text
                  </label>
                  <input
                    type="text"
                    value={cat.buttonText}
                    onChange={(e) => handleFieldChange(cat.id, 'buttonText', e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold"
                  />
                </div>

                {/* Badge Tag */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Badge Tag Label
                  </label>
                  <input
                    type="text"
                    value={cat.badgeTag}
                    onChange={(e) => handleFieldChange(cat.id, 'badgeTag', e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

              </div>

              {/* Description & Frequency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Prize Category Description
                  </label>
                  <input
                    type="text"
                    value={cat.description}
                    onChange={(e) => handleFieldChange(cat.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Draw Frequency Note
                  </label>
                  <input
                    type="text"
                    value={cat.drawFrequency}
                    onChange={(e) => handleFieldChange(cat.id, 'drawFrequency', e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Save Button for this card */}
              <div className="mt-4 pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSave(cat)}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-airtel-red text-white text-xs font-bold transition disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Updating...' : `Update ${cat.title}`}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

