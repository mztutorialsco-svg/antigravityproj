import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { Menu, X, ArrowUpRight, Shield, Globe, MessageSquare } from 'lucide-react';

export const Navbar = ({ currency, setCurrency, onOpenEnquiry, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Company', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Micro-Bar */}
      <div className="bg-dark-900/90 border-b border-white/[0.06] text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-brand-neon font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-neon animate-ping" />
              Now Accepting New Client Engagements (Q4 / 2026)
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" /> Serving India & International Businesses
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency switcher */}
            <div className="flex items-center bg-dark-800 rounded-full p-0.5 border border-white/10 text-[11px]">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  currency === 'INR'
                    ? 'bg-brand-neon text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-0.5 rounded-full transition-all ${
                  currency === 'USD'
                    ? 'bg-brand-neon text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                $ USD
              </button>
            </div>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-400 hover:text-brand-neon transition-colors"
              title="Admin Management Console"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled
            ? 'glass-nav py-3 shadow-2xl'
            : 'bg-dark-950/70 backdrop-blur-md py-4 border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="focus:outline-none">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-brand-neon transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-neon transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Header Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenEnquiry(null)}
              className="btn-primary text-xs sm:text-sm py-2 sm:py-2.5 px-4 sm:px-5"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center bg-dark-800 rounded-full p-0.5 border border-white/10 text-[11px] sm:hidden">
              <button
                onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
                className="px-2 py-0.5 rounded-full bg-brand-neon text-black font-bold text-[10px]"
              >
                {currency === 'INR' ? '₹' : '$'}
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-brand-neon focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-brand-neon/20 px-6 py-6 animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-brand-neon transition-colors py-1.5 border-b border-white/[0.04]"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry(null);
                }}
                className="btn-primary w-full py-3 text-center"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="btn-secondary w-full py-2.5 text-xs text-center flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-brand-neon" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
