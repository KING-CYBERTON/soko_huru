import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth callback route handler
 * Handles OAuth callbacks (e.g., Google OAuth) for future implementation
 * Exchanges the authorization code for a session and redirects based on user role
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();

    // Exchange code for session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // Redirect to login with error
      return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
    }

    if (data.user) {
      // Fetch user role from user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (roleError || !roleData) {
        return NextResponse.redirect(`${origin}/auth/login?error=role_not_found`);
      }

      // Redirect based on role
      const role = (roleData as { role: 'creator' | 'brand' }).role;
      if (role === 'creator') {
        return NextResponse.redirect(`${origin}/dashboard/creator`);
      } else if (role === 'brand') {
        return NextResponse.redirect(`${origin}/dashboard/brand`);
      }
    }
  }

  // Fallback: redirect to login
  return NextResponse.redirect(`${origin}/auth/login`);
}
