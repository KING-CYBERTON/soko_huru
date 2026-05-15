'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { label: 'For Creators', href: '/for-creators' },
  { label: 'For Brands', href: '/for-brands' },
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Pricing', href: '#pricing' }, // TODO: implement /pricing page in Sprint 3
];

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50"
        style={{
          background: 'var(--sk-surface-1)',
          borderBottom: '0.5px solid var(--sk-border)',
        }}
      >
        <div
          className="flex items-center justify-between h-[72px] px-20 max-md:h-[60px] max-md:px-5"
          style={{
            fontFamily: 'var(--sk-font-body)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[10px]">
            <div
              className="flex items-center justify-center"
              style={{
                width: '28px',
                height: '28px',
                background: 'var(--sk-pink)',
                borderRadius: 'var(--sk-radius-sm)',
                fontFamily: 'var(--sk-font-body)',
                fontWeight: 700,
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              S
            </div>
            <div className="flex items-center">
              <span
                style={{
                  fontFamily: 'var(--sk-font-body)',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: 'var(--sk-text-primary)',
                }}
              >
                soko
              </span>
              <span
                style={{
                  fontFamily: 'var(--sk-font-body)',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: 'var(--sk-pink)',
                }}
              >
                huru
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-150 hover:[color:var(--sk-text-primary)]"
                style={{
                  fontFamily: 'var(--sk-font-body)',
                  fontSize: '14px',
                  color: 'var(--sk-text-secondary)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/auth/login"
              className="transition-colors duration-150 hover:[color:var(--sk-text-primary)]"
              style={{
                fontFamily: 'var(--sk-font-body)',
                fontSize: '14px',
                color: 'var(--sk-text-secondary)',
              }}
            >
              Log in
            </Link>
            <Link href="/auth/signup">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-between"
            style={{
              width: '20px',
              height: '16px',
            }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span
              className="w-full h-[2px]"
              style={{ background: 'var(--sk-text-secondary)' }}
            />
            <span
              className="w-full h-[2px]"
              style={{ background: 'var(--sk-text-secondary)' }}
            />
            <span
              className="w-full h-[2px]"
              style={{ background: 'var(--sk-text-secondary)' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div
            className={cn(
              'fixed right-0 top-0 h-full w-[280px] z-50 md:hidden',
              'flex flex-col gap-8 p-6',
              'animate-in slide-in-from-right duration-300'
            )}
            style={{
              background: 'var(--sk-surface-1)',
              borderLeft: '0.5px solid var(--sk-border)',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              className="self-end"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="var(--sk-text-secondary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Nav Links */}
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontSize: '16px',
                    color: 'var(--sk-text-primary)',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex flex-col gap-4 mt-auto">
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center"
                style={{
                  fontFamily: 'var(--sk-font-body)',
                  fontSize: '14px',
                  color: 'var(--sk-text-secondary)',
                }}
              >
                Log in
              </Link>
              <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" fullWidth>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
