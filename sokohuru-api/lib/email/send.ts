/**
 * Email Sender using Resend
 *
 * Sends transactional emails via the Resend API.
 */

import { Resend } from 'resend';
import { config } from '@/lib/config';

const resend = new Resend(config.resendApiKey);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Send an email via Resend
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailParams) {
  return resend.emails.send({
    from: config.resendFromEmail,
    to,
    subject,
    html,
    text,
  });
}
