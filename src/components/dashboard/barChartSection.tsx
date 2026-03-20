import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface BarChartSectionProps {
  data: Array<{ name: string; ingresos: number; egresos: number }>
  isLoading: boolean
  formatCurrency: (value: number) => string
}

export function BarChartSection({
  data,
  isLoading,
  formatCurrency,
}: BarChartSectionProps) {
  const chartHeight = Math.max(260, data.length * 42)

  return (
    <section className="rounded-3xl border border-[#E7EBD8] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3">
        <h2 className="text-base font-bold text-[#243018] sm:text-lg">
          Ingresos vs Egresos
        </h2>
        <p className="text-xs sm:text-sm text-[#6C775A]">
          Comparativa por departamento
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center">
          <div className="h-10 w-10 rounded-full border-[3px] border-[#5A7018] border-t-transparent animate-spin" />
        </div>
      ) : (
        <div style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
              barCategoryGap={10}
            >
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5A7018" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#9FB55B" stopOpacity={0.85} />
                </linearGradient>
                <linearGradient id="spendGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C9A24B" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#E2C675" stopOpacity={0.85} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#EEF1E3" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#778062" }} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={95}
                tick={{ fontSize: 11, fill: "#344224", fontWeight: 600 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E7EBD8",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="ingresos" fill="url(#incomeGradient)" radius={[0, 8, 8, 0]} maxBarSize={16} />
              <Bar dataKey="egresos" fill="url(#spendGradient)" radius={[0, 8, 8, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  )
}