import React, { useState } from 'react';
import { 
  Building2, Users, Target, Palette, Globe, RefreshCw, 
  ArrowRight, CheckCircle2, AlertCircle, Sparkles, HelpCircle 
} from 'lucide-react';
import { SOLUTIONS_LIST } from '../../data/companyData';

const SOLUTION_ICONS = {
  'brand-building': Building2,
  'social-media-growth': Users,
  'digital-advertising': Target,
  'creative-content': Palette,
  'website-ecommerce': Globe,
  'digital-transformation': RefreshCw
};

export const Solutions = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState(SOLUTIONS_LIST[0].id);

  const currentSolution = SOLUTIONS_LIST.find(s => s.id === activeTab) || SOLUTIONS_LIST[0];
  const CurrentIcon = SOLUTION_ICONS[currentSolution.id] || Sparkles;

  return (
    <section id="solutions" className="py-24 relative bg-dark-900/40 border-t border-b border-white/[0.05]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-lime/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-brand-neon/30 text-xs font-semibold text-brand-neon uppercase tracking-widest mb-4">
            Strategic Outcomes
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            OUR <span className="text-lime-gradient">SOLUTIONS</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Every business encounters distinct digital roadblocks. Here is how BS Growth Lab systematically diagnoses and solves critical marketing, branding, and conversion challenges.
          </p>
        </div>

        {/* Interactive Solution Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {SOLUTIONS_LIST.map((sol) => {
            const Icon = SOLUTION_ICONS[sol.id] || Sparkles;
            const isActive = activeTab === sol.id;

            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`p-3.5 rounded-xl text-left transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'glass-card-active border-brand-neon text-white'
                    : 'glass-card text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                  isActive ? 'bg-brand-neon text-black' : 'bg-white/5 text-slate-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold font-display leading-tight">
                  {sol.title.replace(' Solutions', '')}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Deep-Dive Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-white/[0.1] shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-neon tracking-wider uppercase font-semibold">
                <CurrentIcon className="w-4 h-4" />
                {currentSolution.title}
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {currentSolution.subtitle}
              </h3>

              {/* Challenge vs Solution Callouts */}
              <div className="space-y-4 pt-2">
                {/* The Challenge */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wide mb-1.5">
                    <AlertCircle className="w-4 h-4" />
                    The Business Challenge
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentSolution.challenge}
                  </p>
                </div>

                {/* The BS Growth Lab Solution */}
                <div className="p-4 rounded-xl bg-emerald-950/25 border border-brand-neon/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-neon uppercase tracking-wide mb-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    How BS Growth Lab Solves It
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentSolution.solution}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenEnquiry(currentSolution.title)}
                  className="btn-primary text-sm"
                >
                  <span>Consult on {currentSolution.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Column: Key Strategic Pillars */}
            <div className="lg:col-span-5 bg-dark-900/80 rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-4">
                Core Execution Architecture
              </div>

              <div className="space-y-3">
                {currentSolution.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-3 group hover:border-brand-neon/30 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-brand-neon/15 text-brand-neon text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06] text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-lime flex-shrink-0" />
                <span>Integrated strategy with transparent reporting.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
