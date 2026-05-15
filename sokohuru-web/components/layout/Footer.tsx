'use client';

import Link from 'next/link';
import { Smartphone } from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: 'Products',
    links: [
      { label: 'Campaigns', href: '/campaigns' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For Creators', href: '/for-creators' },
      { label: 'For Brands', href: '/for-brands' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--sk-surface-1)',
        borderTop: '0.5px solid var(--sk-border)',
      }}
    >
      {/* Main footer content */}
      <div className="px-20 pt-12 pb-8 max-md:px-5 max-md:pt-8 max-md:pb-6">
        {/* Top section */}
        <div className="flex flex-row justify-between gap-16 max-md:flex-col max-md:gap-8">
          {/* Left - Logo + tagline + social */}
          <div className="flex flex-col gap-4 max-w-[280px]">
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

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                lineHeight: 1.5,
                color: 'var(--sk-text-muted)',
              }}
            >
              The creator marketplace for East Africa
            </p>

            {/* Social icons - placeholder divs */}
            <div className="flex items-center gap-3 mt-2">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <div
                  key={social}
                  className="flex items-center justify-center"
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'var(--sk-surface-2)',
                    borderRadius: 'var(--sk-radius-sm)',
                    border: '0.5px solid var(--sk-border)',
                  }}
                  title={social}
                />
              ))}
            </div>

            {/* App Store buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded transition-opacity hover:opacity-80"
                style={{
                  background: 'var(--sk-surface-2)',
                  border: '0.5px solid var(--sk-border)',
                }}
              >
                <Smartphone size={16} style={{ color: 'var(--sk-text-secondary)' }} />
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--sk-text-secondary)',
                    fontFamily: 'var(--sk-font-body)',
                  }}
                >
                  App Store
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 rounded transition-opacity hover:opacity-80"
                style={{
                  background: 'var(--sk-surface-2)',
                  border: '0.5px solid var(--sk-border)',
                }}
              >
                <Smartphone size={16} style={{ color: 'var(--sk-text-secondary)' }} />
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--sk-text-secondary)',
                    fontFamily: 'var(--sk-font-body)',
                  }}
                >
                  Google Play
                </span>
              </a>
            </div>
          </div>

          {/* Right - Footer links grid */}
          <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2 max-md:gap-6">
            {FOOTER_LINKS.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <h3
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: 'var(--sk-text-primary)',
                  }}
                >
                  {column.title}
                </h3>
                <ul className="flex flex-col">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition-colors duration-150 hover:[color:var(--sk-text-secondary)]"
                        style={{
                          fontFamily: 'var(--sk-font-body)',
                          fontSize: '12px',
                          lineHeight: 2,
                          color: 'var(--sk-text-muted)',
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div
          className="flex flex-row justify-between items-center mt-8 pt-6 max-md:flex-col max-md:items-start max-md:gap-3"
          style={{
            borderTop: '0.5px solid var(--sk-border)',
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-text-muted)',
            }}
          >
            © {currentYear} Sokohuru. All rights reserved.
          </p>

          {/* Legal links */}
          <div
            className="flex items-center gap-3"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'var(--sk-text-muted)',
            }}
          >
            <Link
              href="/privacy"
              className="transition-colors duration-150 hover:[color:var(--sk-text-secondary)]"
              style={{ color: 'var(--sk-text-muted)' }}
            >
              Privacy
            </Link>
            <span>·</span>
            <Link
              href="/terms"
              className="transition-colors duration-150 hover:[color:var(--sk-text-secondary)]"
              style={{ color: 'var(--sk-text-muted)' }}
            >
              Terms
            </Link>
            <span>·</span>
            <Link
              href="/status"
              className="transition-colors duration-150 hover:[color:var(--sk-text-secondary)]"
              style={{ color: 'var(--sk-text-muted)' }}
            >
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
