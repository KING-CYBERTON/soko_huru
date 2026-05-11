'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

interface Step3Data {
  primaryIndustry: string;
  collabTypes: string[];
}

interface Step3Props {
  searchParams: URLSearchParams;
}

const INDUSTRIES = [
  'Beauty & Skincare',
  'Fashion & Style',
  'Food & Beverage',
  'Tech & Electronics',
  'Health & Fitness',
  'Home & Lifestyle',
  'Travel',
  'Finance',
  'Entertainment',
  'Education',
  'Sports',
];

const COLLAB_TYPES = ['UGC', 'Affiliate', 'Ambassador', 'Gifting', 'Commission', 'Pay per view'];

export function BrandStep3Industry({ searchParams }: Step3Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Step3Data>({
    primaryIndustry: '',
    collabTypes: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Step3Data, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Step3Data, string>> = {};

    if (!formData.primaryIndustry) newErrors.primaryIndustry = 'Select an industry';
    if (formData.collabTypes.length === 0) newErrors.collabTypes = 'Select at least one collab type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    const params = new URLSearchParams(searchParams);
    params.set('primaryIndustry', formData.primaryIndustry);
    params.set('collabTypes', formData.collabTypes.join(','));

    router.push(`/auth/signup/brand/4?${params.toString()}`);
  };

  const handleBack = () => {
    router.push(`/auth/signup/brand/2?${searchParams.toString()}`);
  };

  const toggleCollabType = (type: string) => {
    if (formData.collabTypes.includes(type)) {
      setFormData({ ...formData, collabTypes: formData.collabTypes.filter((t) => t !== type) });
    } else {
      setFormData({ ...formData, collabTypes: [...formData.collabTypes, type] });
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8">
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--sk-text-primary)',
            marginBottom: '8px',
          }}
        >
          Industry & collaborations
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--sk-text-secondary)' }}>
          Help creators understand your brand
        </p>
      </div>

      {/* Primary Industry */}
      <div className="mb-8">
        <label
          style={{
            display: 'block',
            marginBottom: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Primary industry *
        </label>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => setFormData({ ...formData, primaryIndustry: industry })}
              className="transition-all duration-200"
              style={{
                padding: '8px 16px',
                backgroundColor:
                  formData.primaryIndustry === industry ? 'var(--sk-brand)' : 'var(--sk-surface-2)',
                color: formData.primaryIndustry === industry ? 'var(--sk-brand-text)' : 'var(--sk-text-secondary)',
                border:
                  formData.primaryIndustry === industry ? '1px solid var(--sk-brand)' : '0.5px solid var(--sk-border)',
                borderRadius: 'var(--sk-radius-full)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {industry}
            </button>
          ))}
        </div>
        {errors.primaryIndustry && (
          <div style={{ marginTop: '8px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--sk-error)' }}>
            {errors.primaryIndustry}
          </div>
        )}
      </div>

      {/* Collab Types */}
      <div className="mb-6">
        <label
          style={{
            display: 'block',
            marginBottom: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Collaboration types *
        </label>
        <div className="flex flex-wrap gap-2">
          {COLLAB_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleCollabType(type)}
              className="transition-all duration-200"
              style={{
                padding: '8px 16px',
                backgroundColor: formData.collabTypes.includes(type) ? 'var(--sk-brand)' : 'var(--sk-surface-2)',
                color: formData.collabTypes.includes(type) ? 'var(--sk-brand-text)' : 'var(--sk-text-secondary)',
                border: formData.collabTypes.includes(type) ? '1px solid var(--sk-brand)' : '0.5px solid var(--sk-border)',
                borderRadius: 'var(--sk-radius-full)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {type}
            </button>
          ))}
        </div>
        {errors.collabTypes && (
          <div style={{ marginTop: '8px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--sk-error)' }}>
            {errors.collabTypes}
          </div>
        )}
      </div>

      {/* Notice */}
      <div
        className="mb-8"
        style={{
          padding: '12px 16px',
          backgroundColor: 'var(--sk-surface-3)',
          border: '0.5px solid var(--sk-border)',
          borderRadius: 'var(--sk-radius-md)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: 'var(--sk-text-secondary)',
        }}
      >
        💡 Creators filter campaigns by collab type
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <Button variant="secondary" size="lg" fullWidth onClick={handleBack}>
          Back
        </Button>
        <Button variant="primary" size="lg" fullWidth onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
