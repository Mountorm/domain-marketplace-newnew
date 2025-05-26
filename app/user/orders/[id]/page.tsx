"use client"

import React, { Suspense } from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Home,
  Clock,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  FileText,
  Wallet,
  AlertCircle,
  Lock,
  Copy,
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"  // 添加到其他导入语句处

// 定义状态类型
type OrderStatus = "pending_payment" | "pending_transfer" | "pending_confirmation" | 
                  "pending_settlement" | "completed" | "closed" | "disputed"

// 定义订单类型
type OrderType = "buyer" | "seller"

// 定义转移信息类型
type TransferInfo = {
  code: string
  expiredAt: string
  registrar: string
}

// 订单状态映射
const statusMap: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  pending_payment: {
    label: "待付款",
    color: "bg-yellow-500",
    icon: CreditCard,
  },
  pending_transfer: {
    label: "待转移",
    color: "bg-blue-500",
    icon: ArrowRight,
  },
  pending_confirmation: {
    label: "待确认",
    color: "bg-purple-500",
    icon: Clock,
  },
  pending_settlement: {
    label: "待结算",
    color: "bg-indigo-500",
    icon: Clock,
  },
  completed: {
    label: "已完成",
    color: "bg-green-500",
    icon: CheckCircle,
  },
  closed: {
    label: "已关闭",
    color: "bg-gray-500",
    icon: AlertTriangle,
  },
  disputed: {
    label: "争议中",
    color: "bg-red-500",
    icon: AlertTriangle,
  },
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default function OrderDetailPage({ params }: PageProps) {
  // 使用 React.use() 解包 params
  const resolvedParams = React.use(params)
  const orderId = resolvedParams.id
  const [isLoading, setIsLoading] = useState(false)
  
  // 添加切换状态
  const [role, setRole] = useState<"buyer" | "seller">("buyer")
  const [status, setStatus] = useState<OrderStatus>("pending_transfer")

  // 添加支付方式状态
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [useWalletBalance, setUseWalletBalance] = useState(false)

  // 处理状态切换
  const handleStatusChange = (newStatus: OrderStatus) => {
    // 买家不能选择待结算状态
    if (role === "buyer" && newStatus === "pending_settlement") {
      return
    }
    setStatus(newStatus)
  }

  // 模拟订单数据
  const orderData = {
    id: orderId,
    type: role as OrderType,
    domain: "crypto.io",
    price: 75000,
    status: status,
    createdAt: "2023-05-10 14:30:22",
    updatedAt: "2023-05-11 09:15:43",
    counterparty: role === "buyer" ? "seller123" : "buyer456",
    registrar: "GoDaddy",
    paymentMethod: {
      balance: 35000,
      creditCard: 40000
    },
    // 转移信息
    transfer: status === "pending_confirmation" ? {
      code: "ABC123XYZ",
      expiredAt: "2025-05-20 23:59:59",
      registrar: "GoDaddy"
    } : undefined,
    // 结算信息
    settlement: status === "pending_settlement" ? {
      amount: 75000,
      estimateTime: "2025-05-23 23:59:59"
    } : undefined,
    // 申诉信息
    dispute: status === "disputed" ? {
      reason: "域名无法在新注册商处转入",
      createdAt: "2025-05-12 10:20:15",
      status: "pending" as "pending" | "processing" | "resolved"
    } : undefined,
    // 订单时间线
    timeline: [
      { date: "2023-05-10 14:30:22", event: "订单创建" },
      ...(status !== "pending_payment" ? [{ 
        date: "2023-05-10 14:35:10", 
        event: "支付完成"
      }] : []),
      ...(["pending_confirmation", "pending_settlement", "completed", "disputed"].includes(status) ? [{
        date: "2023-05-11 09:15:43",
        event: "卖家提供转移码"
      }] : []),
      ...(["pending_settlement", "completed"].includes(status) ? [{
        date: "2023-05-12 10:20:15",
        event: "买家确认转入"
      }] : []),
      ...(status === "completed" && role === "seller" ? [{
        date: "2023-05-15 00:00:00",
        event: "订单结算完成"
      }] : []),
      ...(status === "disputed" ? [{
        date: "2023-05-12 10:20:15",
        event: "买家发起申诉"
      }] : []),
    ],
    // 转移说明
    transferInstructions: {
      method: "授权码转移",
      steps: role === "seller" ? [
        "登录您的域名注册商账户",
        "解锁域名并获取授权码",
        "将授权码提供给买家",
        "等待买家完成转入"
      ] : [
        "等待卖家提供转移码",
        "登录您的域名注册商账户",
        "发起域名转入",
        "使用转移码完成转入",
        "返回平台确认"
      ],
      notes: role === "seller" ? 
        "请确保域名已解锁并且注册时间超过60天，否则可能无法转移。" :
        "收到转移码后请在24小时内完成转入，超时未转入可能需要重新获取转移码。"
    },
  }

  // 处理操作按钮点击
  const handleAction = (action: string) => {
    setIsLoading(true)

    // 模拟操作请求
    setTimeout(() => {
      setIsLoading(false)
      // 实际项目中应该更新订单状态
    }, 1500)
  }

  // 计算实际支付金额
  const calculatePaymentAmount = () => {
    if (useWalletBalance) {
      return Math.max(0, orderData.price - orderData.paymentMethod.balance)
    }
    return orderData.price
  }

  // 根据订单状态和类型返回可用操作
  const getAvailableActions = () => {
    const orderType = orderData.type as OrderType
    if (orderType === "buyer") {
      switch (orderData.status) {
        case "pending_payment":
          return (
            <div className="space-y-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full bg-[#FF6A00] hover:bg-[#E05E00]"
                  >
                    确认支付 ¥{orderData.price.toLocaleString()}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>支付订单</AlertDialogTitle>
                    <AlertDialogDescription>
                      选择您偏好的支付方式完成订单
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <div className="space-y-3">
                    {/* 支付方式选择 */}
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
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
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Wallet className="h-5 w-5 text-[#0046FF]" />
                          <span className="font-medium">钱包余额</span>
                        </div>
                        <span className="font-bold">¥{orderData.paymentMethod.balance.toLocaleString()}</span>
                      </div>

                      <div className="mt-4 flex items-center space-x-2">
                        <Checkbox
                          id="use-wallet"
                          checked={useWalletBalance}
                          onCheckedChange={(checked: boolean) => setUseWalletBalance(checked)}
                          disabled={orderData.paymentMethod.balance <= 0}
                        />
                        <Label htmlFor="use-wallet">
                          使用钱包余额支付
                          {orderData.paymentMethod.balance < orderData.price && " (部分)"}
                        </Label>
                      </div>
                    </div>

                    {/* 支付金额总览 */}
                    <div className="rounded-lg border p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">域名</span>
                          <span className="font-medium">{orderData.domain}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">注册商</span>
                          <span className="font-medium">{orderData.registrar}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">价格</span>
                          <span className="font-medium">¥{orderData.price.toLocaleString()}</span>
                        </div>

                        {useWalletBalance && orderData.paymentMethod.balance > 0 && (
                          <div className="flex justify-between text-[#0046FF]">
                            <span>钱包余额抵扣</span>
                            <span>-¥{Math.min(orderData.paymentMethod.balance, orderData.price).toLocaleString()}</span>
                          </div>
                        )}

                        <div className="border-t pt-2">
                          <div className="flex justify-between font-medium">
                            <span>应付总额</span>
                            <span className="text-lg text-[#FF6A00]">
                              ¥{calculatePaymentAmount().toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

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
                  </div>

                  <AlertDialogFooter className="flex justify-end gap-2">
                    <AlertDialogCancel 
                      className="h-11 flex-1"
                    >
                      取消
                    </AlertDialogCancel>
                    <AlertDialogAction 
                      className="h-11 flex-[2] bg-[#FF6A00] hover:bg-[#E05E00]"
                      onClick={() => handleAction("pay")}
                      disabled={isLoading}
                    >
                      {isLoading ? "处理中..." : `确认并支付 ¥${calculatePaymentAmount().toLocaleString()}`}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    关闭订单
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>确认关闭订单</AlertDialogTitle>
                    <AlertDialogDescription>
                      {role === "buyer" 
                        ? "关闭订单后，如果您仍想购买此域名，需要重新下单。" 
                        : "关闭订单后，域名将重新上架。买家如果仍想购买，需要重新下单。"
                      }
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => handleAction("close")}
                      disabled={isLoading}
                    >
                      {isLoading ? "处理中..." : "确认关闭"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )
        case "pending_confirmation":
          return (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-medium">转移码信息</h3>
                  <Badge variant="outline" className="text-blue-500">
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    {new Date(orderData.transfer?.expiredAt || "").toLocaleString()}前有效
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded bg-gray-100 px-3 py-2 font-mono text-sm dark:bg-gray-800">
                    {orderData.transfer?.code}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(orderData.transfer?.code || "")
                      toast.success("转移码已复制到剪贴板")
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
        
              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-medium">转入说明</h3>
                <div className="space-y-3">
                  <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                      <p>请在转移码有效期内完成以下步骤：</p>
                    </div>
                  </div>
                  
                  <ol className="ml-4 list-decimal space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>访问域名注册商的官方网站并登录您的账户</li>
                    <li>在域名管理页面找到"转入域名"或类似选项</li>
                    <li>输入要转入的域名：{orderData.domain}</li>
                    <li>输入上方的转移码，并按提示完成转入流程</li>
                    <li>转入成功后返回此页面点击"确认收到域名"</li>
                  </ol>
        
                  <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <div>
                        <p>如遇到以下情况，请及时联系我们：</p>
                        <ul className="ml-4 mt-1 list-disc">
                          <li>转移码无效或过期</li>
                          <li>域名锁定无法转入</li>
                          <li>注册商显示域名不可转移</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full text-red-500 hover:bg-red-50 hover:text-red-600">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span>遇到问题？提交申诉</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>提交申诉</AlertDialogTitle>
                      <AlertDialogDescription>
                        如果您在域名转入过程中遇到问题，可以提交申诉。请详细描述您遇到的具体问题。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Textarea 
                      placeholder="例如：转移码无效、域名被锁定无法转入等..." 
                      className="min-h-[120px]" 
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleAction("dispute")}
                        disabled={isLoading}
                      >
                        {isLoading ? "提交中..." : "提交申诉"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  className="w-full bg-[#0046FF] hover:bg-[#0035CC]"
                  onClick={() => handleAction("confirm")}
                  disabled={isLoading}
                >
                  {isLoading ? "处理中..." : "确认收到域名"}
                </Button>
              </div>
            </div>
          )
        case "pending_transfer":
          // 根据角色返回不同的内容
          return (
            <div className="space-y-4">
              {role === "buyer" ? (
                // 买家视角
                <>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                    <div className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                      <div className="space-y-1">
                        <p>订单已支付成功，正在等待卖家提供域名转移码。</p>
                        <p>卖家需要在24小时内开始转移流程，如遇问题可以联系客服。</p>
                      </div>
                    </div>
                  </div>

                  <AlertDialog>
                    {/* ...买家申诉对话框内容... */}
                  </AlertDialog>
                </>
              ) : (
                // 卖家视角
                <>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-medium">转出说明</h3>
                    {/* ...卖家转出说明内容... */}
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* ...卖家操作按钮... */}
                  </div>
                </>
              )}
            </div>
          )
        case "pending_settlement":
          return (
            <div className="space-y-4">
              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
                <div className="flex items-start gap-2">
                  <Wallet className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="space-y-1">
                    <p>买家已确认收到域名，系统将在T+3内将交易金额结算到您的账户。</p>
                    <p>预计结算时间：{new Date(orderData.settlement?.estimateTime || "").toLocaleString()}</p>
                    <p>结算金额：¥{orderData.settlement?.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        default:
          return null
      }
    } else {
      // 卖家操作
      switch (orderData.status) {
        case "pending_payment":
          return (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  关闭订单
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确认关闭订单</AlertDialogTitle>
                  <AlertDialogDescription>
                    关闭订单后，域名将重新上架。买家如果仍想购买，需要重新下单。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleAction("close")}
                    disabled={isLoading}
                  >
                    {isLoading ? "处理中..." : "确认关闭"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )
        case "pending_transfer":
          if (orderData.type === "buyer" as OrderType) {
            return (
              <div className="space-y-4">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                    <div className="space-y-1">
                      <p>订单已支付成功，正在等待卖家提供域名转移码。</p>
                      <p>卖家需要在24小时内开始转移流程，如遇问题可以联系客服。</p>
                    </div>
                  </div>
                </div>
        
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full text-red-500 hover:bg-red-50 hover:text-red-600">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span>遇到问题？提交申诉</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>提交申诉</AlertDialogTitle>
                      <AlertDialogDescription>
                        如果卖家长时间未提供转移码，您可以提交申诉。请描述具体情况。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Textarea 
                      placeholder="例如：已付款24小时，卖家仍未提供转移码..." 
                      className="min-h-[120px]" 
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleAction("dispute")}
                        disabled={isLoading}
                      >
                        {isLoading ? "提交中..." : "提交申诉"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )
          } else {
            // 卖家视角
            return (
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-3 font-medium">转出说明</h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                        <p>请按以下步骤操作：</p>
                      </div>
                    </div>
                    
                    <ol className="ml-4 list-decimal space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>登录您的域名注册商控制台</li>
                      <li>找到此域名：{orderData.domain}</li>
                      <li>解锁域名（通常在域名设置或安全选项中）</li>
                      <li>获取域名转移码（EPP Code/Auth Code）</li>
                      <li>填写下方表单提交转移码</li>
                    </ol>
        
                    <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <div>
                          <p>请注意以下事项：</p>
                          <ul className="ml-4 mt-1 list-disc">
                            <li>域名必须解锁后才能转移</li>
                            <li>注册时间超过60天的域名才可转移</li>
                            <li>转移码提交后无法修改，请确保准确</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        
                <div className="flex flex-col gap-3">
                  {/* 提交转移码按钮及对话框 */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full bg-[#0046FF] hover:bg-[#0035CC]">
                        提交转移码
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>提交转移码</AlertDialogTitle>
                        <AlertDialogDescription>
                          请填写从注册商处获取的域名转移码，买家将使用此转移码完成转入。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="auth-code">转移码 (EPP Code/Auth Code)</Label>
                          <div className="flex items-center gap-2">
                            <Input 
                              id="auth-code"
                              placeholder="请输入域名转移码"
                              className="font-mono"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                navigator.clipboard.readText().then(text => {
                                  // 在实际项目中应该设置到状态中
                                  toast.success("已从剪贴板粘贴")
                                })
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
        
                        <div className="space-y-2">
                          <Label>转移码有效期</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="datetime-local"
                              min={new Date().toISOString().slice(0, 16)}
                            />
                          </div>
                          <p className="text-sm text-gray-500">
                            有效期内未完成转移，转移码将失效。
                          </p>
                        </div>
                      </div>
        
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-[#0046FF] hover:bg-[#0035CC]"
                          onClick={() => handleAction("transfer")}
                          disabled={isLoading}
                        >
                          {isLoading ? "提交中..." : "确认提交"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
        
                  {/* 关闭订单按钮及对话框 */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        关闭订单
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确认关闭订单</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className="space-y-4">
                            <p>关闭订单后，交易将终止且无法恢复，买家付款将自动退回。请确认是否存在以下情况：</p>
                            <ul className="ml-4 list-disc space-y-1.5 text-sm">
                              <li>域名注册时间不满60天，暂时无法转移</li>
                              <li>域名存在其他限制无法转出</li>
                              <li>域名已在其他平台出售</li>
                              <li>其他无法完成交易的特殊情况</li>
                            </ul>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleAction("close")}
                          disabled={isLoading}
                        >
                          {isLoading ? "处理中..." : "确认关闭"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )
          }
        case "pending_confirmation":
          return (
            <div className="space-y-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="space-y-1">
                    <p>转移码已发送给买家，正在等待买家完成域名转入。</p>
                    <p>转移码有效期至：{new Date(orderData.transfer?.expiredAt || "").toLocaleString()}</p>
                    <p>如买家长时间未确认，您可以联系客服协助处理。</p>
                  </div>
                </div>
              </div>
            </div>
          )
        case "pending_settlement":
          return (
            <div className="space-y-4">
              <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
                <div className="flex items-start gap-2">
                  <Wallet className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="space-y-1">
                    <p>买家已确认收到域名，系统将在T+3内将交易金额结算到您的账户。</p>
                    <p>预计结算时间：{new Date(orderData.settlement?.estimateTime || "").toLocaleString()}</p>
                    <p>结算金额：¥{orderData.settlement?.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        default:
          return null
      }
    }
  }

  return (
    <Suspense fallback={<div className="p-4">加载中...</div>}>
      <div className="container mx-auto px-4 py-8">
        {/* 悬浮切换栏 */}
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
          <div className="flex flex-col gap-2">
            <Tabs value={role} className="w-[600px]" onValueChange={(value) => setRole(value as "buyer" | "seller")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buyer">买家视角</TabsTrigger>
                <TabsTrigger value="seller">卖家视角</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs value={status} className="w-[600px]" onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="pending_payment">待付款</TabsTrigger>
                <TabsTrigger value="pending_transfer">待转移</TabsTrigger>
                <TabsTrigger value="pending_confirmation">待确认</TabsTrigger>
                <TabsTrigger 
                  value="pending_settlement" 
                  disabled={role === "buyer"}
                  className={role === "buyer" ? "opacity-50 cursor-not-allowed" : ""}
                >
                  待结算
                </TabsTrigger>
                <TabsTrigger value="completed">已完成</TabsTrigger>
                <TabsTrigger value="closed">已关闭</TabsTrigger>
                <TabsTrigger value="disputed">争议中</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

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
              <BreadcrumbLink href="/user/orders">
                <ShoppingCart className="mr-1 h-4 w-4" />
                我的订单
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{orderId}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 左侧主要信息 */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  订单信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 域名信息 */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{orderData.domain}</h2>
                    <Badge 
                      className={`${statusMap[orderData.status].color} text-white hover:${statusMap[orderData.status].color}`}
                    >
                      <div className="flex items-center gap-1.5">
                        {React.createElement(statusMap[orderData.status].icon, {
                          className: "h-3.5 w-3.5"
                        })}
                        {statusMap[orderData.status].label}
                      </div>
                    </Badge>
                  </div>
                  
                  {/* 订单基础信息 */}
                  <div>
                    <p className="text-sm text-gray-500">订单号</p>
                    <p className="font-medium">{orderId}</p>
                  </div>
                  {getAvailableActions()}
                </div>
              </CardContent>
            </Card>

            {/* 订单时间线 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  订单进度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                      <div>
                        <p className="font-medium">{item.event}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                        {/* {item.details && <p className="text-sm text-gray-500">{item.details}</p>} */}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧信息栏 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>费用详情</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">域名</span>
                    <span className="font-medium">{orderData.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">注册商</span>
                    <span className="font-medium">{orderData.registrar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">价格</span>
                    <span className="font-medium">¥{orderData.price.toLocaleString()}</span>
                  </div>
                  
                  {/* 买家视角才显示支付方式详情 */}
                  {role === "buyer" && orderData.status !== "pending_payment" && (
                    <>
                      <div className="border-t pt-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">支付方式</p>
                            <div className="space-y-1.5">
                              <div className="flex items-center text-sm">
                                <div className="w-20 text-gray-500">账户余额</div>
                                <div className="font-medium">¥35,000</div>
                              </div>
                              <div className="flex items-center text-sm">
                                <div className="w-20 text-gray-500">信用卡</div>
                                <div className="font-medium">¥40,000</div>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-blue-500">已支付</Badge>
                        </div>
                      </div>
                    </>
                  )}

                  {/* 卖家视角只显示付款状态 */}
                  {role === "seller" && orderData.status !== "pending_payment" && (
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">付款状态</span>
                        <Badge variant="outline" className="text-blue-500">已支付</Badge>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>{role === "buyer" ? "应付总额" : "交易金额"}</span>
                      <span>¥{orderData.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
