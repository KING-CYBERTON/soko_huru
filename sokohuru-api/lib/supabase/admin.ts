/**
 * Supabase Admin Client
 *
 * Uses the service role key which bypasses Row Level Security (RLS).
 * ONLY use this in server-side API routes. Never expose to clients.
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { config } from '@/lib/config';

export const supabaseAdmin = createClient<Database>(
  config.supabaseUrl,
  config.supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
