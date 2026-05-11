import { Avatar } from '@/components/ui';

export function Testimonial() {
  return (
    <section
      className="py-16 px-20 max-md:px-5 max-md:py-12"
      style={{
        background: 'var(--sk-surface-1)',
        borderTop: '0.5px solid var(--sk-border)',
        borderBottom: '0.5px solid var(--sk-border)',
      }}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Quote mark */}
        <div
          style={{
            fontSize: '64px',
            color: 'var(--sk-pink-light)',
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          &ldquo;
        </div>

        {/* Quote text */}
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
          Sokohuru has transformed the way we manage creator partnerships. The platform is reliable, secure, and incredibly easy to use.
        </p>

        {/* Attribution */}
        <div className="flex items-center gap-4">
          <Avatar initials="AK" size="lg" />
          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--sk-text-primary)',
                fontFamily: 'var(--sk-font-body)',
              }}
            >
              Amina Karimi
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--sk-text-muted)',
                fontFamily: 'var(--sk-font-body)',
              }}
            >
              CEO, Nexora · Nairobi
            </div>
          </div>
          {/* 5 star rating */}
          <div className="flex items-center gap-1 ml-auto">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L10 5.5L15 6.5L11.5 10L12.5 15L8 12.5L3.5 15L4.5 10L1 6.5L6 5.5L8 1Z"
                  fill="var(--sk-pink)"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
