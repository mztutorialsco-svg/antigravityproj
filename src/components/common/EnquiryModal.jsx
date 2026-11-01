import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { storageService } from '../../services/storageService';
import { SERVICES_LIST, COMPANY_INFO } from '../../data/companyData';

export const EnquiryModal = ({ isOpen, onClose, defaultService = '', onSubmitted }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: defaultService || 'Digital Marketing',
    budget: '₹20,000 - ₹50,000 / month',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your full name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await storageService.submitEnquiry(formData);
      setIsSubmitting(false);
      setSuccessId(res.id);

      confetti({
        particleCount: 70,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#00FF87', '#CCFF00', '#FFFFFF']
      });

      if (onSubmitted) onSubmitted(res);
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Could not submit enquiry. Please try again.');
    }
  };

  const generateWhatsAppLink = () => {
    const text = `Hello BS Growth Lab team! My name is ${formData.fullName || 'there'}. I am enquiring about ${formData.service || 'your digital marketing services'}.`;
    return `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card-active rounded-3xl max-w-lg w-full p-6 sm:p-8 border-brand-neon/40 shadow-neon-lg relative max-h-[95vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {successId ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-brand-neon/20 border border-brand-neon text-brand-neon flex items-center justify-center mx-auto shadow-neon">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Enquiry Submitted!
            </h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
              Our BS Growth Lab team has logged your enquiry (Ref: <span className="text-brand-neon font-mono font-bold">{successId}</span>). We will respond promptly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-xs py-2 px-4"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="btn-secondary w-full sm:w-auto text-xs py-2 px-4"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="pr-6">
              <div className="text-[11px] font-mono text-brand-neon font-semibold uppercase tracking-wider mb-1">
                BS GROWTH LAB • INQUIRY DESK
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Work With BS Growth Lab
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tell us about your business objectives and we'll craft an actionable growth proposal.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-neon"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Your brand / business"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-neon"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 / Country Code"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-neon"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-brand-neon"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-neon"
                >
                  <option value="Custom Integrated Growth Package">Custom Integrated Growth Package</option>
                  <option value="Plan Selection: Starter Package">Starter Retainer (₹1,999/mo)</option>
                  <option value="Plan Selection: Growth Package">Growth Retainer (₹4,999/mo)</option>
                  <option value="Plan Selection: Premium Package">Premium Retainer (₹9,999/mo)</option>
                  {SERVICES_LIST.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Monthly Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-neon"
                >
                  <option value="Starter (₹1,999 / $29 mo)">Starter (₹1,999 / $29 mo)</option>
                  <option value="Growth (₹4,999 / $69 mo)">Growth (₹4,999 / $69 mo)</option>
                  <option value="Premium (₹9,999 / $139 mo)">Premium (₹9,999 / $139 mo)</option>
                  <option value="₹20,000 - ₹50,000 / mo">₹20,000 - ₹50,000 / mo</option>
                  <option value="₹50,000 - ₹1,00,000 / mo">₹50,000 - ₹1,00,000 / mo</option>
                  <option value="$1,000+ / mo (Global)">$1,000+ / mo (Global)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Notes
              </label>
              <textarea
                rows={3}
                placeholder="Key goals or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-neon resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 text-xs tracking-wider uppercase font-extrabold flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Send Corporate Enquiry'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
