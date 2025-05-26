"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, CreditCard, Wallet, Bitcoin, AlertCircle, Lock } from "lucide-react"
import { noticeManager } from "@/components/ui/notice-message"

export default function OrderConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const domainParam = searchParams.get("domain")
  const domain = domainParam ? decodeURIComponent(domainParam) : "未指定域名"

  // 状态管理
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [useWalletBalance, setUseWalletBalance] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // 模拟订单数据
  const orderData = {
    domain: domain,
    price: 75000,
    registrar: "GoDaddy",
    total: 75000,
    walletBalance: 25000,
  }

  // 处理付款按钮点击
  const handlePayment = () => {
    setIsProcessing(true)

    // 显示处理中通知
    noticeManager.info("正在处理支付", "请稍候，正在处理您的支付请求...")

    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false)
      const orderId = `ORD${Math.floor(Math.random() * 1000000)}`

      noticeManager.success(
        "支付成功！",
        "您的订单已成功提交，正在跳转到结果页面..."
      )

      // 延迟跳转，让用户看到成功通知
      setTimeout(() => {
        router.push(`/order/result?status=success&orderId=${orderId}`)
      }, 1500)
    }, 2000)
  }

  // 计算实际支付金额
  const calculatePaymentAmount = () => {
    if (useWalletBalance) {
      return Math.max(0, orderData.total - orderData.walletBalance)
    }
    return orderData.total
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="mr-1 h-4 w-4" />
              首页
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/market">域名市场</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/market/${domain}`}>{domain}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>订单确认</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">订单确认</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 左侧订单信息 */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>域名信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">域名</span>
                  <span className="font-medium">{orderData.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">注册商</span>
                  <span className="font-medium">{orderData.registrar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">价格</span>
                  <span className="font-medium">${orderData.price.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 支付方式 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>支付方式</CardTitle>
              <CardDescription>选择您偏好的支付方式</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex flex-1 items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                    <span>信用卡/借记卡</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <RadioGroupItem value="alipay" id="alipay" />
                  <Label htmlFor="alipay" className="flex flex-1 items-center">
                    <span className="mr-2 font-bold text-blue-500">支</span>
                    <span>支付宝</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <RadioGroupItem value="wechat" id="wechat" />
                  <Label htmlFor="wechat" className="flex flex-1 items-center">
                    <span className="mr-2 font-bold text-green-500">微</span>
                    <span>微信支付</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex flex-1 items-center">
                    <span className="mr-2 font-bold text-blue-500">P</span>
                    <span>PayPal</span>
                  </Label>
                </div>


              </RadioGroup>

              {/* 钱包余额 */}
              <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5 text-[#0046FF]" />
                    <span className="font-medium">钱包余额</span>
                  </div>
                  <span className="font-bold">${orderData.walletBalance.toLocaleString()}</span>
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  <Checkbox
                    id="use-wallet"
                    checked={useWalletBalance}
                    onCheckedChange={(checked) => setUseWalletBalance(checked === true)}
                    disabled={orderData.walletBalance <= 0}
                  />
                  <Label htmlFor="use-wallet">
                    使用钱包余额支付
                    {orderData.walletBalance < orderData.total && " (部分)"}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧订单摘要 */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>订单摘要</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">域名</span>
                  <span className="font-medium">{orderData.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">注册商</span>
                  <span className="font-medium">{orderData.registrar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">价格</span>
                  <span className="font-medium">${orderData.price.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                  <div className="flex justify-between font-bold">
                    <span>应付总额</span>
                    <span>${orderData.price.toLocaleString()}</span>
                  </div>
                </div>

                {useWalletBalance && orderData.walletBalance > 0 && (
                  <>
                    <div className="flex justify-between text-[#0046FF]">
                      <span>钱包余额抵扣</span>
                      <span>-${Math.min(orderData.walletBalance, orderData.total).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                      <div className="flex justify-between font-bold">
                        <span>应付金额</span>
                        <span>${calculatePaymentAmount().toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full bg-[#FF6A00] hover:bg-[#E05E00]"
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? "处理中..." : `确认并支付 $${calculatePaymentAmount().toLocaleString()}`}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => router.back()}
                disabled={isProcessing}
              >
                返回
              </Button>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p>完成支付后，卖家将在24小时内开始域名转移流程。</p>
                    <p className="mt-1">
                      如有任何问题，请联系
                      <Link href="/support" className="underline">
                        客服支持
                      </Link>
                      。
                    </p>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
