import clsx from 'clsx';

const statusStyles = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
};

interface DocumentStatusBadgeProps {
  status: string;
  label: string;
}

export function DocumentStatusBadge({ status, label }: DocumentStatusBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-700',
      )}
    >
      {status === 'processing' && (
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500" />
      )}
      {label}
    </span>
  );
}
