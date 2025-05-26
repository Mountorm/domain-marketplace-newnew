"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowRight, MessageCircle, PlusCircle } from "lucide-react"

// 模拟工单数据
const mockTickets = [
  {
    id: "TK123456",
    title: "域名转移遇到问题",
    type: "transfer",
    status: "pending",
    createdAt: "2025-05-10 14:30:22",
    updatedAt: "2025-05-10 15:20:15",
    lastReply: "客服",
    relatedOrder: "ORD123456",
  },
  {
    id: "TK123457",
    title: "支付完成但订单状态未更新",
    type: "payment",
    status: "processing",
    createdAt: "2025-05-09 10:15:33",
    updatedAt: "2025-05-10 09:30:20",
    lastReply: "用户",
    relatedOrder: "ORD123459",
  },
  {
    id: "TK123458",
    title: "申请提前结算订单",
    type: "settlement",
    status: "resolved",
    createdAt: "2025-05-08 16:45:10",
    updatedAt: "2025-05-09 11:20:18",
    lastReply: "客服",
    relatedOrder: "ORD123460",
  },
  {
    id: "TK123459",
    title: "域名信息修改请求",
    type: "other",
    status: "closed",
    createdAt: "2025-05-07 09:22:45",
    updatedAt: "2025-05-08 14:15:30",
    lastReply: "系统",
    relatedOrder: null,
  },
]

// 状态映射
const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "待处理", color: "bg-yellow-500" },
  processing: { label: "处理中", color: "bg-blue-500" },
  resolved: { label: "已解决", color: "bg-green-500" },
  closed: { label: "已关闭", color: "bg-gray-500" },
}

// 工单类型映射
const typeMap: Record<string, { label: string }> = {
  transfer: { label: "域名转移" },
  payment: { label: "支付问题" },
  settlement: { label: "结算相关" },
  other: { label: "其他" },
}

export default function TicketsPage() {
  // 状态管理
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // 过滤工单
  const filteredTickets = mockTickets.filter((ticket) => {
    // 状态过滤
    if (statusFilter !== "all" && ticket.status !== statusFilter) return false

    // 类型过滤
    if (typeFilter !== "all" && ticket.type !== typeFilter) return false

    // 搜索过滤
    if (
      searchTerm &&
      !ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">工单管理</h1>
        <Button asChild className="bg-[#0046FF] hover:bg-[#0035CC]">
          <Link href="/user/tickets/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            创建工单
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="搜索工单号或标题"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="工单状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="pending">待处理</SelectItem>
              <SelectItem value="processing">处理中</SelectItem>
              <SelectItem value="resolved">已解决</SelectItem>
              <SelectItem value="closed">已关闭</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="工单类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="transfer">域名转移</SelectItem>
              <SelectItem value="payment">支付问题</SelectItem>
              <SelectItem value="settlement">结算相关</SelectItem>
              <SelectItem value="other">其他</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">工单号</TableHead>
              <TableHead className="min-w-[240px]">标题</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>最近更新</TableHead>
              <TableHead>最后回复</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium hover:text-blue-600">{ticket.title}</span>
                    {ticket.relatedOrder && (
                      <Badge variant="outline" className="text-xs">
                        订单 {ticket.relatedOrder}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{typeMap[ticket.type].label}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusMap[ticket.status].color}>
                    {statusMap[ticket.status].label}
                  </Badge>
                </TableCell>
                <TableCell>{ticket.updatedAt}</TableCell>
                <TableCell>
                  <span className={ticket.lastReply === "用户" ? "text-blue-500" : "text-gray-500"}>
                    {ticket.lastReply}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/user/tickets/${ticket.id}`}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      查看对话
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}