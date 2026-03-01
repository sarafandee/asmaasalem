'use client';

import clsx from 'clsx';

interface ColorCardProps {
  hex: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
  order?: number;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorCard({
  hex,
  label,
  selected = false,
  disabled = false,
  order,
  onClick,
  size = 'md',
}: ColorCardProps) {
  const sizeClasses = {
    sm: 'h-12 w-12 rounded-lg',
    md: 'h-20 w-20 rounded-xl',
    lg: 'h-28 w-28 rounded-2xl',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || selected}
      title={label}
      className={clsx(
        'relative transition-all duration-200',
        sizeClasses[size],
        selected
          ? 'scale-90 opacity-30 ring-0 cursor-default'
          : disabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer shadow-[var(--shadow-sm)] hover:scale-105 hover:shadow-[var(--shadow-md)] active:scale-95',
      )}
      style={{ backgroundColor: hex }}
    >
      {order !== undefined && (
        <span className="absolute -top-2 -end-2 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-xs font-bold text-white shadow">
          {order}
        </span>
      )}
    </button>
  );
}
