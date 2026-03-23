import { GenericSubnav, type NavItem } from "../../components/GenericSubnav"

const items: NavItem[] = [
  {
    to: "/volunteers/requests",
    label: "Solicitudes Pendientes",
    exact: true,
  },
  {
    to: "/volunteers/approved",
    label: "Voluntarios Aprobados",
    exact: true,
  },
]

export default function VolunteersSubnav() {
  return (
    <div className="p-2">
    <GenericSubnav
      items={items}
      title="Gestión de Voluntarios"
      description="Gestiona solicitudes pendientes y voluntarios aprobados."
    />
    </div>
  )
}