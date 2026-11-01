import React from 'react';

export const Logo = ({ size = "md", showText = true, className = "" }) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-13 h-13",
    xl: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-base tracking-tight",
    md: "text-lg tracking-tight",
    lg: "text-2xl tracking-tighter",
    xl: "text-3xl tracking-tighter",
  };

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Monogram Icon */}
      <div className={`relative ${iconSizes[size] || iconSizes.md} flex-shrink-0`}>
        {/* Ambient neon backdrop glow */}
        <div className="absolute inset-0 bg-brand-neon/20 rounded-xl blur-md group-hover:bg-brand-neon/40 transition-all duration-300" />
        
        {/* High-precision Monogram SVG */}
        <svg 
          viewBox="0 0 100 100" 
          className="relative w-full h-full drop-shadow-[0_0_12px_rgba(0,255,135,0.4)] transition-transform duration-300 group-hover:scale-105"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF87" />
              <stop offset="50%" stopColor="#2EFFA1" />
              <stop offset="100%" stopColor="#CCFF00" />
            </linearGradient>
            
            <linearGradient id="darkBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F1722" />
              <stop offset="100%" stopColor="#050709" />
            </linearGradient>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hexagonal / Rounded Shield Canvas */}
          <rect 
            x="4" 
            y="4" 
            width="92" 
            height="92" 
            rx="24" 
            fill="url(#darkBgGrad)" 
            stroke="url(#bsGradient)" 
            strokeWidth="2.5" 
            className="transition-all duration-300 group-hover:stroke-[3.5]"
          />

          {/* Futuristic BS Monogram Path with Growth Vector Dynamics */}
          {/* Stem of B */}
          <path 
            d="M26 26 H46 C54 26 60 30 60 37 C60 42 56 46 51 48 C58 50 62 55 62 63 C62 71 54 74 44 74 H26 V26 Z" 
            stroke="url(#bsGradient)" 
            strokeWidth="5.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Inner Cut of B */}
          <path 
            d="M38 37 H46 C48.5 37 50.5 38.5 50.5 40.5 C50.5 42.5 48.5 44 46 44 H38 V37 Z" 
            fill="url(#bsGradient)"
          />
          <path 
            d="M38 56 H46 C49 56 51.5 57.5 51.5 60 C51.5 62.5 49 64 46 64 H38 V56 Z" 
            fill="url(#bsGradient)"
          />

          {/* Intersecting Dynamic S Path weaving through B */}
          <path 
            d="M74 34 C70 28 62 27 57 30 C51 33 50 39 53 44 L63 56 C67 61 65 68 59 71 C53 74 46 72 43 67" 
            stroke="#CCFF00" 
            strokeWidth="4" 
            strokeLinecap="round"
            filter="url(#neonGlow)"
          />

          {/* Upward Growth Arrow Accent */}
          <path 
            d="M72 24 L78 24 L78 30 M78 24 L68 34" 
            stroke="#00FF87" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-extrabold text-white tracking-wide ${textSizes[size] || textSizes.md}`}>
              BS GROWTH LAB
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
          </div>
          <span className="text-[9.5px] uppercase tracking-[0.22em] font-semibold text-slate-400 mt-1">
            Digital Marketing & Creative
          </span>
        </div>
      )}
    </div>
  );
};
