import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Solutions } from './components/sections/Solutions';
import { Portfolio } from './components/sections/Portfolio';
import { Pricing } from './components/sections/Pricing';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Founder } from './components/sections/Founder';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { EnquiryModal } from './components/common/EnquiryModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

export function App() {
  const [currency, setCurrency] = useState('INR');
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);

  const handleOpenEnquiry = (serviceName = '') => {
    setSelectedService(serviceName || 'Custom Integrated Growth Package');
    setEnquiryModalOpen(true);
  };

  const handleOpenAdmin = () => {
    setAdminOpen(true);
  };

  return (
    <div className="bg-dark-950 text-slate-100 min-h-screen relative font-sans selection:bg-brand-neon selection:text-black">
      {/* Sticky Glass Navbar */}
      <Navbar 
        currency={currency} 
        setCurrency={setCurrency} 
        onOpenEnquiry={handleOpenEnquiry} 
        onOpenAdmin={handleOpenAdmin} 
      />

      {/* Main Page Flow */}
      <main>
        {/* 1. Hero Section */}
        <Hero onOpenEnquiry={handleOpenEnquiry} />

        {/* 2. About The Company */}
        <About />

        {/* 3. 14 Comprehensive Services */}
        <Services onOpenEnquiry={handleOpenEnquiry} />

        {/* 4. Strategic Business Solutions */}
        <Solutions onOpenEnquiry={handleOpenEnquiry} />

        {/* 5. Company Portfolio & Case Studies */}
        <Portfolio onOpenEnquiry={handleOpenEnquiry} />

        {/* 6. Pricing Packages */}
        <Pricing 
          currency={currency} 
          setCurrency={setCurrency} 
          onOpenEnquiry={handleOpenEnquiry} 
        />

        {/* 7. Why Choose BS Growth Lab */}
        <WhyChooseUs />

        {/* 8. Leadership & Founder Section */}
        <Founder />

        {/* 9. Contact The Company */}
        <Contact prefilledService={selectedService} />
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Reusable Lead Enquiry Modal */}
      <EnquiryModal 
        isOpen={enquiryModalOpen} 
        onClose={() => setEnquiryModalOpen(false)} 
        defaultService={selectedService}
      />

      {/* Complete Administrative Dashboard */}
      <AdminDashboard 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)} 
      />
    </div>
  );
}

export default App;
