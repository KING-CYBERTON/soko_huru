import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--sk-background)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        {/* 404 Number */}
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '120px',
            fontWeight: 800,
            color: 'var(--sk-brand)',
            lineHeight: 1,
            marginBottom: '24px',
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--sk-text-primary)',
            marginBottom: '16px',
          }}
        >
          Page not found
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: 'var(--sk-text-muted)',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}
        >
          Sorry, we couldn't find the page you're looking for. The link you followed may be broken, or the page may have been removed.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
              backgroundColor: 'var(--sk-brand)',
              border: 'none',
              borderRadius: 'var(--sk-radius-lg)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            Go to Homepage
          </Link>

          <Link
            href="/campaigns"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--sk-brand)',
              backgroundColor: 'transparent',
              border: '0.5px solid var(--sk-border)',
              borderRadius: 'var(--sk-radius-lg)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            Browse Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}
