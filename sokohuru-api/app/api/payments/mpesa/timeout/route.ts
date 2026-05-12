/**
 * M-Pesa Timeout Handler
 *
 * POST /api/payments/mpesa/timeout
 * Receives timeout callback from M-Pesa when payment request times out
 * No authentication - M-Pesa calls this endpoint directly
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // M-Pesa timeout callback structure
    const result = body.Result;
    const conversationID = result?.ConversationID;
    const resultDesc = result?.ResultDesc || 'Payment request timed out';

    if (!conversationID) {
      console.error('M-Pesa timeout callback missing ConversationID');
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
      console.warn(
        `Payout not found for timeout ConversationID: ${conversationID}`
      );
      // Still return success to M-Pesa
      return Response.json({
        ResultCode: 0,
        ResultDesc: 'Accepted',
      });
    }

    const payoutId = (payout as any).id;
    const userId = (payout as any).user_id;

    // Update payout status to failed
    await (supabaseAdmin as any)
      .from('payouts')
      .update({
        status: 'failed',
        mpesa_result_desc: resultDesc,
      })
      .eq('id', payoutId);

    // Insert timeout notification for creator
    await (supabaseAdmin as any).from('notifications').insert({
      user_id: userId,
      type: 'payment_failed',
      title: 'Payment timed out',
      body: 'Your payout request timed out. Please try again.',
      meta: {
        payout_id: payoutId,
        amount: (payout as any).amount,
        reason: 'timeout',
      },
    });

    console.log(`M-Pesa payout ${payoutId} timed out: ${resultDesc}`);

    // Return success to M-Pesa
    return Response.json({
      ResultCode: 0,
      ResultDesc: 'Accepted',
    });
  } catch (error) {
    console.error('M-Pesa timeout handler error:', error);

    // Still return success to M-Pesa
    return Response.json({
      ResultCode: 0,
      ResultDesc: 'Accepted',
    });
  }
}
