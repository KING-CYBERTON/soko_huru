/**
 * Affiliate Link Tracker (Edge Function)
 *
 * GET /api/track/[slug]
 * Tracks clicks on affiliate links and redirects to product URLs.
 * Runs at CDN edge for sub-50ms response times.
 */

import { NextRequest } from 'next/server';

// Force edge runtime for minimal latency
export const runtime = 'edge';

interface AffiliateLink {
  id: string;
  profile_id: string;
  campaign_id: string;
  slug: string;
  clicks: number;
  expires_at: string | null;
}

interface Campaign {
  product_url: string;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const APP_URL = process.env.APP_URL || 'https://sokohuru.com';

    // Fetch affiliate link using Supabase REST API (edge-compatible)
    const affiliateResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/affiliate_links?slug=eq.${slug}&select=*`,
      {
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!affiliateResponse.ok) {
      return Response.redirect(APP_URL, 302);
    }

    const affiliateLinks: AffiliateLink[] = await affiliateResponse.json();

    if (affiliateLinks.length === 0) {
      // Link not found - redirect to homepage
      return Response.redirect(APP_URL, 302);
    }

    const link = affiliateLinks[0];

    // Check if link is expired
    if (link.expires_at) {
      const expiresAt = new Date(link.expires_at);
      const now = new Date();

      if (expiresAt < now) {
        // Link expired - redirect to homepage with expired param
        return Response.redirect(`${APP_URL}?expired=1`, 302);
      }
    }

    // Fetch campaign to get product URL
    const campaignResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/campaigns?id=eq.${link.campaign_id}&select=product_url`,
      {
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!campaignResponse.ok) {
      return Response.redirect(APP_URL, 302);
    }

    const campaigns: Campaign[] = await campaignResponse.json();

    if (campaigns.length === 0 || !campaigns[0].product_url) {
      return Response.redirect(APP_URL, 302);
    }

    const productUrl = campaigns[0].product_url;

    // Increment click count (fire-and-forget - don't await)
    fetch(
      `${SUPABASE_URL}/rest/v1/affiliate_links?id=eq.${link.id}`,
      {
        method: 'PATCH',
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ clicks: link.clicks + 1 }),
      }
    ).catch(() => {
      // Silently fail - don't block redirect
    });

    // Redirect to product URL
    return Response.redirect(productUrl, 302);
  } catch (error) {
    console.error('Affiliate link tracking error:', error);
    const APP_URL = process.env.APP_URL || 'https://sokohuru.com';
    return Response.redirect(APP_URL, 302);
  }
}
