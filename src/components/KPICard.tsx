interface KPICardProps {
  label: string;
  value: string | number;
  tone?: "base" | "gold";
}

export function KPICard({ label, value, tone = "base" }: KPICardProps) {
  const toneMap = {
    base: "bg-[#EAEFE0] border border-[#d7dfc7] text-slate-900",
    gold: "bg-[#fdf5e4] border border-[#F1E3B7] text-[#8A6A19]",
  } as const;

  return (
    <div className={`min-w-[150px] rounded-2xl px-6 py-4 ${toneMap[tone]}`}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-[22px] font-semibold leading-none">
        {value}
      </div>
    </div>
  );
}