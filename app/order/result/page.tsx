"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock } from "lucide-react"

export default function OrderResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "success"
  const orderId = searchParams.get("orderId") || "未知订单"

  // 状态管理
  const [countdown, setCountdown] = useState(5)

  // 倒计时自动跳转
  useEffect(() => {
    if (status === "success") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            router.push("/user/orders")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [status, router])

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="mx-auto w-full max-w-md text-center">
        <CardHeader>
          {status === "success" ? (
            <>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">支付成功！</CardTitle>
              <CardDescription>您的订单已成功提交，卖家将在24小时内开始域名转移流程。</CardDescription>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">支付失败</CardTitle>
              <CardDescription>很抱歉，您的支付未能完成。请检查您的支付信息或稍后再试。</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="mb-2 flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">订单号</span>
              <span className="font-medium">{orderId}</span>
            </div>
            {status === "success" && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">状态</span>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-yellow-500">等待卖家转移</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {status === "success" ? (
            <>
              <Button className="w-full bg-[#0046FF] hover:bg-[#0035CC]" asChild>
                <Link href="/user/orders">查看订单详情</Link>
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {countdown > 0 ? `${countdown}秒后自动跳转到订单管理页面` : "正在跳转..."}
              </p>
            </>
          ) : (
            <>
              <Button className="w-full bg-[#FF6A00] hover:bg-[#E05E00]" onClick={() => router.back()}>
                重试支付
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/support">联系客服</Link>
              </Button>
            </>
          )}
          <Button variant="link" className="text-[#0046FF]" asChild>
            <Link href="/">返回首页</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
