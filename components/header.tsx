"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, Menu, X, LogOut, DollarSign, Bell, ShoppingCart, Settings, Package, Euro, Banknote } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePreferences } from "@/app/context/preferences-context"
import { noticeManager } from "@/components/ui/notice-message"

// 模拟未读通知数量
const UNREAD_COUNT = 3;

// 货币配置
const currencyConfig = {
  USD: {
    icon: DollarSign,
    symbol: "$",
    flag: "🇺🇸",
    name: "美元"
  },
  EUR: {
    icon: Euro,
    symbol: "€",
    flag: "🇪🇺",
    name: "欧元"
  },
  CNY: {
    icon: Banknote,
    symbol: "¥",
    flag: "🇨🇳",
    name: "人民币"
  }
}

// 语言配置
const languageConfig = {
  "en-US": {
    flag: "🇺🇸",
    name: "English"
  },
  "zh-CN": {
    flag: "🇨🇳",
    name: "简体中文"
  }
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, currency, setLanguage, setCurrency, translate } = usePreferences()

  // 切换登录状态（仅用于演示）
  const toggleLoginStatus = () => {
    if (isLoggedIn) {
      localStorage.removeItem("auth-token")
      setIsLoggedIn(false)
    } else {
      localStorage.setItem("auth-token", "demo-token")
      setIsLoggedIn(true)
    }
  }

  // 检测滚动以改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 模拟登录状态 - 实际项目中应从认证服务获取
  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("auth-token")
    setIsLoggedIn(false)
  }

  // 处理货币切换
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency)
    const config = currencyConfig[newCurrency as keyof typeof currencyConfig]
    noticeManager.success(
      "货币已切换",
      `已切换到 ${newCurrency} (${config.symbol})`
    )
  }

  // 处理语言切换
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    noticeManager.success(
      newLanguage === "zh-CN" ? "语言已切换" : "Language Changed",
      newLanguage === "zh-CN"
        ? "已切换到中文"
        : "Switched to English"
    )
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out backdrop-blur-md",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 shadow-lg"
          : "bg-white dark:bg-gray-900"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">190</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                190Domain
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Premium Domains Market
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {translate("home")}
            </Link>
            <Link
              href="/market"
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {translate("market")}
            </Link>
            <Link
              href="/support"
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {translate("support")}
            </Link>              <Button
              variant="ghost"
              size="sm"
              onClick={toggleLoginStatus}
              className="ml-2 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-full"
            >
              {isLoggedIn
                ? (language === "en-US" ? "Demo: Switch to Logged Out" : "演示: 切换为未登录")
                : (language === "en-US" ? "Demo: Switch to Logged In" : "演示: 切换为已登录")
              }
            </Button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 h-9 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {(() => {
                    const CurrencyIcon = currencyConfig[currency as keyof typeof currencyConfig]?.icon || DollarSign
                    return <CurrencyIcon className="h-4 w-4" />
                  })()}
                  <span className="text-sm">{currency}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-24">
                {Object.entries(currencyConfig).map(([code, config]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => handleCurrencyChange(code)}
                    className={cn(
                      "flex items-center justify-between",
                      currency === code
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : ""
                    )}
                  >
                    <span className={currency === code ? "font-medium" : ""}>{code}</span>
                    <span className={currency === code ? "text-blue-600 dark:text-blue-400" : "text-gray-500"}>
                      {config.symbol}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>



            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 h-9 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">
                    {language === "zh-CN" ? "中文" : "EN"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-28">
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("zh-CN")}
                  className={cn(
                    "flex items-center justify-between",
                    language === "zh-CN"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : ""
                  )}
                >
                  <span className={language === "zh-CN" ? "font-medium" : ""}>中文</span>
                  <span className={cn(
                    "text-xs",
                    language === "zh-CN" ? "text-blue-600 dark:text-blue-400" : "text-gray-500"
                  )}>
                    CN
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("en-US")}
                  className={cn(
                    "flex items-center justify-between",
                    language === "en-US"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      : ""
                  )}
                >
                  <span className={language === "en-US" ? "font-medium" : ""}>English</span>
                  <span className={cn(
                    "text-xs",
                    language === "en-US" ? "text-blue-600 dark:text-blue-400" : "text-gray-500"
                  )}>
                    EN
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* 通知图标 */}
            {isLoggedIn && (
              <Link href="/user/notifications">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative flex items-center h-9 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Bell className="h-4 w-4" />
                  {UNREAD_COUNT > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 flex items-center justify-center text-xs bg-red-500 text-white"
                      variant="default"
                    >
                      {UNREAD_COUNT}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}
            {/* User Menu or Login Button */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 rounded-full pl-2 pr-4 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Avatar className="h-7 w-7 transition-transform duration-300 ease-in-out">
                      <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                      <AvatarFallback>190</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">Admin</span>
                      <span className="text-xs text-gray-500">Demo原型演示</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[480px] p-0" align="end" forceMount>
                  <div className="flex">
                    {/* Left Column - User Info */}
                    <div className="w-[200px] bg-gray-50 dark:bg-gray-900 p-4 border-r dark:border-gray-800">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-16 w-16 mb-4">
                          <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                          <AvatarFallback>190</AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium">Admin</h3>
                        <p className="text-xs text-gray-500 mb-2">admin@190.vip</p>
                        <Badge className="mb-4" variant="secondary">Demo原型演示</Badge>
                        <Link href="/user/notifications" className="w-full mb-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full relative"
                          >
                            我的通知
                            {UNREAD_COUNT > 0 && (
                              <Badge
                                className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 flex items-center justify-center text-xs"
                                variant="destructive"
                              >
                                {UNREAD_COUNT}
                              </Badge>
                            )}
                          </Button>
                        </Link>


                        <Link href="/user" className="w-full mb-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full relative"
                          >
                            用户中心
                            { (
                              <div
                                className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 flex items-center justify-center text-xs"
                              >
                              </div>
                            )}
                          </Button>
                        </Link>



                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          {language === "en-US" ? "Sign Out" : "退出登录"}
                        </Button>
                      </div>
                    </div>

                    {/* Right Column - Menu Items */}
                    <div className="flex-1 p-4">
                      <div className="space-y-1">
                        <Link href="/user/wallet" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-md bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                              <DollarSign className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium">{language === "en-US" ? "Wallet" : "我的钱包"}</div>
                              <div className="text-xs text-gray-500">$1,234.56</div>
                            </div>
                          </div>
                        </Link>

                        <Link href="/user/listings" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-md bg-purple-50 text-purple-600 group-hover:bg-purple-100">
                              <ShoppingCart className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium">{language === "en-US" ? "My Listings" : "我的上架"}</div>
                              <div className="text-xs text-gray-500">12 {language === "en-US" ? "Active" : "个已上架"}</div>
                            </div>
                          </div>
                        </Link>

                        <Link href="/user/orders" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-md bg-green-50 text-green-600 group-hover:bg-green-100">
                              <ShoppingCart className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium">{language === "en-US" ? "Orders" : "订单管理"}</div>
                              <div className="text-xs text-gray-500">3 {language === "en-US" ? "Pending" : "个待处理"}</div>
                            </div>
                          </div>
                          {3 > 0 && <Badge variant="secondary">3</Badge>}
                        </Link>

                        <Link href="/user/tickets" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-md bg-orange-50 text-orange-600 group-hover:bg-orange-100">
                              <Bell className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium">{language === "en-US" ? "Support" : "工单管理"}</div>
                              <div className="text-xs text-gray-500">1 {language === "en-US" ? "Open" : "个待解决"}</div>
                            </div>
                          </div>
                          {1 > 0 && <Badge variant="secondary">1</Badge>}
                        </Link>

                        <Link href="/user/settings" className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-md bg-gray-50 text-gray-600 group-hover:bg-gray-100">
                              <Settings className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-medium">{language === "en-US" ? "Settings" : "账户设置"}</div>
                              <div className="text-xs text-gray-500">{language === "en-US" ? "Account & Preferences" : "账户与偏好设置"}</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" className="h-9 px-4 rounded-full">
                  <Link href="/register">Sign Up</Link>
                </Button>
                <Button asChild className="h-9 px-4 rounded-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-base font-medium text-gray-700 transition-colors hover:text-[#0046FF] dark:text-gray-200 dark:hover:text-[#0046FF]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translate("home")}
              </Link>
              <Link
                href="/market"
                className="text-base font-medium text-gray-700 transition-colors hover:text-[#0046FF] dark:text-gray-200 dark:hover:text-[#0046FF]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translate("market")}
              </Link>
              <Link
                href="/support"
                className="text-base font-medium text-gray-700 transition-colors hover:text-[#0046FF] dark:text-gray-200 dark:hover:text-[#0046FF]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translate("support")}
              </Link>
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="text-base font-medium text-[#0046FF]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {translate("login")}
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
