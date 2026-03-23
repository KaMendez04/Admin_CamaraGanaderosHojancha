import { ActionButtons } from "@/components/ActionButtons"
import { GenericSubnav,  type NavItem} from "../../../components/GenericSubnav"
import { useNavigate } from "@tanstack/react-router"

const items: NavItem[] = [
  { to: "/budget", label: "Inicio", exact: true, allowedRoles: ["ADMIN", "JUNTA"] },
  { to: "/budget/pincome", label: "Proyección Ingresos", allowedRoles: ["ADMIN"] },
  { to: "/budget/pexpense", label: "Proyección Egresos", allowedRoles: ["ADMIN"] },
  { to: "/budget/income", label: "Ingresos", allowedRoles: ["ADMIN"] },
  { to: "/budget/expenses", label: "Egresos", allowedRoles: ["ADMIN"] },
  { to: "/budget/extra", label: "Extraordinario", allowedRoles: ["ADMIN"] },
  { to: "/budget/reports", label: "Reportes", allowedRoles: ["ADMIN", "JUNTA"] },
]

export default function BudgetSubnav() {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center gap-4">
       <ActionButtons
            size="sm"
            onBack={() => navigate({ to: "/Principal" })}
            showBack={true}
            backText="Regresar"
            showText={false}
          />
      <GenericSubnav items={items} layoutId="budget-subnav-active" />
    </div>
  )
}