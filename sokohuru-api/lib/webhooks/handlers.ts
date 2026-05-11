/**
 * Supabase Webhook Handlers
 *
 * Processes database events from Supabase webhooks and creates notifications.
 * Each handler fetches related data using the admin client and inserts notification rows.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * Handle new campaign submission (INSERT on campaign_submissions)
 * Notifies brand that a creator has applied to their campaign
 */
export async function handleNewSubmission(record: any) {
  // Fetch campaign to get brand_id
  const { data: campaign } = await supabaseAdmin
    .from('campaigns')
    .select('brand_id, title')
    .eq('id', record.campaign_id)
    .single();

  if (!campaign) {
    throw new Error(`Campaign ${record.campaign_id} not found`);
  }

  // Insert notification for brand
  await supabaseAdmin.from('notifications').insert({
    user_id: (campaign as any).brand_id,
    type: 'submission_pending',
    title: 'New application received',
    body: `A creator has applied to ${(campaign as any).title}`,
    meta: {
      campaign_id: record.campaign_id,
      profile_id: record.creator_id,
      submission_id: record.id,
    },
  } as any);
}

/**
 * Handle campaign submission status update (UPDATE on campaign_submissions)
 * Notifies creator when their application is approved or rejected
 */
export async function handleSubmissionUpdate(record: any, old_record: any) {
  // Check if status changed
  if (record.status === old_record.status) {
    return;
  }

  // Fetch campaign details
  const { data: campaign } = await supabaseAdmin
    .from('campaigns')
    .select('title')
    .eq('id', record.campaign_id)
    .single();

  if (!campaign) {
    throw new Error(`Campaign ${record.campaign_id} not found`);
  }

  // Notify creator based on new status
  if (record.status === 'approved') {
    await supabaseAdmin.from('notifications').insert({
      user_id: record.creator_id,
      type: 'submission_approved',
      title: "You've been approved!",
      body: `Brand approved your application to ${(campaign as any).title}`,
      meta: {
        campaign_id: record.campaign_id,
        submission_id: record.id,
      },
    } as any);
  } else if (record.status === 'rejected') {
    await supabaseAdmin.from('notifications').insert({
      user_id: record.creator_id,
      type: 'submission_rejected',
      title: 'Application not selected',
      body: `Your application to ${(campaign as any).title} was not selected this time`,
      meta: {
        campaign_id: record.campaign_id,
        submission_id: record.id,
      },
    } as any);
  }
}

/**
 * Handle new contract issued (INSERT on contracts)
 * Notifies creator that a contract is ready to sign
 */
export async function handleContractIssued(record: any) {
  // Fetch campaign details
  const { data: campaign } = await supabaseAdmin
    .from('campaigns')
    .select('title')
    .eq('id', record.campaign_id)
    .single();

  await supabaseAdmin.from('notifications').insert({
    user_id: record.creator_id,
    type: 'contract_issued',
    title: 'Contract ready to sign',
    body: `Your contract for ${(campaign as any)?.title || 'campaign'} is ready for review and signature`,
    meta: {
      campaign_id: record.campaign_id,
      contract_id: record.id,
    },
  } as any);
}

/**
 * Handle contract status update (UPDATE on contracts)
 * Notifies brand when creator signs the contract
 */
export async function handleContractUpdate(record: any, old_record: any) {
  // Check if status changed to signed
  if (record.status !== 'signed' || old_record.status === 'signed') {
    return;
  }

  // Fetch creator and campaign details
  const { data: creator } = await supabaseAdmin
    .from('creator_profile')
    .select('first_name, last_name')
    .eq('id', record.creator_id)
    .single();

  const { data: campaign } = await supabaseAdmin
    .from('campaigns')
    .select('brand_id, title')
    .eq('id', record.campaign_id)
    .single();

  if (!campaign) {
    throw new Error(`Campaign ${record.campaign_id} not found`);
  }

  const creatorName = creator
    ? `${(creator as any).first_name} ${(creator as any).last_name}`
    : 'Creator';

  await supabaseAdmin.from('notifications').insert({
    user_id: (campaign as any).brand_id,
    type: 'contract_signed',
    title: 'Contract signed',
    body: `${creatorName} signed the contract for ${(campaign as any).title}`,
    meta: {
      campaign_id: record.campaign_id,
      contract_id: record.id,
      creator_id: record.creator_id,
    },
  } as any);
}

/**
 * Handle new content submitted (INSERT on content_submission)
 * Notifies brand that creator has submitted content for review
 */
export async function handleContentSubmitted(record: any) {
  // Fetch campaign details
  const { data: campaign } = await supabaseAdmin
    .from('campaigns')
    .select('brand_id, title')
    .eq('id', record.campaign_id)
    .single();

  if (!campaign) {
    throw new Error(`Campaign ${record.campaign_id} not found`);
  }

  await supabaseAdmin.from('notifications').insert({
    user_id: (campaign as any).brand_id,
    type: 'content_submitted',
    title: 'New content submitted',
    body: `A creator has submitted content for review on ${(campaign as any).title}`,
    meta: {
      campaign_id: record.campaign_id,
      content_id: record.id,
      creator_id: record.creator_id,
    },
  } as any);
}

/**
 * Handle content submission update (UPDATE on content_submission)
 * Notifies creator about payment status changes
 */
export async function handleContentUpdate(record: any, old_record: any) {
  // Check if payment_status changed
  if (record.payment_status === old_record.payment_status) {
    return;
  }

  if (record.payment_status === 'pending') {
    await supabaseAdmin.from('notifications').insert({
      user_id: record.creator_id,
      type: 'payment_queued',
      title: 'Payment is being processed',
      body: 'Your payment has been queued and will be sent soon',
      meta: {
        content_id: record.id,
        campaign_id: record.campaign_id,
        amount: record.amount,
      },
    } as any);
  } else if (record.payment_status === 'paid') {
    await supabaseAdmin.from('notifications').insert({
      user_id: record.creator_id,
      type: 'payment_sent',
      title: 'Payment sent!',
      body: `KES ${record.amount?.toLocaleString() || '0'} has been sent to your account`,
      meta: {
        content_id: record.id,
        campaign_id: record.campaign_id,
        amount: record.amount,
      },
    } as any);
  }
}
