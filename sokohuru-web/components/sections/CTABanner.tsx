import Link from 'next/link';

export function CTABanner() {
  return (
    <section
      className="py-20 px-20 max-md:px-5 max-md:py-16"
      style={{
        background: 'var(--sk-pink)',
      }}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8 max-md:flex-col max-md:text-center">
        {/* Text left */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Ready to launch your first campaign?
          </h2>
          <p
            className="mt-4"
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            Join brands and creators already growing with Sokohuru. No subscription required.
          </p>
        </div>

        {/* Button right */}
        <Link href="/auth/signup" className="max-md:w-full">
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
              whiteSpace: 'nowrap',
            }}
          >
            Get started free →
          </button>
        </Link>
      </div>
    </section>
  );
}
