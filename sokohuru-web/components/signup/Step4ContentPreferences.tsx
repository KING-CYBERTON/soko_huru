'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

interface Step4Data {
  contentFormats: string[];
  collabTypes: string[];
}

interface Step4Props {
  initialData?: Partial<Step4Data>;
  searchParams: URLSearchParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (allData: any) => Promise<void>;
}

const CONTENT_FORMATS = [
  'Get ready with me',
  'Tutorial / how-to',
  'Product review',
  'Storytime',
  'Challenges / trends',
  'Day in the life',
  'Hauls',
  'Behind the scenes',
  'Sketch comedy',
  'Dance',
  'Q&A',
  'Live streams',
];

const COLLAB_TYPES = [
  'UGC',
  'Affiliate',
  'Ambassador',
  'Gifting',
  'Commission',
  'Pay per view',
];

export function Step4ContentPreferences({ initialData, searchParams, onSubmit }: Step4Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Step4Data>({
    contentFormats: initialData?.contentFormats || [],
    collabTypes: initialData?.collabTypes || [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Step4Data, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Step4Data, string>> = {};

    if (formData.contentFormats.length === 0) {
      newErrors.contentFormats = 'Select at least one content format';
    }

    if (formData.collabTypes.length === 0) {
      newErrors.collabTypes = 'Select at least one collaboration type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinish = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Collect all data from URL params + current form
      const allData = {
        // Step 1
        firstName: searchParams.get('firstName') || '',
        lastName: searchParams.get('lastName') || '',
        email: searchParams.get('email') || '',
        role: searchParams.get('role') || '',
        password: sessionStorage.getItem('creator_signup_password') || '',

        // Step 2
        dateOfBirth: `${searchParams.get('year')}-${searchParams.get('month')?.padStart(2, '0')}-${searchParams.get('day')?.padStart(2, '0')}`,
        city: searchParams.get('city') || '',
        country: searchParams.get('country') || '',
        languages: searchParams.get('languages')?.split(',') || [],
        bio: searchParams.get('bio') || '',

        // Step 3
        socialAccounts: searchParams
          .get('socialAccounts')
          ?.split(',')
          .map((acc) => {
            const [platform, username] = acc.split(':');
            return { platform, username };
          }) || [],

        // Step 4
        contentFormats: formData.contentFormats,
        collabTypes: formData.collabTypes,
      };

      await onSubmit(allData);

      // Clear password from session storage
      sessionStorage.removeItem('creator_signup_password');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Signup failed:', error);
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    router.push(`/auth/signup/creator/3?${params.toString()}`);
  };

  const toggleContentFormat = (format: string) => {
    if (formData.contentFormats.includes(format)) {
      setFormData({
        ...formData,
        contentFormats: formData.contentFormats.filter((f) => f !== format),
      });
    } else {
      setFormData({
        ...formData,
        contentFormats: [...formData.contentFormats, format],
      });
    }
  };

  const toggleCollabType = (type: string) => {
    if (formData.collabTypes.includes(type)) {
      setFormData({
        ...formData,
        collabTypes: formData.collabTypes.filter((t) => t !== type),
      });
    } else {
      setFormData({
        ...formData,
        collabTypes: [...formData.collabTypes, type],
      });
    }
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
          Content preferences
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--sk-text-secondary)',
          }}
        >
          Help brands find the right match
        </p>
      </div>

      {/* Content Formats */}
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
          What kind of content do you make? *
        </label>
        <div className="flex flex-wrap gap-2">
          {CONTENT_FORMATS.map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => toggleContentFormat(format)}
              className="transition-all duration-200"
              style={{
                padding: '8px 16px',
                backgroundColor: formData.contentFormats.includes(format)
                  ? 'var(--sk-creator)'
                  : 'var(--sk-surface-2)',
                color: formData.contentFormats.includes(format)
                  ? 'var(--sk-creator-text)'
                  : 'var(--sk-text-secondary)',
                border: formData.contentFormats.includes(format)
                  ? '1px solid var(--sk-creator)'
                  : '0.5px solid var(--sk-border)',
                borderRadius: 'var(--sk-radius-full)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {format}
            </button>
          ))}
        </div>
        {errors.contentFormats && (
          <div
            style={{
              marginTop: '8px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.contentFormats}
          </div>
        )}
      </div>

      {/* Collab Types */}
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
          What types of collaborations are you interested in? *
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
                backgroundColor: formData.collabTypes.includes(type)
                  ? 'var(--sk-creator)'
                  : 'var(--sk-surface-2)',
                color: formData.collabTypes.includes(type)
                  ? 'var(--sk-creator-text)'
                  : 'var(--sk-text-secondary)',
                border: formData.collabTypes.includes(type)
                  ? '1px solid var(--sk-creator)'
                  : '0.5px solid var(--sk-border)',
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
          <div
            style={{
              marginTop: '8px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.collabTypes}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <Button variant="secondary" size="lg" fullWidth onClick={handleBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button variant="primary" size="lg" fullWidth onClick={handleFinish} loading={isSubmitting}>
          Finish setup
        </Button>
      </div>
    </div>
  );
}
