'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { trackEvent, EVENTS } from '@/lib/analytics';

interface Step1Data {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface Step1Props {
  initialData?: Partial<Step1Data>;
}

const ROLE_OPTIONS = [
  { value: 'founder', label: 'Founder', description: 'I own or co-founded the brand' },
  {
    value: 'marketing_manager',
    label: 'Marketing Manager',
    description: 'Managing marketing and campaigns',
  },
  {
    value: 'partnerships_lead',
    label: 'Partnerships Lead',
    description: 'Leading partnerships and collaborations',
  },
  {
    value: 'agency',
    label: 'Agency',
    description: 'Representing a brand as an agency',
  },
];

export function BrandStep1AccountDetails({ initialData }: Step1Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Step1Data>({
    email: initialData?.email || '',
    password: initialData?.password || '',
    confirmPassword: initialData?.confirmPassword || '',
    role: initialData?.role || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Step1Data, string>>>({});

  // Track signup started
  useEffect(() => {
    trackEvent(EVENTS.BRAND_SIGNUP_STARTED);
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Step1Data, string>> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    // Encode data in URL params (excluding password for security)
    const params = new URLSearchParams({
      email: formData.email,
      role: formData.role,
    });

    // Store password temporarily in session storage (more secure than URL)
    sessionStorage.setItem('brand_signup_password', formData.password);

    router.push(`/auth/signup/brand/2?${params.toString()}`);
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
          Create your brand account
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--sk-text-secondary)',
          }}
        >
          Let&apos;s get started with your work email
        </p>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label
          htmlFor="email"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Work email *
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
        {errors.email && (
          <div
            style={{
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.email}
          </div>
        )}
      </div>

      {/* Notice */}
      <div
        className="mb-6"
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
        💡 Use your work email for verified brand identity
      </div>

      {/* Password */}
      <div className="mb-6">
        <label
          htmlFor="password"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Password *
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
        {errors.password && (
          <div
            style={{
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.password}
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--sk-text-primary)',
          }}
        >
          Confirm password *
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
        {errors.confirmPassword && (
          <div
            style={{
              marginTop: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.confirmPassword}
          </div>
        )}
      </div>

      {/* Role Selector */}
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
          I am a... *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {ROLE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, role: option.value })}
              className="text-left transition-all duration-200"
              style={{
                padding: '16px',
                backgroundColor:
                  formData.role === option.value ? 'var(--sk-brand)' : 'var(--sk-surface-2)',
                border:
                  formData.role === option.value
                    ? '1.5px solid var(--sk-brand)'
                    : '0.5px solid var(--sk-border)',
                borderRadius: 'var(--sk-radius-md)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color:
                    formData.role === option.value
                      ? 'var(--sk-brand-text)'
                      : 'var(--sk-text-primary)',
                  marginBottom: '4px',
                }}
              >
                {option.label}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color:
                    formData.role === option.value
                      ? 'var(--sk-brand-text)'
                      : 'var(--sk-text-muted)',
                }}
              >
                {option.description}
              </div>
            </button>
          ))}
        </div>
        {errors.role && (
          <div
            style={{
              marginTop: '8px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-error)',
            }}
          >
            {errors.role}
          </div>
        )}
      </div>

      {/* Continue Button */}
      <Button variant="primary" size="lg" fullWidth onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
}
