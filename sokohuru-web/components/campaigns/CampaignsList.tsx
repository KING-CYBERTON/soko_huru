'use client';

import { useState, useMemo } from 'react';
import { Campaign, CampaignType } from '@/types/campaign';
import { CampaignCard } from './CampaignCard';
import { FilterPills } from './FilterPills';

interface CampaignsListProps {
  campaigns: Campaign[];
}

export function CampaignsList({ campaigns }: CampaignsListProps) {
  const [activeFilter, setActiveFilter] = useState<CampaignType | 'all'>('all');

  const filteredCampaigns = useMemo(() => {
    if (activeFilter === 'all') return campaigns;
    return campaigns.filter((campaign) => campaign.campaign_type === activeFilter);
  }, [campaigns, activeFilter]);

  return (
    <>
      {/* Filter Pills */}
      <div className="mb-12 flex justify-center">
        <FilterPills onFilterChange={setActiveFilter} />
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length > 0 ? (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          }}
        >
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} showApplyButton />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center py-20">
          <div
            className="mb-4 text-center"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--sk-text-primary)',
            }}
          >
            No active campaigns right now
          </div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: 'var(--sk-text-muted)',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            Check back soon for new collaboration opportunities with top East African brands.
          </p>
        </div>
      )}
    </>
  );
}
