import { requireBrand } from '@/lib/auth/utils';

export default async function BrandDashboard() {
  await requireBrand();

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--sk-surface-1, #111018)' }}>
      <div className="text-center">
        <h1 className="text-3xl font-semibold" style={{ color: 'var(--sk-text-primary, #F0EEF8)' }}>
          Brand Dashboard — coming soon
        </h1>
        <p className="mt-4" style={{ color: 'var(--sk-text-secondary, #8E8AA8)' }}>
          We&apos;re building something amazing for brands.
        </p>
      </div>
    </div>
  );
}
