'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { trackEvent, EVENTS } from '@/lib/analytics';

interface Step1Data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface Step1Props {
  initialData?: Partial<Step1Data>;
}

const ROLE_OPTIONS = [
  { value: 'founder', label: 'Founder', description: 'Building my own brand or business' },
  { value: 'creator', label: 'Creator', description: 'Content creator or influencer' },
  { value: 'talent_manager', label: 'Talent Manager', description: 'Managing other creators' },
  { value: 'other', label: 'Other', description: 'Something else' },
];

export function Step1AccountDetails({ initialData }: Step1Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Step1Data>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    password: initialData?.password || '',
    confirmPassword: initialData?.confirmPassword || '',
    role: initialData?.role || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Step1Data, string>>>({});

  // Track signup started
  useEffect(() => {
    trackEvent(EVENTS.CREATOR_SIGNUP_STARTED);
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Step1Data, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
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
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
      // Store password in session storage temporarily
    });

    // Store password temporarily in session storage (more secure than URL)
    sessionStorage.setItem('creator_signup_password', formData.password);

    router.push(`/auth/signup/creator/2?${params.toString()}`);
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
          Create your account
        </h2>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--sk-text-secondary)',
          }}
        >
          Let&apos;s start with the basics
        </p>
      </div>

      {/* Name Fields */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--sk-text-primary)',
            }}
          >
            First name *
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
          {errors.firstName && (
            <div
              style={{
                marginTop: '4px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: 'var(--sk-error)',
              }}
            >
              {errors.firstName}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--sk-text-primary)',
            }}
          >
            Last name *
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
          {errors.lastName && (
            <div
              style={{
                marginTop: '4px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: 'var(--sk-error)',
              }}
            >
              {errors.lastName}
            </div>
          )}
        </div>
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
          Email *
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
                  formData.role === option.value
                    ? 'var(--sk-creator)'
                    : 'var(--sk-surface-2)',
                border:
                  formData.role === option.value
                    ? '1.5px solid var(--sk-creator)'
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
                      ? 'var(--sk-creator-text)'
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
                      ? 'var(--sk-creator-text)'
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
