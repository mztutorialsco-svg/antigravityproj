import React from 'react';
import { Logo } from '../common/Logo';
import { ArrowUp, Instagram, Linkedin, Mail, Phone, MapPin, Globe2 } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 border-t border-white/[0.08] relative pt-16 pb-12 overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-brand-neon/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" />
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-3">
              BS Growth Lab is a digital marketing and creative solutions company helping businesses build powerful brands, strengthen their online presence and grow through innovative digital strategies.
            </p>

            <div className="pt-2 text-xs text-brand-neon font-mono font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
              <span>We Build. We Grow. We Scale.</span>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-brand-neon hover:border-brand-neon/40 transition-colors"
                aria-label="BS Growth Lab Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-brand-neon hover:border-brand-neon/40 transition-colors"
                aria-label="BS Growth Lab LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-brand-neon hover:border-brand-neon/40 transition-colors"
                aria-label="BS Growth Lab Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (Cols 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-brand-neon transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-neon transition-colors">About Company</a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-neon transition-colors">All 14 Services</a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-brand-neon transition-colors">Business Solutions</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-brand-neon transition-colors">Project Portfolio</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-brand-neon transition-colors">Company Pricing</a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-brand-neon transition-colors">Leadership</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-neon transition-colors">Contact Company</a>
              </li>
            </ul>
          </div>

          {/* Solutions & Services Highlights (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Key Focus Areas
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Meta & Google Performance Ads</li>
              <li>• Reels & Shorts Creative Direction</li>
              <li>• High-Conversion Web & App Development</li>
              <li>• Brand Identity & Graphic Design Systems</li>
              <li>• Strategic Social Media Management</li>
              <li>• Full-Funnel Digital Growth Consulting</li>
            </ul>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-400">
              <span className="text-slate-300 font-semibold">Leadership:</span> {COMPANY_INFO.founder} ({COMPANY_INFO.founderRole})
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center sm:text-left">
            <span>© 2026 </span>
            <strong className="text-slate-300 font-semibold">BS GROWTH LAB</strong>. All Rights Reserved. Digital Marketing & Creative Solutions Company.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">India & International Markets</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-brand-neon hover:text-brand-neon transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
