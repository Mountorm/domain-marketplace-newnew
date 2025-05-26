"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Package, ShoppingCart, Bell, Settings } from "lucide-react"

interface UserMenuProps {
  language: string;
}

export function UserMenu({ language }: UserMenuProps) {
  return (
    <div className="flex-1">
      <div className="p-4 space-y-1">
        <Link href="/user/wallet" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
              <DollarSign className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-200">{language === "en-US" ? "Wallet" : "我的钱包"}</div>
              <div className="text-xs text-gray-500">$1,234.56</div>
            </div>
          </div>
        </Link>

        <Link href="/user/listings" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-200">{language === "en-US" ? "My Listings" : "我的上架"}</div>
              <div className="text-xs text-gray-500">12 {language === "en-US" ? "Active" : "个已上架"}</div>
            </div>
          </div>
        </Link>

        <Link href="/user/orders" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors">
              <ShoppingCart className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-200">{language === "en-US" ? "Orders" : "订单管理"}</div>
              <div className="text-xs text-gray-500">3 {language === "en-US" ? "Pending" : "个待处理"}</div>
            </div>
          </div>
          <Badge variant="outline" className="bg-white text-gray-600">3</Badge>
        </Link>

        <Link href="/user/tickets" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-orange-50 text-orange-600 group-hover:bg-orange-100 transition-colors">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-200">{language === "en-US" ? "Support" : "工单管理"}</div>
              <div className="text-xs text-gray-500">1 {language === "en-US" ? "Open" : "个待解决"}</div>
            </div>
          </div>
          <Badge variant="outline" className="bg-white text-gray-600">1</Badge>
        </Link>

        <Link href="/user/settings" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-gray-50 text-gray-600 group-hover:bg-gray-100 transition-colors">
              <Settings className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-200">{language === "en-US" ? "Settings" : "用户设置"}</div>
              <div className="text-xs text-gray-500">{language === "en-US" ? "Account & Preferences" : "账户与偏好设置"}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
