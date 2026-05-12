/**
 * Contract Signing Verification Endpoint
 *
 * POST /api/contracts/[id]/sign
 * Server-side validation for contract signing operations.
 * Never trust client-side - all validation happens here.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { withAuth } from '@/lib/middleware/with-auth';
import { ok, err } from '@/lib/utils/response';
import { supabaseAdmin } from '@/lib/supabase/admin';
import {
  validateOwnership,
  validateDeadline,
  validateStatus,
  validateCheckboxes,
} from '@/lib/contracts/validate';
import { z } from 'zod';

/**
 * Request body schema
 */
const SignContractSchema = z.object({
  contractId: z.string().uuid(),
  acceptedBrief: z.boolean().refine((val) => val === true, {
    message: 'Brief must be accepted',
  }),
  acceptedExclusivity: z.boolean().refine((val) => val === true, {
    message: 'Exclusivity terms must be accepted',
  }),
  signatureTimestamp: z.number(),
});

type SignContractRequest = z.infer<typeof SignContractSchema>;

export const POST = withAuth(
  async (request: Request, context: { userId: string; params?: any }) => {
    try {
      // Parse and validate request body
      const body: SignContractRequest = await request.json();
      const validationResult = SignContractSchema.safeParse(body);

      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        return err(firstError.message, 400);
      }

      const { contractId, acceptedBrief, acceptedExclusivity } =
        validationResult.data;
      const userId = context.userId;

      // Fetch contract from Supabase
      const { data: contract, error: fetchError } = await supabaseAdmin
        .from('contracts')
        .select('*')
        .eq('id', contractId)
        .single();

      if (fetchError || !contract) {
        return err('Contract not found', 404);
      }

      // Validate ownership
      if (!validateOwnership(contract as any, userId)) {
        return err('You do not have permission to sign this contract', 403);
      }

      // Validate status
      if (!validateStatus(contract as any)) {
        return err('Contract already signed or cancelled', 400);
      }

      // Validate deadline
      const deadlineCheck = validateDeadline(contract as any);
      if (!deadlineCheck.valid) {
        // Mark contract as expired
        await (supabaseAdmin as any)
          .from('contracts')
          .update({ status: 'expired' })
          .eq('id', contractId);

        return err('Contract signing deadline has passed', 400);
      }

      // Validate checkboxes
      if (!validateCheckboxes({ acceptedBrief, acceptedExclusivity })) {
        return err('Both terms must be accepted', 400);
      }

      // All validations passed - update contract
      const { data: updatedContract, error: updateError } = await (
        supabaseAdmin as any
      )
        .from('contracts')
        .update({
          status: 'signed',
          signed_date: new Date().toISOString(),
        })
        .eq('id', contractId)
        .select()
        .single();

      if (updateError) {
        console.error('Contract update error:', updateError);
        return err('Failed to update contract', 500);
      }

      return ok({
        success: true,
        contract: updatedContract,
      });
    } catch (error) {
      console.error('Contract signing error:', error);
      return err(
        error instanceof Error ? error.message : 'Internal server error',
        500
      );
    }
  }
);
