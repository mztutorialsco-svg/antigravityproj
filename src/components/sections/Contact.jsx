import React, { useState } from 'react';
import { 
  Send, Phone, Mail, MapPin, MessageSquare, Instagram, 
  Linkedin, ArrowUpRight, CheckCircle2, Clock, Globe2, Sparkles, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { storageService } from '../../services/storageService';
import { COMPANY_INFO, SERVICES_LIST } from '../../data/companyData';

export const Contact = ({ prefilledService = '', onSubmissionSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: prefilledService || 'Digital Marketing',
    budget: '₹20,000 - ₹50,000 / month',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const budgetOptions = [
    'Starter (₹1,999 / $29 mo)',
    'Growth (₹4,999 / $69 mo)',
    'Premium (₹9,999 / $139 mo)',
    '₹20,000 - ₹50,000 / month',
    '₹50,000 - ₹1,00,000 / month',
    '₹1,00,000+ / month',
    '$1,000 - $3,000 / month (Global)',
    '$3,000+ / month (Enterprise)'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your full name, email address, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await storageService.submitEnquiry(formData);
      setIsSubmitting(false);
      setSubmittedId(result.id);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00FF87', '#CCFF00', '#10B981', '#FFFFFF']
      });

      if (onSubmissionSuccess) {
        onSubmissionSuccess(result);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage('An error occurred submitting your enquiry. Please try again or message directly on WhatsApp.');
    }
  };

  const generateWhatsAppLink = () => {
    const text = `Hello BS Growth Lab team! My name is ${formData.fullName || 'there'}, from ${formData.companyName || 'my company'}. I am interested in exploring ${formData.service || 'your digital marketing services'}. Let's discuss growth strategies.`;
    return `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-24 relative bg-dark-950">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[400px] bg-brand-neon/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-brand-neon/30 text-xs font-semibold text-brand-neon uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" /> Start The Conversation
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            LET'S BUILD SOMETHING <br />
            <span className="text-neon-gradient">GREAT TOGETHER.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Ready to establish your digital authority and accelerate customer acquisition? Connect directly with BS Growth Lab to discuss your objectives.
          </p>
        </div>

        {/* Contact Layout: Form (Left) & Corporate Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border-white/[0.08] shadow-2xl relative">
            
            {submittedId ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-neon/20 border border-brand-neon text-brand-neon flex items-center justify-center mx-auto shadow-neon">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-white">
                  Enquiry Received Successfully!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for connecting with <strong className="text-white">BS Growth Lab</strong>. Our strategic growth team will review your business requirements and contact you within 24 business hours.
                </p>
                <div className="inline-block p-2.5 rounded-xl bg-dark-900 border border-white/10 font-mono text-xs text-brand-neon">
                  Reference ID: <span className="text-white font-bold">{submittedId}</span>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmittedId(null);
                      setFormData({
                        fullName: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        service: 'Digital Marketing',
                        budget: '₹20,000 - ₹50,000 / month',
                        message: ''
                      });
                    }}
                    className="btn-secondary text-xs py-2 px-5"
                  >
                    Send Another Message
                  </button>

                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-2 px-5 flex items-center gap-2"
                  >
                    <span>Instant WhatsApp Connect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <h3 className="font-display font-bold text-xl text-white">
                    Company Project Enquiry
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Direct Corporate Intake
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name <span className="text-brand-neon">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-dark-900/90 border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-neon transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Technologies"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-dark-900/90 border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-neon transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Work Email <span className="text-brand-neon">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-dark-900/90 border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-neon transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number (with country code) <span className="text-brand-neon">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-dark-900/90 border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-neon transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Required */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-dark-900/90 border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-neon transition-colors"
                    >
                      <option value="Custom Integrated Growth Package">Custom Integrated Growth Package</option>
                      {SERVICES_LIST.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Monthly Project Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-dark-900/90 border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-neon transition-colors"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Goals & Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your business, primary goals, current bottlenecks, or desired timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-dark-900/90 border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-neon transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3.5 text-sm tracking-wide flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting Enquiry...</span>
                    ) : (
                      <>
                        <span>Submit Company Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2 font-mono">
                    All business information kept strictly confidential.
                  </p>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Direct Channels, WhatsApp & Company Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Box */}
            <div className="glass-card rounded-2xl p-7 border-emerald-500/30 bg-emerald-950/15 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">
                    Direct WhatsApp Enquiry
                  </h4>
                  <p className="text-xs text-emerald-400 font-mono">Immediate Business Routing</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Prefer direct messaging? Chat directly with the BS Growth Lab client coordination desk on WhatsApp.
              </p>
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg"
              >
                <span>Message on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Corporate Contact Details */}
            <div className="glass-card rounded-2xl p-7 border-white/[0.08] space-y-5">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold pb-2 border-b border-white/[0.06]">
                Corporate Office & Inquiries
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Official Company Email</div>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-sm font-semibold text-white hover:text-brand-neon transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Direct Business Line</div>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-sm font-semibold text-white hover:text-brand-neon transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Geographic Reach */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Headquarters & Hubs</div>
                  <div className="text-sm font-semibold text-white">
                    {COMPANY_INFO.address}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    (Serving Clients Worldwide Across Timezones)
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-neon flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Standard Operating Hours</div>
                  <div className="text-sm font-semibold text-white">
                    {COMPANY_INFO.operatingHours}
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <a
                  href={COMPANY_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-brand-neon/40 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-brand-neon" />
                  <span>Instagram</span>
                </a>
                <a
                  href={COMPANY_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-brand-neon/40 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-brand-neon" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
