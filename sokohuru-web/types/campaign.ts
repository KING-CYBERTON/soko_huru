export type CampaignType =
  | 'affiliate'
  | 'ambassador'
  | 'ugc'
  | 'gifting'
  | 'commission'
  | 'pay_per_view';

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';

export type Platform = 'instagram' | 'youtube' | 'tiktok' | 'facebook' | 'other';

export interface BrandProfile {
  id: string;
  company_name: string;
  logo_url: string | null;
  city: string | null;
  country: string | null;
  account_slug: string | null;
}

export interface CampaignDeliverable {
  platform: Platform;
  content_type: string;
  due_date: string;
}

export interface Campaign {
  id: string;
  campaign_image: string | null;
  campaign_type: CampaignType;
  start_date: string;
  end_date: string | null;
  budget: number | null;
  status: CampaignStatus;
  about_project: string | null;
  project_perks: string | null;
  activity: string | null;
  created_at: string;
  brand_profile: BrandProfile;
  campaign_deliverables: CampaignDeliverable[];
}
