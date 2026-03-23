import { useAuth } from "@/auth/AuthProvider"
import { GenericSubnav, type NavItem } from "../../components/GenericSubnav"

export default function LogsSubnav() {
  const { user } = useAuth() as any

  const items: NavItem[] = [
    {
      to: "/logs/budgetLogs",
      label: "Presupuesto",
      exact: true,
    },
    ...(user?.role?.name === "ADMIN"
      ? [
          {
            to: "/logs/usersLog",
            label: "Usuarios",
            exact: true,
          },
        ]
      : []),
  ]

  return <GenericSubnav items={items} />
}