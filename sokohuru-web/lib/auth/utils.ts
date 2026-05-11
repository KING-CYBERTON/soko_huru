import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

type UserRole = 'creator' | 'brand';

type UserWithRole = {
  user: {
    id: string;
    email: string;
  };
  role: UserRole;
};

/**
 * Get the currently authenticated user with their role
 * Returns null if not authenticated
 */
export async function getUser(): Promise<UserWithRole | null> {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  // Fetch role from user_roles table
  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (roleError || !roleData) {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email || '',
    },
    role: (roleData as { role: UserRole }).role,
  };
}

/**
 * Require that the current user is a creator
 * Redirects to /auth/login if not authenticated or not a creator
 */
export async function requireCreator(): Promise<UserWithRole> {
  const userData = await getUser();

  if (!userData || userData.role !== 'creator') {
    redirect('/auth/login');
  }

  return userData;
}

/**
 * Require that the current user is a brand
 * Redirects to /auth/login if not authenticated or not a brand
 */
export async function requireBrand(): Promise<UserWithRole> {
  const userData = await getUser();

  if (!userData || userData.role !== 'brand') {
    redirect('/auth/login');
  }

  return userData;
}
