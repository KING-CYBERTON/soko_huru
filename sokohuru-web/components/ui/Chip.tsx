import { cn } from '@/lib/cn';

export interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: 'default' | 'pink';
  className?: string;
}

export function Chip({
  label,
  selected,
  onClick,
  variant = 'default',
  className,
}: ChipProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-[11px] py-[5px] text-xs border-[0.5px] cursor-pointer transition-all duration-200 hover:opacity-80';

  const getStyles = () => {
    if (variant === 'pink' && selected) {
      return {
        background: 'var(--sk-pink-dark)',
        color: 'var(--sk-pink-light)',
        borderColor: 'var(--sk-pink)',
      };
    }

    if (selected) {
      return {
        background: '#0B2318',
        color: 'var(--sk-success-text)',
        borderColor: 'var(--sk-success)',
      };
    }

    return {
      background: 'var(--sk-surface-2)',
      color: 'var(--sk-text-secondary)',
      borderColor: 'var(--sk-border)',
    };
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseStyles, 'rounded-sk-full', className)}
      style={{
        fontFamily: 'var(--sk-font-body)',
        fontWeight: 500,
        ...getStyles(),
      }}
    >
      {label}
    </button>
  );
}
