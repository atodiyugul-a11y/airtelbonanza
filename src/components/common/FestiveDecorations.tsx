import React from 'react';
import confetti from 'canvas-confetti';

export const triggerFestiveConfetti = () => {
  // Classic festive red, gold, white burst
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#E60000', '#FFD700', '#FFFFFF', '#FFA500', '#FFF5F5']
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};

// Festive String Lights Garland
export const FestiveLightsGarland: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden h-7 pointer-events-none select-none z-20" aria-hidden="true">
      {/* Curved Wire */}
      <div className="absolute top-0 left-0 right-0 h-2 border-b border-stone-800/20 rounded-[50%]"></div>
      <div className="flex justify-around items-center max-w-7xl mx-auto px-4">
        {[
          '#FFD700', '#E60000', '#FFFFFF', '#00C853', '#FFD700',
          '#E60000', '#00C853', '#FFD700', '#FFFFFF', '#E60000',
          '#FFD700', '#00C853', '#E60000', '#FFFFFF', '#FFD700'
        ].map((color, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-1 h-1.5 bg-stone-700"></div>
            <div
              className="w-3 h-4 rounded-full shadow-sm animate-pulse"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}`,
                animationDuration: `${1.2 + (idx % 4) * 0.4}s`,
                animationDelay: `${(idx % 5) * 0.2}s`
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Golden Gift Box Graphic with Ribbon
export const GoldenGiftBox: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-[0_12px_24px_rgba(255,215,0,0.35)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="40%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#C59B27" />
        </linearGradient>
        <linearGradient id="redRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2E2E" />
          <stop offset="50%" stopColor="#E60000" />
          <stop offset="100%" stopColor="#990000" />
        </linearGradient>
        <radialGradient id="boxGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Glow */}
      <circle cx="80" cy="80" r="70" fill="url(#boxGlow)" opacity="0.3" />

      {/* Box Body */}
      <rect x="30" y="60" width="100" height="80" rx="10" fill="url(#goldBoxGrad)" stroke="#B38600" strokeWidth="2" />
      {/* Box Lid */}
      <rect x="24" y="44" width="112" height="22" rx="6" fill="url(#goldBoxGrad)" stroke="#B38600" strokeWidth="2" />

      {/* Vertical Ribbon */}
      <rect x="70" y="44" width="20" height="96" fill="url(#redRibbonGrad)" />
      {/* Horizontal Ribbon on Lid */}
      <rect x="24" y="50" width="112" height="10" fill="url(#redRibbonGrad)" opacity="0.4" />

      {/* Bow Left Loop */}
      <path
        d="M80 44 C65 20, 35 25, 45 42 C50 50, 75 44, 80 44 Z"
        fill="url(#redRibbonGrad)"
        stroke="#800000"
        strokeWidth="1.5"
      />
      {/* Bow Right Loop */}
      <path
        d="M80 44 C95 20, 125 25, 115 42 C110 50, 85 44, 80 44 Z"
        fill="url(#redRibbonGrad)"
        stroke="#800000"
        strokeWidth="1.5"
      />
      {/* Bow Center Knot */}
      <circle cx="80" cy="44" r="8" fill="#FF4D4D" stroke="#800000" strokeWidth="2" />

      {/* Dollar Badge Overlay on Box */}
      <circle cx="80" cy="100" r="18" fill="#FFFFFF" stroke="#FFD700" strokeWidth="3" />
      <text x="80" y="107" fill="#E60000" fontSize="22" fontWeight="900" fontFamily="Arial, sans-serif" textAnchor="middle">$</text>
    </svg>
  );
};

// Floating Dollar Coin Visual
export const DollarCoin: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-gold-dark via-gold to-gold-light p-1 shadow-gold-glow animate-float ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900/30 flex items-center justify-center bg-gradient-to-b from-yellow-300 to-amber-500 text-amber-950 font-black">
        <span style={{ fontSize: size * 0.55 }} className="drop-shadow-sm font-display">$</span>
      </div>
    </div>
  );
};

// Twinkling Star SVG
export const TwinkleStar: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#FFD700',
  size = 24
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-twinkle ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill={color}
      />
    </svg>
  );
};

