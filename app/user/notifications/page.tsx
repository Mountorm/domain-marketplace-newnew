"use client"

import { useState } from "react"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NotificationCard } from "@/components/ui/notification-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zhCN } from 'date-fns/locale'
import type { Notification, NotificationFilter } from "@/types/notification"

// 定义通知类型颜色映射
const typeColors = {
  order: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
  system: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
  security: "text-red-500 bg-red-50 dark:bg-red-900/20",
  payment: "text-green-500 bg-green-50 dark:bg-green-900/20",
}

// 模拟通知数据
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "订单状态更新",
    content: "您的订单 #ORD123456 已完成支付，等待域名转移确认。",
    type: "order",
    isRead: false,
    createdAt: "2025-05-14T10:00:00Z",
    link: "/user/orders/ORD123456",
    linkText: "查看订单详情"
  },
  {
    id: "2",
    title: "系统维护通知",
    content: "系统将于今晚23:00-24:00进行例行维护，期间可能影响部分功能使用。",
    type: "system",
    isRead: true,
    createdAt: "2025-05-13T08:00:00Z"
  },
  {
    id: "3",
    title: "安全提醒",
    content: "检测到您的账户在新设备上登录，如非本人操作请及时修改密码。",
    type: "security",
    isRead: false,
    createdAt: "2025-05-12T15:30:00Z",
    link: "/user/settings",
    linkText: "前往安全设置"
  }
]

export default function NotificationsPage() {
  // 状态管理
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [filter, setFilter] = useState<NotificationFilter>({})
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // 处理筛选
  const handleFilterChange = (key: keyof NotificationFilter, value: any) => {
    setFilter({ ...filter, [key]: value })
  }

  // 处理全选
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? notifications.map(n => n.id) : [])
  }

  // 处理单选
  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  // 标记已读/未读
  const handleMarkAs = (ids: string[], isRead: boolean) => {
    setNotifications(prev =>
      prev.map(n =>
        ids.includes(n.id) ? { ...n, isRead } : n
      )
    )
    setSelectedIds([])
  }

  // 删除通知
  const handleDelete = (ids: string[]) => {
    setNotifications(prev =>
      prev.filter(n => !ids.includes(n.id))
    )
    setSelectedIds([])
  }

  // 打开通知详情
  const handleNotificationClick = (notification: Notification) => {
    setCurrentNotification(notification)
    setIsDialogOpen(true)
    if (!notification.isRead) {
      handleMarkAs([notification.id], true)
    }
  }

  // 过滤通知
  const filteredNotifications = notifications.filter(n => {
    if (filter.type && n.type !== filter.type) return false
    if (filter.isRead !== undefined && n.isRead !== filter.isRead) return false
    if (filter.keyword && !n.title.includes(filter.keyword) && !n.content.includes(filter.keyword)) return false
    if (filter.startDate && new Date(n.createdAt) < filter.startDate) return false
    if (filter.endDate && new Date(n.createdAt) > filter.endDate) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">我的通知</h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => handleMarkAs(selectedIds, true)}
            disabled={selectedIds.length === 0}
          >
            标记已读
          </Button>
          <Button
            variant="outline"
            onClick={() => handleMarkAs(selectedIds, false)}
            disabled={selectedIds.length === 0}
          >
            标记未读
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(selectedIds)}
            disabled={selectedIds.length === 0}
          >
            删除所选
          </Button>
        </div>
      </div>

      {/* 过滤器 */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Label>类型</Label>
          <Select
            value={filter.type}
            onValueChange={(value: any) => handleFilterChange('type', value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="全部类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">订单相关</SelectItem>
              <SelectItem value="system">系统通知</SelectItem>
              <SelectItem value="security">安全提醒</SelectItem>
              <SelectItem value="payment">支付通知</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Label>状态</Label>
          <Select
            value={filter.isRead?.toString()}
            onValueChange={(value) => 
              handleFilterChange('isRead', value === 'true' ? true : value === 'false' ? false : undefined)
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="全部状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">已读</SelectItem>
              <SelectItem value="false">未读</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Label>时间范围</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-48">
                {filter.startDate ? (
                  filter.endDate ? (
                    `${format(filter.startDate, 'yyyy-MM-dd')} 至 ${format(filter.endDate, 'yyyy-MM-dd')}`
                  ) : (
                    format(filter.startDate, 'yyyy-MM-dd')
                  )
                ) : (
                  '选择时间范围'
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: filter.startDate,
                  to: filter.endDate,
                }}
                onSelect={(range) => {
                  handleFilterChange('startDate', range?.from)
                  handleFilterChange('endDate', range?.to)
                }}
                locale={zhCN}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-2">
          <Label>关键词</Label>
          <Input
            placeholder="搜索通知内容"
            value={filter.keyword || ''}
            onChange={(e) => handleFilterChange('keyword', e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      {/* 列表头部 */}
      <Card>
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2 p-4">
            <Checkbox
              checked={selectedIds.length === notifications.length}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm text-gray-500">
              {selectedIds.length > 0
                ? `已选择 ${selectedIds.length} 项`
                : `共 ${notifications.length} 条通知`}
            </span>
          </div>
        </div>

        {/* 通知列表 */}
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={cn(
                "flex items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                !notification.isRead && "bg-blue-50/50 dark:bg-blue-900/10"
              )}
            >
              <Checkbox
                checked={selectedIds.includes(notification.id)}
                onCheckedChange={() => handleSelect(notification.id)}
                className="mt-1.5"
              />
              <div 
                className="flex-1 ml-4 cursor-pointer"
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{notification.title}</span>
                    <Badge className={cn("text-xs", typeColors[notification.type])}>
                      {
                        notification.type === 'order' ? '订单相关' :
                        notification.type === 'system' ? '系统通知' :
                        notification.type === 'security' ? '安全提醒' :
                        '支付通知'
                      }
                    </Badge>
                    {!notification.isRead && (
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(notification.createdAt), 'yyyy-MM-dd HH:mm', { locale: zhCN })}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  {notification.content}
                </p>
                {notification.link && (
                  <Button variant="link" className="h-auto p-0 text-sm">
                    {notification.linkText || '查看详情'}
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMarkAs([notification.id], !notification.isRead)}
                >
                  {notification.isRead ? '标为未读' : '标为已读'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete([notification.id])}
                  className="text-red-500 hover:text-red-600"
                >
                  删除
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 通知详情弹窗 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          {currentNotification && (
            <>
              <DialogHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">{currentNotification.title}</DialogTitle>
                  <Badge className={cn("text-xs", typeColors[currentNotification.type])}>
                    {
                      currentNotification.type === 'order' ? '订单相关' :
                      currentNotification.type === 'system' ? '系统通知' :
                      currentNotification.type === 'security' ? '安全提醒' :
                      '支付通知'
                    }
                  </Badge>
                </div>
                <DialogDescription className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500">
                    发送时间：{format(new Date(currentNotification.createdAt), 'yyyy-MM-dd HH:mm:ss', { locale: zhCN })}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className={cn("text-sm", currentNotification.isRead ? "text-gray-500" : "text-blue-500")}>
                    {currentNotification.isRead ? "已读" : "未读"}
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-base leading-relaxed">
                    {currentNotification.content}
                  </p>
                </div>
                {currentNotification.link && (
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      关闭
                    </Button>
                    <Button asChild>
                      <a href={currentNotification.link}>
                        {currentNotification.linkText || '查看详情'}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
