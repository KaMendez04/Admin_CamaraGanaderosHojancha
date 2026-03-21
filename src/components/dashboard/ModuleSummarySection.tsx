import { Globe, Users, UserCheck, DollarSign } from "lucide-react"
import { getCurrentUser } from "../../auth/auth"
import { useModuleCounts } from "../../hooks/dashboard/useModuleCounts"
import { crc } from "../../utils/crcDateUtil"
import { ModuleCard } from "./moduleCard"
import type { FiscalYear } from "../../hooks/Budget/useFiscalYear"
import { useAssociatesSolicitudesPolling } from "../../hooks/notification/useAssociatesSolicitudesPolling"
import { useVolunteerSolicitudesPolling } from "../../hooks/notification/useVolunteerSolicitudesPolling"

interface ModuleSummarySectionProps {
  currentBalance?: number
  fiscalYear?: FiscalYear
}

export function ModuleSummarySection({
  currentBalance = 0,
  fiscalYear,
}: ModuleSummarySectionProps) {
  const role = getCurrentUser()?.role?.name?.toUpperCase()
  const isAdmin = role === "ADMIN"

  const counts = useModuleCounts()
  const { pendingCount: pendingAssociates } = useAssociatesSolicitudesPolling()
  const { pendingCount: pendingVolunteers } = useVolunteerSolicitudesPolling()

  const modules = [
    ...(isAdmin
      ? [
          {
            title: "Contenido Público",
            description: "Editar sitio web",
            subtitle: "Web",
            icon: Globe,
            route: "/edition/principal",
          },
        ]
      : []),
    {
      title: "Personal",
      description: "Gestión de personal",
      subtitle: counts.personal.count,
      icon: Users,
      route: "/staff",
      isLoading: counts.personal.isLoading,
    },
    {
      title: "Asociados",
      description:
        pendingAssociates > 0
          ? `${pendingAssociates} pendiente${pendingAssociates > 1 ? "s" : ""}`
          : "Gestión de miembros",
      subtitle: counts.associates.count,
      icon: UserCheck,
      route: "/associates",
      isLoading: counts.associates.isLoading,
      badge: pendingAssociates > 0 ? pendingAssociates : undefined,
    },
    {
      title: "Voluntarios",
      description:
        pendingVolunteers > 0
          ? `${pendingVolunteers} pendiente${pendingVolunteers > 1 ? "s" : ""}`
          : "Gestión de voluntarios",
      subtitle: counts.volunteers.count,
      icon: Users,
      route: "/volunteers",
      isLoading: counts.volunteers.isLoading,
      badge: pendingVolunteers > 0 ? pendingVolunteers : undefined,
    },
    {
      title: fiscalYear ? `Presupuesto ${fiscalYear.year}` : "Presupuesto",
      description: "Balance actual",
      subtitle: crc(currentBalance),
      icon: DollarSign,
      route: "/budget",
    },
  ]

  return (
    <section>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {modules.map((module, index) => (
          <ModuleCard key={index} {...module} />
        ))}
      </div>
    </section>
  )
}