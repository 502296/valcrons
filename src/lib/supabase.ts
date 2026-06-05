import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gethyhjzqyblovtoodhw.supabase.co";

const supabaseAnonKey = "PASTE_YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
