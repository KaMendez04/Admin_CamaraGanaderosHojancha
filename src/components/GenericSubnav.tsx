import { useMemo, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { getCurrentUser } from "../auth/auth";
import type { RoleCode } from "../types/roles";

export type NavItem = {
  to: string;
  label: string;
  exact?: boolean;
  allowedRoles?: RoleCode[];
};

type GenericSubnavProps = {
  items: NavItem[];
  title?: string;
  description?: string;
  className?: string;
  layoutId?: string;
};

export function GenericSubnav({
  items,
  title,
  description,
  className = "",
}: GenericSubnavProps) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = (getCurrentUser()?.role?.name ?? "").toUpperCase() as RoleCode;

  const visibleItems = useMemo(
    () =>
      items.filter(
        (item) => !item.allowedRoles || item.allowedRoles.includes(role)
      ),
    [items, role]
  );

  const hasManyItems = visibleItems.length > 2;

  const isActive = (path: string, exact?: boolean) =>
    exact ? pathname === path : pathname.startsWith(path);

  return (
    <div className={className}>
      {(title || description) && (
        <div className="mb-3">
          {title && (
            <h1 className="text-[26px] font-bold tracking-[-0.02em] text-slate-900 md:text-[26px]">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
      )}

      {/* Desktop / tablet */}
      <div className="hidden sm:inline-flex rounded-full border border-[#E8ECDD] bg-[#FAFBF8] p-1">
        {visibleItems.map((item) => {
          const active = isActive(item.to, item.exact);

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
          );
        })}
      </div>

      {/* Mobile: 2 o menos items */}
      {!hasManyItems && (
        <div className="inline-flex flex-wrap justify-center rounded-full border border-[#E8ECDD] bg-[#FAFBF8] sm:hidden">
          {visibleItems.map((item) => {
            const active = isActive(item.to, item.exact);

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
            );
          })}
        </div>
      )}

      {/* Mobile: más de 2 items */}
      {hasManyItems && (
        <div className="relative sm:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-[#E8ECDD] bg-[#FAFBF8] px-14 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Secciones
          </button>

          {mobileOpen && (
            <>
              {/* Overlay para cerrar al hacer click fuera */}
              <div
                className="fixed inset-0 z-40 bg-black/20"
                onClick={() => setMobileOpen(false)}
              />
              {/* Menú flotante */}
              <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-3xl border border-[#E8ECDD] bg-[#FAFBF8] p-3 shadow-lg">
                {/* Botón de cerrar */}
                <div className="mb-2 flex items-center justify-between px-2">
                  <span className="text-xs font-medium text-slate-500">Secciones</span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-white hover:text-slate-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  {visibleItems.map((item) => {
                    const active = isActive(item.to, item.exact);

                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className={`flex w-full items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                          active
                            ? "bg-white text-[#5F7728] shadow-sm"
                            : "text-slate-600 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}