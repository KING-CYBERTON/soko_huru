/**
 * M-Pesa Payout Initiation Endpoint
 *
 * POST /api/payments/mpesa/initiate
 * Initiates B2C payment to creator's M-Pesa account
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuth } from '@/lib/middleware/with-auth';
import { ok, err } from '@/lib/utils/response';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { initiateB2CPayment } from '@/lib/payments/mpesa';
import { z } from 'zod';

/**
 * Request body schema
 */
const InitiatePayoutSchema = z.object({
  payoutMethodId: z.string().uuid(),
  amount: z.number().positive(),
});

export const POST = withAuth(
  async (request: Request, context: { userId: string }) => {
    try {
      // Parse and validate request body
      const body = await request.json();
      const validationResult = InitiatePayoutSchema.safeParse(body);

      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        return err(firstError.message, 400);
      }

      const { payoutMethodId, amount } = validationResult.data;
      const userId = context.userId;

      // Fetch payout method and verify ownership
      const { data: payoutMethod, error: fetchError } = await supabaseAdmin
        .from('payout_methods')
        .select('*')
        .eq('id', payoutMethodId)
        .single();

      if (fetchError || !payoutMethod) {
        return err('Payout method not found', 404);
      }

      if ((payoutMethod as any).user_id !== userId) {
        return err('You do not have permission to use this payout method', 403);
      }

      if ((payoutMethod as any).type !== 'mpesa') {
        return err('This payout method is not M-Pesa', 400);
      }

      const phoneNumber = (payoutMethod as any).phone_number;

      if (!phoneNumber) {
        return err('M-Pesa phone number not found', 400);
      }

      // Validate user has sufficient balance
      // For now, we'll skip this check and implement it when we have balance tracking
      // TODO: Implement balance checking

      // Create payout record with status='requested'
      const { data: payout, error: createError } = await (supabaseAdmin as any)
        .from('payouts')
        .insert({
          user_id: userId,
          payout_method_id: payoutMethodId,
          amount,
          status: 'requested',
          requested_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError || !payout) {
        console.error('Payout creation error:', createError);
        return err('Failed to create payout record', 500);
      }

      const payoutId = (payout as any).id;

      try {
        // Initiate B2C payment with M-Pesa
        const mpesaResponse = await initiateB2CPayment({
          phone: phoneNumber,
          amount,
          payoutId,
        });

        // Update payout record with M-Pesa conversation IDs
        await (supabaseAdmin as any)
          .from('payouts')
          .update({
            conversation_id: mpesaResponse.ConversationID,
            originator_conversation_id: mpesaResponse.OriginatorConversationID,
            status: 'processing',
          })
          .eq('id', payoutId);

        return ok({
          success: true,
          payoutId,
          conversationId: mpesaResponse.ConversationID,
        });
      } catch (mpesaError) {
        // Mark payout as failed if M-Pesa request fails
        await (supabaseAdmin as any)
          .from('payouts')
          .update({
            status: 'failed',
            error_message:
              mpesaError instanceof Error
                ? mpesaError.message
                : 'M-Pesa request failed',
          })
          .eq('id', payoutId);

        return err(
          mpesaError instanceof Error
            ? mpesaError.message
            : 'Failed to initiate M-Pesa payment',
          500
        );
      }
    } catch (error) {
      console.error('Payout initiation error:', error);
      return err(
        error instanceof Error ? error.message : 'Internal server error',
        500
      );
    }
  }
);
