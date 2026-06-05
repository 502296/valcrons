import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  .trim()
  .replace(/`/g, "")
  .replace(/"/g, "")
  .replace(/'/g, "")
  .replace(/\/$/, "");

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  .trim()
  .replace(/`/g, "")
  .replace(/"/g, "")
  .replace(/'/g, "");

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
