/**
 * Contract Expiry Cron Job
 *
 * GET /api/cron/expire-contracts
 * Runs daily to expire unsigned contracts past their sign_by deadline
 * Updates contract status from 'pending' to 'expired'
 * Sends notifications to creators about expired contracts
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { withCron } from '@/lib/middleware/with-cron';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const GET = withCron(async () => {
  try {
    const now = new Date().toISOString();

    // Find contracts that need to be expired
    const { data: expiredContracts, error: fetchError } = await supabaseAdmin
      .from('contracts')
      .select('id, creator_id, campaign_id')
      .eq('status', 'pending')
      .not('sign_by', 'is', null)
      .lt('sign_by', now);

    if (fetchError) {
      console.error('Error fetching expired contracts:', fetchError);
      return Response.json(
        { error: 'Failed to fetch contracts', count: 0 },
        { status: 500 }
      );
    }

    const contracts = (expiredContracts || []) as any[];

    if (contracts.length === 0) {
      return Response.json({ count: 0, message: 'No contracts to expire' });
    }

    // Update contracts to 'expired' status
    const { error: updateError } = await (supabaseAdmin as any)
      .from('contracts')
      .update({ status: 'expired' })
      .eq('status', 'pending')
      .not('sign_by', 'is', null)
      .lt('sign_by', now);

    if (updateError) {
      console.error('Error updating contract status:', updateError);
      return Response.json(
        { error: 'Failed to update contracts', count: 0 },
        { status: 500 }
      );
    }

    // Create notifications for each expired contract
    const notifications = contracts.map((contract: any) => ({
      user_id: contract.creator_id,
      type: 'contract_expired',
      title: 'Contract expired',
      body: 'Your unsigned contract has expired',
      meta: {
        contract_id: contract.id,
        campaign_id: contract.campaign_id,
      },
    }));

    if (notifications.length > 0) {
      const { error: notificationError } = await (supabaseAdmin as any)
        .from('notifications')
        .insert(notifications);

      if (notificationError) {
        console.error('Error creating notifications:', notificationError);
        // Don't fail the entire cron job if notifications fail
      }
    }

    console.log(`Expired ${contracts.length} contracts`);

    return Response.json({
      count: contracts.length,
      message: `Successfully expired ${contracts.length} contract(s)`,
    });
  } catch (error) {
    console.error('Contract expiry cron error:', error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
        count: 0,
      },
      { status: 500 }
    );
  }
});
