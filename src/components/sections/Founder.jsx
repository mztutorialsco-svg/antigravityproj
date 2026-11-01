import React from 'react';
import { User, Quote, Shield, Award, Sparkles, Building, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

export const Founder = () => {
  return (
    <section id="leadership" className="py-24 relative bg-dark-900/40 border-t border-b border-white/[0.05]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand-neon/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-brand-neon/30 text-xs font-semibold text-brand-neon uppercase tracking-widest mb-4">
            <Building className="w-3.5 h-3.5" /> Company Governance
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            COMPANY <span className="text-neon-gradient">LEADERSHIP</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            The visionary leadership guiding BS Growth Lab's commitment to strategic digital growth and accessible creative excellence.
          </p>
        </div>

        {/* Founder Profile Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-white/[0.1] shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Executive Avatar / Monogram Visual Badge */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-1 bg-gradient-to-tr from-brand-neon via-brand-lime to-white/20 shadow-neon">
                <div className="w-full h-full rounded-[22px] bg-dark-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial-mesh opacity-70" />
                  
                  {/* Subtle Founder Executive Monogram Crest */}
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-brand-neon/10 border border-brand-neon/40 flex items-center justify-center text-brand-neon mb-3 shadow-inner">
                    <span className="font-display font-black text-3xl text-brand-neon tracking-tighter">
                      SB
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="font-display font-bold text-lg text-white">
                      Sayyed Bilal
                    </div>
                    <div className="text-xs font-mono text-brand-lime">
                      Founder & Owner
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-400 bg-dark-900/90 px-4 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>BS GROWTH LAB • Established Leadership</span>
              </div>
            </div>

            {/* Right Column: Founder Vision & Statement */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-2 text-brand-neon">
                <Quote className="w-8 h-8 opacity-40 rotate-180" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                  Founder's Vision
                </span>
              </div>

              {/* Exact user-provided description */}
              <blockquote className="text-xl sm:text-2xl font-display font-medium text-white leading-relaxed italic border-l-2 border-brand-neon pl-6 my-4">
                "BS Growth Lab was founded with a vision to make professional digital marketing and creative solutions accessible to businesses of every size."
              </blockquote>

              <div className="pt-2">
                <div className="font-display font-bold text-lg text-white">
                  Sayyed Bilal
                </div>
                <div className="text-sm text-brand-neon font-medium">
                  Founder & Owner, BS Growth Lab
                </div>
              </div>

              {/* Executive Guiding Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-brand-neon flex-shrink-0" />
                  <span>Accessible Enterprise Quality</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-brand-neon flex-shrink-0" />
                  <span>Long-Term Client Partnerships</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-brand-neon flex-shrink-0" />
                  <span>Transparent Marketing Metrics</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-brand-neon flex-shrink-0" />
                  <span>Global Market Standards</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
