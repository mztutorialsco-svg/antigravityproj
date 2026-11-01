import React from 'react';
import { Check, Zap, Sparkles, ArrowUpRight, HelpCircle, AlertCircle } from 'lucide-react';
import { PRICING_PLANS } from '../../data/companyData';

export const Pricing = ({ currency = 'INR', setCurrency, onOpenEnquiry }) => {
  return (
    <section id="pricing" className="py-24 relative bg-dark-900/60 border-t border-b border-white/[0.05]">
      {/* Background neon ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-neon/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Currency Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-brand-neon/30 text-xs font-semibold text-brand-neon uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" /> Transparent Investment
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              COMPANY <span className="text-neon-gradient">PRICING</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Structured monthly packages designed to provide startups and established brands with reliable creative and marketing execution at predictable company rates.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-dark-950 p-1.5 rounded-full border border-white/10 self-start md:self-auto shadow-inner">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                currency === 'INR'
                  ? 'bg-brand-neon text-black shadow-neon'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              INR (₹) - India
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-brand-neon text-black shadow-neon'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($) - Global
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (Starter, Growth, Premium) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isGrowth = plan.id === 'growth';

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isGrowth
                    ? 'glass-card-active border-brand-neon/60 shadow-neon-lg scale-100 lg:-translate-y-2'
                    : 'glass-card border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Popular Pill */}
                {isGrowth && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-neon to-brand-lime text-black font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-neon">
                      {plan.badge}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      Monthly Retainer
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed min-h-[38px]">
                    {plan.description}
                  </p>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-1.5 pb-6 border-b border-white/[0.08] mb-6">
                    <span className="text-slate-400 text-lg font-bold">
                      {currency === 'INR' ? '₹' : '$'}
                    </span>
                    <span className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight">
                      {currency === 'INR' ? plan.priceINR : plan.priceUSD}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      What's Included:
                    </div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-brand-neon/15 text-brand-neon flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => onOpenEnquiry(`Plan Selection: ${plan.name} Package`)}
                    className={`w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isGrowth
                        ? 'btn-primary'
                        : 'btn-secondary hover:border-brand-neon/40 hover:text-brand-neon'
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <div className="text-center text-[10px] text-slate-400 mt-2 font-mono">
                    No long-term lock-in • Monthly renewal
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Essential Transparent Disclaimer Note */}
        <div className="mt-12 glass-card rounded-2xl p-6 border-brand-neon/20 flex items-start sm:items-center gap-4 bg-dark-950">
          <div className="w-10 h-10 rounded-xl bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center text-brand-neon flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">
              Transparent Advertising Policy
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              <strong>Advertising budget is separate:</strong> Ad campaign spend for Meta Ads and Google Ads is paid directly to the respective ad networks from your corporate billing accounts. BS Growth Lab manages strategy, ad creation, targeting, tracking, and continuous optimization.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
