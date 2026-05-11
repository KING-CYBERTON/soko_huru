/**
 * Supabase Webhook Receiver
 *
 * POST /api/webhooks/supabase
 * Receives database events from Supabase and routes them to appropriate handlers.
 *
 * Webhook payload structure:
 * {
 *   type: 'INSERT' | 'UPDATE' | 'DELETE',
 *   table: string,
 *   record: object,
 *   old_record?: object,
 *   schema: string
 * }
 */

import { withWebhook } from '@/lib/middleware/with-webhook';
import { ok, err } from '@/lib/utils/response';
import {
  handleNewSubmission,
  handleSubmissionUpdate,
  handleContractIssued,
  handleContractUpdate,
  handleContentSubmitted,
  handleContentUpdate,
} from '@/lib/webhooks/handlers';

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  old_record?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  schema: string;
}

export const POST = withWebhook(async (request: Request, body: unknown) => {
  try {
    const payload = body as WebhookPayload;
    const { type, table, record, old_record } = payload;

    // Route to appropriate handler based on table and event type
    if (table === 'campaign_submissions') {
      if (type === 'INSERT') {
        await handleNewSubmission(record);
      } else if (type === 'UPDATE') {
        await handleSubmissionUpdate(record, old_record);
      }
    } else if (table === 'contracts') {
      if (type === 'INSERT') {
        await handleContractIssued(record);
      } else if (type === 'UPDATE') {
        await handleContractUpdate(record, old_record);
      }
    } else if (table === 'content_submission') {
      if (type === 'INSERT') {
        await handleContentSubmitted(record);
      } else if (type === 'UPDATE') {
        await handleContentUpdate(record, old_record);
      }
    } else {
      // Unknown table - log but don't fail
      console.warn(`Unhandled webhook for table: ${table}, type: ${type}`);
    }

    return ok({ received: true, table, type });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return err(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
});
