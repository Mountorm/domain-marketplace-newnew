"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { noticeManager } from "@/components/ui/notice-message"
import Link from "next/link"

type AuthStep = "loading" | "consent" | "processing" | "success" | "error"

export default function GoogleAuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState<AuthStep>("loading")
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: ""
  })

  useEffect(() => {
    // 模拟 Google OAuth 流程
    const simulateGoogleAuth = async () => {
      // 检查是否有错误参数
      const error = searchParams.get("error")
      if (error) {
        setStep("error")
        return
      }

      // 模拟加载 Google 用户信息
      setTimeout(() => {
        // 模拟不同的用户场景
        const mockUsers = [
          {
            name: "张三",
            email: "zhangsan@gmail.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          },
          {
            name: "李四",
            email: "lisi@gmail.com", 
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          },
          {
            name: "王五",
            email: "wangwu@gmail.com",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
          }
        ]

        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
        setUserInfo(randomUser)
        setStep("consent")
      }, 2000)
    }

    simulateGoogleAuth()
  }, [searchParams])

  const handleConsent = async (action: "allow" | "deny") => {
    if (action === "deny") {
      noticeManager.info("授权已取消", "您已取消 Google 登录授权")
      router.push("/login")
      return
    }

    setStep("processing")

    // 模拟处理授权和账户绑定
    setTimeout(() => {
      // 模拟不同结果
      const scenarios = ["success", "error"]
      const result = scenarios[Math.floor(Math.random() * scenarios.length)]

      if (result === "error") {
        setStep("error")
        noticeManager.error("登录失败", "Google 账户绑定失败，请重试")
      } else {
        setStep("success")
        noticeManager.success("登录成功", "正在跳转到主页面...")
        
        // 存储认证信息
        localStorage.setItem("auth-token", "google-auth-token")
        localStorage.setItem("user-info", JSON.stringify(userInfo))
        
        // 延迟跳转
        setTimeout(() => {
          router.push("/")
        }, 2000)
      }
    }, 3000)
  }

  const renderStep = () => {
    switch (step) {
      case "loading":
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-950/20 rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">正在连接 Google</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                请稍候，我们正在获取您的 Google 账户信息...
              </p>
            </div>
          </div>
        )

      case "consent":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-950/20 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">授权 Google 登录</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                域名交易平台请求访问您的 Google 账户
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={userInfo.avatar} 
                  alt={userInfo.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{userInfo.name}</p>
                  <p className="text-sm text-gray-500">{userInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">此应用将能够：</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>查看您的基本个人资料信息</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>查看您的邮箱地址</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>维护您的登录状态</span>
                </li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleConsent("deny")}
              >
                取消
              </Button>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => handleConsent("allow")}
              >
                允许
              </Button>
            </div>
          </div>
        )

      case "processing":
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-50 dark:bg-green-950/20 rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">正在处理授权</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                正在绑定您的 Google 账户，请稍候...
              </p>
            </div>
          </div>
        )

      case "success":
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-50 dark:bg-green-950/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">登录成功</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                欢迎回来，{userInfo.name}！正在跳转到主页面...
              </p>
            </div>
          </div>
        )

      case "error":
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">授权失败</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Google 登录过程中出现错误，请重试
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => router.push("/login")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回登录
              </Button>
              <Button 
                className="flex-1"
                onClick={() => window.location.reload()}
              >
                重试
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">Google 登录</CardTitle>
          <CardDescription className="text-center">
            使用您的 Google 账户快速登录
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}
          
          {step === "loading" && (
            <div className="text-center">
              <Link 
                href="/login" 
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                取消并返回登录页面
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
