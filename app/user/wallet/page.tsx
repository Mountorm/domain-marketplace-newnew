"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  CreditCard,
  BanknoteIcon as Bank,
  AlertCircle,
  Clock,
} from "lucide-react"

// 模拟交易记录数据
const mockTransactions = [
  {
    id: "TRX123456",
    type: "deposit",
    amount: 50000,
    status: "completed",
    date: "2023-05-10 14:30:22",
    method: "信用卡",
    description: "充值",
  },
  {
    id: "TRX123457",
    type: "withdrawal",
    amount: 15000,
    status: "completed",
    date: "2023-05-05 09:15:43",
    method: "银行转账",
    description: "提现",
  },
  {
    id: "TRX123458",
    type: "payment",
    amount: 28000,
    status: "completed",
    date: "2023-04-28 16:45:10",
    method: "钱包余额",
    description: "购买域名 travel.app",
  },
  {
    id: "TRX123459",
    type: "income",
    amount: 15000,
    status: "completed",
    date: "2023-04-20 11:20:35",
    method: "钱包余额",
    description: "出售域名 learn.xyz",
  },
  {
    id: "TRX123460",
    type: "deposit",
    amount: 20000,
    status: "completed",
    date: "2023-04-15 10:05:18",
    method: "支付宝",
    description: "充值",
  },
  {
    id: "TRX123461",
    type: "withdrawal",
    amount: 10000,
    status: "pending",
    date: "2023-05-11 15:30:00",
    method: "银行转账",
    description: "提现",
  },
]

// 交易类型映射
const typeMap: Record<string, { label: string; color: string; icon: any }> = {
  deposit: {
    label: "充值",
    color: "text-green-500",
    icon: ArrowDownLeft,
  },
  withdrawal: {
    label: "提现",
    color: "text-red-500",
    icon: ArrowUpRight,
  },
  payment: {
    label: "支付",
    color: "text-red-500",
    icon: Minus,
  },
  income: {
    label: "收入",
    color: "text-green-500",
    icon: Plus,
  },
}

// 交易状态映射
const statusMap: Record<string, { label: string; color: string }> = {
  completed: { label: "已完成", color: "bg-green-500" },
  pending: { label: "处理中", color: "bg-yellow-500" },
  failed: { label: "失败", color: "bg-red-500" },
}

