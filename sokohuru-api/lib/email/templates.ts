/**
 * Email Templates
 *
 * All email templates return { subject, html, text } for use with Resend.
 * Each template is mobile-responsive and includes unsubscribe links.
 */

import { config } from '@/lib/config';

const APP_URL = config.appUrl;

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * Base HTML email wrapper with mobile-responsive styles
 */
function wrapEmail(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #1a1a1a;
      padding: 24px;
      text-align: center;
    }
    .logo {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      text-decoration: none;
    }
    .content {
      padding: 32px 24px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 16px 0;
      color: #1a1a1a;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 16px 0;
      color: #4a4a4a;
    }
    .cta {
      display: inline-block;
      margin: 24px 0;
      padding: 14px 32px;
      background-color: #1a1a1a;
      color: #ffffff;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
    }
    .footer {
      padding: 24px;
      text-align: center;
      background-color: #f5f5f5;
      border-top: 1px solid #e5e5e5;
    }
    .footer p {
      font-size: 14px;
      color: #7a7a7a;
      margin: 8px 0;
    }
    .footer a {
      color: #1a1a1a;
      text-decoration: underline;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 24px 16px;
      }
      h1 {
        font-size: 20px;
      }
      p {
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="logo">SOKOHURU</span>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Sokohuru. All rights reserved.</p>
      <p><a href="${APP_URL}/settings/notifications">Unsubscribe</a> | <a href="${APP_URL}/support">Support</a></p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Creator Approved Email
 * Sent when a brand approves a creator's campaign application
 */
export function sendCreatorApprovedEmail({
  creatorName,
  campaignName,
  brandName,
}: {
  creatorName: string;
  campaignName: string;
  brandName: string;
}): EmailTemplate {
  const subject = `You've been approved by ${brandName}!`;

  const html = wrapEmail(`
    <h1>You're in, ${creatorName}!</h1>
    <p>Congratulations! <strong>${brandName}</strong> has approved your application for <strong>${campaignName}</strong>.</p>
    <p>Sign into the app to review and sign your contract.</p>
    <a href="${APP_URL}/dashboard/creator" class="cta">Open Sokohuru App</a>
  `);

  const text = `
You're in, ${creatorName}!

Congratulations! ${brandName} has approved your application for ${campaignName}.

Sign into the app to review and sign your contract.

Open Sokohuru App: ${APP_URL}/dashboard/creator

---
© ${new Date().getFullYear()} Sokohuru. All rights reserved.
Unsubscribe: ${APP_URL}/settings/notifications
  `.trim();

  return { subject, html, text };
}

/**
 * Creator Rejected Email
 * Sent when a brand rejects a creator's campaign application
 */
export function sendCreatorRejectedEmail({
  creatorName,
  campaignName,
  brandName,
}: {
  creatorName: string;
  campaignName: string;
  brandName: string;
  reason?: string;
}): EmailTemplate {
  const subject = `Application update from ${brandName}`;

  const html = wrapEmail(`
    <h1>Hi ${creatorName},</h1>
    <p>Thank you for applying to <strong>${campaignName}</strong>.</p>
    <p>Unfortunately, ${brandName} has filled their creator spots for this campaign. We know this isn't the news you were hoping for, but there are other amazing campaigns waiting for you.</p>
    <p>Keep creating and applying — your next big collaboration is just around the corner!</p>
    <a href="${APP_URL}/campaigns" class="cta">Browse Campaigns</a>
  `);

  const text = `
Hi ${creatorName},

Thank you for applying to ${campaignName}.

Unfortunately, ${brandName} has filled their creator spots for this campaign. We know this isn't the news you were hoping for, but there are other amazing campaigns waiting for you.

Keep creating and applying — your next big collaboration is just around the corner!

Browse Campaigns: ${APP_URL}/campaigns

---
© ${new Date().getFullYear()} Sokohuru. All rights reserved.
Unsubscribe: ${APP_URL}/settings/notifications
  `.trim();

  return { subject, html, text };
}

/**
 * Contract Issued Email
 * Sent when a contract is ready for the creator to sign
 */
export function sendContractIssuedEmail({
  creatorName,
  campaignName,
  brandName,
}: {
  creatorName: string;
  campaignName: string;
  brandName: string;
}): EmailTemplate {
  const subject = 'Your contract is ready to sign';

  const html = wrapEmail(`
    <h1>Contract ready, ${creatorName}!</h1>
    <p>Your contract for <strong>${campaignName}</strong> with <strong>${brandName}</strong> is ready for review and signature.</p>
    <p>Please review the contract terms carefully and sign in the app to move forward with the campaign.</p>
    <a href="${APP_URL}/dashboard/creator" class="cta">Review &amp; Sign Contract</a>
  `);

  const text = `
Contract ready, ${creatorName}!

Your contract for ${campaignName} with ${brandName} is ready for review and signature.

Please review the contract terms carefully and sign in the app to move forward with the campaign.

Review & Sign Contract: ${APP_URL}/dashboard/creator

---
© ${new Date().getFullYear()} Sokohuru. All rights reserved.
Unsubscribe: ${APP_URL}/settings/notifications
  `.trim();

  return { subject, html, text };
}

/**
 * Payment Sent Email
 * Sent when payment has been sent to the creator
 */
export function sendPaymentSentEmail({
  creatorName,
  amount,
  method,
}: {
  creatorName: string;
  amount: number;
  method: string;
}): EmailTemplate {
  const subject = `Payment sent — KES ${amount.toLocaleString()}`;

  const html = wrapEmail(`
    <h1>Payment sent!</h1>
    <p>Hi ${creatorName},</p>
    <p>Great news! Your payment of <strong>KES ${amount.toLocaleString()}</strong> has been sent to your ${method}.</p>
    <p>It may take 1-3 business days to reflect in your account depending on your payment provider.</p>
    <a href="${APP_URL}/dashboard/creator" class="cta">View Payment Details</a>
  `);

  const text = `
Payment sent!

Hi ${creatorName},

Great news! Your payment of KES ${amount.toLocaleString()} has been sent to your ${method}.

It may take 1-3 business days to reflect in your account depending on your payment provider.

View Payment Details: ${APP_URL}/dashboard/creator

---
© ${new Date().getFullYear()} Sokohuru. All rights reserved.
Unsubscribe: ${APP_URL}/settings/notifications
  `.trim();

  return { subject, html, text };
}

/**
 * Payment Queued Email
 * Sent when payment is being processed
 */
export function sendPaymentQueuedEmail({
  creatorName,
  amount,
}: {
  creatorName: string;
  amount: number;
}): EmailTemplate {
  const subject = 'Payment is being processed';

  const html = wrapEmail(`
    <h1>Payment processing</h1>
    <p>Hi ${creatorName},</p>
    <p>Your payment of <strong>KES ${amount.toLocaleString()}</strong> has been queued and will be sent soon.</p>
    <p>We'll notify you once the payment has been sent to your account.</p>
    <a href="${APP_URL}/dashboard/creator" class="cta">View Payment Status</a>
  `);

  const text = `
Payment processing

Hi ${creatorName},

Your payment of KES ${amount.toLocaleString()} has been queued and will be sent soon.

We'll notify you once the payment has been sent to your account.

View Payment Status: ${APP_URL}/dashboard/creator

---
© ${new Date().getFullYear()} Sokohuru. All rights reserved.
Unsubscribe: ${APP_URL}/settings/notifications
  `.trim();

  return { subject, html, text };
}

/**
 * Brand Notification Email (New Application)
 * Sent when a creator applies to a brand's campaign
 */
export function sendBrandNotificationEmail({
  brandContact,
  campaignName,
  creatorName,
}: {
  brandContact: string;
  campaignName: string;
  creatorName: string;
}): EmailTemplate {
  const subject = `New application — ${creatorName}`;

  const html = wrapEmail(`
    <h1>New application received</h1>
    <p>Hi ${brandContact},</p>
    <p><strong>${creatorName}</strong> has applied to your campaign <strong>${campaignName}</strong>.</p>
    <p>Review their profile, content style, and engagement metrics in your dashboard to decide if they're the right fit.</p>
    <a href="${APP_URL}/dashboard/brand" class="cta">Review Application</a>
  `);

  const text = `
New application received

Hi ${brandContact},

${creatorName} has applied to your campaign ${campaignName}.

Review their profile, content style, and engagement metrics in your dashboard to decide if they're the right fit.

Review Application: ${APP_URL}/dashboard/brand

---
© ${new Date().getFullYear()} Sokohuru. All rights reserved.
Unsubscribe: ${APP_URL}/settings/notifications
  `.trim();

  return { subject, html, text };
}

/**
 * Brand Contract Signed Email
 * Sent when a creator signs the contract
 */
export function sendBrandContractSignedEmail({
  brandContact,
  campaignName,
  creatorName,
}: {
  brandContact: string;
  campaignName: string;
  creatorName: string;
}): EmailTemplate {
  const subject = 'Contract signed';

  const html = wrapEmail(`
    <h1>Contract signed!</h1>
    <p>Hi ${brandContact},</p>
    <p><strong>${creatorName}</strong> has signed the contract for <strong>${campaignName}</strong>.</p>
    <p>The campaign is now officially underway. You can track content submissions and approvals in your dashboard.</p>
    <a href="${APP_URL}/dashboard/brand" class="cta">View Campaign</a>
  `);

  const text = `
Contract signed!

Hi ${brandContact},

${creatorName} has signed the contract for ${campaignName}.

The campaign is now officially underway. You can track content submissions and approvals in your dashboard.

View Campaign: ${APP_URL}/dashboard/brand

---
© ${new Date().getFullYear()} Sokohuru. All rights reserved.
Unsubscribe: ${APP_URL}/settings/notifications
  `.trim();

  return { subject, html, text };
}
