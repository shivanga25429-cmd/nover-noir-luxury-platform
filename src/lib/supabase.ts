import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://irmrchhmtoshpfmfdczz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlybXJjaGhtdG9zaHBmbWZkY3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMjQ1NzgsImV4cCI6MjA4NzcwMDU3OH0.M2zCO7Ak4CZHtAaKY3gHQm9xJEYD5bAIr6P38MizXVw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'nover-noir-auth',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Database types
export interface User {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  created_at?: string;
}

export interface CartRecord {
  id: string;
  items: string[]; // Array of product IDs
  user_id: string;
  is_cleared: boolean;
  total: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductDB {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string | null;
  description: string | null;
  fragrance_family: string | null;
  top_notes: string[];
  middle_notes: string[];
  base_notes: string[];
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Fetch all products from Supabase
export async function fetchProducts(): Promise<ProductDB[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}
