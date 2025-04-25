import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL and public anon key
const supabaseUrl = 'https://bvcukfllrjayptavsicx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Y3VrZmxscmpheXB0YXZzaWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MDA1ODcsImV4cCI6MjA2MTE3NjU4N30.-cuzmUpprRlqFUgmIZMBYGnS5-zJXSAdpD-MItggMMg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);