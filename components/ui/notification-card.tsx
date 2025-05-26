"use client"

import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Bell, CheckCircle, AlertCircle, CreditCard, Settings } from 'lucide-react'
import { Card } from './card'
import { Button } from './button'
import { cn } from '@/lib/utils'
import type { Notification } from '@/types/notification'

const typeIcons = {
  order: CreditCard,
  system: Settings,
  security: AlertCircle,
  payment: Bell,
}

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
  onClick: (notification: Notification) => void
}

export function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
  onClick,
}: NotificationCardProps) {
  const Icon = typeIcons[notification.type]
  
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        !notification.isRead && "bg-blue-50 dark:bg-blue-900/20"
      )}
      onClick={() => onClick(notification)}
    >
      <div className="flex items-start space-x-4 p-4">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">{notification.title}</h4>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
                locale: zhCN,
              })}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {notification.content}
          </p>
          {notification.link && (
            <a
              href={notification.link}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {notification.linkText || '查看详情'}
            </a>
          )}
        </div>
        <div className="flex-shrink-0 space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onMarkAsRead(notification.id)
            }}
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(notification.id)
            }}
          >
            删除
          </Button>
        </div>
      </div>
    </Card>
  )
}
