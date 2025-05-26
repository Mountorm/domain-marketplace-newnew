"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowRight } from "lucide-react"

// 模拟订单数据
const mockOrders = [
  {
    id: "ORD123456",
    type: "buy",
    domain: "crypto.io",
    price: 75000,
    status: "pending_payment",
    date: "2023-05-10",
  },
  {
    id: "ORD123457",
    type: "sell",
    domain: "travel.app",
    price: 28000,
    status: "pending_transfer",
    date: "2023-05-08",
  },
  {
    id: "ORD123458",
    type: "buy",
    domain: "health.co",
    price: 32000,
    status: "pending_confirmation",
    date: "2023-05-05",
  },
  {
    id: "ORD123459",
    type: "sell",
    domain: "learn.xyz",
    price: 15000,
    status: "completed",
    date: "2023-04-28",
  },
  {
    id: "ORD123460",
    type: "buy",
    domain: "shop.store",
    price: 22000,
    status: "completed",
    date: "2023-04-20",
  },
  {
    id: "ORD123461",
    type: "sell",
    domain: "tech.dev",
    price: 18500,
    status: "cancelled",
    date: "2023-04-15",
  },
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

export default function OrdersPage() {
  // 状态管理
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // 过滤订单
  const filteredOrders = mockOrders.filter((order) => {
    // 类型过滤
    if (activeTab === "buy" && order.type !== "buy") return false
    if (activeTab === "sell" && order.type !== "sell") return false

    // 状态过滤
    if (statusFilter !== "all" && order.status !== statusFilter) return false

    // 搜索过滤
    if (
      searchTerm &&
      !order.domain.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">订单管理</h1>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <TabsList>
            <TabsTrigger value="all">全部订单</TabsTrigger>
            <TabsTrigger value="buy">买入</TabsTrigger>
            <TabsTrigger value="sell">卖出</TabsTrigger>
          </TabsList>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="搜索订单号或域名"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="订单状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="pending_payment">待付款</SelectItem>
                <SelectItem value="pending_transfer">待转移</SelectItem>
                <SelectItem value="pending_confirmation">待确认</SelectItem>
                <SelectItem value="pending_settlement">待结算</SelectItem>
                <SelectItem value="completed">已完成</SelectItem>
                <SelectItem value="cancelled">已取消</SelectItem>
                <SelectItem value="disputed">争议中</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <OrdersTable orders={filteredOrders} />
        </TabsContent>
        <TabsContent value="buy" className="mt-0">
          <OrdersTable orders={filteredOrders} />
        </TabsContent>
        <TabsContent value="sell" className="mt-0">
          <OrdersTable orders={filteredOrders} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// 订单表格组件
function OrdersTable({ orders }: { orders: typeof mockOrders }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>订单号</TableHead>
            <TableHead>域名</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>日期</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                暂无订单数据
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.domain}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={order.type === "buy" ? "text-blue-500" : "text-green-500"}>
                    {order.type === "buy" ? "买入" : "卖出"}
                  </Badge>
                </TableCell>
                <TableCell>${order.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={statusMap[order.status].color}>{statusMap[order.status].label}</Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/user/orders/${order.id}`}>
                      <span className="flex items-center">
                        详情
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
