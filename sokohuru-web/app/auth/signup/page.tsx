'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signUpCreator, signUpBrand } from '@/lib/auth/actions';

type Tab = 'creator' | 'brand';

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState<Tab>('creator');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = activeTab === 'creator'
        ? await signUpCreator(formData)
        : await signUpBrand(formData);

      if (result?.error) {
        setError(result.error);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--sk-surface-1, #111018)' }}>
      <div className="w-full max-w-md p-8 rounded-lg" style={{ background: 'var(--sk-surface-2, #1A1826)', border: '0.5px solid var(--sk-border, #2E2B40)' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2" style={{ color: 'var(--sk-text-primary, #F0EEF8)' }}>
            Join Sokohuru
          </h1>
          <p style={{ color: 'var(--sk-text-secondary, #8E8AA8)', fontSize: '14px' }}>
            Create your account to get started
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('creator')}
            className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
            style={{
              background: activeTab === 'creator' ? 'var(--sk-pink-dark, #3A0E22)' : 'transparent',
              color: activeTab === 'creator' ? 'var(--sk-pink-light, #E8509A)' : 'var(--sk-text-muted, #6B6880)',
              border: activeTab === 'creator' ? '0.5px solid var(--sk-pink, #C8185A)' : '0.5px solid var(--sk-border, #2E2B40)',
            }}
          >
            Join as Creator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
            style={{
              background: activeTab === 'brand' ? 'var(--sk-pink-dark, #3A0E22)' : 'transparent',
              color: activeTab === 'brand' ? 'var(--sk-pink-light, #E8509A)' : 'var(--sk-text-muted, #6B6880)',
              border: activeTab === 'brand' ? '0.5px solid var(--sk-pink, #C8185A)' : '0.5px solid var(--sk-border, #2E2B40)',
            }}
          >
            Join as Brand
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-md" style={{ background: 'var(--sk-error-surface, #2A0A0A)', border: '0.5px solid var(--sk-error, #A32D2D)' }}>
            <p style={{ color: 'var(--sk-error-text, #F09595)', fontSize: '13px' }}>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Creator fields */}
            {activeTab === 'creator' && (
              <>
                <div>
                  <label htmlFor="firstName" className="block mb-1" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--sk-text-secondary, #8E8AA8)' }}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-md outline-none"
                    style={{
                      background: 'var(--sk-surface-1, #111018)',
                      border: '0.5px solid var(--sk-border, #2E2B40)',
                      color: 'var(--sk-text-primary, #F0EEF8)',
                      fontSize: '13px',
                    }}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-1" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--sk-text-secondary, #8E8AA8)' }}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-md outline-none"
                    style={{
                      background: 'var(--sk-surface-1, #111018)',
                      border: '0.5px solid var(--sk-border, #2E2B40)',
                      color: 'var(--sk-text-primary, #F0EEF8)',
                      fontSize: '13px',
                    }}
                    placeholder="Doe"
                  />
                </div>
              </>
            )}

            {/* Brand fields */}
            {activeTab === 'brand' && (
              <div>
                <label htmlFor="companyName" className="block mb-1" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--sk-text-secondary, #8E8AA8)' }}>
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-md outline-none"
                  style={{
                    background: 'var(--sk-surface-1, #111018)',
                    border: '0.5px solid var(--sk-border, #2E2B40)',
                    color: 'var(--sk-text-primary, #F0EEF8)',
                    fontSize: '13px',
                  }}
                  placeholder="Acme Inc."
                />
              </div>
            )}

            {/* Email (common for both) */}
            <div>
              <label htmlFor="email" className="block mb-1" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--sk-text-secondary, #8E8AA8)' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-md outline-none"
                style={{
                  background: 'var(--sk-surface-1, #111018)',
                  border: '0.5px solid var(--sk-border, #2E2B40)',
                  color: 'var(--sk-text-primary, #F0EEF8)',
                  fontSize: '13px',
                }}
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--sk-text-secondary, #8E8AA8)' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-md outline-none"
                style={{
                  background: 'var(--sk-surface-1, #111018)',
                  border: '0.5px solid var(--sk-border, #2E2B40)',
                  color: 'var(--sk-text-primary, #F0EEF8)',
                  fontSize: '13px',
                }}
                placeholder="At least 8 characters"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-md font-medium transition-opacity"
              style={{
                background: 'var(--sk-pink, #C8185A)',
                color: '#FFFFFF',
                fontSize: '14px',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p style={{ fontSize: '13px', color: 'var(--sk-text-muted, #6B6880)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: 'var(--sk-pink, #C8185A)', fontWeight: 500 }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
