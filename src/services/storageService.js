import { supabaseManager } from './supabaseClient';
import { SERVICES_LIST, PRICING_PLANS, PORTFOLIO_PROJECTS, COMPANY_INFO, CLIENT_TESTIMONIALS } from '../data/companyData';

const STORAGE_KEYS = {
  ENQUIRIES: 'bs_growth_lab_enquiries',
  SERVICES: 'bs_growth_lab_services',
  PRICING: 'bs_growth_lab_pricing',
  PORTFOLIO: 'bs_growth_lab_portfolio',
  SETTINGS: 'bs_growth_lab_settings',
  TESTIMONIALS: 'bs_growth_lab_testimonials',
  ADMIN_AUTH: 'bs_growth_lab_auth',
};

// Initial sample inquiries for demonstration in the admin dashboard
const INITIAL_ENQUIRIES = [
  {
    id: "enq-101",
    fullName: "Aarav Mehra",
    companyName: "Mehra Automations",
    email: "aarav@mehrauto.in",
    phone: "+91 98234 11002",
    service: "Website Design & Development",
    budget: "₹25,000 - ₹50,000",
    message: "We need a complete company website overhaul with mobile optimization and client contact forms.",
    status: "new",
    adminNotes: "Client requested a call on Tuesday afternoon. High intent lead.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "enq-102",
    fullName: "Elena Rostova",
    companyName: "Nordic Organic Skincare",
    email: "elena@nordicskin.com",
    phone: "+44 7700 900145",
    service: "Reels & Shorts Creation",
    budget: "$1,000 - $2,500",
    message: "Looking for 15 monthly aesthetic video reels showcasing our natural beauty products for UK & European customers.",
    status: "in_progress",
    adminNotes: "Sent portfolio samples of recent D2C client video edits.",
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString()
  },
  {
    id: "enq-103",
    fullName: "Karan Singhania",
    companyName: "Zest Cloud Technologies",
    email: "karan@zestcloud.io",
    phone: "+91 99100 87654",
    service: "Google Ads & Meta Advertising",
    budget: "₹50,000 - ₹1,00,000",
    message: "Looking to scale B2B software signups. Need complete Google Search and Meta Ads management.",
    status: "contacted",
    adminNotes: "Introductory discovery meeting scheduled via Google Meet.",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

export const storageService = {
  // === ENQUIRIES ===
  getEnquiries: () => {
    const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
      return INITIAL_ENQUIRIES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_ENQUIRIES;
    }
  },

  submitEnquiry: async (enquiryData) => {
    const newEnquiry = {
      id: "enq-" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      fullName: enquiryData.fullName,
      companyName: enquiryData.companyName || "N/A",
      email: enquiryData.email,
      phone: enquiryData.phone,
      service: enquiryData.service,
      budget: enquiryData.budget || "Flexible",
      message: enquiryData.message || "",
      status: "new",
      adminNotes: "",
      createdAt: new Date().toISOString()
    };

    // 1. Save to LocalStorage
    const current = storageService.getEnquiries();
    const updated = [newEnquiry, ...current];
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));

    // 2. If Supabase configured, send to remote database
    const supabase = supabaseManager.getClient();
    if (supabase) {
      try {
        await supabase.from('enquiries').insert([{
          full_name: newEnquiry.fullName,
          company_name: newEnquiry.companyName,
          email: newEnquiry.email,
          phone: newEnquiry.phone,
          service: newEnquiry.service,
          budget: newEnquiry.budget,
          message: newEnquiry.message,
          status: newEnquiry.status
        }]);
      } catch (err) {
        console.warn('Supabase remote sync warning (stored locally):', err);
      }
    }

    return newEnquiry;
  },

  updateEnquiryStatus: (id, status, notes = null) => {
    const enquiries = storageService.getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      enquiries[index].status = status;
      if (notes !== null) {
        enquiries[index].adminNotes = notes;
      }
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
      return enquiries[index];
    }
    return null;
  },

  deleteEnquiry: (id) => {
    const enquiries = storageService.getEnquiries();
    const filtered = enquiries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(filtered));
    return true;
  },

  // === SERVICES ===
  getServices: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(SERVICES_LIST));
      return SERVICES_LIST;
    }
    try {
      return JSON.parse(data);
    } catch {
      return SERVICES_LIST;
    }
  },

  saveService: (serviceData) => {
    const services = storageService.getServices();
    const index = services.findIndex(s => s.id === serviceData.id);
    if (index !== -1) {
      services[index] = { ...services[index], ...serviceData };
    } else {
      services.push({
        ...serviceData,
        id: serviceData.id || "svc-" + Date.now().toString(36),
        number: String(services.length + 1).padStart(2, '0')
      });
    }
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    return services;
  },

  deleteService: (id) => {
    const services = storageService.getServices();
    const filtered = services.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(filtered));
    return filtered;
  },

  // === PRICING ===
  getPricing: () => {
    const data = localStorage.getItem(STORAGE_KEYS.PRICING);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(PRICING_PLANS));
      return PRICING_PLANS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return PRICING_PLANS;
    }
  },

  updatePricingPlan: (updatedPlan) => {
    const plans = storageService.getPricing();
    const index = plans.findIndex(p => p.id === updatedPlan.id);
    if (index !== -1) {
      plans[index] = { ...plans[index], ...updatedPlan };
      localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(plans));
    }
    return plans;
  },

  // === PORTFOLIO ===
  getPortfolio: () => {
    const data = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(PORTFOLIO_PROJECTS));
      return PORTFOLIO_PROJECTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return PORTFOLIO_PROJECTS;
    }
  },

  addPortfolioProject: (project) => {
    const projects = storageService.getPortfolio();
    const newProject = {
      ...project,
      id: "proj-" + Date.now().toString(36),
      isDemo: project.isDemo !== undefined ? project.isDemo : true
    };
    const updated = [newProject, ...projects];
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updated));
    return updated;
  },

  deletePortfolioProject: (id) => {
    const projects = storageService.getPortfolio();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(filtered));
    return filtered;
  },

  // === SETTINGS ===
  getSettings: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(COMPANY_INFO));
      return COMPANY_INFO;
    }
    try {
      return JSON.parse(data);
    } catch {
      return COMPANY_INFO;
    }
  },

  updateSettings: (newSettings) => {
    const current = storageService.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  },

  // === AUTHENTICATION ===
  getAdminAuth: () => {
    const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { isAuthenticated: false };
      }
    }
    return { isAuthenticated: false };
  },

  loginAdmin: (username, password) => {
    // Official secure credentials for BS GROWTH LAB administration
    // Can also be modified or synced with Supabase Auth
    const validUsername = "admin@bsgrowthlab.com";
    const validPass = "BSGrowthLab@2026";

    // Also check stored custom password
    const customPass = localStorage.getItem('bs_admin_custom_pass');
    const effectivePass = customPass || validPass;

    if (username.trim().toLowerCase() === validUsername && password === effectivePass) {
      const authState = {
        isAuthenticated: true,
        user: { email: validUsername, role: "Super Admin", name: "Sayyed Bilal" },
        token: "bs_session_" + Math.random().toString(36).substring(2),
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(authState));
      return { success: true, authState };
    }
    return { success: false, message: "Invalid email or password credentials." };
  },

  logoutAdmin: () => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    return true;
  },

  updateAdminPassword: (newPassword) => {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: "Password must be at least 6 characters." };
    }
    localStorage.setItem('bs_admin_custom_pass', newPassword);
    return { success: true, message: "Admin security password updated successfully." };
  }
};
