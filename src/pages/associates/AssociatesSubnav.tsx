import { GenericSubnav, type NavItem } from "../../components/GenericSubnav"

const items: NavItem[] = [
  {
    to: "/associates/requests",
    label: "Solicitudes Pendientes",
    exact: true,
  },
  {
    to: "/associates/approved",
    label: "Asociados Aprobados",
    exact: true,
  },
]

export default function AssociatesSubnav() {
  return (
    <div className="p-2">
      <GenericSubnav
        items={items}
        title="Gestión de Asociados"
        description="Gestiona solicitudes pendientes y asociados aprobados."
      />
    </div>
  )
}