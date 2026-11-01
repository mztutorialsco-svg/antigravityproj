import React, { useState } from 'react';
import { ExternalLink, Tag, Sparkles, FolderKanban, CheckCircle2, Eye, X } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../../data/companyData';

export const Portfolio = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = [
    'All',
    'Branding Projects',
    'Social Media Campaigns',
    'Website Development',
    'Video Production',
    'Advertising Creatives',
    'Marketing Campaigns'
  ];

  const filteredProjects = PORTFOLIO_PROJECTS.filter(project => {
    return selectedCategory === 'All' || project.category === selectedCategory;
  });

  return (
    <section id="portfolio" className="py-24 relative bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-brand-neon/30 text-xs font-semibold text-brand-neon uppercase tracking-widest mb-4">
              <FolderKanban className="w-3.5 h-3.5" /> Company Showcase
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              FEATURED <span className="text-neon-gradient">PORTFOLIO</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Explore representative work samples showcasing our brand engineering, social media productions, and multi-channel marketing campaigns.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-brand-neon" />
            <span>Interactive Case Previews Enabled</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-neon text-black font-bold shadow-neon'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden border-white/[0.08] group flex flex-col justify-between hover:border-brand-neon/40 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                {/* Project Image & Demo Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-dark-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

                  {/* Explicit Demo Flag as instructed */}
                  {project.isDemo && (
                    <div className="absolute top-3 left-3 bg-dark-950/80 backdrop-blur-md border border-brand-lime/40 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-brand-lime flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                      DEMO CONCEPT
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-dark-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300">
                    {project.industry}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-brand-neon font-semibold mb-1">
                    {project.category}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-brand-neon transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                    {project.challenge}
                  </p>

                  {/* Result pill */}
                  <div className="p-2.5 rounded-lg bg-brand-neon/5 border border-brand-neon/20 mb-4 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-neon flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 font-medium">
                      {project.result}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.05]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-6 pt-0 border-t border-white/[0.05] mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-slate-300 hover:text-brand-neon flex items-center gap-1.5 transition-colors py-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Case Study</span>
                </button>

                <button
                  onClick={() => onOpenEnquiry(`Project Inquiry: ${project.title}`)}
                  className="btn-outline-neon text-[11px] py-1.5 px-3"
                >
                  <span>Build Similar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Demo Content */}
        <div className="mt-12 text-center text-xs text-slate-400">
          * Representative demo case studies illustrate scope of execution until client confidentiality agreements allow public release.
        </div>

      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card-active rounded-2xl max-w-2xl w-full p-6 sm:p-8 border-brand-neon/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-brand-neon uppercase">
                {activeModalProject.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-mono">
                {activeModalProject.industry}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl text-white mb-4">
              {activeModalProject.title}
            </h3>

            <img
              src={activeModalProject.image}
              alt={activeModalProject.title}
              className="w-full aspect-[16/9] object-cover rounded-xl mb-6 border border-white/10"
            />

            <div className="space-y-4 text-sm text-slate-300 mb-6">
              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20">
                <div className="font-bold text-red-400 text-xs uppercase mb-1">Challenge Identified</div>
                <p>{activeModalProject.challenge}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20">
                <div className="font-bold text-blue-400 text-xs uppercase mb-1">Our Strategy & Execution</div>
                <p>{activeModalProject.solution}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-neon/10 border border-brand-neon/30">
                <div className="font-bold text-brand-neon text-xs uppercase mb-1">Business Result</div>
                <p>{activeModalProject.result}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModalProject(null)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const proj = activeModalProject.title;
                  setActiveModalProject(null);
                  onOpenEnquiry(`Portfolio Consultation: ${proj}`);
                }}
                className="btn-primary text-xs py-2 px-4"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
