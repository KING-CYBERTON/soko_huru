import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function requireCreator() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!userRole || (userRole as any).role !== 'creator') {
    redirect('/');
  }

  return user;
}

export async function requireBrand() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!userRole || (userRole as any).role !== 'brand') {
    redirect('/');
  }

  return user;
}
