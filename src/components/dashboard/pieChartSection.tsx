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

const FALLBACK_COLORS = [
  "#9FB55B",
  "#7E972F",
  "#D9BA5A",
  "#6E8B3D",
  "#B8933F",
  "#4E7A5D",
  "#A7B96B",
  "#8F6F2F",
]

function isValidColor(color?: string) {
  return typeof color === "string" && color.trim().length > 0
}

export function PieChartSection({
  data,
  isLoading,
  formatCurrency,
  total = 0,
}: PieChartSectionProps) {
  const safeData = (Array.isArray(data) ? data : []).map((item, index) => ({
    ...item,
    color: isValidColor(item.color)
      ? item.color
      : FALLBACK_COLORS[index % FALLBACK_COLORS.length],
  }))

  const chartData = safeData.filter((item) => Number(item.value) > 0)
  const hasData = safeData.length > 0

  return (
    <section className="rounded-3xl border border-[#E7EBD8] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3">
        <h2 className="text-base font-bold text-[#243018] sm:text-lg">
          Distribución de Ingresos
        </h2>
        <p className="text-xs text-[#6C775A] sm:text-sm">
          Participación por departamento
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#2D5F4F] border-t-transparent" />
        </div>
      ) : !hasData ? (
        <div className="flex h-[260px] items-center justify-center text-sm text-[#6C775A]">
          No hay datos disponibles.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr] lg:items-center">
          <div className="relative mx-auto h-[220px] w-[220px] shrink-0 overflow-hidden">
            {chartData.length > 0 ? (
              <ResponsiveContainer width={220} height={220}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={84}
                    paddingAngle={2}
                    minAngle={2}
                    stroke="#fff"
                    strokeWidth={3}
                  >
                    {chartData.map((item, index) => (
                      <Cell
                        key={`${item.name}-${index}`}
                        fill={item.color}
                      />
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
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-[#6C775A]">
                Sin valores positivos
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-7">
              <div className="max-w-[120px] text-center">
                <p className="text-[10px] uppercase tracking-wide text-[#7A8567] sm:text-[11px]">
                  Total
                </p>
                <p className="break-words text-xs font-bold leading-tight text-[#243018] sm:text-sm">
                  {formatCurrency(total)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {safeData
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

                    <span className="shrink-0 text-xs font-bold text-[#5A7018]">
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