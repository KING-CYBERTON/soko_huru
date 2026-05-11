/**
 * Server-side configuration
 *
 * THIS FILE IS SERVER-ONLY. NEVER IMPORT IN CLIENT CODE.
 *
 * All environment variables are loaded and validated here.
 * Throws descriptive errors if any required value is missing.
 */

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        `Please check your .env.local file or Vercel environment variables.`
    );
  }
  return value;
}

export const config = {
  // Supabase
  supabaseUrl: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  supabaseJwtSecret: getEnvVar('SUPABASE_JWT_SECRET'),
  supabaseWebhookSecret: getEnvVar('SUPABASE_WEBHOOK_SECRET'),

  // M-Pesa (Safaricom Daraja API)
  mpesaConsumerKey: getEnvVar('MPESA_CONSUMER_KEY'),
  mpesaConsumerSecret: getEnvVar('MPESA_CONSUMER_SECRET'),
  mpesaShortcode: getEnvVar('MPESA_SHORTCODE'),
  mpesaPasskey: getEnvVar('MPESA_PASSKEY'),
  mpesaCallbackUrl: getEnvVar('MPESA_CALLBACK_URL'),

  // Stripe
  stripeSecretKey: getEnvVar('STRIPE_SECRET_KEY'),
  stripeWebhookSecret: getEnvVar('STRIPE_WEBHOOK_SECRET'),

  // Resend (Email)
  resendApiKey: getEnvVar('RESEND_API_KEY'),
  resendFromEmail: getEnvVar('RESEND_FROM_EMAIL'),

  // Cron authentication
  cronSecret: getEnvVar('CRON_SECRET'),

  // CORS and URLs
  allowedOrigins: getEnvVar('ALLOWED_ORIGINS').split(','),
  appUrl: getEnvVar('APP_URL'),
  apiUrl: getEnvVar('API_URL'),
} as const;
