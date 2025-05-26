"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AlertCircle, ArrowLeft, MessageCircle, Send } from "lucide-react"

// 模拟工单详情
const ticketData = {
  id: "TK123456",
  title: "域名转移遇到问题",
  type: "transfer",
  status: "processing",
  createdAt: "2025-05-10 14:30:22",
  updatedAt: "2025-05-10 15:20:15",
  relatedOrder: "ORD123456",
  messages: [
    {
      id: 1,
      sender: "user",
      content: "您好，我在转移域名时遇到了问题。我已经收到了卖家提供的转移码，但是在新注册商处提示域名被锁定，无法转入。",
      time: "2025-05-10 14:30:22",
      attachments: [],
    },
    {
      id: 2,
      sender: "system",
      content: "感谢您提交工单，我们的客服人员即将为您服务，请稍候。",
      time: "2025-05-10 14:30:25",
      attachments: [],
    },
    {
      id: 3,
      sender: "staff",
      content: "您好，域名被锁定是常见的转移限制之一。请按以下步骤操作：\n1. 请联系卖家登录域名当前注册商的控制面板\n2. 找到域名锁定设置（通常在安全设置中）\n3. 关闭域名锁定\n4. 等待24-48小时后重试转入\n\n如果操作后仍有问题，请告诉我们。",
      time: "2025-05-10 15:20:15",
      attachments: [
        {
          name: "域名解锁操作指南.pdf",
          size: "2.5MB",
          url: "#",
        },
      ],
    },
    {
      id: 4,
      sender: "user",
      content: "好的，我已经联系卖家处理了，他说会尽快解除锁定。请问解除锁定后，原来的转移码还可以使用吗，还是需要重新获取？",
      time: "2025-05-10 16:15:33",
      attachments: [],
    },
  ],
}

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

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)

  // 处理发送消息
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setIsSubmitting(true)
    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false)
      setNewMessage("")
      setFiles(null)
    }, 1000)
  }

  return (
    <div className="container mx-auto py-8">
      {/* 面包屑导航 */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/user/tickets">工单管理</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>工单详情</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{ticketData.title}</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{typeMap[ticketData.type].label}</Badge>
            <Badge className={statusMap[ticketData.status].color}>
              {statusMap[ticketData.status].label}
            </Badge>
          </div>
        </div>
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
          <span>工单号：{ticketData.id}</span>
          <span>创建时间：{ticketData.createdAt}</span>
          {ticketData.relatedOrder && (
            <Link href={`/user/orders/${ticketData.relatedOrder}`} className="text-blue-500 hover:underline">
              相关订单：{ticketData.relatedOrder}
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* 对话记录 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>对话记录</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[600px] space-y-4 overflow-y-auto p-6">
              {ticketData.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative max-w-[85%] rounded-lg p-4 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white after:absolute after:right-[-6px] after:top-4 after:border-8 after:border-transparent after:border-l-blue-500"
                        : message.sender === "system"
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-800 border after:absolute after:left-[-6px] after:top-4 after:border-8 after:border-transparent after:border-r-white dark:after:border-r-gray-800"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between space-x-4">
                      <span className={`text-sm ${message.sender === "user" ? "text-white/90" : "text-gray-600 dark:text-gray-400"}`}>
                        {message.sender === "user"
                          ? "我"
                          : message.sender === "system"
                          ? "系统消息"
                          : "客服人员"}
                      </span>
                      <span className={`text-xs ${message.sender === "user" ? "text-white/75" : "text-gray-400"}`}>
                        {message.time}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((file, index) => (
                          <div
                            key={index}
                            className={`flex items-center rounded px-2 py-1 text-sm ${
                              message.sender === "user"
                                ? "bg-blue-600/30"
                                : "bg-black/5 dark:bg-white/5"
                            }`}
                          >
                            <a
                              href={file.url}
                              className="flex items-center hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name} ({file.size})
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 回复框 */}
          <form onSubmit={handleSendMessage}>
            <Card>
              <CardContent className="p-4">
                <Textarea
                  placeholder="输入回复内容..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="mb-4 min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      添加附件
                    </Button>
                    {files && (
                      <span className="text-sm text-gray-500">
                        已选择 {files.length} 个文件
                      </span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="bg-[#0046FF] hover:bg-[#0035CC]"
                    disabled={isSubmitting || !newMessage.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "发送中..." : "发送"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* 右侧信息栏 */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>处理说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p className="mb-2">当前状态：{statusMap[ticketData.status].label}</p>
                    <p>我们会在工作时间内尽快处理您的问题。如有紧急情况，请致电客服热线。</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">联系方式</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>客服电话：400-123-4567</p>
                  <p>服务时间：周一至周五 9:00-18:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>工单进度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="font-medium">工单创建</p>
                    <p className="text-sm text-gray-500">{ticketData.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="font-medium">客服响应</p>
                    <p className="text-sm text-gray-500">{ticketData.messages[2].time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="font-medium">处理中</p>
                    <p className="text-sm text-gray-500">等待问题解决</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}