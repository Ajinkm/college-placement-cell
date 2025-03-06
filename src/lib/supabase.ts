import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Use environment variables for security
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://nyxrznjagmuhksiemky.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eHJ6bmphZ211aGtqc2llbWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTIwOTQsImV4cCI6MjA1NjcyODA5NH0.zW1z_O8SKDhJX9fuqqIIZUSZGCYnr0co7phzC8I4sCs";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
