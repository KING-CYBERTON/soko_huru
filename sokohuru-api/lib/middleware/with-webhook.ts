/**
 * Supabase Webhook Middleware
 *
 * Verifies webhook signatures from Supabase using HMAC-SHA256.
 * Rejects requests with invalid or missing signatures.
 *
 * Usage:
 *   export const POST = withWebhook(async (request, body) => {
 *     // body is the parsed webhook payload
 *     return Response.json({ received: true })
 *   })
 */

import { config } from '@/lib/config';

export function withWebhook(
  handler: (request: Request, body: unknown) => Promise<Response>
) {
  return async (request: Request) => {
    const signature = request.headers.get('x-supabase-signature');
    const body = await request.text();

    if (!signature) {
      return Response.json({ error: 'Missing webhook signature' }, { status: 401 });
    }

    // HMAC-SHA256 verification
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(config.supabaseWebhookSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = Uint8Array.from(Buffer.from(signature, 'hex'));
    const bodyBytes = encoder.encode(body);
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, bodyBytes);

    if (!valid) {
      return Response.json({ error: 'Invalid webhook signature' }, { status: 401 });
    }

    return handler(request, JSON.parse(body));
  };
}
