import React, { useRef, useEffect } from "react"
import { Bell, Trash2, X } from "lucide-react"
import { useNotifications } from "./NotificationContext"

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { notifications, unreadCount, markAsRead, deleteNotification, clearAll } = useNotifications()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleNotificationClick = (id: string) => {
    markAsRead(id)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#33361D] hover:text-[#5B732E] transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#5B732E] text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="
            fixed sm:absolute
            top-[4.5rem] sm:top-12
            left-4 right-4 sm:left-auto sm:right-0
            w-auto sm:w-[320px]
            max-h-[80vh]
            rounded-xl bg-white shadow-[0_8px_32px_rgba(46,50,27,0.08)] border border-[#E6E1D6] z-50 overflow-hidden
          "
        >
          <div className="px-5 py-4 flex items-center justify-between border-b border-[#E6E1D6] bg-[#F7F8F5]">
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-[#708C3E]" />
              <h3 className="text-[13px] font-semibold text-[#2E321B] tracking-tight">Notificaciones</h3>
            </div>
            <div className="flex items-center gap-3">
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-[11px] text-[#2E321B]/85 hover:text-[#7E342E] active:text-[#7E342E] transition-colors tracking-tight font-medium flex items-center gap-1 group/clear"
                >
                  <Trash2 className="w-3 h-3 text-[#2E321B]/75 group-hover/clear:text-[#7E342E] transition-colors" />
                  Limpiar
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#2E321B]/40 hover:text-[#2E321B] transition-colors"
                aria-label="Cerrar panel"
              >
                <X className="w-3.5 h-3.5 stroke-[1.5]" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto overflow-x-hidden max-h-[400px] scrollbar-hide bg-white">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-[12px] text-[#2E321B]/40 font-light italic">Silencio total por aquí...</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className="relative px-5 py-4 transition-all duration-300 cursor-pointer group hover:bg-[#F3F5EA]/50 border-b border-[#F7F8F5] last:border-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        {!notification.read && <div className="w-1.5 h-1.5 rounded-full bg-[#708C3E]" />}
                        <h4 className={`text-[12px] ${!notification.read ? "font-semibold text-[#2E321B]" : "font-medium text-[#2E321B]/75"} truncate`}>
                          {notification.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#2E321B]/70 line-clamp-2 leading-normal">
                        {notification.message}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                      className="opacity-100 p-1 text-[#2E321B]/20 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}