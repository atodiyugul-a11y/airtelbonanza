import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface DemoBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'banner' | 'pill' | 'tag';
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ size = 'md', className = '', variant = 'pill' }) => {
  if (variant === 'banner') {
    return (
      <aside
        aria-label="Official Campaign Notice"
        className={`bg-airtel-red text-white py-2 px-4 text-xs text-center font-medium ${className}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
          <span>
            <strong>AIRTEL DECEMBER CASH BONANZA 2026</strong> — Instant, daily, weekly & $200,000 Grand Prize are now active.
          </span>
        </div>
      </aside>
    );
  }

  if (variant === 'tag') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5" />
        Verified
      </span>
    );
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-1 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
    lg: 'text-sm px-4 py-1.5 gap-2',
  };

  return (
    <div className={`inline-flex items-center rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses[size]} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      <span>Live Official Campaign · 2026</span>
    </div>
  );
};
