/**
 * Fit Score API Route
 *
 * POST /api/fit-score
 * Calculates how well a creator matches a campaign.
 * Requires JWT authentication.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuth } from '@/lib/middleware/with-auth';
import { ok, err } from '@/lib/utils/response';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { calculateFitScore } from '@/lib/scoring/fitScore';
import { FitScoreRequestSchema } from '@/lib/scoring/schemas';
import type { CreatorData, CampaignData } from '@/lib/scoring/schemas';

export const POST = withAuth(async (request: Request) => {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = FitScoreRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return err('Invalid request body', 400);
    }

    const { campaignId, profileId } = validationResult.data;

    // Fetch creator data from Supabase
    const { data: creatorProfile } = await supabaseAdmin
      .from('creator_profile')
      .select('id')
      .eq('id', profileId)
      .single();

    if (!creatorProfile) {
      return err('Creator profile not found', 404);
    }

    // Fetch social accounts
    const { data: socialAccounts } = await supabaseAdmin
      .from('social_accounts')
      .select('platform, followers, engagement_rate')
      .eq('profile_id', profileId);

    // Fetch demographics
    const { data: demographics } = await supabaseAdmin
      .from('demographics')
      .select('region, age_range, gender')
      .eq('profile_id', profileId)
      .single();

    // Fetch content aesthetic
    const { data: contentAesthetic } = await supabaseAdmin
      .from('content_aesthetic')
      .select('formats')
      .eq('profile_id', profileId)
      .single();

    // Fetch general settings
    const { data: generalSettings } = await supabaseAdmin
      .from('general_settings')
      .select('available_platforms, collab_preferences')
      .eq('profile_id', profileId)
      .single();

    // Build creator data object
    const creatorData: CreatorData = {
      id: profileId,
      social_accounts: (socialAccounts || []).map((account: any) => ({
        platform: account.platform,
        followers: account.followers || 0,
        engagement_rate: account.engagement_rate || 0,
      })),
      demographics: demographics
        ? {
            region: (demographics as any).region || null,
            age_range: (demographics as any).age_range || null,
            gender: (demographics as any).gender || null,
          }
        : null,
      content_aesthetic: contentAesthetic
        ? {
            formats: (contentAesthetic as any).formats || [],
          }
        : null,
      general_settings: generalSettings
        ? {
            available_platforms: (generalSettings as any).available_platforms || [],
            collab_preferences: (generalSettings as any).collab_preferences || [],
          }
        : null,
    };

    // Fetch campaign data
    const { data: campaign } = await supabaseAdmin
      .from('campaigns')
      .select('id, type, platforms')
      .eq('id', campaignId)
      .single();

    if (!campaign) {
      return err('Campaign not found', 404);
    }

    // Fetch campaign requirements
    const { data: requirements } = await supabaseAdmin
      .from('campaign_requirements')
      .select(
        'min_followers, max_followers, min_engagement, region, required_formats, age_range'
      )
      .eq('campaign_id', campaignId)
      .single();

    // Build campaign data object
    const campaignData: CampaignData = {
      id: campaignId,
      type: (campaign as any).type || 'sponsored_post',
      platforms: (campaign as any).platforms || [],
      requirements: requirements
        ? {
            min_followers: (requirements as any).min_followers || null,
            max_followers: (requirements as any).max_followers || null,
            min_engagement: (requirements as any).min_engagement || null,
            region: (requirements as any).region || null,
            required_formats: (requirements as any).required_formats || null,
            age_range: (requirements as any).age_range || null,
          }
        : null,
    };

    // Calculate fit score
    const result = calculateFitScore(creatorData, campaignData);

    // Update campaign_submissions.fit_score if a submission exists
    const { data: submission } = await supabaseAdmin
      .from('campaign_submissions')
      .select('id')
      .eq('campaign_id', campaignId)
      .eq('creator_id', profileId)
      .single();

    if (submission) {
      // Supabase type inference issue - using any for partial update
      await (supabaseAdmin as any)
        .from('campaign_submissions')
        .update({ fit_score: result.score })
        .eq('id', (submission as any).id);
    }

    return ok({
      ...result,
      updated_submission: !!submission,
    });
  } catch (error) {
    console.error('Fit score calculation error:', error);
    return err(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
});
