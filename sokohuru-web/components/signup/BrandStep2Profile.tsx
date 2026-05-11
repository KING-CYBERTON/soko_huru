'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

interface Step2Data {
  companyName: string;
  accountSlug: string;
  website: string;
  bio: string;
  city: string;
  country: string;
  logoUrl: string;
  coverPhotoUrl: string;
}

interface Step2Props {
  initialData?: Partial<Step2Data>;
  searchParams: URLSearchParams;
}

const AFRICAN_COUNTRIES = [
  'Kenya',
  'Uganda',
  'Tanzania',
  'Rwanda',
  'Ethiopia',
  'Nigeria',
  'South Africa',
  'Ghana',
  'Egypt',
  'Morocco',
  'Other',
];

export function BrandStep2Profile({ initialData, searchParams }: Step2Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Step2Data>({
    companyName: initialData?.companyName || '',
    accountSlug: initialData?.accountSlug || '',
    website: initialData?.website || '',
    bio: initialData?.bio || '',
    city: initialData?.city || '',
    country: initialData?.country || '',
    logoUrl: initialData?.logoUrl || '',
    coverPhotoUrl: initialData?.coverPhotoUrl || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Step2Data, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Step2Data, string>> = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.accountSlug.trim()) newErrors.accountSlug = 'Account slug is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (formData.bio.length > 400) newErrors.bio = 'Bio must be 400 characters or less';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    const params = new URLSearchParams(searchParams);
    params.set('companyName', formData.companyName);
    params.set('accountSlug', formData.accountSlug);
    params.set('website', formData.website);
    params.set('bio', formData.bio);
    params.set('city', formData.city);
    params.set('country', formData.country);
    params.set('logoUrl', formData.logoUrl);
    params.set('coverPhotoUrl', formData.coverPhotoUrl);

    router.push(`/auth/signup/brand/3?${params.toString()}`);
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    router.push(`/auth/signup/brand/1?${params.toString()}`);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8">
        <h2
          className="mb-2"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--sk-text-primary)',
          }}
        >
          Brand profile
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--sk-text-secondary)',
          }}
        >
          Tell us about your brand
        </p>
      </div>

      {/* Company Name */}
      <div className="mb-6">
        <label
          htmlFor="companyName"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Company name *
        </label>
        <input
          type="text"
          id="companyName"
          value={formData.companyName}
          onChange={(e) => {
            const name = e.target.value;
            setFormData({ ...formData, companyName: name, accountSlug: generateSlug(name) });
          }}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            backgroundColor: 'var(--sk-surface-2)',
            border: '0.5px solid var(--sk-border)',
            borderRadius: 'var(--sk-radius-md)',
            color: 'var(--sk-text-primary)',
            outline: 'none',
          }}
        />
        {errors.companyName && (
          <div
            style={{
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.companyName}
          </div>
        )}
      </div>

      {/* Account Slug */}
      <div className="mb-6">
        <label
          htmlFor="accountSlug"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Account slug *
        </label>
        <input
          type="text"
          id="accountSlug"
          value={formData.accountSlug}
          onChange={(e) => setFormData({ ...formData, accountSlug: e.target.value })}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            backgroundColor: 'var(--sk-surface-2)',
            border: '0.5px solid var(--sk-border)',
            borderRadius: 'var(--sk-radius-md)',
            color: 'var(--sk-text-primary)',
            outline: 'none',
          }}
        />
        {errors.accountSlug && (
          <div
            style={{
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.accountSlug}
          </div>
        )}
      </div>

      {/* Website */}
      <div className="mb-6">
        <label
          htmlFor="website"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Website (optional)
        </label>
        <input
          type="url"
          id="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            backgroundColor: 'var(--sk-surface-2)',
            border: '0.5px solid var(--sk-border)',
            borderRadius: 'var(--sk-radius-md)',
            color: 'var(--sk-text-primary)',
            outline: 'none',
          }}
        />
      </div>

      {/* City */}
      <div className="mb-6">
        <label
          htmlFor="city"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          City *
        </label>
        <input
          type="text"
          id="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            backgroundColor: 'var(--sk-surface-2)',
            border: '0.5px solid var(--sk-border)',
            borderRadius: 'var(--sk-radius-md)',
            color: 'var(--sk-text-primary)',
            outline: 'none',
          }}
        />
        {errors.city && (
          <div
            style={{
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.city}
          </div>
        )}
      </div>

      {/* Country */}
      <div className="mb-6">
        <label
          htmlFor="country"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Country *
        </label>
        <select
          id="country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            backgroundColor: 'var(--sk-surface-2)',
            border: '0.5px solid var(--sk-border)',
            borderRadius: 'var(--sk-radius-md)',
            color: 'var(--sk-text-primary)',
            outline: 'none',
          }}
        >
          <option value="">Select country</option>
          {AFRICAN_COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <div
            style={{
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.country}
          </div>
        )}
      </div>

      {/* Bio */}
      <div className="mb-8">
        <label
          htmlFor="bio"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Bio *
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          maxLength={400}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            backgroundColor: 'var(--sk-surface-2)',
            border: '0.5px solid var(--sk-border)',
            borderRadius: 'var(--sk-radius-md)',
            color: 'var(--sk-text-primary)',
            outline: 'none',
            resize: 'vertical',
          }}
        />
        <div
          style={{
            marginTop: '4px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'var(--sk-text-muted)',
            textAlign: 'right',
          }}
        >
          {formData.bio.length}/400
        </div>
        {errors.bio && (
          <div
            style={{
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.bio}
          </div>
        )}
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
