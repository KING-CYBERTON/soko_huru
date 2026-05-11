'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

interface Step2Data {
  day: string;
  month: string;
  year: string;
  city: string;
  country: string;
  languages: string[];
  bio: string;
}

interface Step2Props {
  initialData?: Partial<Step2Data>;
  searchParams: URLSearchParams;
}

const LANGUAGES = [
  'English',
  'Swahili',
  'French',
  'Arabic',
  'Amharic',
  'Hausa',
  'Yoruba',
  'Igbo',
  'Zulu',
  'Afrikaans',
  'Portuguese',
  'Somali',
];

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
  'Senegal',
  'Ivory Coast',
  'Cameroon',
  'Other',
];

export function Step2PersonalInfo({ initialData, searchParams }: Step2Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Step2Data>({
    day: initialData?.day || '',
    month: initialData?.month || '',
    year: initialData?.year || '',
    city: initialData?.city || '',
    country: initialData?.country || '',
    languages: initialData?.languages || [],
    bio: initialData?.bio || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Step2Data | 'dob', string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Step2Data | 'dob', string>> = {};

    if (!formData.day || !formData.month || !formData.year) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const day = parseInt(formData.day);
      const month = parseInt(formData.month);
      const year = parseInt(formData.year);

      if (day < 1 || day > 31) newErrors.dob = 'Invalid day';
      if (month < 1 || month > 12) newErrors.dob = 'Invalid month';
      if (year < 1900 || year > new Date().getFullYear() - 13) {
        newErrors.dob = 'You must be at least 13 years old';
      }
    }

    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (formData.languages.length === 0) newErrors.languages = 'Select at least one language';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (formData.bio.length > 300) newErrors.bio = 'Bio must be 300 characters or less';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    // Merge with previous step data
    const params = new URLSearchParams(searchParams);
    params.set('day', formData.day);
    params.set('month', formData.month);
    params.set('year', formData.year);
    params.set('city', formData.city);
    params.set('country', formData.country);
    params.set('languages', formData.languages.join(','));
    params.set('bio', formData.bio);

    router.push(`/auth/signup/creator/3?${params.toString()}`);
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    router.push(`/auth/signup/creator/1?${params.toString()}`);
  };

  const toggleLanguage = (language: string) => {
    if (formData.languages.includes(language)) {
      setFormData({
        ...formData,
        languages: formData.languages.filter((l) => l !== language),
      });
    } else {
      setFormData({
        ...formData,
        languages: [...formData.languages, language],
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
          Tell us about yourself
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--sk-text-secondary)',
          }}
        >
          This helps brands discover you
        </p>
      </div>

      {/* Date of Birth */}
      <div className="mb-6">
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Date of birth *
        </label>
        <div className="grid grid-cols-3 gap-3">
          <select
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
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
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={formData.month}
            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
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
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
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
            <option value="">Year</option>
            {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 13 - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        {errors.dob && (
          <div
            style={{
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.dob}
          </div>
        )}
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

      {/* Languages */}
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
          Languages *
        </label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => toggleLanguage(language)}
              className="transition-all duration-200"
              style={{
                padding: '8px 16px',
                backgroundColor: formData.languages.includes(language)
                  ? 'var(--sk-creator)'
                  : 'var(--sk-surface-2)',
                color: formData.languages.includes(language)
                  ? 'var(--sk-creator-text)'
                  : 'var(--sk-text-secondary)',
                border: formData.languages.includes(language)
                  ? '1px solid var(--sk-creator)'
                  : '0.5px solid var(--sk-border)',
                borderRadius: 'var(--sk-radius-full)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {language}
            </button>
          ))}
        </div>
        {errors.languages && (
          <div
            style={{
              marginTop: '8px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.languages}
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
          maxLength={300}
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
          {formData.bio.length}/300
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
