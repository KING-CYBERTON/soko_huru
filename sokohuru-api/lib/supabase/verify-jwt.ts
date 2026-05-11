/**
 * JWT Token Verification
 *
 * Verifies JWT tokens from Authorization headers sent by Flutter/web clients.
 * Returns the authenticated user if token is valid, throws error otherwise.
 */

import { createClient } from '@supabase/supabase-js';
import { config } from '@/lib/config';

export async function verifyJwt(token: string) {
  const client = createClient(config.supabaseUrl, config.supabaseAnonKey);

  const {
    data: { user },
    error,
  } = await client.auth.getUser(token);

  if (error || !user) {
    throw new Error('Invalid or expired token');
  }

  return user;
}
