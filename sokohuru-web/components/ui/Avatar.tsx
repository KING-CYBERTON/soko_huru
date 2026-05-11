import Image from 'next/image';
import { cn } from '@/lib/cn';

export interface AvatarProps {
  initials: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  alt?: string;
  className?: string;
}

export function Avatar({
  initials,
  size = 'md',
  src,
  alt,
  className,
}: AvatarProps) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 56,
    xl: 72,
  };

  const fontSizeMap = {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '18px',
    xl: '24px',
  };

  const sizePx = sizeMap[size];
  const fontSize = fontSizeMap[size];

  // Take first 2 characters of initials
  const displayInitials = initials.slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full overflow-hidden',
        className
      )}
      style={{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        background: 'var(--sk-pink-dark)',
        color: 'var(--sk-pink-light)',
        fontFamily: 'var(--sk-font-body)',
        fontSize,
        fontWeight: 600,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || displayInitials}
          width={sizePx}
          height={sizePx}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{displayInitials}</span>
      )}
    </div>
  );
}
