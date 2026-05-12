/**
 * M-Pesa Webhook Handler
 *
 * POST /api/webhooks/mpesa
 * Receives callback from M-Pesa after B2C payment processing
 * No authentication - M-Pesa calls this endpoint directly
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // M-Pesa callback structure
    const result = body.Result;
    const conversationID = result?.ConversationID;
    const resultCode = result?.ResultCode;
    const resultDesc = result?.ResultDesc;

    if (!conversationID) {
      console.error('M-Pesa callback missing ConversationID');
      return Response.json(
        { ResultCode: 1, ResultDesc: 'Missing ConversationID' },
        { status: 400 }
      );
    }

    // Find payout by ConversationID
    const { data: payout } = await supabaseAdmin
      .from('payouts')
      .select('*')
      .eq('conversation_id', conversationID)
      .single();

    if (!payout) {
      console.warn(`Payout not found for ConversationID: ${conversationID}`);
      // Still return success to M-Pesa so they don't retry
      return Response.json({
        ResultCode: 0,
        ResultDesc: 'Accepted',
      });
    }

    const payoutId = (payout as any).id;
    const userId = (payout as any).user_id;

    // ResultCode 0 = success, anything else = failure
    if (resultCode === 0) {
      // Payment successful
      await (supabaseAdmin as any)
        .from('payouts')
        .update({
          status: 'sent',
          processed_at: new Date().toISOString(),
          mpesa_result_code: resultCode,
          mpesa_result_desc: resultDesc,
        })
        .eq('id', payoutId);

      // Insert success notification for creator
      await (supabaseAdmin as any).from('notifications').insert({
        user_id: userId,
        type: 'payment_sent',
        title: 'Payment sent!',
        body: `Your payout of KES ${(payout as any).amount} has been sent to your M-Pesa`,
        meta: {
          payout_id: payoutId,
          amount: (payout as any).amount,
        },
      });

      console.log(
        `M-Pesa payout ${payoutId} completed successfully: ${resultDesc}`
      );
    } else {
      // Payment failed
      await (supabaseAdmin as any)
        .from('payouts')
        .update({
          status: 'failed',
          mpesa_result_code: resultCode,
          mpesa_result_desc: resultDesc,
        })
        .eq('id', payoutId);

      // Insert failure notification for creator
      await (supabaseAdmin as any).from('notifications').insert({
        user_id: userId,
        type: 'payment_failed',
        title: 'Payment failed',
        body: `Your payout could not be processed: ${resultDesc}`,
        meta: {
          payout_id: payoutId,
          amount: (payout as any).amount,
          error: resultDesc,
        },
      });

      console.error(
        `M-Pesa payout ${payoutId} failed: ${resultCode} - ${resultDesc}`
      );
    }

    // Always return success to M-Pesa
    return Response.json({
      ResultCode: 0,
      ResultDesc: 'Accepted',
    });
  } catch (error) {
    console.error('M-Pesa webhook error:', error);

    // Still return success to M-Pesa so they don't retry indefinitely
    return Response.json({
      ResultCode: 0,
      ResultDesc: 'Accepted',
    });
  }
}
