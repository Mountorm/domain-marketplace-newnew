"use client"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CheckCircle, Home, Info, Calendar, Clock, ArrowRight } from "lucide-react"

type PageProps = {
  params: Promise<{ domain: string }>
}

export default function DomainDetailPage({ params }: PageProps) {
  const router = useRouter()
  const resolvedParams = React.use(params)
  const domain = decodeURIComponent(resolvedParams.domain)

  // 模拟域名详情数据
  const domainData = {
    name: domain,
    price: 75000,
    registrar: "GoDaddy",
    registered: "2017-08-22",
    expires: "2024-08-22",
    tags: ["热门", "加密货币"],
    verified: true,
    description:
      "这是一个高价值的加密货币相关域名，适合区块链项目、加密货币交易所或相关服务使用。域名简短、易记，具有很高的品牌价值。",
    whois: "https://whois.com/example",
    similarDomains: [
      { name: "crypto.co", price: 35000 },
      { name: "crypto.net", price: 28000 },
      { name: "cryptomarket.com", price: 42000 },
      { name: "cryptoexchange.io", price: 38000 },
    ],
  }

  // 处理购买按钮点击
  const handleBuyClick = () => {
    router.push(`/order/confirm?domain=${encodeURIComponent(domain)}`)
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
            <BreadcrumbLink>{domain}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 左侧主信息卡 */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl font-bold">{domainData.name}</CardTitle>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {domainData.tags.map((tag, index) => (
                      <Badge key={index} className="bg-[#0046FF]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">价格</p>
                  <p className="text-3xl font-bold text-[#FF6A00]">${domainData.price.toLocaleString()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#FF6A00] text-lg hover:bg-[#E05E00]" onClick={handleBuyClick}>
                立即购买
              </Button>
            </CardContent>
          </Card>

          {/* 域名详情 */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold">域名信息</h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">{domainData.description}</p>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">注册商:</span>
                  <span className="font-medium">{domainData.registrar}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">注册日期:</span>
                  <span className="font-medium">{domainData.registered}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">到期日期:</span>
                  <span className="font-medium">{domainData.expires}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">所有权验证:</span>
                  <span className="font-medium text-green-500">已验证</span>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="mb-2 text-sm font-medium">WHOIS 信息</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">查看完整的域名注册信息和历史记录</p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link href={domainData.whois} target="_blank">
                    查看 WHOIS
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧信息卡 */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">域名详情</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">注册商</span>
                  <span className="font-medium">{domainData.registrar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">注册日期</span>
                  <span className="font-medium">{domainData.registered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">到期日期</span>
                  <span className="font-medium">{domainData.expires}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">所有权验证</span>
                  <span className="font-medium text-green-500">已验证</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">域名年龄</span>
                  <span className="font-medium">6年</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 相似域名推荐 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">相似域名</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domainData.similarDomains.map((domain, index) => (
                  <Link
                    key={index}
                    href={`/market/${domain.name}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <span className="font-medium">{domain.name}</span>
                    <div className="flex items-center">
                      <span className="mr-2 font-bold text-[#FF6A00]">${domain.price.toLocaleString()}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
