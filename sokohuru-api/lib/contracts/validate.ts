/**
 * Contract Validation Functions
 *
 * Server-side validation for contract signing operations.
 * Never trust client-side data - all validation happens here.
 */

interface Contract {
  id: string;
  creator_id: string;
  status: string;
  sign_by: string | null;
}

interface SigningRequest {
  acceptedBrief: boolean;
  acceptedExclusivity: boolean;
}

/**
 * Validate that the contract belongs to the authenticated user
 */
export function validateOwnership(contract: Contract, userId: string): boolean {
  return contract.creator_id === userId;
}

/**
 * Validate that the contract signing deadline hasn't passed
 * Returns { valid: true/false, expired: true/false }
 */
export function validateDeadline(contract: Contract): {
  valid: boolean;
  expired: boolean;
} {
  if (!contract.sign_by) {
    // No deadline set - always valid
    return { valid: true, expired: false };
  }

  const deadline = new Date(contract.sign_by);
  const now = new Date();

  const expired = deadline < now;

  return {
    valid: !expired,
    expired,
  };
}

/**
 * Validate that the contract is in 'pending' status
 */
export function validateStatus(contract: Contract): boolean {
  return contract.status === 'pending';
}

/**
 * Validate that both required checkboxes are checked
 */
export function validateCheckboxes(body: SigningRequest): boolean {
  return body.acceptedBrief === true && body.acceptedExclusivity === true;
}
