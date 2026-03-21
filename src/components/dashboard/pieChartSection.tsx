import type { PieItem } from "@/types/pieType"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer,
} from "recharts"

interface PieChartSectionProps {
  data: PieItem[]
  isLoading: boolean
  formatCurrency: (value: number) => string
  total?: number
}

export function PieChartSection({
  data,
  isLoading,
  formatCurrency,
  total = 0,
}: PieChartSectionProps) {
  return (
    <section className="rounded-3xl border border-[#E7EBD8] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3">
        <h2 className="text-base font-bold text-[#243018] sm:text-lg">
          Distribución de Ingresos
        </h2>
        <p className="text-xs sm:text-sm text-[#6C775A]">
          Participación por departamento
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center">
          <div className="h-10 w-10 rounded-full border-[3px] border-[#2D5F4F] border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_1fr] lg:items-center">
          <div className="relative mx-auto h-[220px] w-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data as unknown as Record<string, unknown>[]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={84}
                  paddingAngle={2}
                  stroke="#fff"
                  strokeWidth={3}
                >
                  {data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <PieTooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E7EBD8",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-wide text-[#7A8567]">Total</p>
                <p className="text-sm font-bold text-[#243018]">{formatCurrency(total)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {data
              .slice()
              .sort((a, b) => b.value - a.value)
              .map((item) => {
                const percentage =
                  total > 0 ? ((item.value / total) * 100).toFixed(1) : "0.0"

                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3 rounded-xl bg-[#FAFBF7] px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-3 w-3 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="truncate text-sm font-medium text-[#2A351D]">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#5A7018]">
                      {percentage}%
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </section>
  )
}