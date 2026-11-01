import React from 'react';
import { 
  Sparkles, Award, Wallet, Sliders, Headphones, 
  Cpu, MessageCircle, BarChart3, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../../data/companyData';

const PILLAR_ICONS = [
  Sparkles,
  Award,
  Wallet,
  Sliders,
  Headphones,
  Cpu,
  MessageCircle,
  BarChart3
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 relative bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-brand-neon/30 text-xs font-semibold text-brand-neon uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Company Standards
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            WHY CHOOSE <span className="text-neon-gradient">BS GROWTH LAB?</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            We operate with the conviction that businesses grow through strategic consistency, high-caliber creative assets, and honest data analysis.
          </p>
        </div>

        {/* 8 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx] || Sparkles;

            return (
              <div
                key={pillar.id}
                className="glass-card rounded-2xl p-6 border-white/[0.08] hover:border-brand-neon/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-neon/10 border border-brand-neon/25 flex items-center justify-center text-brand-neon mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] font-mono text-brand-neon">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Institutional Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic Growth & Integrity Pledge */}
        <div className="mt-16 glass-card rounded-2xl p-8 border-white/[0.1] bg-dark-900/60 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-neon/15 border border-brand-neon/30 flex items-center justify-center text-brand-neon flex-shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                Our Transparent Growth Standard
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                At BS Growth Lab, we believe in authentic value creation. We do not offer artificial follower schemes, false guarantees, or deceptive shortcuts. We focus on brand building, conversion optimization, creative differentiation, and measurable progress based on proven digital strategies.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
