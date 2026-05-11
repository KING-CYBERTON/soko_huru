import { cn } from '@/lib/cn';

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

export function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  hint,
  disabled = false,
  required = false,
  name,
  id,
  className,
}: InputProps) {
  const inputId = id || name;

  return (
    <div className={cn('flex flex-col gap-[5px]', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium"
          style={{
            color: 'var(--sk-text-secondary)',
            fontFamily: 'var(--sk-font-body)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--sk-error)' }}> *</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={cn(
          'w-full px-[14px] py-[11px] text-[13px] outline-none transition-all duration-200',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        style={{
          background: 'var(--sk-surface-2)',
          border: error
            ? '0.5px solid var(--sk-error)'
            : '0.5px solid var(--sk-border)',
          borderRadius: 'var(--sk-radius-md)',
          color: 'var(--sk-text-primary)',
          fontFamily: 'var(--sk-font-body)',
        }}
        onFocus={(e) => {
          if (!error) {
            e.target.style.borderColor = 'var(--sk-pink)';
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.target.style.borderColor = 'var(--sk-border)';
          }
        }}
      />

      {error && (
        <span
          className="text-[11px]"
          style={{
            color: 'var(--sk-error-text)',
            fontFamily: 'var(--sk-font-body)',
          }}
        >
          {error}
        </span>
      )}

      {hint && !error && (
        <span
          className="text-[11px]"
          style={{
            color: 'var(--sk-text-muted)',
            fontFamily: 'var(--sk-font-body)',
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
