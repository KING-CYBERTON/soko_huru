/**
 * CORS Utilities
 *
 * Handles Cross-Origin Resource Sharing (CORS) headers for API routes.
 * Ensures only allowed origins can access the API.
 */

import { config } from '@/lib/config';

/**
 * Generate CORS headers for a given origin
 */
export function corsHeaders(origin: string | null) {
  const allowed = config.allowedOrigins;
  const isAllowed = origin && allowed.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowed[0],
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Apply CORS headers to a Response object
 */
export function withCors(response: Response, origin: string | null): Response {
  const headers = corsHeaders(origin);

  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * Create a CORS preflight response for OPTIONS requests
 */
export function corsPreflightResponse(origin: string | null): Response {
  const headers = corsHeaders(origin);

  return new Response(null, {
    status: 204,
    headers,
  });
}
