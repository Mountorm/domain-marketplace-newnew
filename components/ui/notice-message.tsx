"use client"

import React, { useEffect, useState } from "react"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type NoticeType = "success" | "error" | "warning" | "info"

export interface NoticeMessageProps {
  type: NoticeType
  title: string
  description?: string
  duration?: number
  onClose?: () => void
  closable?: boolean
  className?: string
}

const noticeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-l-green-500",
    iconColor: "text-green-500",
    titleColor: "text-green-800 dark:text-green-200",
    descriptionColor: "text-green-600 dark:text-green-300"
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-l-red-500",
    iconColor: "text-red-500",
    titleColor: "text-red-800 dark:text-red-200",
    descriptionColor: "text-red-600 dark:text-red-300"
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-l-yellow-500",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-800 dark:text-yellow-200",
    descriptionColor: "text-yellow-600 dark:text-yellow-300"
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-l-blue-500",
    iconColor: "text-blue-500",
    titleColor: "text-blue-800 dark:text-blue-200",
    descriptionColor: "text-blue-600 dark:text-blue-300"
  }
}

export function NoticeMessage({
  type,
  title,
  description,
  duration = 4000,
  onClose,
  closable = true,
  className
}: NoticeMessageProps) {
  const [visible, setVisible] = useState(true)
  const config = noticeConfig[type]
  const Icon = config.icon

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      onClose?.()
    }, 300) // 等待动画完成
  }

  if (!visible) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]",
        "transform transition-all duration-300 ease-in-out",
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        className
      )}
    >
      <div
        className={cn(
          "rounded-lg border-l-4 p-4 shadow-lg backdrop-blur-sm",
          config.bgColor,
          config.borderColor,
          "border border-gray-200 dark:border-gray-700"
        )}
      >
        <div className="flex items-start space-x-3">
          <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.iconColor)} />
          
          <div className="flex-1 min-w-0">
            <h4 className={cn("text-sm font-medium", config.titleColor)}>
              {title}
            </h4>
            {description && (
              <p className={cn("mt-1 text-sm", config.descriptionColor)}>
                {description}
              </p>
            )}
          </div>

          {closable && (
            <button
              onClick={handleClose}
              className={cn(
                "flex-shrink-0 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800",
                "transition-colors duration-200",
                config.iconColor
              )}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// 全局通知管理器
interface NoticeItem extends NoticeMessageProps {
  id: string
}

class NoticeManager {
  private notices: NoticeItem[] = []
  private listeners: ((notices: NoticeItem[]) => void)[] = []

  subscribe(listener: (notices: NoticeItem[]) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.notices]))
  }

  add(notice: Omit<NoticeMessageProps, 'onClose'>) {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotice: NoticeItem = {
      ...notice,
      id,
      onClose: () => this.remove(id)
    }
    
    this.notices.push(newNotice)
    this.notify()
    
    return id
  }

  remove(id: string) {
    this.notices = this.notices.filter(notice => notice.id !== id)
    this.notify()
  }

  clear() {
    this.notices = []
    this.notify()
  }

  success(title: string, description?: string, duration?: number) {
    return this.add({ type: 'success', title, description, duration })
  }

  error(title: string, description?: string, duration?: number) {
    return this.add({ type: 'error', title, description, duration })
  }

  warning(title: string, description?: string, duration?: number) {
    return this.add({ type: 'warning', title, description, duration })
  }

  info(title: string, description?: string, duration?: number) {
    return this.add({ type: 'info', title, description, duration })
  }
}

export const noticeManager = new NoticeManager()

// React Hook
export function useNotice() {
  const [notices, setNotices] = useState<NoticeItem[]>([])

  useEffect(() => {
    return noticeManager.subscribe(setNotices)
  }, [])

  return { notices, noticeManager }
}

// 通知容器组件
export function NoticeContainer() {
  const { notices } = useNotice()

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      {notices.map((notice, index) => (
        <div
          key={notice.id}
          className="pointer-events-auto"
          style={{
            transform: `translateY(${index * 80}px)`
          }}
        >
          <NoticeMessage {...notice} />
        </div>
      ))}
    </div>
  )
}
