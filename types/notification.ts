export type NotificationType = 'order' | 'system' | 'security' | 'payment'

export interface Notification {
  id: string
  title: string
  content: string
  type: NotificationType
  isRead: boolean
  createdAt: string
  link?: string
  linkText?: string
}

export interface NotificationFilter {
  type?: NotificationType
  startDate?: Date
  endDate?: Date
  keyword?: string
  isRead?: boolean
}
