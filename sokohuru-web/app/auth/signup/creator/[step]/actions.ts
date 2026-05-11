'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

interface SignUpCreatorData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;

  // Step 2
  dateOfBirth: string;
  city: string;
  country: string;
  languages: string[];
  bio: string;

  // Step 3
  socialAccounts: { platform: string; username: string }[];

  // Step 4
  contentFormats: string[];
  collabTypes: string[];
}

export async function signUpCreator(data: SignUpCreatorData) {
  const supabase = await createClient();

  // Step 1: Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        role: 'creator',
        first_name: data.firstName,
        last_name: data.lastName,
      },
    },
  });

  if (authError || !authData.user) {
    // eslint-disable-next-line no-console
    console.error('Auth signup error:', authError);
    throw new Error(authError?.message || 'Failed to create account');
  }

  const userId = authData.user.id;

  // Step 2: Insert user_roles
  const { error: roleError } = await supabase
    .from('user_roles')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert({ id: userId, role: 'creator' as const } as any);

  if (roleError) {
    // eslint-disable-next-line no-console
    console.error('Role insert error:', roleError);
    throw new Error('Failed to set user role');
  }

  // Step 3: Generate account slug
  const accountSlug = `${data.firstName.toLowerCase()}-${data.lastName.toLowerCase()}-${userId.slice(0, 8)}`;

  // Step 4: Insert creator_profile
  const { error: profileError } = await supabase.from('creator_profile').insert({
    id: userId,
    first_name: data.firstName,
    last_name: data.lastName,
    date_of_birth: data.dateOfBirth,
    account_slug: accountSlug,
    city: data.city,
    country: data.country,
    languages: data.languages,
    bio: data.bio,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  if (profileError) {
    // eslint-disable-next-line no-console
    console.error('Profile insert error:', profileError);
    throw new Error('Failed to create profile');
  }

  // Step 5: Insert social_accounts for each connected platform
  if (data.socialAccounts && data.socialAccounts.length > 0) {
    const socialAccountsData = data.socialAccounts.map((account) => ({
      profile_id: userId,
      platform: account.platform,
      username: account.username,
    }));

    const { error: socialError } = await supabase
      .from('social_accounts')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(socialAccountsData as any);

    if (socialError) {
      // eslint-disable-next-line no-console
      console.error('Social accounts insert error:', socialError);
      // Don't throw - social accounts are optional
    }
  }

  // Step 6: Insert content_aesthetic for each selected content format
  if (data.contentFormats && data.contentFormats.length > 0) {
    const contentFormatsData = data.contentFormats.map((format) => ({
      profile_id: userId,
      aesthetic_type: format,
    }));

    const { error: aestheticError } = await supabase
      .from('content_aesthetic')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(contentFormatsData as any);

    if (aestheticError) {
      // eslint-disable-next-line no-console
      console.error('Content aesthetic insert error:', aestheticError);
      // Don't throw - aesthetic is optional
    }
  }

  // Step 7: Insert general_settings for each connected social platform
  if (data.socialAccounts && data.socialAccounts.length > 0) {
    const platforms = data.socialAccounts.map((acc) => acc.platform);
    const generalSettingsData = platforms.map((platform) => ({
      profile_id: userId,
      platform: platform,
      available: true,
    }));

    const { error: settingsError } = await supabase
      .from('general_settings')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(generalSettingsData as any);

    if (settingsError) {
      // eslint-disable-next-line no-console
      console.error('General settings insert error:', settingsError);
      // Don't throw - settings are optional
    }
  }

  // Step 8: Redirect to onboarding page
  redirect('/onboarding/creator');
}
