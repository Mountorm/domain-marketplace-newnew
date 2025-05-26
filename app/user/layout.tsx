"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, ShoppingCart, Wallet, Upload, Settings, LogOut, Menu, X, TicketIcon, Bell } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// 模拟未读通知数量
const UNREAD_COUNT = 3;

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 用户中心导航项
  const navItems = [
    {
      title: "账户主页",
      href: "/user",
      icon: User,
      exact: true,
    },
    {
      title: "我的上架",
      href: "/user/listings",
      icon: Upload,
    },
    {
      title: "订单管理",
      href: "/user/orders",
      icon: ShoppingCart,
    },
    {
      title: "我的钱包",
      href: "/user/wallet",
      icon: Wallet,
    },
    {
      title: "工单管理",
      href: "/user/tickets",
      icon: TicketIcon,
    },
    {
      title: "我的通知",
      href: "/user/notifications",
      icon: Bell,
      badge: UNREAD_COUNT,
    },
    {
      title: "账户设置",
      href: "/user/settings",
      icon: Settings,
    },
  ]

  // 检查路径是否匹配
  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  // 处理登出
  const handleLogout = () => {
    localStorage.removeItem("auth-token")
    window.location.href = "/"
  }

  // 关闭移动端菜单
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* 移动端菜单按钮 */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <h1 className="text-2xl font-bold">用户中心</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* 侧边栏 */}
        <aside className={cn("w-full lg:w-64 lg:shrink-0", isMobileMenuOpen ? "block" : "hidden lg:block")}>
          <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {/* 用户信息 */}
            <div className="mb-6 flex flex-col items-center text-center">
              <Avatar className="mb-4 h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="用户头像" />
                <AvatarFallback>190</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">Admin</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">admin@190.vip</p>
            </div>

            {/* 导航菜单 */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                  <div
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive(item.href, item.exact)
                        ? "bg-[#0046FF] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#0046FF] dark:text-gray-300 dark:hover:bg-gray-800",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        className="ml-2 h-5 min-w-[20px] flex items-center justify-center bg-red-500"
                        variant="default"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </nav>

            {/* 登出按钮 */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span>退出登录</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
