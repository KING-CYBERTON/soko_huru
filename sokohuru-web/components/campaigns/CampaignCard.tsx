import Link from 'next/link';
import Image from 'next/image';
import { Campaign } from '@/types/campaign';
import { Avatar, Button } from '@/components/ui';

interface CampaignCardProps {
  campaign: Campaign;
  showApplyButton?: boolean;
}

const CAMPAIGN_TYPE_LABELS: Record<string, string> = {
  affiliate: 'Affiliate',
  ambassador: 'Ambassador',
  ugc: 'UGC',
  gifting: 'Gifting',
  commission: 'Commission',
  pay_per_view: 'Pay per View',
};

const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  other: 'Other',
};

function isNewCampaign(createdAt: string): boolean {
  const created = new Date(createdAt);
  const now = new Date();
  const diffInDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 7;
}

function getDaysUntilClose(endDate: string | null): number | null {
  if (!endDate) return null;
  const end = new Date(endDate);
  const now = new Date();
  const diffInDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diffInDays > 0 ? diffInDays : null;
}

function truncateText(text: string | null, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export function CampaignCard({ campaign, showApplyButton = true }: CampaignCardProps) {
  const isNew = isNewCampaign(campaign.created_at);
  const daysUntilClose = getDaysUntilClose(campaign.end_date);
  const platforms = Array.from(
    new Set(campaign.campaign_deliverables.map((d) => d.platform))
  );

  // Construct deep link for app download with campaign reference
  const applyUrl = `/download?campaign=${campaign.id}`;

  return (
    <div
      className="group relative flex flex-col overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: 'var(--sk-surface-2)',
        borderRadius: 'var(--sk-radius-lg)',
        border: '0.5px solid var(--sk-border)',
      }}
    >
      {/* Hero Image */}
      <div className="relative h-48 w-full overflow-hidden">
        {campaign.campaign_image ? (
          <Image
            src={campaign.campaign_image}
            alt={`${campaign.brand_profile.company_name} campaign`}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: 'linear-gradient(135deg, var(--sk-creator) 0%, var(--sk-creator-text) 100%)',
            }}
          />
        )}

        {/* New Badge */}
        {isNew && (
          <div
            className="absolute left-3 top-3 px-3 py-1"
            style={{
              backgroundColor: 'var(--sk-success)',
              color: 'var(--sk-success-text)',
              borderRadius: 'var(--sk-radius-md)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            New
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand Info */}
        <div className="mb-3 flex items-center gap-2">
          <Avatar
            initials={campaign.brand_profile.company_name}
            src={campaign.brand_profile.logo_url || undefined}
            alt={campaign.brand_profile.company_name}
            size="sm"
          />
          <div className="flex-1">
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--sk-text-primary)',
              }}
            >
              {campaign.brand_profile.company_name}
            </div>
            {campaign.brand_profile.city && campaign.brand_profile.country && (
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: 'var(--sk-text-muted)',
                }}
              >
                {campaign.brand_profile.city}, {campaign.brand_profile.country}
              </div>
            )}
          </div>
        </div>

        {/* Badge Row */}
        <div className="mb-3 flex flex-wrap gap-2">
          {/* Campaign Type Badge */}
          <div
            className="px-2 py-1"
            style={{
              backgroundColor: 'var(--sk-creator)',
              color: 'var(--sk-creator-text)',
              borderRadius: 'var(--sk-radius-sm)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {CAMPAIGN_TYPE_LABELS[campaign.campaign_type] || campaign.campaign_type}
          </div>

          {/* Platform Badges */}
          {platforms.slice(0, 3).map((platform) => (
            <div
              key={platform}
              className="px-2 py-1"
              style={{
                backgroundColor: 'var(--sk-surface-3)',
                color: 'var(--sk-text-secondary)',
                borderRadius: 'var(--sk-radius-sm)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              {PLATFORM_LABELS[platform] || platform}
            </div>
          ))}
        </div>

        {/* Description */}
        <p
          className="mb-4 flex-1"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            color: 'var(--sk-text-secondary)',
          }}
        >
          {truncateText(campaign.about_project, 120)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            {campaign.budget && campaign.budget > 0 ? (
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--sk-text-primary)',
                }}
              >
                KES {campaign.budget.toLocaleString()}
              </div>
            ) : (
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--sk-success)',
                }}
              >
                Gifting
              </div>
            )}
            {daysUntilClose !== null && (
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: 'var(--sk-text-muted)',
                }}
              >
                Closes in {daysUntilClose} {daysUntilClose === 1 ? 'day' : 'days'}
              </div>
            )}
          </div>

          {showApplyButton && (
            <Link href={applyUrl}>
              <Button variant="primary" size="sm">
                Apply
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
