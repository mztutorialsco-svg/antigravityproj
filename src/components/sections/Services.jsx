import React, { useState } from 'react';
import { 
  Megaphone, Share2, Instagram, Facebook, Smartphone, Film, 
  Palette, Code, Search, Target, Layers, FileText, TrendingUp, Cpu, 
  ArrowUpRight, CheckCircle, Sparkles, Filter 
} from 'lucide-react';
import { SERVICES_LIST } from '../../data/companyData';

// Map icon string names to Lucide icon components
const ICON_MAP = {
  Megaphone,
  Share2,
  Instagram,
  Facebook,
  Smartphone,
  Film,
  Palette,
  Code,
  Search,
  Target,
  Layers,
  FileText,
  TrendingUp,
  Cpu
};

export const Services = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Strategy & Growth',
    'Social & Content',
    'Video & Creative',
    'Ads & Growth',
    'Design & Dev'
  ];

  const filteredServices = SERVICES_LIST.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-24 relative bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-brand-neon/30 text-xs font-semibold text-brand-neon uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Full-Service Digital Marketing
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              OUR <span className="text-neon-gradient">SERVICES</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              BS Growth Lab delivers 14 specialized, high-impact marketing, creative, and technical solutions designed to build market authority and drive measurable customer acquisition.
            </p>
          </div>

          {/* Quick Stats Box */}
          <div className="flex items-center gap-4 bg-dark-900/80 p-3 rounded-xl border border-white/[0.08] self-start md:self-auto">
            <div className="text-right">
              <div className="text-xl font-bold text-brand-neon font-display">14 Capabilities</div>
              <div className="text-xs text-slate-400">Integrated Digital Execution</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-neon text-black font-bold shadow-neon'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Service Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-900/90 border border-white/[0.1] rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-neon transition-colors"
            />
          </div>
        </div>

        {/* Services Grid (14 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Megaphone;

            return (
              <div
                key={service.id}
                className="glass-card rounded-2xl p-7 border-white/[0.08] relative group flex flex-col justify-between hover:border-brand-neon/40 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-neon/15 text-brand-neon border border-brand-neon/30">
                    High Demand
                  </span>
                )}

                <div>
                  {/* Top Header: Number and Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-neon/10 border border-brand-neon/25 flex items-center justify-center text-brand-neon group-hover:scale-110 group-hover:bg-brand-neon group-hover:text-black transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-mono text-slate-400 font-semibold">
                      {service.number}
                    </span>
                  </div>

                  {/* Title and Category */}
                  <div className="text-[11px] font-mono uppercase tracking-wider text-brand-lime font-semibold mb-1">
                    {service.category}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-brand-neon transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6 border-t border-white/[0.06] pt-4">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-neon flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enquiry Action Button */}
                <div className="pt-2 border-t border-white/[0.06]">
                  <button
                    onClick={() => onOpenEnquiry(service.title)}
                    className="w-full btn-outline-neon text-xs py-2 justify-between group-hover:bg-brand-neon group-hover:text-black transition-all duration-200"
                  >
                    <span>Enquire for {service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 glass-card rounded-2xl p-8 border-brand-neon/20 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-dark-900 to-dark-850">
          <div>
            <h4 className="text-xl font-display font-bold text-white">
              Need a Customized Digital Package for Your Business?
            </h4>
            <p className="text-slate-400 text-sm mt-1">
              We engineer tailored marketing stacks combining multiple services to fit your exact quarterly milestones.
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry("Custom Integrated Growth Package")}
            className="btn-primary flex-shrink-0 text-sm"
          >
            <span>Request Custom Plan</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
