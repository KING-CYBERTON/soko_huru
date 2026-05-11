import { createClient } from '@/lib/supabase/server';

export default async function CreatorDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch stats
  const [applications, pendingPayments, profile, campaigns] = await Promise.all([
    supabase
      .from('campaign_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('creator_id', user!.id)
      .in('status', ['pending', 'under_review', 'approved']),
    supabase
      .from('content_submission')
      .select('amount', { count: 'exact' })
      .eq('creator_id', user!.id)
      .eq('payment_status', 'pending'),
    supabase.from('creator_profile').select('*').eq('id', user!.id).single(),
    supabase
      .from('campaigns')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'active'),
  ]);

  const activeApplications = applications.count || 0;
  const pendingTotal =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (pendingPayments.data as any[])?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;

  // Calculate profile completion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profileData = profile.data as any;
  const fields = [
    'first_name',
    'last_name',
    'bio',
    'city',
    'country',
    'profile_photo',
    'languages',
  ];
  const completedFields = fields.filter((f) => profileData?.[f]).length;
  const profileCompletion = Math.round((completedFields / fields.length) * 100);

  const availableCampaigns = campaigns.count || 0;

  const stats = [
    {
      label: 'Active Applications',
      value: activeApplications,
      icon: '📋',
      color: 'var(--sk-creator)',
    },
    {
      label: 'Pending Payments',
      value: `KES ${pendingTotal.toLocaleString()}`,
      icon: '💰',
      color: 'var(--sk-success)',
    },
    {
      label: 'Profile Completion',
      value: `${profileCompletion}%`,
      icon: '✨',
      color: 'var(--sk-brand)',
    },
    {
      label: 'Available Campaigns',
      value: availableCampaigns,
      icon: '🎯',
      color: 'var(--sk-warning)',
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
        Welcome back!
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
