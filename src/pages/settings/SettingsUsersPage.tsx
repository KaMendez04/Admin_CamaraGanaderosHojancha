import { useMemo, useState } from "react"
import Swal from "sweetalert2"

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
    const r = await Swal.fire({
      title: "¿Desactivar usuario?",
      html: `El usuario no podrá iniciar sesión hasta que lo actives de nuevo.`,
      icon: "warning",
      iconColor: "#CDBF6A",
      background: "#F7F3E8",
      color: "#1F3D2C",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
      buttonsStyling: false,
      scrollbarPadding: false,
      customClass: {
        popup: "rounded-[32px] px-8 py-10",
        title: "!text-[#1F3D2C] !text-3xl !font-extrabold",
        htmlContainer: "!text-[#556B2F] !text-lg !leading-relaxed",
        actions: "!mt-8 !flex !gap-6",
        confirmButton:
          "!bg-[#E3342F] !text-white !font-bold !rounded-full !px-8 !py-4 !shadow-[0_10px_25px_rgba(227,52,47,0.22)] hover:!bg-[#cf2e2a] transition",
        cancelButton:
          "!bg-[#789A3B] !text-white !font-bold !rounded-full !px-8 !py-4 !shadow-[0_10px_25px_rgba(120,154,59,0.22)] hover:!bg-[#6c8c34] transition",
      },
    })

    if (!r.isConfirmed) return

    try {
      await m.deactivate.mutateAsync(id)

      await Swal.fire({
        icon: "success",
        title: "Usuario desactivado",
        timer: 1200,
        showConfirmButton: false,
      })
    } catch (e: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: getApiErrorMessage(e),
      })
    }
  }

  const onActivate = async (id: number) => {
    try {
      await m.activate.mutateAsync(id)

      await Swal.fire({
        icon: "success",
        title: "Usuario activado",
        timer: 1200,
        showConfirmButton: false,
      })
    } catch (e: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: getApiErrorMessage(e),
      })
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