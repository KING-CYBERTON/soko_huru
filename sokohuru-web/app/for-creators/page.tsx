import Link from 'next/link';
import { Button } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Creators — Sokohuru',
  description: "Join East Africa's fastest growing creator marketplace. Connect with top brands and earn real income.",
};

const steps = [
  {
    number: '01',
    title: 'Sign up & build your profile',
    description: 'Create your account and showcase your content, audience demographics, and collaboration preferences.',
  },
  {
    number: '02',
    title: 'Discover campaigns',
    description: 'Browse campaigns from top brands looking for creators just like you.',
  },
  {
    number: '03',
    title: 'Apply & get selected',
    description: 'Submit your application with your unique pitch. Get selected based on your fit.',
  },
  {
    number: '04',
    title: 'Create & submit content',
    description: 'Follow the brief, create authentic content, and submit for brand approval.',
  },
  {
    number: '05',
    title: 'Get paid',
    description: 'Once approved, get paid directly to your mobile money or bank account.',
  },
];

const collabTypes = [
  {
    type: 'UGC',
    description: 'Create user-generated content for brands to use in their marketing.',
  },
  {
    type: 'Affiliate',
    description: 'Earn commission on every sale driven through your unique link.',
  },
  {
    type: 'Ambassador',
    description: 'Long-term partnerships with consistent content and exclusive perks.',
  },
  {
    type: 'Gifting',
    description: 'Receive free products in exchange for honest reviews and content.',
  },
  {
    type: 'Commission',
    description: 'Performance-based earnings tied directly to conversions.',
  },
  {
    type: 'Pay per view',
    description: 'Get paid based on the reach and impressions your content generates.',
  },
];

const stats = [
  { value: '10K+', label: 'Creators' },
  { value: '500+', label: 'Campaigns' },
  { value: '$2M+', label: 'Earned' },
  { value: '4.8★', label: 'App Rating' },
];

export default function ForCreatorsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="py-20 px-20 max-md:px-5 max-md:py-16"
        style={{
          background: 'var(--sk-pink-dark)',
        }}
      >
        <div className="max-w-[800px] mx-auto text-center">
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
          <h1
            className="mt-4"
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.1,
            }}
          >
            Get discovered. Get paid. Be yourself.
          </h1>
          <p
            className="mt-5"
            style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.6,
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            Join thousands of East African creators earning real income from brand partnerships. Your content, your terms, your income.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 max-md:flex-col max-md:w-full">
            <Link href="/download" className="max-md:w-full">
              <Button variant="primary" size="lg" fullWidth className="max-md:w-full">
                Download iOS
              </Button>
            </Link>
            <Link href="/download" className="max-md:w-full">
              <Button variant="secondary" size="lg" fullWidth className="max-md:w-full">
                Download Android
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* HowItWorks */}
      <section
        className="py-20 px-20 max-md:px-5 max-md:py-16"
        style={{ background: 'var(--sk-base)' }}
      >
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
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
              HOW IT WORKS
            </span>
            <h2
              className="mt-4"
              style={{
                fontFamily: 'var(--sk-font-display)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 600,
                color: 'var(--sk-text-primary)',
                lineHeight: 1.2,
              }}
            >
              Your journey as a creator
            </h2>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-6 max-md:gap-4">
                {/* Left - Step indicator */}
                <div className="flex flex-col items-center">
                  {/* Circle with number */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'var(--sk-pink-dark)',
                      border: '2px solid var(--sk-pink)',
                      color: 'var(--sk-pink-light)',
                      fontFamily: 'var(--sk-font-body)',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    {step.number}
                  </div>
                  {/* Vertical line */}
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        width: '2px',
                        flex: 1,
                        minHeight: '40px',
                        background: 'var(--sk-border)',
                        marginTop: '8px',
                      }}
                    />
                  )}
                </div>

                {/* Right - Content */}
                <div className="flex-1 pb-8">
                  <h3
                    style={{
                      fontFamily: 'var(--sk-font-body)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: 'var(--sk-text-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--sk-font-body)',
                      fontSize: '14px',
                      color: 'var(--sk-text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* StatsBar */}
      <section
        className="py-12 px-20 max-md:px-5"
        style={{
          background: 'var(--sk-pink)',
        }}
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-8 max-md:grid-cols-2 max-md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: 'var(--sk-font-display)',
                  fontSize: '32px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sk-font-body)',
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CollabTypes */}
      <section
        className="py-20 px-20 max-md:px-5 max-md:py-16"
        style={{ background: 'var(--sk-base)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
              color: 'var(--sk-text-primary)',
              lineHeight: 1.2,
            }}
          >
            Your rules, your deals
          </h2>

          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-[900px]:grid-cols-2">
            {collabTypes.map((collab) => (
              <div
                key={collab.type}
                className="p-6"
                style={{
                  background: 'var(--sk-surface-1)',
                  border: '0.5px solid var(--sk-border)',
                  borderRadius: 'var(--sk-radius-lg)',
                }}
              >
                {/* Icon dot */}
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--sk-pink)',
                    marginBottom: '16px',
                  }}
                />

                {/* Type name */}
                <h3
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--sk-text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {collab.type}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontSize: '13px',
                    color: 'var(--sk-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {collab.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DownloadCTA */}
      <section
        className="py-16 px-20 max-md:px-5 max-md:py-12"
        style={{
          background: 'var(--sk-pink)',
        }}
      >
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: '40px',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '32px',
            }}
          >
            Ready to start creating?
          </h2>
          <div className="flex items-center justify-center gap-3 max-md:flex-col max-md:w-full">
            <Link href="/download" className="max-md:w-full">
              <button
                className="px-8 py-4 rounded-lg transition-opacity hover:opacity-90 max-md:w-full"
                style={{
                  background: '#FFFFFF',
                  color: 'var(--sk-pink)',
                  fontSize: '16px',
                  fontWeight: 600,
                  fontFamily: 'var(--sk-font-body)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                App Store
              </button>
            </Link>
            <Link href="/download" className="max-md:w-full">
              <button
                className="px-8 py-4 rounded-lg transition-opacity hover:opacity-90 max-md:w-full"
                style={{
                  background: '#FFFFFF',
                  color: 'var(--sk-pink)',
                  fontSize: '16px',
                  fontWeight: 600,
                  fontFamily: 'var(--sk-font-body)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Google Play
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
