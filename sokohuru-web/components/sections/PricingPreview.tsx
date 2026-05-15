import Link from 'next/link';
import { Button } from '@/components/ui';

const pricingPlans = [
  {
    name: 'Starter',
    forBrands: true,
    price: 'Free to post',
    subtitle: 'Pay per campaign',
    features: [
      'Post unlimited campaigns',
      'Pay creators on approval',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Post a campaign →',
    ctaHref: '/auth/signup?role=brand',
    highlighted: false,
  },
  {
    name: 'Growth',
    forBrands: true,
    badge: 'Most popular',
    price: '$99/mo',
    subtitle: 'For growing brands',
    features: [
      'Everything in Starter',
      'Priority creator matching',
      'Advanced analytics & ROI',
      'Dedicated account manager',
      'Custom campaign briefs',
    ],
    cta: 'Start free trial →',
    ctaHref: '/auth/signup?role=brand',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    forBrands: true,
    price: 'Custom',
    subtitle: 'For large brands',
    features: [
      'Everything in Growth',
      'Multi-market campaigns',
      'White-label reporting',
      'SLA guarantee',
      'API access',
    ],
    cta: 'Contact us →',
    ctaHref: '/contact',
    highlighted: false,
  },
];

export function PricingPreview() {
  return (
    <section
      id="pricing"
      className="py-20 px-20 max-md:px-5 max-md:py-16"
      style={{ background: 'var(--sk-base)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
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
            SIMPLE PRICING
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
            No subscription required
          </h2>
          <p
            className="mt-4 mx-auto"
            style={{
              fontSize: '16px',
              color: 'var(--sk-text-secondary)',
              lineHeight: 1.6,
              maxWidth: '560px',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            Pay per campaign. Scale as you grow.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 mb-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className="p-7 flex flex-col"
              style={{
                background: 'var(--sk-surface-1)',
                borderRadius: 'var(--sk-radius-lg)',
                border: plan.highlighted ? '1px solid var(--sk-pink)' : '0.5px solid var(--sk-border)',
                position: 'relative',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  style={{
                    background: 'var(--sk-pink)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: 'var(--sk-radius-full)',
                    fontFamily: 'var(--sk-font-body)',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--sk-text-secondary)',
                  fontFamily: 'var(--sk-font-body)',
                  textTransform: 'uppercase',
                  letterSpacing: '.05em',
                  marginBottom: '6px',
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 600,
                  color: 'var(--sk-text-primary)',
                  fontFamily: 'var(--sk-font-display)',
                  marginBottom: '6px',
                }}
              >
                {plan.price}
              </div>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--sk-text-muted)',
                  fontFamily: 'var(--sk-font-body)',
                  marginBottom: '20px',
                }}
              >
                {plan.subtitle}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2"
                    style={{
                      fontSize: '14px',
                      color: 'var(--sk-text-secondary)',
                      fontFamily: 'var(--sk-font-body)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: 'var(--sk-pink)', flexShrink: 0 }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={plan.ctaHref}>
                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  size="md"
                  fullWidth
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          className="text-center"
          style={{
            fontSize: '13px',
            color: 'var(--sk-text-muted)',
            fontFamily: 'var(--sk-font-body)',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Creator accounts are always free. Brands pay only when content is approved — no upfront costs.
        </p>
      </div>
    </section>
  );
}
