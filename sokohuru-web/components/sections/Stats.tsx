const stats = [
  { value: '10K+', label: 'Verified creators' },
  { value: '500+', label: 'Brand campaigns run' },
  { value: '120+', label: 'Countries reached' },
  { value: '99.99%', label: 'Platform uptime' },
];

export function Stats() {
  return (
    <section
      className="py-20 px-20 max-md:px-5 max-md:py-16"
      style={{
        background: 'linear-gradient(180deg, var(--sk-surface-1) 0%, var(--sk-base) 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-12">
          {/* Left column - Heading + subtext */}
          <div>
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
              PERFORMANCE THAT MATTERS
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
              Built to deliver results that scale.
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
              Trusted by brands running campaigns across East Africa, from Nairobi to Lagos to Cape Town.
            </p>
          </div>

          {/* Right column - Stats grid */}
          <div className="grid grid-cols-2 gap-8 max-md:gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'var(--sk-font-display)',
                    fontSize: '40px',
                    fontWeight: 600,
                    color: 'var(--sk-pink)',
                    marginBottom: '8px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '14px',
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

        {/* Disclaimer */}
        <div className="text-center mt-12">
          <p
            style={{
              fontSize: '11px',
              color: 'var(--sk-text-muted)',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            * Stats represent platform targets for Year 1
          </p>
        </div>
      </div>
    </section>
  );
}
