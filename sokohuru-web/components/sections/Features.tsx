import Link from 'next/link';

const features = [
  {
    icon: '⚡',
    title: 'Fast & Reliable',
    description: 'Lightning-fast performance with 99.99% uptime. Your operations never skip a beat.',
    href: '/features/performance',
  },
  {
    icon: '🔒',
    title: 'Secure by Design',
    description: 'Enterprise-grade security built into every layer. Your data is always protected.',
    href: '/features/security',
  },
  {
    icon: '📊',
    title: 'Powerful Insights',
    description: 'Real-time analytics and reporting to help you make data-driven decisions.',
    href: '/features/analytics',
  },
  {
    icon: '🔗',
    title: 'Easy Integration',
    description: 'Connect with your existing tools seamlessly. Get started in minutes, not days.',
    href: '/features/integrations',
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
            BUILT FOR GROWTH
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
            Everything you need to scale with confidence
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
            Powerful features designed to help your business grow without complexity. Focus on what matters while we handle the rest.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {features.map((feature) => (
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
                  fontSize: '32px',
                  marginBottom: '16px',
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Inter, sans-serif',
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
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: 'var(--sk-text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                }}
              >
                {feature.description}
              </p>

              {/* Learn more link */}
              <Link
                href={feature.href}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--sk-pink)',
                }}
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
