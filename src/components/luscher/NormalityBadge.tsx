'use client';

interface NormalityBadgeProps {
  totalExclamations: number;
  percentileAbove: number;
  severity: 'normal' | 'elevated' | 'high' | 'very_high';
  labels: {
    percentAbove: string;
    normal: string;
    elevated: string;
    high: string;
    veryHigh: string;
  };
}

const SEVERITY_STYLES = {
  normal: 'bg-green-50 text-green-700 border-green-200',
  elevated: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  very_high: 'bg-red-50 text-red-700 border-red-200',
} as const;

const SEVERITY_DOT = {
  normal: 'bg-green-400',
  elevated: 'bg-yellow-400',
  high: 'bg-orange-400',
  very_high: 'bg-red-400',
} as const;

export function NormalityBadge({
  totalExclamations,
  percentileAbove,
  severity,
  labels,
}: NormalityBadgeProps) {
  const severityLabel = {
    normal: labels.normal,
    elevated: labels.elevated,
    high: labels.high,
    very_high: labels.veryHigh,
  }[severity];

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${SEVERITY_STYLES[severity]}`}>
      <span className={`h-2 w-2 rounded-full ${SEVERITY_DOT[severity]}`} />
      <span>{totalExclamations}!</span>
      <span className="opacity-60">|</span>
      <span>{percentileAbove}% {labels.percentAbove}</span>
      <span className="opacity-60">|</span>
      <span className="font-bold">{severityLabel}</span>
    </div>
  );
}
