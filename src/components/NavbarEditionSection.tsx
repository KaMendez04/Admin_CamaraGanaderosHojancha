import { ActionButtons } from "./ActionButtons"
import { GenericSubnav, type NavItem } from "./GenericSubnav"
import { useNavigate } from "@tanstack/react-router"


const items: NavItem[] = [
  {
    to: "/edition/principal",
    label: "Principal",
    exact: true,
    allowedRoles: ["ADMIN"],
  },
  {
    to: "/edition/about",
    label: "Sobre Nosotros",
    allowedRoles: ["ADMIN"],
  },
  {
    to: "/edition/servicios",
    label: "Servicios",
    allowedRoles: ["ADMIN"],
  },
  {
    to: "/edition/associates",
    label: "Asociados",
    allowedRoles: ["ADMIN"],
  },
  {
    to: "/edition/volunteers",
    label: "Voluntarios",
    allowedRoles: ["ADMIN"],
  },
  {
    to: "/edition/faq",
    label: "Preguntas",
    allowedRoles: ["ADMIN"],
  },
  {
    to: "/edition/events",
    label: "Eventos",
    allowedRoles: ["ADMIN"],
  },
]

export default function NavbarEditionSection() {
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
    
    <GenericSubnav
      items={items}
      layoutId="edition-subnav-active"
      className="flex justify-center"
    />
    </div>
  )
}