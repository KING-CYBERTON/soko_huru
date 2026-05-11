import { cn } from '@/lib/cn';

export interface BadgeProps {
  variant?: 'pink' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center px-[9px] py-[3px] text-[11px] font-medium border-[0.5px]';

  const variantColors = {
    pink: {
      background: '#3A0E22',
      color: '#F472A8',
      borderColor: '#7D1240',
    },
    success: {
      background: 'var(--sk-success-surface)',
      color: 'var(--sk-success-text)',
      borderColor: 'var(--sk-success)',
    },
    warning: {
      background: 'var(--sk-warning-surface)',
      color: 'var(--sk-warning-text)',
      borderColor: 'var(--sk-warning)',
    },
    error: {
      background: 'var(--sk-error-surface)',
      color: 'var(--sk-error-text)',
      borderColor: 'var(--sk-error)',
    },
    info: {
      background: 'var(--sk-info-surface)',
      color: 'var(--sk-info-text)',
      borderColor: 'var(--sk-info)',
    },
    neutral: {
      background: 'var(--sk-surface-2)',
      color: 'var(--sk-text-secondary)',
      borderColor: 'var(--sk-border)',
    },
  };

  return (
    <span
      className={cn(baseStyles, 'rounded-sk-full', className)}
      style={{
        fontFamily: 'var(--sk-font-body)',
        fontWeight: 500,
        ...variantColors[variant],
      }}
    >
      {children}
    </span>
  );
}
