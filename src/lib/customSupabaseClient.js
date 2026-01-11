import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ypismkyqaxgmwsbebcyc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaXNta3lxYXhnbXdzYmViY3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5NDE1NDgsImV4cCI6MjA4MTUxNzU0OH0.4eD4TWTw8-ipqKa-gTnrs7tWJJdZDlLGFHsr7gYyDoA';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
