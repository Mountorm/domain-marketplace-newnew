"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Upload, Mail, Phone, Shield, ArrowRight } from "lucide-react"
import { noticeManager } from "@/components/ui/notice-message"

export default function UserProfilePage() {
  // 状态管理
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // 模拟待处理订单数据
  const pendingOrders = [
    {
      id: "ORD123456",
      domain: "crypto.io",
      price: 75000,
      status: "pending_payment",
      date: "2023-05-10",
    },
    {
      id: "ORD123457",
      domain: "travel.app",
      price: 28000,
      status: "pending_transfer",
      date: "2023-05-08",
    },
    {
      id: "ORD123458",
      domain: "health.co",
      price: 32000,
      status: "pending_confirmation",
      date: "2023-05-05",
    }
  ]

  // 订单状态映射
  const statusMap: Record<string, { label: string; color: string }> = {
    pending_payment: { label: "待付款", color: "bg-yellow-500" },
    pending_transfer: { label: "待转移", color: "bg-blue-500" },
    pending_confirmation: { label: "待确认", color: "bg-purple-500" },
    pending_settlement: { label: "待结算", color: "bg-indigo-500" },
    completed: { label: "已完成", color: "bg-green-500" },
    cancelled: { label: "已取消", color: "bg-gray-500" },
    disputed: { label: "争议中", color: "bg-red-500" },
  }

  // 模拟用户数据
  const userData = {
    name: "Admin",
    email: "admin@190.vip",
    phone: "123-456-7890",
    verified: true,
    twoFactorEnabled: true,
    joinDate: "2022-05-15",
    lastLogin: "2023-05-12 14:30:22",
    completedOrders: 8,
    listedDomains: 3,
  }

  // 处理保存按钮点击
  const handleSave = () => {
    setIsSaving(true)

    // 模拟保存请求
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      noticeManager.success(
        "个人信息已保存",
        "您的个人资料已成功更新"
      )
    }, 1000)
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">账户主页</h1>

      {/* 待处理订单快捷入口 */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>待处理的订单</CardTitle>
            <CardDescription>需要您处理的最新订单</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {pendingOrders.map((order) => (
                <Link href={`/user/orders/${order.id}`} key={order.id}>
                  <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{order.domain}</span>
                          <Badge className={statusMap[order.status].color}>
                            {statusMap[order.status].label}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{order.date}</span>
                          <span className="font-medium text-[#FF6A00]">${order.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" asChild>
                <Link href="/user/orders">
                  <span className="flex items-center">
                    查看全部订单
                  </span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* 个人信息卡片 */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>个人信息</CardTitle>
              <CardDescription>管理您的个人资料信息</CardDescription>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              disabled={isSaving}
            >
              {isEditing ? (isSaving ? "保存中..." : "保存") : "编辑资料"}
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6 flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="用户头像" />
                <AvatarFallback>用户</AvatarFallback>
              </Avatar>

              {isEditing && (
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    <span>上传新头像</span>
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">支持 JPG, PNG 格式，最大 2MB</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">用户名</Label>
                  <Input id="name" defaultValue={userData.name} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email">邮箱</Label>
                    {userData.verified && (
                      <Badge variant="outline" className="flex items-center gap-1 text-green-500">
                        <CheckCircle className="h-3 w-3" />
                        <span>已验证</span>
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <Input id="email" defaultValue={userData.email} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <Input id="phone" defaultValue={userData.phone} disabled={!isEditing} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快捷通知卡片 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle>最新通知</CardTitle>
            </div>

          </CardHeader>
          <CardContent className="space-y-3 px-2">
            <Link href="" className="block">
              <div className="flex cursor-pointer items-start space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">域名所有权验证成功</p>
                  <p className="line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    您的域名 example.com 已成功验证所有权，现在可以开始出售了。
                  </p>
                  <p className="text-xs text-gray-400">10分钟前</p>
                </div>
              </div>
            </Link>

            <Link href="" className="block">
              <div className="flex cursor-pointer items-start space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-50 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">域名订单提醒</p>
                  <p className="line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    有人购买了您的域名 domain.com ，请及时处理。
                  </p>
                  <p className="text-xs text-gray-400">2小时前</p>
                </div>
              </div>
            </Link>

            <Link href="" className="block">
              <div className="flex cursor-pointer items-start space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-200">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">交易完成</p>
                  <p className="line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    订单 #ORD123456 已完成，资金将在72小时内到账。
                  </p>
                  <p className="text-xs text-gray-400">1天前</p>
                </div>
              </div>
            </Link>

            <Link
              href="/user/notifications"
              className="flex items-center justify-center space-x-2 rounded-lg py-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <span>查看全部通知</span>
            </Link>
          </CardContent>
        </Card>

        {/* 账户统计卡片 */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>账户统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">注册时间</p>
                <p className="text-xl font-bold">{userData.joinDate}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">最近登录</p>
                <p className="text-xl font-bold">{userData.lastLogin}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">已完成订单</p>
                <p className="text-xl font-bold">{userData.completedOrders}</p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">上架域名</p>
                <p className="text-xl font-bold">{userData.listedDomains}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
