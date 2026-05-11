import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome — Sokohuru',
  description: 'Welcome to Sokohuru! Get started with your brand journey.',
};

export default async function BrandOnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!userRole || (userRole as any).role !== 'brand') {
    redirect('/');
  }

  const { data: profile } = await supabase
    .from('brand_profile')
    .select('company_name')
    .eq('id', user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const companyName = (profile as any)?.company_name || 'Brand';

  const nextSteps = [
    {
      number: '1',
      title: 'Complete your profile',
      description: 'Add brand assets, refine your story, and showcase what makes your brand unique',
      href: '/dashboard/brand/profile',
      color: 'var(--sk-brand)',
    },
    {
      number: '2',
      title: 'Create your first campaign',
      description: 'Launch a campaign to connect with creators who align with your brand values',
      href: '/dashboard/brand/campaigns/new',
      color: 'var(--sk-success)',
    },
    {
      number: '3',
      title: 'Add payment method',
      description: 'Set up billing to pay creators and manage campaign budgets',
      href: '/dashboard/brand/billing',
      color: 'var(--sk-creator)',
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
              color: 'var(--sk-brand)',
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
            {companyName}, you&apos;re ready to grow!
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
            Your brand account is active. Here&apos;s how to get the most out of Sokohuru.
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
          <Link href="/dashboard/brand">
            <Button variant="primary" size="lg">
              Go to dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
