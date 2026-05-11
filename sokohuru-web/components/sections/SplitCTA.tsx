import Link from 'next/link';
import { Button } from '@/components/ui';

export function SplitCTA() {
  return (
    <section className="grid grid-cols-2 max-md:grid-cols-1">
      {/* Left panel - For Creators */}
      <div
        className="py-20 px-16 max-md:px-5 max-md:py-16"
        style={{
          background: 'var(--sk-pink-dark)',
        }}
      >
        <div className="max-w-[480px]">
          <span
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '.1em',
              color: 'var(--sk-pink-light)',
              textTransform: 'uppercase',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            FOR CREATORS
          </span>
          <h2
            className="mt-4"
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 600,
              color: 'var(--sk-text-primary)',
              lineHeight: 1.2,
            }}
          >
            Get discovered. Get paid.
          </h2>
          <p
            className="mt-4"
            style={{
              fontSize: '16px',
              color: 'var(--sk-text-secondary)',
              lineHeight: 1.6,
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            Join thousands of creators earning from brand partnerships. Connect with brands that match your audience, negotiate fair deals, and get paid on time.
          </p>
          <Link href="/auth/signup?role=creator" className="inline-block mt-8">
            <Button variant="primary" size="lg">
              Join as Creator →
            </Button>
          </Link>
        </div>
      </div>

      {/* Right panel - For Brands */}
      <div
        className="py-20 px-16 max-md:px-5 max-md:py-16"
        style={{
          background: 'var(--sk-surface-2)',
        }}
      >
        <div className="max-w-[480px]">
          <span
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '.1em',
              color: 'var(--sk-success-text)',
              textTransform: 'uppercase',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            FOR BRANDS
          </span>
          <h2
            className="mt-4"
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 600,
              color: 'var(--sk-text-primary)',
              lineHeight: 1.2,
            }}
          >
            Find creators. Drive results.
          </h2>
          <p
            className="mt-4"
            style={{
              fontSize: '16px',
              color: 'var(--sk-text-secondary)',
              lineHeight: 1.6,
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            Launch campaigns that connect with authentic audiences. Browse verified creators, track performance in real-time, and measure ROI with precision.
          </p>
          <Link href="/auth/signup?role=brand" className="inline-block mt-8">
            <button
              className="px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
              style={{
                background: 'var(--sk-success)',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 500,
                fontFamily: 'var(--sk-font-body)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Post a Campaign →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
