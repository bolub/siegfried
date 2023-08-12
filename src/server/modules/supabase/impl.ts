import { env } from "@/env.mjs";
import { type SupabaseClient, createClient } from "@supabase/supabase-js";

export const supabase =
  // @ts-ignore
  (global.supabase as SupabaseClient) ||
  (env.SUPABASE_URL &&
    env.SUPABASE_KEY &&
    createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
      auth: {
        persistSession: true,
      },
    }));

// do we still need this?
if (env.NODE_ENV !== "production") {
  // @ts-ignore
  global.supabase = supabase;
}
