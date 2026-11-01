import React, { useState, useEffect } from 'react';
import { 
  Shield, Lock, User, LogOut, CheckCircle2, AlertCircle, 
  BarChart3, Inbox, Layers, DollarSign, FolderKanban, Settings, 
  Database, Plus, Trash2, Edit2, Search, Download, ExternalLink, 
  Copy, Check, Eye, RefreshCw, X 
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import { supabaseManager, SUPABASE_SQL_SCHEMA } from '../../services/supabaseClient';
import { COMPANY_INFO, SERVICES_LIST, PRICING_PLANS } from '../../data/companyData';

export const AdminDashboard = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Authentication State
  const [auth, setAuth] = useState(storageService.getAdminAuth());
  const [loginEmail, setLoginEmail] = useState('admin@bsgrowthlab.com');
  const [loginPassword, setLoginPassword] = useState('BSGrowthLab@2026');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Live Data States
  const [enquiries, setEnquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [settings, setSettings] = useState(COMPANY_INFO);
  const [supabaseConfig, setSupabaseConfig] = useState(supabaseManager.getConfig());

  // Filter & Search states
  const [enquirySearch, setEnquirySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [notification, setNotification] = useState('');

  // Editing forms state
  const [editingPlan, setEditingPlan] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '', category: 'Branding Projects', industry: '',
    challenge: '', solution: '', result: '', image: '', tags: '', isDemo: true
  });
  const [showAddProject, setShowAddProject] = useState(false);

  // Password change state
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  useEffect(() => {
    loadData();
  }, [auth.isAuthenticated]);

  const loadData = () => {
    setEnquiries(storageService.getEnquiries());
    setServices(storageService.getServices());
    setPricing(storageService.getPricing());
    setPortfolio(storageService.getPortfolio());
    setSettings(storageService.getSettings());
    setSupabaseConfig(supabaseManager.getConfig());
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  // Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = storageService.loginAdmin(loginEmail, loginPassword);
    if (res.success) {
      setAuth(res.authState);
      showToast('Admin Authenticated Successfully');
    } else {
      setLoginError(res.message);
    }
  };

  const handleLogout = () => {
    storageService.logoutAdmin();
    setAuth({ isAuthenticated: false });
  };

  const handleStatusChange = (id, newStatus) => {
    storageService.updateEnquiryStatus(id, newStatus);
    loadData();
    showToast(`Enquiry status updated to ${newStatus}`);
  };

  const handleSaveNotes = (id, notes) => {
    storageService.updateEnquiryStatus(id, selectedEnquiry.status, notes);
    loadData();
    showToast('Admin notes saved successfully');
  };

  const handleDeleteEnquiry = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      storageService.deleteEnquiry(id);
      loadData();
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      showToast('Enquiry removed');
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Full Name', 'Company', 'Email', 'Phone', 'Service', 'Budget', 'Status', 'Notes'];
    const rows = enquiries.map(e => [
      e.id,
      new Date(e.createdAt).toLocaleDateString(),
      `"${e.fullName || ''}"`,
      `"${e.companyName || ''}"`,
      e.email,
      e.phone,
      `"${e.service || ''}"`,
      `"${e.budget || ''}"`,
      e.status,
      `"${e.adminNotes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BS_Growth_Lab_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Enquiries exported to CSV');
  };

  const handleSavePricing = (e) => {
    e.preventDefault();
    if (editingPlan) {
      storageService.updatePricingPlan(editingPlan);
      loadData();
      setEditingPlan(null);
      showToast(`${editingPlan.name} plan updated`);
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    const tagsArray = typeof newProject.tags === 'string'
      ? newProject.tags.split(',').map(t => t.trim()).filter(Boolean)
      : newProject.tags;

    storageService.addPortfolioProject({
      ...newProject,
      tags: tagsArray.length > 0 ? tagsArray : ['Growth', 'Case Study'],
      image: newProject.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    });
    loadData();
    setShowAddProject(false);
    setNewProject({
      title: '', category: 'Branding Projects', industry: '',
      challenge: '', solution: '', result: '', image: '', tags: '', isDemo: true
    });
    showToast('Project added to portfolio');
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Delete this portfolio project?')) {
      storageService.deletePortfolioProject(id);
      loadData();
      showToast('Project removed');
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    storageService.updateSettings(settings);
    loadData();
    showToast('Corporate contact details saved');
  };

  const handleSaveSupabase = (e) => {
    e.preventDefault();
    supabaseManager.saveConfig(supabaseConfig.url, supabaseConfig.anonKey);
    setSupabaseConfig(supabaseManager.getConfig());
    showToast('Supabase configuration saved');
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
    showToast('SQL schema copied to clipboard');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const res = storageService.updateAdminPassword(newAdminPassword);
    setPasswordMsg(res.message);
    if (res.success) {
      setNewAdminPassword('');
      showToast('Password updated');
    }
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter(enq => {
    const matchesStatus = statusFilter === 'all' || enq.status === statusFilter;
    const matchesSearch = 
      enq.fullName?.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      enq.companyName?.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      enq.email?.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      enq.service?.toLowerCase().includes(enquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="glass-card-active rounded-3xl w-full max-w-6xl h-[92vh] border-brand-neon/40 shadow-neon-lg relative flex flex-col overflow-hidden bg-dark-950">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-dark-900/90 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-neon/15 border border-brand-neon/40 flex items-center justify-center text-brand-neon">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-white text-base">
                  BS GROWTH LAB
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-neon text-black">
                  ADMIN CONSOLE
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Official Business Management Engine
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {auth.isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5 border border-white/10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className="absolute top-16 right-6 z-50 bg-brand-neon text-black font-semibold text-xs py-2 px-4 rounded-xl shadow-neon animate-fadeIn flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Main Content Area */}
        {!auth.isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            <div className="max-w-md w-full glass-card p-8 rounded-2xl border-white/10 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-neon/10 border border-brand-neon/30 text-brand-neon flex items-center justify-center mx-auto shadow-neon">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl text-white">
                  Secure Admin Sign In
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Authenticate to manage enquiries, services, portfolio, pricing and database settings.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Admin Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-neon"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Security Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-neon"
                  />
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] text-slate-400 font-mono">
                  Default credentials pre-filled for immediate administrative verification.
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 text-xs tracking-wider uppercase font-bold"
                >
                  Access Dashboard
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 bg-dark-900/90 border-r border-white/[0.08] p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto flex-shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-brand-neon text-black font-bold shadow-neon'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overview & Analytics</span>
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'enquiries'
                    ? 'bg-brand-neon text-black font-bold shadow-neon'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4" />
                  <span>Enquiries</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'enquiries' ? 'bg-black text-brand-neon' : 'bg-brand-neon/20 text-brand-neon'
                }`}>
                  {enquiries.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'services'
                    ? 'bg-brand-neon text-black font-bold shadow-neon'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Services (14)</span>
              </button>

              <button
                onClick={() => setActiveTab('pricing')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'pricing'
                    ? 'bg-brand-neon text-black font-bold shadow-neon'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Pricing Plans</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'portfolio'
                    ? 'bg-brand-neon text-black font-bold shadow-neon'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                <span>Portfolio</span>
              </button>

              <button
                onClick={() => setActiveTab('supabase')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'supabase'
                    ? 'bg-brand-neon text-black font-bold shadow-neon'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Supabase Sync</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-brand-neon text-black font-bold shadow-neon'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings & Security</span>
              </button>
            </div>

            {/* Tab Content Display Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-dark-950">
              
              {/* TAB 1: OVERVIEW & ANALYTICS */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white">
                      Executive Growth Analytics
                    </h3>
                    <p className="text-xs text-slate-400">
                      Real-time lead flow, service demands, and conversion indicators.
                    </p>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="glass-card p-5 rounded-2xl border-white/10">
                      <div className="text-xs text-slate-400 font-mono uppercase">Total Enquiries</div>
                      <div className="text-3xl font-display font-bold text-white mt-1">
                        {enquiries.length}
                      </div>
                      <div className="text-[11px] text-brand-neon mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>All channels active</span>
                      </div>
                    </div>

                    <div className="glass-card p-5 rounded-2xl border-white/10">
                      <div className="text-xs text-slate-400 font-mono uppercase">New / Unaddressed</div>
                      <div className="text-3xl font-display font-bold text-brand-lime mt-1">
                        {enquiries.filter(e => e.status === 'new').length}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-2">Requires review</div>
                    </div>

                    <div className="glass-card p-5 rounded-2xl border-white/10">
                      <div className="text-xs text-slate-400 font-mono uppercase">Active Services</div>
                      <div className="text-3xl font-display font-bold text-white mt-1">
                        14
                      </div>
                      <div className="text-[11px] text-slate-400 mt-2">Full-stack suite</div>
                    </div>

                    <div className="glass-card p-5 rounded-2xl border-white/10">
                      <div className="text-xs text-slate-400 font-mono uppercase">Database Status</div>
                      <div className="text-sm font-display font-bold text-brand-neon mt-2 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-neon animate-pulse" />
                        {supabaseConfig.connected ? 'Supabase Connected' : 'Local Persistent Active'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-2 font-mono">100% Retained</div>
                    </div>
                  </div>

                  {/* Recent Inquiries Quick View */}
                  <div className="glass-card rounded-2xl p-6 border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-white font-display">
                        Recent Incoming Client Inquiries
                      </h4>
                      <button
                        onClick={() => setActiveTab('enquiries')}
                        className="text-xs text-brand-neon hover:underline"
                      >
                        View All Enquiries
                      </button>
                    </div>

                    <div className="space-y-2">
                      {enquiries.slice(0, 3).map(enq => (
                        <div key={enq.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-white">{enq.fullName} <span className="text-slate-400 font-normal">({enq.companyName || 'Private'})</span></div>
                            <div className="text-slate-400 text-[11px] mt-0.5">{enq.service} • {enq.email}</div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            enq.status === 'new' ? 'bg-brand-neon/20 text-brand-neon' : 'bg-white/10 text-slate-300'
                          }`}>
                            {enq.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ENQUIRIES MANAGER */}
              {activeTab === 'enquiries' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-white">
                        Customer Enquiries & Leads
                      </h3>
                      <p className="text-xs text-slate-400">
                        Track, respond, manage status and export corporate lead submissions.
                      </p>
                    </div>

                    <button
                      onClick={handleExportCSV}
                      className="btn-secondary text-xs py-2 px-3.5 self-start sm:self-auto flex items-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export to CSV</span>
                    </button>
                  </div>

                  {/* Filter and Search */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by name, company, email or service..."
                        value={enquirySearch}
                        onChange={(e) => setEnquirySearch(e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-brand-neon"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-neon"
                    >
                      <option value="all">All Statuses ({enquiries.length})</option>
                      <option value="new">New ({enquiries.filter(e => e.status === 'new').length})</option>
                      <option value="in_progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  {/* Inquiries List & Detail Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* List Column */}
                    <div className="lg:col-span-7 space-y-3">
                      {filteredEnquiries.length === 0 ? (
                        <div className="p-12 text-center text-slate-400 text-xs glass-card rounded-2xl">
                          No enquiries matching search filters.
                        </div>
                      ) : (
                        filteredEnquiries.map(enq => (
                          <div
                            key={enq.id}
                            onClick={() => setSelectedEnquiry(enq)}
                            className={`p-4 rounded-xl cursor-pointer transition-all border ${
                              selectedEnquiry?.id === enq.id
                                ? 'glass-card-active border-brand-neon/60'
                                : 'glass-card border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-white text-sm">
                                  {enq.fullName}
                                </h4>
                                <div className="text-xs text-brand-neon font-medium mt-0.5">
                                  {enq.companyName || 'Individual / Business'}
                                </div>
                              </div>

                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                enq.status === 'new'
                                  ? 'bg-brand-neon/20 text-brand-neon border border-brand-neon/40'
                                  : enq.status === 'in_progress'
                                  ? 'bg-brand-lime/20 text-brand-lime border border-brand-lime/40'
                                  : 'bg-white/10 text-slate-300'
                              }`}>
                                {enq.status}
                              </span>
                            </div>

                            <div className="mt-2 text-xs text-slate-400 line-clamp-1">
                              {enq.message || 'No additional project notes provided.'}
                            </div>

                            <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                              <span>{enq.service}</span>
                              <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Detail Column */}
                    <div className="lg:col-span-5 glass-card rounded-2xl p-6 border-white/10 sticky top-0">
                      {selectedEnquiry ? (
                        <div className="space-y-4 text-xs">
                          <div className="flex items-center justify-between pb-3 border-b border-white/10">
                            <div>
                              <div className="text-[10px] font-mono text-brand-neon">REF: {selectedEnquiry.id}</div>
                              <h4 className="text-base font-bold text-white">{selectedEnquiry.fullName}</h4>
                            </div>
                            <button
                              onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div>
                            <div className="text-slate-400">Company / Brand:</div>
                            <div className="text-white font-semibold text-sm">{selectedEnquiry.companyName || 'N/A'}</div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-slate-400">Email:</div>
                              <a href={`mailto:${selectedEnquiry.email}`} className="text-brand-neon underline break-all">
                                {selectedEnquiry.email}
                              </a>
                            </div>
                            <div>
                              <div className="text-slate-400">Phone:</div>
                              <a href={`tel:${selectedEnquiry.phone}`} className="text-white font-mono">
                                {selectedEnquiry.phone}
                              </a>
                            </div>
                          </div>

                          <div>
                            <div className="text-slate-400">Service Required:</div>
                            <div className="text-white font-medium">{selectedEnquiry.service}</div>
                          </div>

                          <div>
                            <div className="text-slate-400">Monthly Budget:</div>
                            <div className="text-white font-medium">{selectedEnquiry.budget}</div>
                          </div>

                          <div>
                            <div className="text-slate-400">Client Message:</div>
                            <div className="p-3 rounded-lg bg-dark-900 border border-white/5 text-slate-200 mt-1 whitespace-pre-wrap leading-relaxed">
                              {selectedEnquiry.message || 'No specific text written.'}
                            </div>
                          </div>

                          {/* Status Updater */}
                          <div>
                            <div className="text-slate-400 mb-1">Pipeline Status:</div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {['new', 'in_progress', 'contacted', 'closed'].map(st => (
                                <button
                                  key={st}
                                  onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                                  className={`py-1.5 px-2 rounded-lg text-[11px] font-mono uppercase font-bold transition-all ${
                                    selectedEnquiry.status === st
                                      ? 'bg-brand-neon text-black'
                                      : 'bg-white/5 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  {st.replace('_', ' ')}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Admin Notes */}
                          <div>
                            <div className="text-slate-400 mb-1">Internal Notes:</div>
                            <textarea
                              rows={3}
                              defaultValue={selectedEnquiry.adminNotes || ''}
                              onBlur={(e) => handleSaveNotes(selectedEnquiry.id, e.target.value)}
                              placeholder="Write internal notes about client meeting, deal stage..."
                              className="w-full bg-dark-900 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-brand-neon resize-none"
                            />
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">Auto-saves on blur.</div>
                          </div>

                          {/* Action Button: WhatsApp Directly */}
                          <a
                            href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedEnquiry.fullName}, this is BS Growth Lab following up on your digital marketing enquiry.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full py-2 text-xs justify-center flex items-center gap-1.5"
                          >
                            <span>WhatsApp Client Directly</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ) : (
                        <div className="text-center py-16 text-slate-400 text-xs">
                          Select an enquiry from the list to review details and update its pipeline status.
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 3: SERVICES MANAGEMENT */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white">
                      Company Services (14 Core Deliverables)
                    </h3>
                    <p className="text-xs text-slate-400">
                      View and manage all 14 official digital marketing and creative capabilities.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map(svc => (
                      <div key={svc.id} className="glass-card p-5 rounded-xl border-white/10 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-brand-lime font-bold uppercase">{svc.category}</span>
                            <span className="text-xs font-mono text-slate-400">#{svc.number}</span>
                          </div>
                          <h4 className="font-bold text-white text-base mb-1">{svc.title}</h4>
                          <p className="text-slate-300 text-xs leading-relaxed">{svc.shortDesc}</p>

                          <div className="mt-3 space-y-1">
                            {svc.deliverables?.map((d, i) => (
                              <div key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-brand-neon" />
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                          <span className="text-emerald-400 font-mono text-[11px]">Active on Website</span>
                          <span className="text-slate-400 font-mono text-[10px]">Configured</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PRICING PLANS */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white">
                      Monthly Retainer Pricing
                    </h3>
                    <p className="text-xs text-slate-400">
                      Update tier pricing and deliverables for STARTER, GROWTH, and PREMIUM packages.
                    </p>
                  </div>

                  {editingPlan ? (
                    <form onSubmit={handleSavePricing} className="glass-card p-6 rounded-2xl border-brand-neon/40 space-y-4 max-w-xl">
                      <div className="font-bold text-white text-base">Editing {editingPlan.name} Plan</div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Price INR (₹)</label>
                          <input
                            type="text"
                            value={editingPlan.priceINR}
                            onChange={(e) => setEditingPlan({ ...editingPlan, priceINR: e.target.value })}
                            className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Price USD ($)</label>
                          <input
                            type="text"
                            value={editingPlan.priceUSD}
                            onChange={(e) => setEditingPlan({ ...editingPlan, priceUSD: e.target.value })}
                            className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Badge</label>
                        <input
                          type="text"
                          value={editingPlan.badge}
                          onChange={(e) => setEditingPlan({ ...editingPlan, badge: e.target.value })}
                          className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button type="submit" className="btn-primary text-xs py-2 px-4">
                          Save Changes
                        </button>
                        <button type="button" onClick={() => setEditingPlan(null)} className="btn-secondary text-xs py-2 px-4">
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {pricing.map(plan => (
                        <div key={plan.id} className="glass-card p-6 rounded-2xl border-white/10 flex flex-col justify-between">
                          <div>
                            <div className="text-xs font-mono font-bold text-brand-neon uppercase mb-1">{plan.badge}</div>
                            <h4 className="text-xl font-display font-extrabold text-white">{plan.name}</h4>
                            <div className="text-2xl font-display font-bold text-white mt-2">
                              ₹{plan.priceINR} <span className="text-xs text-slate-400 font-normal">/ {plan.priceUSD} USD</span>
                            </div>
                            <div className="mt-4 space-y-1.5">
                              {plan.features.map((f, i) => (
                                <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-brand-neon flex-shrink-0 mt-0.5" />
                                  <span>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6 pt-3 border-t border-white/10">
                            <button
                              onClick={() => setEditingPlan({ ...plan })}
                              className="btn-outline-neon w-full text-xs py-1.5 justify-center flex items-center gap-1.5"
                            >
                              <Edit2 className="w-3 h-3" />
                              <span>Edit Rates</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: PORTFOLIO MANAGEMENT */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-display font-extrabold text-white">
                        Company Portfolio Projects
                      </h3>
                      <p className="text-xs text-slate-400">
                        Manage sample showcase and client case studies across all 6 categories.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddProject(!showAddProject)}
                      className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showAddProject ? 'Close Form' : 'Add New Project'}</span>
                    </button>
                  </div>

                  {showAddProject && (
                    <form onSubmit={handleAddProject} className="glass-card p-6 rounded-2xl border-brand-neon/40 space-y-4">
                      <div className="font-bold text-white text-sm">Add Portfolio Item</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Project / Brand Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Apex International Logistics"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                          <select
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          >
                            <option value="Branding Projects">Branding Projects</option>
                            <option value="Social Media Campaigns">Social Media Campaigns</option>
                            <option value="Website Development">Website Development</option>
                            <option value="Video Production">Video Production</option>
                            <option value="Advertising Creatives">Advertising Creatives</option>
                            <option value="Marketing Campaigns">Marketing Campaigns</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Industry</label>
                          <input
                            type="text"
                            placeholder="e.g. E-Commerce & Retail"
                            value={newProject.industry}
                            onChange={(e) => setNewProject({ ...newProject, industry: e.target.value })}
                            className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/..."
                            value={newProject.image}
                            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                            className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Challenge & Solution</label>
                        <textarea
                          rows={2}
                          placeholder="Brief description of the client's problem and how BS Growth Lab resolved it..."
                          value={newProject.challenge}
                          onChange={(e) => setNewProject({ ...newProject, challenge: e.target.value, solution: e.target.value })}
                          className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Business Result</label>
                        <input
                          type="text"
                          placeholder="e.g. 340% increase in qualified inquiries"
                          value={newProject.result}
                          onChange={(e) => setNewProject({ ...newProject, result: e.target.value })}
                          className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isDemoCheck"
                          checked={newProject.isDemo}
                          onChange={(e) => setNewProject({ ...newProject, isDemo: e.target.checked })}
                          className="rounded border-white/10"
                        />
                        <label htmlFor="isDemoCheck" className="text-xs text-slate-300">
                          Mark with "DEMO CONCEPT" badge (Recommended for mock projects)
                        </label>
                      </div>

                      <div className="flex gap-2">
                        <button type="submit" className="btn-primary text-xs py-2 px-4">
                          Add Project to Website
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {portfolio.map(proj => (
                      <div key={proj.id} className="glass-card rounded-xl p-4 border-white/10 flex flex-col justify-between">
                        <div>
                          <img src={proj.image} alt={proj.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-brand-neon font-bold">{proj.category}</span>
                            {proj.isDemo && (
                              <span className="text-[9px] font-mono bg-brand-lime/20 text-brand-lime px-1.5 py-0.5 rounded">
                                DEMO
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-white text-sm mt-1">{proj.title}</h4>
                          <p className="text-slate-400 text-xs mt-1 line-clamp-2">{proj.challenge}</p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">{proj.industry}</span>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="text-slate-500 hover:text-red-400 p-1"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: SUPABASE DATABASE SYNC */}
              {activeTab === 'supabase' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white">
                      Supabase Cloud Database Sync
                    </h3>
                    <p className="text-xs text-slate-400">
                      Connect your production Supabase database or keep running with the zero-config persistent storage engine.
                    </p>
                  </div>

                  {/* Supabase Status Banner */}
                  <div className="p-4 rounded-2xl bg-dark-900 border border-brand-neon/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-neon/20 text-brand-neon flex items-center justify-center">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          Status: {supabaseConfig.connected ? 'Connected to Remote Supabase' : 'Offline / Dual-Store Active'}
                        </div>
                        <div className="text-xs text-slate-400">
                          {supabaseConfig.connected 
                            ? 'All incoming leads automatically write to your PostgreSQL cloud instance.' 
                            : 'All enquiries and settings are saved securely in browser storage. Enter credentials below to link cloud database.'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Config Form */}
                  <form onSubmit={handleSaveSupabase} className="glass-card p-6 rounded-2xl border-white/10 space-y-4 max-w-xl">
                    <div className="font-bold text-white text-sm">Supabase Credentials</div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Project URL (e.g. https://xyzcompany.supabase.co)
                      </label>
                      <input
                        type="url"
                        placeholder="https://your-project.supabase.co"
                        value={supabaseConfig.url || ''}
                        onChange={(e) => setSupabaseConfig({ ...supabaseConfig, url: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Anon Public Key (anon / public)
                      </label>
                      <input
                        type="text"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        value={supabaseConfig.anonKey || ''}
                        onChange={(e) => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon"
                      />
                    </div>

                    <button type="submit" className="btn-primary text-xs py-2 px-5">
                      Save & Connect Supabase
                    </button>
                  </form>

                  {/* Schema SQL Script Viewer & Copy */}
                  <div className="glass-card p-6 rounded-2xl border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">Supabase SQL DDL Schema</h4>
                        <p className="text-xs text-slate-400">Copy and run this in your Supabase SQL Editor to initialize all tables and policies.</p>
                      </div>
                      <button
                        onClick={handleCopySchema}
                        className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
                      >
                        {copiedSchema ? <Check className="w-3.5 h-3.5 text-brand-neon" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedSchema ? 'Copied!' : 'Copy SQL Script'}</span>
                      </button>
                    </div>

                    <pre className="p-4 rounded-xl bg-dark-900 border border-white/5 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56">
                      {SUPABASE_SQL_SCHEMA}
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 7: SETTINGS & SECURITY */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white">
                      Corporate Settings & Security
                    </h3>
                    <p className="text-xs text-slate-400">
                      Update official company contact channels and admin credentials.
                    </p>
                  </div>

                  {/* Contact Info Form */}
                  <form onSubmit={handleSaveSettings} className="glass-card p-6 rounded-2xl border-white/10 space-y-4 max-w-xl">
                    <div className="font-bold text-white text-sm">Public Company Contact Details</div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Company Email</label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number</label>
                        <input
                          type="tel"
                          value={settings.whatsapp}
                          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                          className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Office Hubs</label>
                        <input
                          type="text"
                          value={settings.address}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-primary text-xs py-2 px-4">
                      Update Contact Details
                    </button>
                  </form>

                  {/* Admin Password Change Form */}
                  <form onSubmit={handleChangePassword} className="glass-card p-6 rounded-2xl border-white/10 space-y-4 max-w-xl">
                    <div className="font-bold text-white text-sm">Change Admin Password</div>
                    
                    {passwordMsg && (
                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300">
                        {passwordMsg}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">New Security Password</label>
                      <input
                        type="password"
                        placeholder="Minimum 6 characters"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <button type="submit" className="btn-secondary text-xs py-2 px-4">
                      Save New Password
                    </button>
                  </form>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
