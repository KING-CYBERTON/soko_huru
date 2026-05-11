import { createClient } from '@/lib/supabase/server';

export default async function BrandDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch stats
  const [activeCampaigns, pendingApplications, contentReview, payouts] = await Promise.all([
    supabase
      .from('campaigns')
      .select('id', { count: 'exact', head: true })
      .eq('brand_id', user!.id)
      .eq('status', 'active'),
    supabase
      .from('campaign_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending'),
    supabase
      .from('content_submission')
      .select('id', { count: 'exact', head: true })
      .eq('approval_status', 'pending'),
    supabase
      .from('content_submission')
      .select('amount')
      .eq('payment_status', 'paid'),
  ]);

  const activeCampaignsCount = activeCampaigns.count || 0;
  const pendingApplicationsCount = pendingApplications.count || 0;
  const contentReviewCount = contentReview.count || 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalPaid = (payouts.data as any[])?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

  const stats = [
    {
      label: 'Active Campaigns',
      value: activeCampaignsCount,
      icon: '🎯',
      color: 'var(--sk-brand)',
    },
    {
      label: 'Pending Applications',
      value: pendingApplicationsCount,
      icon: '📥',
      color: 'var(--sk-warning)',
    },
    {
      label: 'Content Awaiting Review',
      value: contentReviewCount,
      icon: '📝',
      color: 'var(--sk-creator)',
    },
    {
      label: 'Total Paid Out',
      value: `KES ${totalPaid.toLocaleString()}`,
      icon: '💸',
      color: 'var(--sk-success)',
    },
  ];

  return (
    <div>
      <h1
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--sk-text-primary)',
          marginBottom: '24px',
        }}
      >
        Brand Overview
      </h1>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: '24px',
              backgroundColor: 'var(--sk-surface-2)',
              border: '0.5px solid var(--sk-border)',
              borderRadius: 'var(--sk-radius-lg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--sk-radius-md)',
                  backgroundColor: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                {stat.icon}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--sk-text-muted)' }}>
                {stat.label}
              </div>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '32px', fontWeight: 700, color: 'var(--sk-text-primary)' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
