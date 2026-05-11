/**
 * Vercel Cron Job Middleware
 *
 * Verifies that requests come from Vercel Cron by checking the Authorization header
 * against the CRON_SECRET environment variable.
 *
 * Usage:
 *   export const GET = withCron(async (request) => {
 *     // Execute cron job logic
 *     return Response.json({ executed: true })
 *   })
 */

import { config } from '@/lib/config';

export function withCron(handler: (request: Request) => Promise<Response>) {
  return async (request: Request) => {
    const auth = request.headers.get('authorization');

    if (auth !== `Bearer ${config.cronSecret}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return handler(request);
  };
}
