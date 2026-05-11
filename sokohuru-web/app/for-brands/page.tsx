import Link from 'next/link';
import { Button, Avatar } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Brands — Sokohuru',
  description: 'Access a curated pool of verified East African creators. Launch campaigns in minutes, track ROI in real time.',
};

const steps = [
  {
    number: '01',
    title: 'Create your brand profile',
    description: 'Set up your account with your brand details, industry, and campaign goals.',
  },
  {
    number: '02',
    title: 'Create a campaign — brief, budget, deliverables',
    description: 'Define your campaign requirements, set your budget, and specify the content you need.',
  },
  {
    number: '03',
    title: 'Receive applications from matched creators',
    description: 'Our algorithm matches you with creators whose audience aligns with your target market.',
  },
  {
    number: '04',
    title: 'Review profiles, approve your shortlist',
    description: 'Browse creator portfolios, audience demographics, and past work. Select your favorites.',
  },
  {
    number: '05',
    title: 'Content delivered, pay on approval',
    description: 'Review submitted content, request revisions if needed, and pay once satisfied.',
  },
];

const campaignTypes = [
  {
    type: 'UGC',
    description: 'Get authentic user-generated content for your ads, website, and social media.',
  },
  {
    type: 'Affiliate',
    description: 'Pay only for performance. Creators promote your products and earn commission.',
  },
  {
    type: 'Ambassador',
    description: 'Build long-term partnerships with creators who genuinely love your brand.',
  },
  {
    type: 'Gifting',
    description: 'Send products to creators in exchange for honest reviews and content.',
  },
  {
    type: 'Commission',
    description: 'Performance-driven campaigns where creators earn based on conversions.',
  },
  {
    type: 'Pay per view',
    description: 'Compensate creators based on the reach and impressions they deliver.',
  },
];

const stats = [
  { value: '284K', label: 'Avg campaign reach' },
  { value: '4.7%', label: 'Avg engagement' },
  { value: '45', label: 'Avg sales per campaign' },
  { value: '3.2×', label: 'Average ROI' },
];

const brands = ['Vertex', 'Nexora', 'Pocket', 'Cloudage', 'Layers', 'Fluxor'];

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for testing the waters',
    features: [
      'Free to post campaigns',
      'Pay per campaign',
      '5% platform fee',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    price: '$99',
    period: '/mo',
    description: 'For scaling brands',
    features: [
      'Unlimited campaigns',
      'No per-campaign fees',
      'Advanced analytics',
      'Priority support',
      'Campaign templates',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'SLA guarantees',
      'Training & onboarding',
    ],
  },
];

