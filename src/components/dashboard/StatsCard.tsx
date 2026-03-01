interface StatsCardProps {
  label: string;
  value: string | number;
  icon: string;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-warm-gray">{label}</p>
          <p className="mt-1 text-3xl font-bold text-charcoal">{value}</p>
        </div>
        <span className="text-3xl opacity-40">{icon}</span>
      </div>
    </div>
  );
}
