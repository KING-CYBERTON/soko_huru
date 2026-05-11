import { requireBrand } from '@/lib/auth/guards';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/dashboard/brand', label: 'Overview', icon: '📊' },
  { href: '/dashboard/brand/campaigns', label: 'Campaigns', icon: '📋' },
  { href: '/dashboard/brand/creators', label: 'Creators', icon: '👥' },
  { href: '/dashboard/brand/inbox', label: 'Inbox', icon: '💬' },
  { href: '/dashboard/brand/reports', label: 'Reports', icon: '📈' },
  { href: '/dashboard/brand/billing', label: 'Billing', icon: '💳' },
  { href: '/dashboard/brand/settings', label: 'Settings', icon: '⚙️' },
];

export default async function BrandDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireBrand();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('brand_profile')
    .select('company_name, logo_url')
    .eq('id', user!.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const companyName = (profile as any)?.company_name || 'Brand';

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex md:flex-col"
        style={{
          width: '240px',
          backgroundColor: 'var(--sk-surface-1)',
          borderRight: '0.5px solid var(--sk-border)',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '24px 20px' }}>
          <Link href="/" style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--sk-text-primary)', textDecoration: 'none' }}>
            Sokohuru
          </Link>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '12px' }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 16px',
                marginBottom: '4px',
                borderRadius: 'var(--sk-radius-md)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--sk-text-muted)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div style={{ padding: '20px', borderTop: '0.5px solid var(--sk-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--sk-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {companyName.charAt(0)}
            </div>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--sk-text-primary)' }}>{companyName}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--sk-text-muted)' }}>Brand</div>
            </div>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--sk-error)',
                backgroundColor: 'transparent',
                border: '0.5px solid var(--sk-border)',
                borderRadius: 'var(--sk-radius-md)',
                cursor: 'pointer',
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header
          style={{
            height: '56px',
            backgroundColor: 'var(--sk-surface-1)',
            borderBottom: '0.5px solid var(--sk-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
          }}
        >
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, color: 'var(--sk-text-primary)' }}>Dashboard</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>🔍</button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>🔔</button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflow: 'auto', padding: '24px', backgroundColor: 'var(--sk-background)' }}>{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: 'var(--sk-surface-1)',
          borderTop: '0.5px solid var(--sk-border)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '0 8px',
        }}
      >
        {NAV_ITEMS.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 12px',
              textDecoration: 'none',
              color: 'var(--sk-text-muted)',
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500 }}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
