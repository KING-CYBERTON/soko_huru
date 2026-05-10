import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/config';

/**
 * Creates a Supabase client for use in browser/client components
 * Uses the anon key which is safe to expose to the client
 */
export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}
