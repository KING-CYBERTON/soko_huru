/**
 * Fit Score Calculation Engine
 *
 * Calculates how well a creator matches a campaign based on multiple factors.
 * Total score: 0-100 points (weighted sum of 6 categories)
 */

import type {
  CreatorData,
  CampaignData,
  FitScoreResult,
} from './schemas.js';

/**
 * Calculate fit score between a creator and campaign
 *
 * Scoring algorithm (100 points total):
 * - Content format match: 25 points
 * - Platform availability: 20 points
 * - Follower range: 20 points
 * - Engagement rate: 15 points
 * - Audience region: 10 points
 * - Collab type preference: 10 points
 */
export function calculateFitScore(
  creator: CreatorData,
  campaign: CampaignData
): FitScoreResult {
  const matched: string[] = [];
  const failed: string[] = [];
  const breakdown = {
    contentFormat: 0,
    platformAvailability: 0,
    followerRange: 0,
    engagementRate: 0,
    audienceRegion: 0,
    collabPreference: 0,
  };

  const requirements = campaign.requirements;

  // 1. Content format match (25 points)
  if (requirements?.required_formats && requirements.required_formats.length > 0) {
    const creatorFormats = creator.content_aesthetic?.formats || [];
    const requiredFormats = requirements.required_formats;
    const matchedFormats = requiredFormats.filter((format: string) =>
      creatorFormats.includes(format)
    );

    if (matchedFormats.length === requiredFormats.length) {
      breakdown.contentFormat = 25;
      matched.push('All content formats match');
    } else if (matchedFormats.length > 0) {
      breakdown.contentFormat = Math.round(
        (matchedFormats.length / requiredFormats.length) * 25
      );
      matched.push(
        `${matchedFormats.length}/${requiredFormats.length} content formats match`
      );
    } else {
      breakdown.contentFormat = 0;
      failed.push('No matching content formats');
    }
  } else {
    // No format requirements - full score
    breakdown.contentFormat = 25;
    matched.push('No content format requirements');
  }

  // 2. Platform availability (20 points)
  if (campaign.platforms && campaign.platforms.length > 0) {
    const availablePlatforms =
      creator.general_settings?.available_platforms || [];
    const requiredPlatforms = campaign.platforms;
    const matchedPlatforms = requiredPlatforms.filter((platform: string) =>
      availablePlatforms.includes(platform)
    );

    if (matchedPlatforms.length === requiredPlatforms.length) {
      breakdown.platformAvailability = 20;
      matched.push('All platforms available');
    } else if (matchedPlatforms.length > 0) {
      breakdown.platformAvailability = Math.round(
        (matchedPlatforms.length / requiredPlatforms.length) * 20
      );
      matched.push(
        `${matchedPlatforms.length}/${requiredPlatforms.length} platforms available`
      );
    } else {
      breakdown.platformAvailability = 0;
      failed.push('No matching platforms');
    }
  } else {
    // No platform requirements - full score
    breakdown.platformAvailability = 20;
    matched.push('No platform requirements');
  }

  // 3. Follower range (20 points)
  const minFollowers = requirements?.min_followers;
  const maxFollowers = requirements?.max_followers;

  if (minFollowers !== null || maxFollowers !== null) {
    // Get the creator's total followers across all platforms
    const totalFollowers = creator.social_accounts.reduce(
      (sum: number, account) => sum + account.followers,
      0
    );

    const meetsMin = minFollowers === null || minFollowers === undefined || totalFollowers >= minFollowers;
    const meetsMax = maxFollowers === null || maxFollowers === undefined || totalFollowers <= maxFollowers;

    if (meetsMin && meetsMax) {
      breakdown.followerRange = 20;
      matched.push(`Follower count within range (${totalFollowers.toLocaleString()})`);
    } else {
      breakdown.followerRange = 0;
      if (!meetsMin) {
        failed.push(
          `Followers too low (${totalFollowers.toLocaleString()} < ${minFollowers?.toLocaleString()})`
        );
      }
      if (!meetsMax) {
        failed.push(
          `Followers too high (${totalFollowers.toLocaleString()} > ${maxFollowers?.toLocaleString()})`
        );
      }
    }
  } else {
    // No follower requirements - full score
    breakdown.followerRange = 20;
    matched.push('No follower requirements');
  }

  // 4. Engagement rate (15 points)
  const minEngagement = requirements?.min_engagement;

  if (minEngagement !== null && minEngagement !== undefined) {
    // Calculate average engagement rate across all platforms
    const avgEngagement =
      creator.social_accounts.reduce(
        (sum: number, account) => sum + account.engagement_rate,
        0
      ) / (creator.social_accounts.length || 1);

    if (avgEngagement >= minEngagement) {
      breakdown.engagementRate = 15;
      matched.push(
        `Engagement rate meets requirement (${avgEngagement.toFixed(2)}%)`
      );
    } else {
      // Scale proportionally if below requirement
      breakdown.engagementRate = Math.max(
        0,
        Math.round((avgEngagement / minEngagement) * 15)
      );
      if (breakdown.engagementRate > 0) {
        matched.push(
          `Engagement rate partially meets requirement (${avgEngagement.toFixed(2)}%)`
        );
      } else {
        failed.push(
          `Engagement rate too low (${avgEngagement.toFixed(2)}% < ${minEngagement}%)`
        );
      }
    }
  } else {
    // No engagement requirements - full score
    breakdown.engagementRate = 15;
    matched.push('No engagement requirements');
  }

  // 5. Audience region (10 points)
  const requiredRegion = requirements?.region;

  if (requiredRegion) {
    const creatorRegion = creator.demographics?.region;

    if (creatorRegion === requiredRegion) {
      breakdown.audienceRegion = 10;
      matched.push(`Region matches (${requiredRegion})`);
    } else {
      breakdown.audienceRegion = 0;
      failed.push(
        `Region mismatch (creator: ${creatorRegion || 'unspecified'}, required: ${requiredRegion})`
      );
    }
  } else {
    // No region requirements - full score
    breakdown.audienceRegion = 10;
    matched.push('No region requirements');
  }

  // 6. Collab type preference (10 points)
  const campaignType = campaign.type;
  const creatorPreferences =
    creator.general_settings?.collab_preferences || [];

  if (creatorPreferences.length > 0) {
    if (creatorPreferences.includes(campaignType)) {
      breakdown.collabPreference = 10;
      matched.push(`Collab type preference matches (${campaignType})`);
    } else {
      breakdown.collabPreference = 0;
      failed.push(`Collab type not in preferences (${campaignType})`);
    }
  } else {
    // No preferences set - give full score (neutral)
    breakdown.collabPreference = 10;
    matched.push('No collab preferences set');
  }

  // Calculate total score
  const score =
    breakdown.contentFormat +
    breakdown.platformAvailability +
    breakdown.followerRange +
    breakdown.engagementRate +
    breakdown.audienceRegion +
    breakdown.collabPreference;

  return {
    score,
    breakdown,
    matched,
    failed,
  };
}
