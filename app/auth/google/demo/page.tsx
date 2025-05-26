"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function GoogleAuthDemoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const scenarios = [
    {
      id: "success",
      title: "成功授权",
      description: "模拟用户同意授权，成功登录",
      badge: "成功",
      badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      action: () => router.push("/auth/google")
    },
    {
      id: "cancel",
      title: "用户取消",
      description: "模拟用户在授权页面点击取消",
      badge: "取消",
      badgeColor: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      action: () => router.push("/auth/google")
    },
    {
      id: "error",
      title: "授权错误",
      description: "模拟 Google OAuth 返回错误",
      badge: "错误",
      badgeColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      action: () => router.push("/auth/google?error=access_denied")
    },
    {
      id: "network",
      title: "网络错误",
      description: "模拟网络连接问题",
      badge: "网络",
      badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      action: () => router.push("/auth/google?error=network_error")
    }
  ]

  const handleScenario = async (scenario: typeof scenarios[0]) => {
    setIsLoading(true)
    
    // 模拟加载延迟
    setTimeout(() => {
      setIsLoading(false)
      scenario.action()
    }, 500)
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回登录
              </Button>
            </Link>
          </div>
          <CardTitle className="text-center text-2xl font-bold">Google 登录 Demo</CardTitle>
          <CardDescription className="text-center">
            选择不同的场景来测试 Google OAuth 登录流程
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Demo 说明</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                  这是一个模拟的 Google OAuth 登录流程，用于演示不同的授权场景。
                  实际项目中需要配置真实的 Google OAuth 客户端 ID。
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium">{scenario.title}</h3>
                      <Badge className={scenario.badgeColor}>
                        {scenario.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {scenario.description}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleScenario(scenario)}
                    disabled={isLoading}
                    size="sm"
                    className="ml-4"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    测试
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">测试流程说明：</h4>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">选择测试场景</p>
                  <p>点击上方任意场景的"测试"按钮</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">模拟 Google 授权</p>
                  <p>系统会模拟 Google OAuth 的授权流程</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">查看结果</p>
                  <p>观察不同场景下的用户界面和通知效果</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">快速开始</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  推荐先测试"成功授权"场景
                </p>
              </div>
              <Button
                onClick={() => handleScenario(scenarios[0])}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                开始测试
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
