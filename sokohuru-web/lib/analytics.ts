import { track } from '@vercel/analytics';

/**
 * Track custom events in Vercel Analytics
 * @param name - Event name
 * @param props - Optional event properties
 */
export function trackEvent(name: string, props?: Record<string, string>) {
  track(name, props);
}

/**
 * Predefined analytics events
 */
export const EVENTS = {
  CREATOR_SIGNUP_STARTED: 'creator_signup_started',
  CREATOR_SIGNUP_COMPLETED: 'creator_signup_completed',
  BRAND_SIGNUP_STARTED: 'brand_signup_started',
  BRAND_SIGNUP_COMPLETED: 'brand_signup_completed',
  CAMPAIGN_VIEWED: 'campaign_viewed',
  CAMPAIGN_APPLY_CLICKED: 'campaign_apply_clicked',
} as const;
