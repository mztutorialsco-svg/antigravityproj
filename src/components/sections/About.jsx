import React from 'react';
import { Target, Eye, ShieldCheck, Compass, Lightbulb, Users2, Rocket, Globe2 } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

export const About = () => {
  return (
    <section id="about" className="py-24 relative bg-dark-900/50 border-t border-b border-white/[0.05]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-neon/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-brand-neon/30 text-xs font-semibold text-brand-neon uppercase tracking-widest mb-4">
            About The Company
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            WE ARE <span className="text-neon-gradient">BS GROWTH LAB</span>
          </h2>
          <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed">
            BS Growth Lab is a forward-thinking digital marketing company focused on helping businesses succeed in the digital world. We combine creativity, technology and strategic marketing to develop powerful brand experiences and digital growth solutions.
          </p>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Our mission is to empower businesses with affordable, innovative and effective digital solutions.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Mission Card */}
          <div className="glass-card rounded-2xl p-8 border-white/[0.08] relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 rounded-full blur-2xl group-hover:bg-brand-neon/20 transition-all duration-500" />
            <div className="w-12 h-12 rounded-xl bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center text-brand-neon mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 flex items-center gap-2">
              Our Mission
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To help businesses establish a strong digital identity and achieve sustainable online growth through accessible, high-impact marketing and creative frameworks.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs font-mono text-brand-neon">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-neon" />
              <span>Sustainable • Transparent • Result-Driven</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="glass-card rounded-2xl p-8 border-white/[0.08] relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/10 rounded-full blur-2xl group-hover:bg-brand-lime/20 transition-all duration-500" />
            <div className="w-12 h-12 rounded-xl bg-brand-lime/10 border border-brand-lime/30 flex items-center justify-center text-brand-lime mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 flex items-center gap-2">
              Our Vision
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              To become a trusted digital growth partner for businesses in India and worldwide, recognized for creative distinction, technical reliability, and transparent execution.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs font-mono text-brand-lime">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
              <span>India Roots • Global Standards • Creative Impact</span>
            </div>
          </div>

        </div>

        {/* Company Identity & Institutional Credibility Strip */}
        <div className="glass-card rounded-2xl p-8 border-white/[0.08] grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Official Company Name
            </div>
            <div className="text-lg font-bold text-white font-display">
              {COMPANY_INFO.name}
            </div>
            <div className="text-xs text-brand-neon mt-1">Registered Digital Enterprise</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Company Leadership
            </div>
            <div className="text-lg font-bold text-white font-display">
              {COMPANY_INFO.founder}
            </div>
            <div className="text-xs text-slate-400 mt-1">{COMPANY_INFO.founderRole}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Business Category
            </div>
            <div className="text-base font-bold text-white">
              Digital Marketing & Creative
            </div>
            <div className="text-xs text-slate-400 mt-1">Branding, Media & Tech</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Market Coverage
            </div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-brand-neon" />
              India & International
            </div>
            <div className="text-xs text-brand-lime mt-1">Cross-Border Execution</div>
          </div>
        </div>

      </div>
    </section>
  );
};
