import { createClient } from '@/lib/supabase/server';
import { Campaign } from '@/types/campaign';
import { CampaignsList } from '@/components/campaigns/CampaignsList';
import type { Metadata } from 'next';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Open Campaigns — Sokohuru',
  description:
    'Browse live brand campaigns on Sokohuru. Apply through the app to earn from UGC, affiliate, and ambassador deals with top East African brands.',
};

export default async function CampaignsPage() {
  const supabase = await createClient();

  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select(
      `
      id,
      campaign_image,
      campaign_type,
      start_date,
      end_date,
      budget,
      status,
      about_project,
      project_perks,
      activity,
      created_at,
      brand_profile (
        id,
        company_name,
        logo_url,
        city,
        country,
        account_slug
      ),
      campaign_deliverables (
        platform,
        content_type,
        due_date
      )
    `
    )
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  // Handle error or empty state
  const campaignsList: Campaign[] = error || !campaigns ? [] : (campaigns as Campaign[]);

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--sk-background)',
        paddingTop: '80px',
      }}
    >
      {/* Hero Band */}
      <section
        className="px-6 py-16 text-center"
        style={{
          backgroundColor: 'var(--sk-surface-1)',
          borderBottom: '0.5px solid var(--sk-border)',
        }}
      >
        <div className="mx-auto max-w-4xl">
          <h1
            className="mb-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: 'var(--sk-text-primary)',
              lineHeight: '1.2',
            }}
          >
            Open Campaigns
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'var(--sk-text-secondary)',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Discover active brand collaborations. Download the Sokohuru app to apply and start
            earning from UGC, affiliate, and ambassador campaigns.
          </p>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <CampaignsList campaigns={campaignsList} />
        </div>
      </section>
    </main>
  );
}
