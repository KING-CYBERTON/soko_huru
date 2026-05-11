'use client';

import { cn } from '@/lib/cn';

export interface ToggleProps {
  checked: boolean;
  onChange: (_checked: boolean) => void;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
}

export function Toggle({
  checked,
  onChange,
  label,
  sublabel,
  disabled = false,
}: ToggleProps) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative flex-shrink-0 rounded-[10px] transition-all duration-200',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        style={{
          width: '36px',
          height: '20px',
          background: checked ? 'var(--sk-pink)' : 'var(--sk-border)',
        }}
      >
        <span
          className="absolute top-[2px] rounded-full bg-white transition-all duration-200"
          style={{
            width: '16px',
            height: '16px',
            left: checked ? '18px' : '2px',
          }}
        />
      </button>

      {(label || sublabel) && (
        <div className="flex flex-col gap-1">
          {label && (
            <span
              className="text-sm font-medium"
              style={{
                color: 'var(--sk-text-primary)',
                fontFamily: 'var(--sk-font-body)',
              }}
            >
              {label}
            </span>
          )}
          {sublabel && (
            <span
              className="text-xs"
              style={{
                color: 'var(--sk-text-secondary)',
                fontFamily: 'var(--sk-font-body)',
              }}
            >
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
