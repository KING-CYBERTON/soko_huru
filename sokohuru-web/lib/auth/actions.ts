'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

type ActionResult = {
  error?: string;
  success?: boolean;
};

/**
 * Sign up a new creator account
 */
export async function signUpCreator(formData: FormData): Promise<ActionResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'creator',
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/onboarding/creator');
}

/**
 * Sign up a new brand account
 */
export async function signUpBrand(formData: FormData): Promise<ActionResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'brand',
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/onboarding/brand');
}

/**
 * Sign in an existing user (creator or brand)
 * Redirects based on user role from user_roles table
 */
export async function signIn(formData: FormData): Promise<ActionResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message || 'Authentication failed' };
  }

  // Fetch user role from public.user_roles table
  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (roleError || !roleData) {
    return { error: 'Failed to fetch user role' };
  }

  // Redirect based on role
  const role = (roleData as { role: 'creator' | 'brand' }).role;
  if (role === 'creator') {
    redirect('/dashboard/creator');
  } else if (role === 'brand') {
    redirect('/dashboard/brand');
  }

  return { error: 'Invalid user role' };
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}
