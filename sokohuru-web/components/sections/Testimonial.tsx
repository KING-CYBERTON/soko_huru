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
          We launched our first Sokohuru campaign and had 12 verified creators apply within 48 hours. The platform made the whole process effortless.
        </p>

        {/* Attribution - Replace with real testimonial when first brand completes a campaign */}
        <div className="flex items-center gap-4">
          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--sk-text-primary)',
                fontFamily: 'var(--sk-font-body)',
              }}
            >
              Early access brand partner
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--sk-text-muted)',
                fontFamily: 'var(--sk-font-body)',
              }}
            >
              Nairobi, Kenya
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
