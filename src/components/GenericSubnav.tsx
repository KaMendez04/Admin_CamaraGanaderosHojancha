import { Link, useLocation } from "@tanstack/react-router"
import { getCurrentUser } from "../auth/auth"
import type { RoleCode } from "../types/roles"

export type NavItem = {
  to: string
  label: string
  exact?: boolean
  allowedRoles?: RoleCode[]
}

type GenericSubnavProps = {
  items: NavItem[]
  title?: string
  description?: string
  className?: string
  layoutId?: string
}

export function GenericSubnav({
  items,
  title,
  description,
  className = "",
}: GenericSubnavProps) {
  const { pathname } = useLocation()

  const role = (getCurrentUser()?.role?.name ?? "").toUpperCase() as RoleCode

  const visibleItems = items.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(role),
  )

  const isActive = (path: string, exact?: boolean) =>
    exact ? pathname === path : pathname.startsWith(path)

  return (
    <div className={className}>
      {(title || description) && (
        <div className="mb-3">
          {title && (
            <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-slate-900 md:text-[22px]">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="inline-flex rounded-full border border-[#E8ECDD] bg-[#FAFBF8] p-1">
        {visibleItems.map((item) => {
          const active = isActive(item.to, item.exact)

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-white text-[#5F7728] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}