export default function ForBrandsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="py-20 px-20 max-md:px-5 max-md:py-16"
        style={{
          background: 'linear-gradient(180deg, var(--sk-surface-1) 0%, var(--sk-base) 100%)',
        }}
      >
        <div className="max-w-[800px] mx-auto text-center">
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
            Find creators. Drive results.
          </h1>
          <p
            className="mt-5"
            style={{
              fontSize: '18px',
              color: 'var(--sk-text-secondary)',
              lineHeight: 1.6,
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            Access verified creators across East Africa. Launch campaigns in minutes, track performance in real-time, and measure ROI with precision.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 max-md:flex-col max-md:w-full">
            <Link href="/auth/signup?role=brand" className="max-md:w-full">
              <Button variant="primary" size="lg" fullWidth className="max-md:w-full">
                Post your first campaign →
              </Button>
            </Link>
            <Link href="/contact" className="max-md:w-full">
              <Button variant="secondary" size="lg" fullWidth className="max-md:w-full">
                Talk to sales
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
                color: 'var(--sk-success-text)',
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
              Launch your campaign in 5 steps
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
                      background: 'var(--sk-success-surface)',
                      border: '2px solid var(--sk-success)',
                      color: 'var(--sk-success-text)',
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

      {/* CampaignTypes */}
      <section
        className="py-20 px-20 max-md:px-5 max-md:py-16"
        style={{ background: 'var(--sk-surface-1)' }}
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
            Every type of collaboration, one platform
          </h2>

          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-[900px]:grid-cols-2">
            {campaignTypes.map((campaign) => (
              <div
                key={campaign.type}
                className="p-6"
                style={{
                  background: 'var(--sk-surface-2)',
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
                    background: 'var(--sk-success)',
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
                  {campaign.type}
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
                  {campaign.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-12 px-20 max-md:px-5"
        style={{
          background: 'var(--sk-base)',
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
                  color: 'var(--sk-success)',
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sk-font-body)',
                  fontSize: '13px',
                  color: 'var(--sk-text-muted)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TrustSection */}
      <section
        className="py-20 px-20 max-md:px-5 max-md:py-16"
        style={{
          background: 'var(--sk-surface-1)',
        }}
      >
        <div className="max-w-[1000px] mx-auto">
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
            Trusted by brands across East Africa
          </h2>

          {/* Brand names */}
          <div className="flex items-center justify-center gap-8 mb-16 max-md:grid max-md:grid-cols-3 max-md:gap-6">
            {brands.map((brand) => (
              <span
                key={brand}
                style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--sk-text-muted)',
                  fontFamily: 'var(--sk-font-body)',
                }}
              >
                {brand}
              </span>
            ))}
          </div>

          {/* Testimonial */}
          <div className="max-w-[900px] mx-auto">
            <div
              style={{
                fontSize: '64px',
                color: 'var(--sk-success-text)',
                fontFamily: 'Georgia, serif',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              &ldquo;
            </div>
            <p
              style={{
                fontSize: '16px',
                color: 'var(--sk-text-secondary)',
                fontStyle: 'italic',
                lineHeight: 1.7,
                marginBottom: '32px',
                fontFamily: 'var(--sk-font-body)',
              }}
            >
              Sokohuru helped us scale our influencer marketing from 5 creators to 50+ in just 3 months. The platform makes it incredibly easy to find the right creators and track campaign performance.
            </p>

            <div className="flex items-center gap-4">
              <Avatar initials="MK" size="lg" />
              <div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--sk-text-primary)',
                    fontFamily: 'var(--sk-font-body)',
                  }}
                >
                  Michael Kamau
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: 'var(--sk-text-muted)',
                    fontFamily: 'var(--sk-font-body)',
                  }}
                >
                  Marketing Director, Cloudage · Nairobi
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PricingTeaser */}
      <section
        className="py-20 px-20 max-md:px-5 max-md:py-16"
        style={{ background: 'var(--sk-base)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
              color: 'var(--sk-text-primary)',
              lineHeight: 1.2,
            }}
          >
            Simple, transparent pricing
          </h2>
          <p
            className="text-center mb-12"
            style={{
              fontSize: '16px',
              color: 'var(--sk-text-secondary)',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            Choose the plan that fits your needs.{' '}
            <Link href="/pricing" style={{ color: 'var(--sk-success)', textDecoration: 'underline' }}>
              View full pricing details →
            </Link>
          </p>

          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="p-8 relative"
                style={{
                  background: 'var(--sk-surface-1)',
                  border: plan.popular ? '2px solid var(--sk-success)' : '0.5px solid var(--sk-border)',
                  borderRadius: 'var(--sk-radius-lg)',
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium"
                    style={{
                      background: 'var(--sk-success)',
                      color: '#FFFFFF',
                      borderRadius: 'var(--sk-radius-full)',
                    }}
                  >
                    POPULAR
                  </div>
                )}

                <div
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--sk-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '.05em',
                    marginBottom: '12px',
                  }}
                >
                  {plan.name}
                </div>

                <div className="mb-4">
                  <span
                    style={{
                      fontFamily: 'var(--sk-font-display)',
                      fontSize: '40px',
                      fontWeight: 600,
                      color: 'var(--sk-text-primary)',
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      style={{
                        fontFamily: 'var(--sk-font-body)',
                        fontSize: '16px',
                        color: 'var(--sk-text-muted)',
                      }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <p
                  className="mb-6"
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontSize: '14px',
                    color: 'var(--sk-text-secondary)',
                  }}
                >
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2"
                      style={{
                        fontFamily: 'var(--sk-font-body)',
                        fontSize: '13px',
                        color: 'var(--sk-text-secondary)',
                      }}
                    >
                      <span style={{ color: 'var(--sk-success)' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup?role=brand" className="block">
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="md"
                    fullWidth
                  >
                    Get started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FinalCTA */}
      <section
        className="py-16 px-20 max-md:px-5 max-md:py-12"
        style={{
          background: 'var(--sk-success)',
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
              marginBottom: '16px',
            }}
          >
            Ready to find your creators?
          </h2>
          <p
            className="mb-8"
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            Join hundreds of brands already growing with creator partnerships
          </p>
          <Link href="/auth/signup?role=brand">
            <button
              className="px-8 py-4 rounded-lg transition-opacity hover:opacity-90"
              style={{
                background: '#FFFFFF',
                color: 'var(--sk-success)',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'var(--sk-font-body)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Post your first campaign →
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
