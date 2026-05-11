/**
 * JWT Authentication Middleware
 *
 * Wraps API route handlers to require valid JWT authentication.
 * Automatically handles CORS headers and OPTIONS preflight requests.
 *
 * Usage:
 *   export const GET = withAuth(async (request, { userId }) => {
 *     // userId is guaranteed to be present
 *     return Response.json({ userId })
 *   })
 */

import { corsHeaders, withCors } from '@/lib/cors';
import { verifyJwt } from '@/lib/supabase/verify-jwt';

type AuthenticatedHandler = (
  request: Request,
  context: { userId: string; params?: Record<string, string> }
) => Promise<Response>;

export function withAuth(handler: AuthenticatedHandler) {
  return async (request: Request, context?: unknown) => {
    const origin = request.headers.get('origin');

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin),
      });
    }

    // Extract and verify JWT
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return withCors(
        Response.json({ error: 'Missing authorization header' }, { status: 401 }),
        origin
      );
    }

    const token = authHeader.split(' ')[1];
    try {
      const user = await verifyJwt(token);
      const response = await handler(request, {
        userId: user.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params: (context as any)?.params,
      });
      return withCors(response, origin);
    } catch {
      return withCors(
        Response.json({ error: 'Invalid or expired token' }, { status: 401 }),
        origin
      );
    }
  };
}
