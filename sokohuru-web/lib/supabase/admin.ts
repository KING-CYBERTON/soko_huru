import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

/**
 * ⚠️ THIS FILE MUST NEVER BE IMPORTED IN CLIENT COMPONENTS ⚠️
 *
 * Admin client with service role key - bypasses Row Level Security (RLS)
 * Only use this for server-side operations that require elevated permissions
 * such as:
 * - Creating users
 * - Bypassing RLS for admin operations
 * - Webhook handlers that need full database access
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    'Missing Supabase admin environment variables. ' +
    'Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.'
  );
}

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
