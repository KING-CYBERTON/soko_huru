import Link from 'next/link';
import { Button } from '@/components/ui';

export function Hero() {
  return (
    <section
      className="min-h-screen flex items-center px-20 max-md:px-5 max-md:py-16"
      style={{ background: 'var(--sk-surface-1)' }}
    >
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-12">
        {/* Left column - Content */}
        <div className="flex flex-col">
          {/* Eyebrow */}
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
            A PRODUCT OF SOKOHURU
          </span>

          {/* H1 */}
          <h1
            className="mt-4"
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              color: 'var(--sk-text-primary)',
              lineHeight: 1.1,
            }}
          >
            Smart solutions.
            <br />
            Real{' '}
            <span style={{ color: 'var(--sk-pink)' }}>impact.</span>
          </h1>

          {/* Subtext */}
          <p
            className="mt-5 max-w-[520px]"
            style={{
              fontSize: '18px',
              color: 'var(--sk-text-secondary)',
              lineHeight: 1.6,
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            We empower businesses with modern technology to move faster, operate smarter, and grow beyond limits.
          </p>

          {/* Button row */}
          <div className="flex items-center gap-3 mt-8 max-md:flex-col max-md:w-full">
            <Link href="/auth/signup" className="max-md:w-full">
              <Button variant="primary" size="lg" fullWidth className="max-md:w-full">
                Get Started →
              </Button>
            </Link>
            <Link href="/for-brands" className="max-md:w-full">
              <Button variant="secondary" size="lg" fullWidth className="max-md:w-full">
                Explore Solutions
              </Button>
            </Link>
          </div>

          {/* Trust line */}
          <div className="flex items-center gap-2 mt-6">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L10.5 5.5L15.5 6.5L11.75 10.5L12.5 15.5L8 13L3.5 15.5L4.25 10.5L0.5 6.5L5.5 5.5L8 1Z"
                fill="var(--sk-text-muted)"
              />
            </svg>
            <span
              style={{
                fontSize: '13px',
                color: 'var(--sk-text-muted)',
                fontFamily: 'var(--sk-font-body)',
              }}
            >
              Enterprise-grade security · Built for trust
            </span>
          </div>
        </div>

        {/* Right column - Dashboard mockup */}
        <div className="max-md:hidden">
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: 'var(--sk-surface-1)',
              border: '0.5px solid var(--sk-border)',
              borderRadius: 'var(--sk-radius-xl)',
            }}
          >
            {/* Dashboard container */}
            <div className="flex" style={{ height: '500px' }}>
              {/* Sidebar */}
              <div
                className="flex flex-col gap-1 p-4"
                style={{
                  width: '180px',
                  background: 'var(--sk-surface-2)',
                  borderRight: '0.5px solid var(--sk-border)',
                }}
              >
                {[
                  { label: 'Overview', active: true },
                  { label: 'Campaigns', active: false },
                  { label: 'Creators', active: false },
                  { label: 'Analytics', active: false },
                  { label: 'Payouts', active: false },
                  { label: 'Settings', active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-3 py-2 rounded"
                    style={{
                      background: item.active ? 'var(--sk-pink-dark)' : 'transparent',
                      color: item.active ? 'var(--sk-pink-light)' : 'var(--sk-text-secondary)',
                      fontSize: '13px',
                      fontFamily: 'var(--sk-font-body)',
                      fontWeight: item.active ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="flex-1 p-6 flex flex-col gap-6">
                {/* Revenue card */}
                <div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--sk-text-muted)',
                      fontFamily: 'var(--sk-font-body)',
                      marginBottom: '8px',
                    }}
                  >
                    Total Revenue
                  </div>
                  <div
                    style={{
                      fontSize: '32px',
                      fontWeight: 600,
                      color: 'var(--sk-text-primary)',
                      fontFamily: 'var(--sk-font-display)',
                    }}
                  >
                    $128,430
                  </div>
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-2 h-32">
                  {[40, 60, 50, 70, 45, 85, 55, 75, 65, 90].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${height}%`,
                        background: i === 9 ? 'var(--sk-pink)' : 'var(--sk-surface-3)',
                      }}
                    />
                  ))}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[
                    { label: 'Active Users', value: '24,890' },
                    { label: 'Transactions', value: '58,294' },
                    { label: 'Success Rate', value: '99.99%' },
                    { label: 'Avg Response', value: '320ms' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div
                        style={{
                          fontSize: '18px',
                          fontWeight: 600,
                          color: 'var(--sk-text-primary)',
                          fontFamily: 'var(--sk-font-body)',
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'var(--sk-text-muted)',
                          fontFamily: 'var(--sk-font-body)',
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
