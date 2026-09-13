import React, { useEffect, useState, useId } from 'react';
import { useAeirmist } from '../../context/AeirmistContext';

interface AeirmistLogoProps {
  className?: string;
  glow?: boolean;
  glowStrength?: 'weak' | 'normal' | 'strong';
  variant?: 'compact' | 'full' | 'text-only';
  colorClass?: string;
}

export const AeirmistSymbol: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => {
  const [isLight, setIsLight] = useState(false);
  const [imageError, setImageError] = useState(false);
  const uid = useId().replace(/:/g, '');

  let appBranding: any = null;
  try {
    const context = useAeirmist();
    appBranding = context?.appBranding;
  } catch (e) {}

  if (!appBranding && typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('aeirmist_app_branding');
      if (cached) appBranding = JSON.parse(cached);
    } catch (e) {}
  }

  useEffect(() => {
    const checkTheme = () => {
      const lightActive = typeof document !== 'undefined' && document.documentElement.classList.contains('light');
      setIsLight(lightActive);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }
    return () => observer.disconnect();
  }, []);

  const customLogoUrl = isLight 
    ? (appBranding?.lightLogoUrl || appBranding?.darkLogoUrl)
    : (appBranding?.darkLogoUrl || appBranding?.lightLogoUrl);

  useEffect(() => {
    setImageError(false);
  }, [customLogoUrl]);

  if (customLogoUrl && !imageError) {
    return (
      <img 
        src={customLogoUrl} 
        alt="Main Logo" 
        className={`object-contain shrink-0 rounded-xl ${className || 'w-auto h-8'}`}
        style={style}
        onError={() => setImageError(true)}
      />
    );
  }

  const aGradId = `a-grad-${uid}`;
  const waveGradId = `wave-grad-${uid}`;
  const neonGlowId = `neon-glow-${uid}`;

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <defs>
        <filter id={neonGlowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={aGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F2FF" />
          <stop offset="40%" stopColor="#0088FF" />
          <stop offset="80%" stopColor="#7000FF" />
          <stop offset="100%" stopColor="#A822FF" />
        </linearGradient>
        <linearGradient id={waveGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B5F6FF" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#00F2FF" />
        </linearGradient>
      </defs>
      
      {/* Main 'A' Arch */}
      <path 
        d="M 29 74 Q 32 74 37 61 L 46 36 Q 50 24 54 36 L 63 61 Q 68 74 71 74" 
        fill="none" 
        stroke={`url(#${aGradId})`} 
        strokeWidth="9" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        filter={`url(#${neonGlowId})`} 
      />
      
      {/* Horizontal Wave Crossbar */}
      <path 
        d="M 24 60 C 35 52 41 64 50 58 C 59 52 65 62 76 56" 
        fill="none" 
        stroke={`url(#${waveGradId})`} 
        strokeWidth="5" 
        strokeLinecap="round" 
        filter={`url(#${neonGlowId})`} 
      />
      
      {/* Core Quantum Dot */}
      <circle cx="50" cy="40" r="3.5" fill="#FFFFFF" filter={`url(#${neonGlowId})`} />
      <circle cx="50" cy="40" r="5.5" fill="none" stroke="#00F2FF" strokeWidth="1" strokeOpacity="0.85" />
    </svg>
  );
};

export const AeirmistLogo: React.FC<AeirmistLogoProps> = ({
  className = "w-auto h-[40px]",
  glow = true,
  glowStrength = 'normal',
  variant = 'full',
  colorClass = ""
}) => {
  const [isLight, setIsLight] = useState(false);
  const [imageError, setImageError] = useState(false);

  let appBranding: any = null;
  try {
    const context = useAeirmist();
    appBranding = context?.appBranding;
  } catch (e) {}

  if (!appBranding && typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('aeirmist_app_branding');
      if (cached) appBranding = JSON.parse(cached);
    } catch (e) {}
  }

  useEffect(() => {
    const checkTheme = () => {
      const lightActive = typeof document !== 'undefined' && document.documentElement.classList.contains('light');
      setIsLight(lightActive);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }
    return () => observer.disconnect();
  }, []);

  const customLogoUrl = isLight 
    ? (appBranding?.lightLogoUrl || appBranding?.darkLogoUrl)
    : (appBranding?.darkLogoUrl || appBranding?.lightLogoUrl);

  useEffect(() => {
    setImageError(false);
  }, [customLogoUrl]);

  const glowStyles = glow 
    ? glowStrength === 'strong'
      ? { filter: 'drop-shadow(0 0 15px rgba(0, 191, 255, 0.8))' }
      : glowStrength === 'weak'
        ? { filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.3))' }
        : { filter: 'drop-shadow(0 0 10px rgba(0, 191, 255, 0.5))' }
    : undefined;

  const textGlowStyles = glow 
    ? glowStrength === 'strong'
      ? { textShadow: '0 0 15px rgba(0, 191, 255, 0.9), 0 0 30px rgba(0, 191, 255, 0.4)' }
      : glowStrength === 'weak'
        ? { textShadow: '0 0 5px rgba(0, 191, 255, 0.4)' }
        : { textShadow: '0 0 8px rgba(0, 191, 255, 0.7), 0 0 15px rgba(0, 191, 255, 0.2)' }
    : undefined;

  const AeirmistText = (style: React.CSSProperties) => (
    <span
        className={`font-display tracking-[0.25em] font-normal text-base sm:text-lg uppercase whitespace-nowrap text-[#ccebff] ${colorClass}`}
        style={{ ...style, ...textGlowStyles }}
    >
      ΛEIRMIST
    </span>
  );

  if (variant === 'text-only') {
    return (
      <div className={`${className} flex items-center justify-center`}>
        {AeirmistText(glowStyles || {})}
      </div>
    );
  }

  if (variant === 'compact') {
    if (customLogoUrl && !imageError) {
      return (
        <div className={`shrink-0 flex items-center justify-center ${className}`}>
          <img 
            src={customLogoUrl} 
            alt="Main App Logo" 
            className="max-h-full max-w-full object-contain shrink-0 rounded-2xl transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]"
            style={glowStyles}
            onError={() => setImageError(true)}
          />
        </div>
      );
    }
    return (
      <div className={`shrink-0 flex items-center justify-center ${className}`}>
        <AeirmistSymbol 
          className="h-full w-auto select-none pointer-events-none shrink-0 transition-transform duration-500 hover:scale-110 hover:rotate-3"
          style={glowStyles}
        />
      </div>
    );
  }

  // If user uploaded a custom logo, render it as the main logo everywhere (mobile + desktop)
  if (customLogoUrl && !imageError) {
    return (
      <div className={`shrink-0 flex items-center justify-center ${className}`}>
        <img 
          src={customLogoUrl} 
          alt="Main App Logo" 
          className="max-h-full max-w-full object-contain shrink-0 rounded-2xl transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]"
          style={glowStyles}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <AeirmistSymbol 
        className="h-full w-auto select-none pointer-events-none shrink-0 transition-transform duration-500 hover:scale-110 hover:rotate-3"
        style={glowStyles}
      />
      <div className="flex items-center">
        {AeirmistText(glowStyles || {})}
      </div>
    </div>
  );
};
