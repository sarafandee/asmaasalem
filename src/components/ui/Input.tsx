import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        id={inputId}
        className={clsx(
          'w-full rounded-lg border border-gray/50 bg-white px-4 py-3 text-base text-charcoal transition-colors duration-200',
          'placeholder:text-gray focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
