import { createClient } from '@supabase/supabase-js';

// Get the current environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Use different URLs based on environment
const supabaseUrl = 'https://bvcukfllrjayptavsicx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Y3VrZmxscmpheXB0YXZzaWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MDA1ODcsImV4cCI6MjA2MTE3NjU4N30.-cuzmUpprRlqFUgmIZMBYGnS5-zJXSAdpD-MItggMMg';

// Create Supabase client with site URL configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: isDevelopment 
      ? 'http://localhost:5173' 
      : 'https://roundtable-git-master-novakovicluka97s-projects.vercel.app/'
  }
});