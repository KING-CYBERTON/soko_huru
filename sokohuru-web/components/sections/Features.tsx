import { Users, Shield, BarChart3, Wallet } from 'lucide-react';

const features = [
  {
    Icon: Users,
    title: 'Verified creator network',
    description: 'Browse thousands of verified creators across Kenya, Nigeria, South Africa, and Uganda. Filter by platform, audience, engagement rate, and content format.',
  },
  {
    Icon: Shield,
    title: 'Contracts & compliance',
    description: 'Every collaboration covered by a digital contract. Deliverables, timelines, usage rights, and exclusivity terms — all handled automatically.',
  },
  {
    Icon: BarChart3,
    title: 'Real-time campaign tracking',
    description: 'Track reach, engagement, clicks, and sales as they happen. Know your ROI before the campaign ends.',
  },
  {
    Icon: Wallet,
    title: 'Instant creator payouts',
    description: 'Creators paid via M-Pesa, bank transfer, or PayPal within 14 days of content approval. No invoice chasing.',
  },
];

export function Features() {
  return (
    <section
      className="py-20 px-20 max-md:px-5 max-md:py-16"
      style={{ background: 'var(--sk-base)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-md:mb-12">
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
            BUILT FOR EAST AFRICA
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
            Everything you need to run creator campaigns
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
            From discovery to payment — Sokohuru handles the entire creator campaign lifecycle in one platform.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {features.map((feature) => {
            const Icon = feature.Icon;
            return (
              <div
                key={feature.title}
                className="p-7"
                style={{
                  background: 'var(--sk-surface-1)',
                  borderRadius: 'var(--sk-radius-lg)',
                  border: '0.5px solid var(--sk-border)',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    marginBottom: '16px',
                  }}
                >
                  <Icon size={32} style={{ color: 'var(--sk-pink-light)' }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--sk-text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontSize: '14px',
                    color: 'var(--sk-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
