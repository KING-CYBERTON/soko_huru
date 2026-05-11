/**
 * Health Check Endpoint
 *
 * GET /api/health
 * Returns API status and timestamp.
 * No authentication required - used to verify deployment is live.
 */

import { NextRequest, NextResponse } from 'next/server';
import { withCors, corsPreflightResponse } from '@/lib/cors';

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');

  const response = NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });

  return withCors(response, origin);
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return corsPreflightResponse(origin);
}
