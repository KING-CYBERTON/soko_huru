import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Sokohuru team.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="max-w-[600px] text-center">
        <h1
          style={{
            fontFamily: 'var(--sk-font-display)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 600,
            color: 'var(--sk-text-primary)',
            marginBottom: '16px',
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'var(--sk-text-secondary)',
            lineHeight: 1.6,
            fontFamily: 'var(--sk-font-body)',
            marginBottom: '24px',
          }}
        >
          Contact form coming soon. For now, reach us at:
        </p>
        <a
          href="mailto:hello@sokohuru.com"
          style={{
            fontSize: '20px',
            color: 'var(--sk-pink)',
            fontWeight: 600,
            fontFamily: 'var(--sk-font-body)',
            display: 'block',
            marginBottom: '32px',
          }}
        >
          hello@sokohuru.com
        </a>
        <Link
          href="/"
          style={{
            fontSize: '16px',
            color: 'var(--sk-pink)',
            fontWeight: 500,
            fontFamily: 'var(--sk-font-body)',
          }}
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  );
}
