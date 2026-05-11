'use client';

import { useState } from 'react';
import { CampaignType } from '@/types/campaign';

interface FilterPillsProps {
  onFilterChange: (filter: CampaignType | 'all') => void;
}

const FILTERS = [
  { value: 'all' as const, label: 'All' },
  { value: 'ugc' as CampaignType, label: 'UGC' },
  { value: 'affiliate' as CampaignType, label: 'Affiliate' },
  { value: 'ambassador' as CampaignType, label: 'Ambassador' },
  { value: 'gifting' as CampaignType, label: 'Gifting' },
];

export function FilterPills({ onFilterChange }: FilterPillsProps) {
  const [activeFilter, setActiveFilter] = useState<CampaignType | 'all'>('all');

  const handleFilterClick = (filter: CampaignType | 'all') => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilterClick(filter.value)}
          className="px-4 py-2 transition-all duration-200"
          style={{
            backgroundColor:
              activeFilter === filter.value ? 'var(--sk-creator)' : 'var(--sk-surface-2)',
            color:
              activeFilter === filter.value
                ? 'var(--sk-creator-text)'
                : 'var(--sk-text-secondary)',
            borderRadius: 'var(--sk-radius-full)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            border: '0.5px solid var(--sk-border)',
            cursor: 'pointer',
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
