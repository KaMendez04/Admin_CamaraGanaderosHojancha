import { useMemo, useState } from "react"
import { crc } from "../utils/crcDateUtil"
import { BarChartSection } from "../components/dashboard/barChartSection"
import { PieChartSection } from "../components/dashboard/pieChartSection"
import { ModuleSummarySection } from "../components/dashboard/ModuleSummarySection"
import { useAssociatesSolicitudesPolling } from "../hooks/notification/useAssociatesSolicitudesPolling"
import { useInitial } from "../hooks/Budget/useInitial"
import { useFiscalYear } from "../hooks/Budget/useFiscalYear"
import type { PieItem } from "@/types/pieType"

const COLORS = ["#5A7018", "#7A8F35", "#9FB55B", "#D4B55A", "#8B6C2E", "#2D5F4F"]

function combineIncomeAndSpendByDepartment(
  incomeDepts: any[] = [],
  spendDepts: any[] = []
) {
  const deptMap = new Map<string, { ingresos: number; egresos: number }>()

  incomeDepts.forEach((dept) => {
    const name = dept.department || dept.departmentName || dept.name || "Sin departamento"
    if (!deptMap.has(name)) {
      deptMap.set(name, { ingresos: 0, egresos: 0 })
    }
    deptMap.get(name)!.ingresos += Number(
      dept.spent ?? 0
    )
  })

  spendDepts.forEach((dept) => {
    const name = dept.department || dept.departmentName || dept.name || "Sin departamento"
    if (!deptMap.has(name)) {
      deptMap.set(name, { ingresos: 0, egresos: 0 })
    }
    deptMap.get(name)!.egresos += Number(
      dept.spent ?? 0
    )
  })

  return Array.from(deptMap.entries())
    .map(([name, values]) => ({
      name,
      ingresos: values.ingresos,
      egresos: values.egresos,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export default function DashboardPage() {
  useAssociatesSolicitudesPolling()

  const { current: fiscalYear } = useFiscalYear()
  const [range] = useState({ startDate: "", endDate: "" })
  const { cards, incomeRows, spendRows, loading } = useInitial(range)

  const barChartData = useMemo(
    () =>
      combineIncomeAndSpendByDepartment(
        incomeRows ?? [],
        spendRows ?? []
      ),
    [incomeRows, spendRows]
  )

  const pieChartData = useMemo<PieItem[]>(
    () =>
      (incomeRows ?? []).map((dept: any, index: number) => ({
        name: dept.department || dept.departmentName || dept.name || "Sin departamento",
        value: Number(dept.spent ?? 0),
        color: COLORS[index % COLORS.length],
      })),
    [incomeRows]
  )

  const totalIncome = useMemo(
    () => pieChartData.reduce((acc: number, item: PieItem) => acc + item.value, 0),
    [pieChartData]
  )

  return (
    <main className="min-h-screen bg-[#F7F8F4]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
        <ModuleSummarySection
          currentBalance={cards.saldoRestante}
          fiscalYear={fiscalYear ?? undefined}
        />

        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <BarChartSection
            data={barChartData}
            isLoading={loading}
            formatCurrency={crc}
          />

          <PieChartSection
            data={pieChartData}
            isLoading={loading}
            formatCurrency={crc}
            total={totalIncome}
          />
        </section>
      </div>
    </main>
  )
}