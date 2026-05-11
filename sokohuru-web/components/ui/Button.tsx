import { cn } from '@/lib/cn';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer';

  const variantStyles = {
    primary: 'text-white hover:opacity-90',
    secondary: 'border-[0.5px]',
    ghost: 'bg-transparent border-[0.5px]',
    destructive: 'border-[0.5px]',
  };

  const sizeStyles = {
    sm: 'px-[14px] py-[7px] text-xs',
    md: 'px-5 py-[10px] text-sm',
    lg: 'px-7 py-[14px] text-base',
  };

  const radiusStyles = {
    sm: 'rounded-sk-sm',
    md: 'rounded-sk-md',
    lg: 'rounded-sk-lg',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        radiusStyles[size],
        fullWidth && 'w-full',
        loading && 'opacity-70 cursor-not-allowed',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      style={{
        fontFamily: 'var(--sk-font-body)',
        fontWeight: 500,
        ...(variant === 'primary' && {
          background: 'var(--sk-pink)',
        }),
        ...(variant === 'secondary' && {
          background: 'var(--sk-surface-2)',
          color: 'var(--sk-text-primary)',
          borderColor: 'var(--sk-border)',
        }),
        ...(variant === 'ghost' && {
          color: 'var(--sk-pink)',
          borderColor: 'var(--sk-pink)',
        }),
        ...(variant === 'destructive' && {
          background: 'var(--sk-error-surface)',
          color: 'var(--sk-error-text)',
          borderColor: 'var(--sk-error)',
        }),
      }}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
