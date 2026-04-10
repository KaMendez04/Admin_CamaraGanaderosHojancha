import { useMemo, useState } from "react"
import { showConfirmDeleteAlert, showSuccessAlert, showErrorAlertEmpty } from "@/utils/alerts"

import { useUsers } from "@/hooks/settings/useUsers"
import { useUserMutations } from "@/hooks/settings/useUserMutations"
import UsersTable from "@/components/settings/UsersTable"
import CreateUserDialog from "@/components/settings/CreateUserDialog"
import { ActionButtons } from "@/components/ActionButtons"

function getApiErrorMessage(error: any) {
  if (Array.isArray(error?.response?.data?.message)) {
    return error.response.data.message.join(", ")
  }

  return (
    error?.response?.data?.message ||
    error?.message ||
    "Ocurrió un error"
  )
}

export default function SettingsUsersPage() {
  const q = useUsers()
  const m = useUserMutations()

  const [openCreate, setOpenCreate] = useState(false)

  const users = q.data ?? []
  const loading = q.isLoading
  const rows = useMemo(() => users, [users])

  const onDeactivate = async (id: number) => {
    const ok = await showConfirmDeleteAlert(
      "¿Desactivar usuario?",
      "El usuario no podrá iniciar sesión hasta que lo actives de nuevo.",
      "Sí, desactivar"
    )

    if (!ok) return

    try {
      await m.deactivate.mutateAsync(id)

      await showSuccessAlert("Usuario desactivado", "Usuario desactivado")
    } catch (e: any) {
      await showErrorAlertEmpty(getApiErrorMessage(e))
    }
  }

  const onActivate = async (id: number) => {
    try {
      await m.activate.mutateAsync(id)

      await showSuccessAlert("Usuario activado", "Usuario activado")
    } catch (e: any) {
      await showErrorAlertEmpty(getApiErrorMessage(e))
    }
  }

  return (
    <>
      <div className="rounded-2xl border border-[#E6E1D6] bg-white/90 shadow-sm">
        <div className="flex items-start justify-between gap-4 border-b border-[#E6E1D6] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-[#2E321B]">Usuarios</h2>
            <p className="mt-1 text-sm text-gray-600">
              Recuerda que no se pueden cambiar roles (solo al crear).
            </p>
          </div>

          <div className="pt-1">
            <ActionButtons showCreate onCreate={() => setOpenCreate(true)} />
          </div>
        </div>

        <div className="px-6 py-6 ">
          <UsersTable
            rows={rows}
            loading={loading}
            onDeactivate={onDeactivate}
            onActivate={onActivate}
          />
        </div>
      </div>

      <CreateUserDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        onCreate={async (payload) => {
          await m.create.mutateAsync(payload)
        }}
      />
    </>
  )
}