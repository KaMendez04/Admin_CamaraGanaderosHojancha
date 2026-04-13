import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { AddNotificationType, NotificationContextType, Notification } from "../../models/notification/Notification"
import { toast } from "sonner"
import { X } from "lucide-react"

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem("app_notifications")
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed.map((n: any) => ({
          id: n.id,
          title: n.title,
          message: n.message,
          type: n.type,
          timestamp: new Date(n.timestamp),
          read: n.read,
        }))
      }
    } catch (error) {
      console.error("Error loading notifications:", error)
    }
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem("app_notifications", JSON.stringify(notifications))
    } catch (error) {
      console.error("Error saving notifications:", error)
    }
  }, [notifications])

  const unreadCount = notifications.filter((n) => !n.read).length




  const addNotification = (notification: AddNotificationType) => {
    
    const newNotification: Notification = {
      id: `${Date.now()}-${Math.random()}`,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => {
      return [newNotification, ...prev]
    })
    
    toast.custom(
      (t) => (
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border-b-2 border-[#5B732E]/70 p-3.5 w-[320px] relative transition-all duration-300 group">
          <div className="flex flex-col gap-0.5 pr-6">
            <h4 className="text-[13px] font-bold text-[#33361D] flex items-center">
              {notification.title}
            </h4>
            <p className="text-[12px] text-slate-500 leading-snug truncate">
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="absolute right-2.5 top-2.5 p-1 rounded-lg text-slate-300 hover:text-slate-500 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
      {
        duration: 8000,
        position: "top-right",
      },
    )
      }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications debe usarse dentro de NotificationProvider")
  }
  return context
}