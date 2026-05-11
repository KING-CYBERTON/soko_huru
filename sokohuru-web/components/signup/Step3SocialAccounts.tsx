'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

interface SocialAccount {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'facebook';
  username: string;
  enabled: boolean;
}

interface Step3Data {
  socialAccounts: SocialAccount[];
}

interface Step3Props {
  initialData?: Partial<Step3Data>;
  searchParams: URLSearchParams;
}

const PLATFORMS = [
  { id: 'instagram' as const, name: 'Instagram', color: '#E4405F', icon: '@' },
  { id: 'tiktok' as const, name: 'TikTok', color: '#000000', icon: '@' },
  { id: 'youtube' as const, name: 'YouTube', color: '#FF0000', icon: '@' },
  { id: 'facebook' as const, name: 'Facebook', color: '#1877F2', icon: '@' },
];

export function Step3SocialAccounts({ initialData, searchParams }: Step3Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Step3Data>({
    socialAccounts:
      initialData?.socialAccounts ||
      PLATFORMS.map((p) => ({ platform: p.id, username: '', enabled: false })),
  });

  const [errors, setErrors] = useState<string>('');

  const validate = (): boolean => {
    const enabledAccounts = formData.socialAccounts.filter((acc) => acc.enabled);

    if (enabledAccounts.length === 0) {
      setErrors('Please connect at least one social account');
      return false;
    }

    const invalidAccounts = enabledAccounts.filter((acc) => !acc.username.trim());
    if (invalidAccounts.length > 0) {
      setErrors('Please enter a username for all enabled platforms');
      return false;
    }

    setErrors('');
    return true;
  };

  const handleContinue = () => {
    if (!validate()) return;

    // Merge with previous step data
    const params = new URLSearchParams(searchParams);

    // Encode social accounts
    const socialAccountsData = formData.socialAccounts
      .filter((acc) => acc.enabled)
      .map((acc) => `${acc.platform}:${acc.username}`)
      .join(',');

    params.set('socialAccounts', socialAccountsData);

    router.push(`/auth/signup/creator/4?${params.toString()}`);
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    router.push(`/auth/signup/creator/2?${params.toString()}`);
  };

  const updateAccount = (platform: string, updates: Partial<SocialAccount>) => {
    setFormData({
      ...formData,
      socialAccounts: formData.socialAccounts.map((acc) =>
        acc.platform === platform ? { ...acc, ...updates } : acc
      ),
    });
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
          Connect your socials
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--sk-text-secondary)',
          }}
        >
          Your stats will be shared with brands when you apply
        </p>
      </div>

      {/* Platform Rows */}
      <div className="mb-6 space-y-4">
        {PLATFORMS.map((platform) => {
          const account = formData.socialAccounts.find((acc) => acc.platform === platform.id);
          if (!account) return null;

          return (
            <div
              key={platform.id}
              className="flex items-center gap-4"
              style={{
                padding: '16px',
                backgroundColor: 'var(--sk-surface-2)',
                border: '0.5px solid var(--sk-border)',
                borderRadius: 'var(--sk-radius-md)',
              }}
            >
              {/* Platform Icon */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: platform.color,
                  borderRadius: 'var(--sk-radius-md)',
                  color: 'white',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {platform.icon}
              </div>

              {/* Platform Name and Input */}
              <div className="flex-1">
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--sk-text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  {platform.name}
                </div>
                <input
                  type="text"
                  placeholder="@username"
                  value={account.username}
                  onChange={(e) =>
                    updateAccount(platform.id, { username: e.target.value })
                  }
                  disabled={!account.enabled}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    backgroundColor: account.enabled
                      ? 'var(--sk-surface-1)'
                      : 'var(--sk-surface-3)',
                    border: '0.5px solid var(--sk-border)',
                    borderRadius: 'var(--sk-radius-sm)',
                    color: 'var(--sk-text-primary)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Checkbox */}
              <input
                type="checkbox"
                checked={account.enabled}
                onChange={(e) => updateAccount(platform.id, { enabled: e.target.checked })}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: 'var(--sk-creator)',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {errors && (
        <div
          className="mb-6"
          style={{
            padding: '12px 16px',
            backgroundColor: 'var(--sk-error-surface)',
            border: '0.5px solid var(--sk-error)',
            borderRadius: 'var(--sk-radius-md)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: 'var(--sk-error)',
          }}
        >
          {errors}
        </div>
      )}

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
          lineHeight: '1.5',
        }}
      >
        💡 Your stats will be shared with brands when you apply to campaigns
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
