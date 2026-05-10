// Environment configuration
// This file exports client-safe environment variables
// NEVER import SUPABASE_SERVICE_ROLE_KEY or other server-only vars here

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Please ensure ${key} is set in your .env.local file.`
    );
  }

  return value;
}

// Client-safe public environment variables
export const APP_URL = getEnvVar('NEXT_PUBLIC_APP_URL');
export const SUPABASE_URL = getEnvVar('NEXT_PUBLIC_SUPABASE_URL');
export const SUPABASE_ANON_KEY = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
