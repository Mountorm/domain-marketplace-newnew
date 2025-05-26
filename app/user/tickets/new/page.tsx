"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, ArrowLeft, PaperclipIcon } from "lucide-react"
import { noticeManager } from "@/components/ui/notice-message"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function NewTicketPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ticketType, setTicketType] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [relatedOrder, setRelatedOrder] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)

  // 模拟提交工单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 模拟API调用
    setTimeout(() => {
      setIsSubmitting(false)
      noticeManager.success(
        "工单提交成功",
        "您的工单已成功提交，我们会尽快为您处理"
      )

      // 延迟跳转，让用户看到成功通知
      setTimeout(() => {
        router.push("/user/tickets")
      }, 1500)
    }, 1500)
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
            <BreadcrumbLink>创建工单</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">创建工单</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>工单信息</CardTitle>
                <CardDescription>
                  请详细描述您遇到的问题，我们的客服团队会尽快为您处理
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">工单类型</Label>
                  <Select value={ticketType} onValueChange={setTicketType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="选择工单类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transfer">域名转移</SelectItem>
                      <SelectItem value="payment">支付问题</SelectItem>
                      <SelectItem value="settlement">结算相关</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">关联订单（可选）</Label>
                  <Input
                    id="order"
                    placeholder="输入订单号，例如：ORD123456"
                    value={relatedOrder}
                    onChange={(e) => setRelatedOrder(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">标题</Label>
                  <Input
                    id="title"
                    placeholder="简要描述您的问题"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">详细描述</Label>
                  <Textarea
                    id="content"
                    placeholder="请详细描述您遇到的问题..."
                    className="min-h-[200px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">附件（可选）</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="attachments"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("attachments")?.click()}
                    >
                      <PaperclipIcon className="mr-2 h-4 w-4" />
                      选择文件
                    </Button>
                    {files && (
                      <span className="text-sm text-gray-500">
                        已选择 {files.length} 个文件
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    支持上传图片、PDF等文件，单个文件大小不超过5MB
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                  取消
                </Button>
                <Button
                  type="submit"
                  className="bg-[#0046FF] hover:bg-[#0035CC]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "提交中..." : "提交工单"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>温馨提示</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p>为了更快地解决您的问题，请：</p>
                    <ul className="ml-4 mt-2 list-disc space-y-1">
                      <li>选择正确的工单类型</li>
                      <li>提供清晰的问题描述</li>
                      <li>如有订单相关问题，请填写订单号</li>
                      <li>上传相关的截图或文件</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">处理时效说明：</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• 紧急问题（如支付、转移）：2小时内响应</li>
                  <li>• 一般问题：24小时内响应</li>
                  <li>• 非工作时间可能会有延迟</li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="mb-2 font-medium">工作时间</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  周一至周五：9:00 - 18:00
                  <br />
                  周六至周日：10:00 - 17:00
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
