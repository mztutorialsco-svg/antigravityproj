import { createClient } from '@supabase/supabase-js';

// Default from environment or fallback
const DEFAULT_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const DEFAULT_SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

class SupabaseManager {
  constructor() {
    this.client = null;
    this.initClient();
  }

  getConfig() {
    const savedConfig = localStorage.getItem('bs_supabase_config');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Error parsing saved Supabase config', e);
      }
    }
    return {
      url: DEFAULT_SUPABASE_URL,
      anonKey: DEFAULT_SUPABASE_KEY,
      connected: false
    };
  }

  saveConfig(url, anonKey) {
    const config = {
      url: url.trim(),
      anonKey: anonKey.trim(),
      connected: !!(url && anonKey)
    };
    localStorage.setItem('bs_supabase_config', JSON.stringify(config));
    this.initClient();
    return config;
  }

  initClient() {
    const config = this.getConfig();
    if (config.url && config.anonKey) {
      try {
        this.client = createClient(config.url, config.anonKey);
      } catch (err) {
        console.error('Failed to initialize Supabase client:', err);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }

  getClient() {
    return this.client;
  }

  isConfigured() {
    const config = this.getConfig();
    return !!(config.url && config.anonKey);
  }
}

export const supabaseManager = new SupabaseManager();

export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- BS GROWTH LAB - SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ==========================================

-- 1. Create Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    budget TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    industry TEXT,
    challenge TEXT,
    solution TEXT,
    result TEXT,
    image_url TEXT,
    tags TEXT[],
    is_demo BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Pricing Plans Table
CREATE TABLE IF NOT EXISTS public.pricing_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price_inr TEXT NOT NULL,
    price_usd TEXT NOT NULL,
    badge TEXT,
    description TEXT,
    features TEXT[],
    is_popular BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

-- 5. Policies: Allow public anonymous users to insert enquiries
CREATE POLICY "Public can submit enquiries" ON public.enquiries
    FOR INSERT WITH CHECK (true);

-- Allow public to read portfolio and pricing
CREATE POLICY "Public can view portfolio" ON public.portfolio
    FOR SELECT USING (true);

CREATE POLICY "Public can view pricing" ON public.pricing_plans
    FOR SELECT USING (true);
`;
