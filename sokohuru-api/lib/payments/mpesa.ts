/**
 * M-Pesa Payment Integration (Safaricom Daraja API)
 *
 * Handles B2C (Business to Customer) payments for creator payouts.
 * Uses sandbox API for development.
 */

import { config } from '@/lib/config';

// In-memory token cache (simple Map, no Redis needed)
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

/**
 * Format Kenyan phone number to M-Pesa format (2547XXXXXXXX)
 * Accepts: 07XXXXXXXX, +2547XXXXXXXX, 2547XXXXXXXX
 * Returns: 2547XXXXXXXX (always 12 digits)
 */
export function formatPhone(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Handle different formats
  if (cleaned.startsWith('254')) {
    // Already in correct format: 2547XXXXXXXX
    if (cleaned.length !== 12) {
      throw new Error('Invalid Kenyan phone number format');
    }
    return cleaned;
  } else if (cleaned.startsWith('0')) {
    // Local format: 07XXXXXXXX
    if (cleaned.length !== 10) {
      throw new Error('Invalid Kenyan phone number format');
    }
    return '254' + cleaned.substring(1);
  } else if (cleaned.startsWith('7')) {
    // Short format: 7XXXXXXXX
    if (cleaned.length !== 9) {
      throw new Error('Invalid Kenyan phone number format');
    }
    return '254' + cleaned;
  }

  throw new Error('Invalid Kenyan phone number format');
}

/**
 * Get M-Pesa OAuth access token
 * Caches token for its lifetime (3600s)
 */
export async function getAccessToken(): Promise<string> {
  const cacheKey = 'mpesa_token';
  const now = Date.now();

  // Check cache
  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return cached.token;
  }

  // Generate Basic Auth credentials
  const credentials = Buffer.from(
    `${config.mpesaConsumerKey}:${config.mpesaConsumerSecret}`
  ).toString('base64');

  // Request new token from Safaricom
  const response = await fetch(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`M-Pesa auth failed: ${response.statusText}`);
  }

  const data = await response.json();
  const token = data.access_token;

  // Cache token (expires in 3600s, cache for 3500s to be safe)
  tokenCache.set(cacheKey, {
    token,
    expiresAt: now + 3500 * 1000,
  });

  return token;
}

/**
 * Initiate B2C (Business to Customer) payment
 * Sends money from business shortcode to creator's M-Pesa account
 */
export async function initiateB2CPayment({
  phone,
  amount,
  payoutId,
}: {
  phone: string;
  amount: number;
  payoutId: string;
}): Promise<{
  ConversationID: string;
  OriginatorConversationID: string;
}> {
  const accessToken = await getAccessToken();
  const formattedPhone = formatPhone(phone);

  // NOTE: SecurityCredential requires encrypting the initiator password
  // with Safaricom's public certificate. For sandbox, using a placeholder.
  // In production, implement proper encryption with the certificate.
  const securityCredential = 'SANDBOX_SECURITY_CREDENTIAL';

  const requestBody = {
    InitiatorName: 'Sokohuru',
    SecurityCredential: securityCredential,
    CommandID: 'BusinessPayment',
    Amount: Math.floor(amount), // Must be integer
    PartyA: config.mpesaShortcode,
    PartyB: formattedPhone,
    Remarks: `Sokohuru creator payout #${payoutId}`,
    QueueTimeOutURL: `${config.mpesaCallbackUrl}/timeout`,
    ResultURL: `${config.mpesaCallbackUrl}/result`,
    Occasion: `Payout-${payoutId}`,
  };

  const response = await fetch(
    'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`M-Pesa B2C failed: ${errorText}`);
  }

  const data = await response.json();

  // Safaricom returns these IDs to track the transaction
  return {
    ConversationID: data.ConversationID,
    OriginatorConversationID: data.OriginatorConversationID,
  };
}
