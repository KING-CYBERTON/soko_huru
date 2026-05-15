import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Sokohuru, the creator marketplace for East Africa.',
};

export default function AboutPage() {
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
          About Sokohuru
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'var(--sk-text-secondary)',
            lineHeight: 1.6,
            fontFamily: 'var(--sk-font-body)',
            marginBottom: '32px',
          }}
        >
          This page is coming soon. We&apos;re building the premier creator marketplace for East Africa.
        </p>
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
