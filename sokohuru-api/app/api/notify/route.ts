/**
 * Notification Dispatch Webhook
 *
 * POST /api/notify
 * Receives notifications INSERT events from Supabase and sends emails.
 *
 * Webhook payload structure:
 * {
 *   type: 'INSERT' | 'UPDATE' | 'DELETE',
 *   table: 'notifications',
 *   record: NotificationRecord,
 *   schema: string
 * }
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { withWebhook } from '@/lib/middleware/with-webhook';
import { ok, err } from '@/lib/utils/response';
import { sendEmail } from '@/lib/email/send';
import {
  sendCreatorApprovedEmail,
  sendCreatorRejectedEmail,
  sendContractIssuedEmail,
  sendPaymentSentEmail,
  sendPaymentQueuedEmail,
  sendBrandNotificationEmail,
  sendBrandContractSignedEmail,
} from '@/lib/email/templates';
import { supabaseAdmin } from '@/lib/supabase/admin';

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: any;
  schema: string;
}

export const POST = withWebhook(async (request: Request, body: unknown) => {
  try {
    const payload = body as WebhookPayload;
    const { type, record } = payload;

    // Only process INSERT events
    if (type !== 'INSERT') {
      return ok({ received: true, skipped: 'not an INSERT event' });
    }

    const notification = record;
    const { user_id, type: notificationType, meta } = notification;

    // Fetch user email from profiles
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('email, first_name, last_name')
      .eq('id', user_id)
      .single();

    if (!profile) {
      console.warn(`User ${user_id} not found, skipping email`);
      return ok({ received: true, skipped: 'user not found' });
    }

    const userEmail = (profile as any).email;
    const firstName = (profile as any).first_name || 'there';

    if (!userEmail) {
      console.warn(`User ${user_id} has no email, skipping`);
      return ok({ received: true, skipped: 'no email address' });
    }

    // Route to appropriate email template based on notification type
    let emailData;

    switch (notificationType) {
      case 'submission_pending': {
        // Brand receives notification when creator applies
        const { data: campaign } = await supabaseAdmin
          .from('campaigns')
          .select('title')
          .eq('id', meta.campaign_id)
          .single();

        const { data: creator } = await supabaseAdmin
          .from('creator_profile')
          .select('first_name, last_name')
          .eq('id', meta.profile_id)
          .single();

        const campaignName = (campaign as any)?.title || 'your campaign';
        const creatorName = creator
          ? `${(creator as any).first_name} ${(creator as any).last_name}`
          : 'A creator';

        emailData = sendBrandNotificationEmail({
          brandContact: firstName,
          campaignName,
          creatorName,
        });
        break;
      }

      case 'submission_approved': {
        // Creator receives notification when approved
        const { data: campaign } = await supabaseAdmin
          .from('campaigns')
          .select('title, brand_id')
          .eq('id', meta.campaign_id)
          .single();

        const { data: brand } = await supabaseAdmin
          .from('brand_profile')
          .select('company_name')
          .eq('id', (campaign as any)?.brand_id)
          .single();

        emailData = sendCreatorApprovedEmail({
          creatorName: firstName,
          campaignName: (campaign as any)?.title || 'the campaign',
          brandName: (brand as any)?.company_name || 'the brand',
        });
        break;
      }

      case 'submission_rejected': {
        // Creator receives notification when rejected
        const { data: campaign } = await supabaseAdmin
          .from('campaigns')
          .select('title, brand_id')
          .eq('id', meta.campaign_id)
          .single();

        const { data: brand } = await supabaseAdmin
          .from('brand_profile')
          .select('company_name')
          .eq('id', (campaign as any)?.brand_id)
          .single();

        emailData = sendCreatorRejectedEmail({
          creatorName: firstName,
          campaignName: (campaign as any)?.title || 'the campaign',
          brandName: (brand as any)?.company_name || 'the brand',
        });
        break;
      }

      case 'contract_issued': {
        // Creator receives notification when contract is ready
        const { data: campaign } = await supabaseAdmin
          .from('campaigns')
          .select('title, brand_id')
          .eq('id', meta.campaign_id)
          .single();

        const { data: brand } = await supabaseAdmin
          .from('brand_profile')
          .select('company_name')
          .eq('id', (campaign as any)?.brand_id)
          .single();

        emailData = sendContractIssuedEmail({
          creatorName: firstName,
          campaignName: (campaign as any)?.title || 'the campaign',
          brandName: (brand as any)?.company_name || 'the brand',
        });
        break;
      }

      case 'contract_signed': {
        // Brand receives notification when creator signs
        const { data: campaign } = await supabaseAdmin
          .from('campaigns')
          .select('title')
          .eq('id', meta.campaign_id)
          .single();

        const { data: creator } = await supabaseAdmin
          .from('creator_profile')
          .select('first_name, last_name')
          .eq('id', meta.creator_id)
          .single();

        const creatorName = creator
          ? `${(creator as any).first_name} ${(creator as any).last_name}`
          : 'A creator';

        emailData = sendBrandContractSignedEmail({
          brandContact: firstName,
          campaignName: (campaign as any)?.title || 'your campaign',
          creatorName,
        });
        break;
      }

      case 'payment_queued': {
        // Creator receives notification when payment is queued
        emailData = sendPaymentQueuedEmail({
          creatorName: firstName,
          amount: meta.amount || 0,
        });
        break;
      }

      case 'payment_sent': {
        // Creator receives notification when payment is sent
        emailData = sendPaymentSentEmail({
          creatorName: firstName,
          amount: meta.amount || 0,
          method: 'M-Pesa', // Default payment method
        });
        break;
      }

      default:
        console.warn(`Unhandled notification type: ${notificationType}`);
        return ok({ received: true, skipped: 'unknown notification type' });
    }

    // Send email via Resend
    await sendEmail({
      to: userEmail,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    return ok({
      received: true,
      sent: true,
      type: notificationType,
      email: userEmail,
    });
  } catch (error) {
    console.error('Notification dispatch error:', error);
    return err(
      error instanceof Error ? error.message : 'Internal server error',
      500
    );
  }
});
