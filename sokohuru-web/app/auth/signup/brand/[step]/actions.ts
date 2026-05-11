'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

interface SignUpBrandData {
  email: string;
  password: string;
  role: string;
  companyName: string;
  accountSlug: string;
  website: string;
  bio: string;
  city: string;
  country: string;
  logoUrl: string;
  coverPhotoUrl: string;
  primaryIndustry: string;
  collabTypes: string[];
  primaryContact: {
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
  };
  settings: {
    discoverable: boolean;
    openToApplications: boolean;
    showPastCampaigns: boolean;
    emailNotifications: boolean;
  };
}

export async function signUpBrand(data: SignUpBrandData) {
  const supabase = await createClient();

  // Step 1: Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        role: 'brand',
        company_name: data.companyName,
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
    .insert({ id: userId, role: 'brand' as const } as any);

  if (roleError) {
    // eslint-disable-next-line no-console
    console.error('Role insert error:', roleError);
    throw new Error('Failed to set user role');
  }

  // Step 3: Insert brand_profile
  const { error: profileError } = await supabase.from('brand_profile').insert({
    id: userId,
    company_name: data.companyName,
    account_slug: data.accountSlug,
    logo_url: data.logoUrl || null,
    cover_photo_url: data.coverPhotoUrl || null,
    website: data.website || null,
    bio: data.bio,
    city: data.city,
    country: data.country,
    preferred_collab_types: data.collabTypes,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  if (profileError) {
    // eslint-disable-next-line no-console
    console.error('Profile insert error:', profileError);
    throw new Error('Failed to create profile');
  }

  // Step 4: Insert brand_contacts
  const { error: contactError } = await supabase
    .from('brand_contacts')
    .insert({
      brand_id: userId,
      first_name: data.primaryContact.firstName,
      last_name: data.primaryContact.lastName,
      email: data.email,
      phone: data.primaryContact.phone || null,
      role: data.primaryContact.role,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

  if (contactError) {
    // eslint-disable-next-line no-console
    console.error('Contact insert error:', contactError);
    // Don't throw - contact is optional
  }

  // Step 5: Insert brand_industry_tags
  if (data.primaryIndustry) {
    const { error: industryError } = await supabase
      .from('brand_industry_tags')
      .insert({
        brand_id: userId,
        industry: data.primaryIndustry,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

    if (industryError) {
      // eslint-disable-next-line no-console
      console.error('Industry tag insert error:', industryError);
      // Don't throw - industry tag is optional
    }
  }

  // Step 6: Insert brand_settings
  const { error: settingsError } = await supabase
    .from('brand_settings')
    .insert({
      brand_id: userId,
      discoverable: data.settings.discoverable,
      open_to_applications: data.settings.openToApplications,
      show_past_campaigns: data.settings.showPastCampaigns,
      email_notifications: data.settings.emailNotifications,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

  if (settingsError) {
    // eslint-disable-next-line no-console
    console.error('Settings insert error:', settingsError);
    // Don't throw - settings are optional
  }

  // Step 7: Redirect to onboarding page
  redirect('/onboarding/brand');
}
