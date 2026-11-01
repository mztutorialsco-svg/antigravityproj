import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Sparkles, Play, CheckCircle2, BarChart3, Users, Zap, Award } from 'lucide-react';

export const Hero = ({ onOpenEnquiry }) => {
  const [activeMetric, setActiveMetric] = useState('reach');

  const metricStats = {
    reach: { value: '4.8M+', label: 'Organic Impressions Generated', growth: '+142%', color: '#00FF87' },
    leads: { value: '18,500+', label: 'Qualified Inquiries Routed', growth: '+89%', color: '#CCFF00' },
    roas: { value: '4.2x', label: 'Targeted Ad Spend Return (ROAS)', growth: '+64%', color: '#10B981' },
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Radiant ambient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-brand-neon/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-brand-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Official Company Identity Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-card border-brand-neon/30 text-xs sm:text-sm text-slate-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-neon"></span>
              </span>
              <span className="font-semibold text-brand-neon tracking-wide">BS GROWTH LAB</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-medium">Digital Marketing & Creative Solutions Company</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl tracking-tight leading-[1.08] text-white">
              YOUR BUSINESS. <br />
              <span className="text-neon-gradient">OUR DIGITAL GROWTH.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
              <strong className="text-white font-semibold">BS Growth Lab</strong> is a digital marketing and creative solutions company helping businesses build powerful brands, strengthen their online presence and grow through innovative digital strategies.
            </p>

            {/* Value Bullet Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0" />
                <span>Full-Funnel Marketing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0" />
                <span>Creative Studio Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0" />
                <span>India & International</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="btn-primary"
              >
                <span>Explore Our Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => onOpenEnquiry(null)}
                className="btn-secondary group"
              >
                <span>Work With Us</span>
                <Zap className="w-4 h-4 text-brand-neon group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white">14+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Core Services</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-brand-neon">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Custom Strategy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-brand-lime">Global</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Client Standards</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Digital Growth Visualization Hub */}
          <div className="lg:col-span-5 relative">
            
            {/* Glass Dashboard Card Container */}
            <div className="relative glass-card rounded-2xl p-6 sm:p-7 border-white/[0.12] shadow-2xl overflow-hidden backdrop-blur-2xl">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center text-brand-neon">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      Growth Analytics Matrix
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-neon/20 text-brand-neon border border-brand-neon/30">
                        LIVE ENGINE
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">BS Growth Lab Performance Framework</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-slate-400 font-mono">Real-time</span>
                </div>
              </div>

              {/* Metric Selector Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-dark-900/80 p-1.5 rounded-xl mt-5 border border-white/[0.05]">
                <button
                  onClick={() => setActiveMetric('reach')}
                  className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all ${
                    activeMetric === 'reach'
                      ? 'bg-brand-neon text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Reach
                </button>
                <button
                  onClick={() => setActiveMetric('leads')}
                  className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all ${
                    activeMetric === 'leads'
                      ? 'bg-brand-neon text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Inquiries
                </button>
                <button
                  onClick={() => setActiveMetric('roas')}
                  className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all ${
                    activeMetric === 'roas'
                      ? 'bg-brand-neon text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ROAS / Ads
                </button>
              </div>

              {/* Active Metric Highlight Display */}
              <div className="mt-5 p-4 rounded-xl bg-dark-850/80 border border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    {metricStats[activeMetric].label}
                  </div>
                  <div className="text-3xl font-display font-extrabold text-white mt-1">
                    {metricStats[activeMetric].value}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-brand-neon/15 text-brand-neon border border-brand-neon/30">
                    <TrendingUp className="w-3 h-3" />
                    {metricStats[activeMetric].growth}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">QoQ Trajectory</div>
                </div>
              </div>

              {/* Simulated Visual Growth Curve (SVG Path Graph) */}
              <div className="mt-5 relative h-36 w-full rounded-xl bg-dark-900/90 border border-white/[0.06] p-3 flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-neon/10 to-transparent pointer-events-none" />
                
                {/* SVG Graph Curve */}
                <svg viewBox="0 0 300 100" className="w-full h-24 overflow-visible">
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00FF87" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00FF87" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path
                    d="M0,80 Q50,75 100,50 T200,35 T300,10 L300,100 L0,100 Z"
                    fill="url(#curveGradient)"
                  />
                  {/* Line Stroke */}
                  <path
                    d="M0,80 Q50,75 100,50 T200,35 T300,10"
                    fill="none"
                    stroke="#00FF87"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Data Points */}
                  <circle cx="100" cy="50" r="4" fill="#CCFF00" />
                  <circle cx="200" cy="35" r="4" fill="#00FF87" />
                  <circle cx="300" cy="10" r="5" fill="#FFFFFF" stroke="#00FF87" strokeWidth="2" />
                </svg>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-white/[0.05] z-10">
                  <span>Audit Phase</span>
                  <span>Creative Testing</span>
                  <span>Full Funnel Scale</span>
                </div>
              </div>

              {/* Mini Features List below Graph */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-brand-neon" />
                    AI-Driven Content Planning
                  </span>
                  <span className="text-brand-lime font-mono text-[11px]">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-slate-300 flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5 text-brand-neon" />
                    Multi-Channel Audience Retargeting
                  </span>
                  <span className="text-brand-neon font-mono text-[11px]">OPTIMIZED</span>
                </div>
              </div>

            </div>

            {/* Floating Glass Accent Badge 1 */}
            <div className="absolute -top-4 -left-4 sm:-left-6 glass-card rounded-xl p-3 border-brand-neon/30 shadow-neon flex items-center gap-3 animate-float hidden sm:flex">
              <div className="w-8 h-8 rounded-lg bg-brand-neon flex items-center justify-center text-black">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Full-Service Agency</div>
                <div className="text-[10px] text-slate-400">14 In-House Solutions</div>
              </div>
            </div>

            {/* Floating Glass Accent Badge 2 */}
            <div className="absolute -bottom-5 -right-3 sm:-right-5 glass-card rounded-xl p-3 border-brand-lime/30 shadow-lime flex items-center gap-3 hidden sm:flex">
              <div className="w-8 h-8 rounded-lg bg-brand-lime flex items-center justify-center text-black">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">We Build. We Grow.</div>
                <div className="text-[10px] text-slate-400">We Scale.</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
