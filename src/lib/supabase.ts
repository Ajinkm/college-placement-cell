import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Use environment variables for security
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://mwrkxkxfphhdqacgtkwp.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cmt4a3hmcGhoZHFhY2d0a3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNTY1MTQsImV4cCI6MjA1NjkzMjUxNH0.qqRgcggsT-LcQ9f7LLZzT4YMGv-FeFRV_umRvVkTUqw";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
