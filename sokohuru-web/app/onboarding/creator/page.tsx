import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome — Sokohuru',
  description: 'Welcome to Sokohuru! Get started with your creator journey.',
};

export default async function CreatorOnboardingPage() {
  const supabase = await createClient();

  // Check if user is authenticated and is a creator
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get user role
  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!userRole || (userRole as any).role !== 'creator') {
    redirect('/');
  }

  // Get creator profile for first name
  const { data: profile } = await supabase
    .from('creator_profile')
    .select('first_name')
    .eq('id', user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firstName = (profile as any)?.first_name || 'Creator';

  const nextSteps = [
    {
      number: '1',
      title: 'Complete your profile',
      description: 'Add photos, update your bio, and showcase your best work',
      href: '/dashboard/creator/profile',
      color: 'var(--sk-creator)',
    },
    {
      number: '2',
      title: 'Browse campaigns',
      description: 'Discover active brand collaborations and apply to campaigns that match your style',
      href: '/campaigns',
      color: 'var(--sk-success)',
    },
    {
      number: '3',
      title: 'Set your availability',
      description: 'Update your platform availability and collaboration preferences',
      href: '/dashboard/creator/settings',
      color: 'var(--sk-brand)',
    },
  ];

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--sk-background)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <div
            className="mb-3"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--sk-creator)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Welcome to Sokohuru
          </div>
          <h1
            className="mb-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              color: 'var(--sk-text-primary)',
              lineHeight: '1.2',
            }}
          >
            Hey {firstName}, you&apos;re all set!
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: 'var(--sk-text-secondary)',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Your creator account is ready. Here&apos;s what to do next to get the most out of
            Sokohuru.
          </p>
        </div>

        {/* Next Steps Cards */}
        <div className="mb-12 space-y-4">
          {nextSteps.map((step) => (
            <Link
              key={step.number}
              href={step.href}
              className="block transition-all duration-200"
              style={{
                textDecoration: 'none',
              }}
            >
              <div
                className="flex items-center gap-6 p-6"
                style={{
                  backgroundColor: 'var(--sk-surface-2)',
                  border: '0.5px solid var(--sk-border)',
                  borderRadius: 'var(--sk-radius-lg)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = step.color;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--sk-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Number Circle */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: step.color,
                    color: 'white',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div
                    className="mb-1"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--sk-text-primary)',
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: 'var(--sk-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    {step.description}
                  </div>
                </div>

                {/* Arrow Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: 'var(--sk-text-muted)',
                    flexShrink: 0,
                  }}
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/dashboard/creator">
            <Button variant="primary" size="lg">
              Go to dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
