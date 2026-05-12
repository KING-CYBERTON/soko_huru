/**
 * Zod Schemas for Fit Score Engine
 *
 * Type-safe validation schemas for fit score calculation.
 */

import { z } from 'zod';

/**
 * Request body schema for POST /api/fit-score
 */
export const FitScoreRequestSchema = z.object({
  campaignId: z.string().uuid(),
  profileId: z.string().uuid(),
});

export type FitScoreRequest = z.infer<typeof FitScoreRequestSchema>;

/**
 * Social account data schema
 */
export const SocialAccountSchema = z.object({
  platform: z.string(),
  followers: z.number(),
  engagement_rate: z.number(),
});

/**
 * Demographics data schema
 */
export const DemographicsSchema = z.object({
  region: z.string().nullable(),
  age_range: z.string().nullable(),
  gender: z.string().nullable(),
});

/**
 * Content aesthetic/format data schema
 */
export const ContentAestheticSchema = z.object({
  formats: z.array(z.string()),
});

/**
 * General settings schema
 */
export const GeneralSettingsSchema = z.object({
  available_platforms: z.array(z.string()),
  collab_preferences: z.array(z.string()).optional(),
});

/**
 * Creator profile data schema
 */
export const CreatorDataSchema = z.object({
  id: z.string(),
  social_accounts: z.array(SocialAccountSchema),
  demographics: DemographicsSchema.nullable(),
  content_aesthetic: ContentAestheticSchema.nullable(),
  general_settings: GeneralSettingsSchema.nullable(),
});

export type CreatorData = z.infer<typeof CreatorDataSchema>;

/**
 * Campaign requirements schema
 */
export const CampaignRequirementsSchema = z.object({
  min_followers: z.number().nullable(),
  max_followers: z.number().nullable(),
  min_engagement: z.number().nullable(),
  region: z.string().nullable(),
  required_formats: z.array(z.string()).nullable(),
  age_range: z.string().nullable(),
});

export type CampaignRequirements = z.infer<typeof CampaignRequirementsSchema>;

/**
 * Campaign data schema
 */
export const CampaignDataSchema = z.object({
  id: z.string(),
  type: z.string(),
  platforms: z.array(z.string()),
  requirements: CampaignRequirementsSchema.nullable(),
});

export type CampaignData = z.infer<typeof CampaignDataSchema>;

/**
 * Fit score result schema
 */
export const FitScoreResultSchema = z.object({
  score: z.number().min(0).max(100),
  breakdown: z.object({
    contentFormat: z.number(),
    platformAvailability: z.number(),
    followerRange: z.number(),
    engagementRate: z.number(),
    audienceRegion: z.number(),
    collabPreference: z.number(),
  }),
  matched: z.array(z.string()),
  failed: z.array(z.string()),
});

export type FitScoreResult = z.infer<typeof FitScoreResultSchema>;
