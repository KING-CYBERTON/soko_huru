/**
 * Campaign Expiry Cron Job
 *
 * GET /api/cron/expire-campaigns
 * Runs daily to expire campaigns past their end_date
 * Updates campaign status from 'active' to 'completed'
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { withCron } from '@/lib/middleware/with-cron';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const GET = withCron(async () => {
  try {
    const now = new Date().toISOString();

    // Find campaigns that need to be expired
    const { data: expiredCampaigns, error: fetchError } = await supabaseAdmin
      .from('campaigns')
      .select('id')
      .eq('status', 'active')
      .not('end_date', 'is', null)
      .lt('end_date', now);

    if (fetchError) {
      console.error('Error fetching expired campaigns:', fetchError);
      return Response.json(
        { error: 'Failed to fetch campaigns', count: 0 },
        { status: 500 }
      );
    }

    const campaigns = (expiredCampaigns || []) as any[];

    if (campaigns.length === 0) {
      return Response.json({ count: 0, message: 'No campaigns to expire' });
    }

    // Update campaigns to 'completed' status
    const { error: updateError } = await (supabaseAdmin as any)
      .from('campaigns')
      .update({ status: 'completed' })
      .eq('status', 'active')
      .not('end_date', 'is', null)
      .lt('end_date', now);

    if (updateError) {
      console.error('Error updating campaign status:', updateError);
      return Response.json(
        { error: 'Failed to update campaigns', count: 0 },
        { status: 500 }
      );
    }

    console.log(`Expired ${campaigns.length} campaigns`);

    return Response.json({
      count: campaigns.length,
      message: `Successfully expired ${campaigns.length} campaign(s)`,
    });
  } catch (error) {
    console.error('Campaign expiry cron error:', error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
        count: 0,
      },
      { status: 500 }
    );
  }
});