export default function WalletPage() {
  // 状态管理
  const [activeTab, setActiveTab] = useState("overview")
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false)
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [depositMethod, setDepositMethod] = useState("credit-card")
  const [withdrawMethod, setWithdrawMethod] = useState("bank")
  const [isProcessing, setIsProcessing] = useState(false)

  // 模拟钱包数据
  const walletData = {
    balance: 42000,
    pendingBalance: 10000,
    totalIncome: 95000,
    totalExpense: 53000,
  }

  // 处理充值提交
  const handleDeposit = () => {
    setIsProcessing(true)

    // 模拟充值请求
    setTimeout(() => {
      setIsProcessing(false)
      setIsDepositDialogOpen(false)
      setDepositAmount("")
      // 实际项目中应该更新钱包余额
    }, 1500)
  }

  // 处理提现提交
  const handleWithdraw = () => {
    setIsProcessing(true)

    // 模拟提现请求
    setTimeout(() => {
      setIsProcessing(false)
      setIsWithdrawDialogOpen(false)
      setWithdrawAmount("")
      // 实际项目中应该更新钱包余额
    }, 1500)
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">我的钱包</h1>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">钱包概览</TabsTrigger>
          <TabsTrigger value="transactions">交易记录</TabsTrigger>
        </TabsList>

        {/* 钱包概览选项卡 */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* 余额卡片 */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>钱包余额</CardTitle>
                  <CardDescription>您当前的可用余额</CardDescription>
                </div>
                <Wallet className="h-6 w-6 text-[#0046FF]" />
              </CardHeader>
              <CardContent>
                <div className="mt-4 text-4xl font-bold text-[#0046FF]">${walletData.balance.toLocaleString()}</div>
                {walletData.pendingBalance > 0 && (
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>待结算: ${walletData.pendingBalance.toLocaleString()}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button className="flex-1 bg-[#0046FF] hover:bg-[#0035CC]" onClick={() => setIsDepositDialogOpen(true)}>
                  <ArrowDownLeft className="mr-2 h-4 w-4" />
                  <span>充值</span>
                </Button>
                <div className="w-4"></div>
                <Button variant="outline" className="flex-1" onClick={() => setIsWithdrawDialogOpen(true)}>
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  <span>提现</span>
                </Button>
              </CardFooter>
            </Card>

            {/* 统计卡片 */}
            <Card>
              <CardHeader>
                <CardTitle>收支统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">总收入</p>
                  <p className="text-2xl font-bold text-green-500">+${walletData.totalIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">总支出</p>
                  <p className="text-2xl font-bold text-red-500">-${walletData.totalExpense.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* 最近交易 */}
            <Card className="md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>最近交易</CardTitle>
                  <CardDescription>您的最近5笔交易记录</CardDescription>
                </div>
                <Button variant="link" className="text-[#0046FF]" onClick={() => setActiveTab("transactions")}>
                  查看全部
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>交易ID</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead>金额</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>日期</TableHead>
                        <TableHead>方式</TableHead>
                        <TableHead>描述</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactions.slice(0, 5).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {React.createElement(typeMap[transaction.type].icon, {
                                className: `mr-1 h-4 w-4 ${typeMap[transaction.type].color}`,
                              })}
                              <span className={typeMap[transaction.type].color}>{typeMap[transaction.type].label}</span>
                            </div>
                          </TableCell>
                          <TableCell
                            className={
                              transaction.type === "deposit" || transaction.type === "income"
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {transaction.type === "deposit" || transaction.type === "income"
                              ? `+$${transaction.amount.toLocaleString()}`
                              : `-$${transaction.amount.toLocaleString()}`}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusMap[transaction.status].color}>
                              {statusMap[transaction.status].label}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 交易记录选项卡 */}
        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>交易记录</CardTitle>
              <CardDescription>您的所有交易历史</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>交易ID</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>日期</TableHead>
                      <TableHead>方式</TableHead>
                      <TableHead>描述</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {React.createElement(typeMap[transaction.type].icon, {
                              className: `mr-1 h-4 w-4 ${typeMap[transaction.type].color}`,
                            })}
                            <span className={typeMap[transaction.type].color}>{typeMap[transaction.type].label}</span>
                          </div>
                        </TableCell>
                        <TableCell
                          className={
                            transaction.type === "deposit" || transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {transaction.type === "deposit" || transaction.type === "income"
                            ? `+$${transaction.amount.toLocaleString()}`
                            : `-$${transaction.amount.toLocaleString()}`}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusMap[transaction.status].color}>
                            {statusMap[transaction.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.method}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 充值对话框 */}
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>充值到钱包</DialogTitle>
            <DialogDescription>选择充值金额和支付方式</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">充值金额</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="deposit-amount"
                  type="number"
                  className="pl-8"
                  placeholder="输入金额"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>支付方式</Label>
              <RadioGroup value={depositMethod} onValueChange={setDepositMethod} className="space-y-2">
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex flex-1 items-center">
                    <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                    <span>信用卡/借记卡</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <RadioGroupItem value="alipay" id="alipay" />
                  <Label htmlFor="alipay" className="flex flex-1 items-center">
                    <span className="mr-2 font-bold text-blue-500">支</span>
                    <span>支付宝</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <RadioGroupItem value="wechat" id="wechat" />
                  <Label htmlFor="wechat" className="flex flex-1 items-center">
                    <span className="mr-2 font-bold text-green-500">微</span>
                    <span>微信支付</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex flex-1 items-center">
                    <span className="mr-2 font-bold text-blue-500">P</span>
                    <span>PayPal</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
              <div className="flex items-start space-x-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p>充值金额将在支付成功后立即到账。</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepositDialogOpen(false)} disabled={isProcessing}>
              取消
            </Button>
            <Button
              className="bg-[#0046FF] hover:bg-[#0035CC]"
              onClick={handleDeposit}
              disabled={!depositAmount || isProcessing}
            >
              {isProcessing ? "处理中..." : "确认充值"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 提现对话框 */}
      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>从钱包提现</DialogTitle>
            <DialogDescription>选择提现金额和提现方式</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="withdraw-amount">提现金额</Label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  可用余额: ${walletData.balance.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="withdraw-amount"
                  type="number"
                  className="pl-8"
                  placeholder="输入金额"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={walletData.balance}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>提现方式</Label>
              <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod} className="space-y-2">
                <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex flex-1 items-center">
                    <Bank className="mr-2 h-4 w-4 text-gray-500" />
                    <span>银行卡</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
              <div className="flex items-start space-x-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p>提现申请将在1-3个工作日内处理。</p>
                  <p className="mt-1">提现手续费: 1%</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)} disabled={isProcessing}>
              取消
            </Button>
            <Button
              className="bg-[#0046FF] hover:bg-[#0035CC]"
              onClick={handleWithdraw}
              disabled={!withdrawAmount || Number(withdrawAmount) > walletData.balance || isProcessing}
            >
              {isProcessing ? "处理中..." : "确认提现"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
