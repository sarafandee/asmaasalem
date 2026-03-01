import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'default' | 'large';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'default',
  className,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 cursor-pointer';

  const variants = {
    primary: 'bg-[var(--color-accent)] text-white hover:opacity-90 hover:shadow-lg',
    outline: 'border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white',
    ghost: 'text-[var(--color-accent)] hover:underline',
  };

  const sizes = {
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const styles = clsx(baseStyles, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className);

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
