interface AnalyticsBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
  suffix?: string;
}

export function AnalyticsBar({ label, value, max, color, suffix }: AnalyticsBarProps) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 truncate text-sm text-warm-gray">{label}</span>
      <div className="relative h-7 flex-1 overflow-hidden rounded-full bg-light-gray">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-14 shrink-0 text-end text-sm font-medium text-charcoal">
        {value}{suffix}
      </span>
    </div>
  );
}
