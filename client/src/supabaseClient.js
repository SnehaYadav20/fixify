import { createClient } from "@supabase/supabase-js";

const url = import.meta.env?.VITE_SUPABASE_URL;
const anon = import.meta.env?.VITE_SUPABASE_ANON_KEY;

if (!url || !anon) {
  console.warn("Supabase keys missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in client/src/.env");
}

export const supabase = createClient(url, anon);
