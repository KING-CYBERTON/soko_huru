import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tips, and updates from the Sokohuru team.',
};

export default function BlogPage() {
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
          Sokohuru Blog
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
          Insights on creator marketing in East Africa coming soon.
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
