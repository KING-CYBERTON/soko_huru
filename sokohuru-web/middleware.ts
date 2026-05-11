import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createServerClient } from '@supabase/ssr';

/**
 * Next.js Middleware
 * Runs on every request to refresh Supabase auth sessions and handle protected routes
 *
 * This middleware:
 * 1. Refreshes the user's auth token on every request
 * 2. Protects dashboard and onboarding routes (requires authentication)
 * 3. Redirects authenticated users away from auth pages to their dashboards
 */
export async function middleware(request: NextRequest) {
  // First, refresh the session
  const supabaseResponse = await updateSession(request);

  const { pathname } = request.nextUrl;

  // Check if user is authenticated by creating a Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // Not needed for read-only operations
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protected routes: /dashboard/*, /onboarding/*
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding');
  const isAuthRoute = pathname.startsWith('/auth');

  // If accessing protected route while unauthenticated, redirect to login
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If accessing auth routes while authenticated, redirect to dashboard
  if (isAuthRoute && user) {
    // Fetch user role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (roleData) {
      const role = (roleData as { role: 'creator' | 'brand' }).role;
      const dashboardUrl = role === 'creator'
        ? new URL('/dashboard/creator', request.url)
        : new URL('/dashboard/brand', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (public assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
