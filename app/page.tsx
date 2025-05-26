import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Globe, ShoppingCart, Wallet, Upload } from "lucide-react"

export default function Home() {
  // 模拟热门域名数据
  const featuredDomains = [
    { name: "business.com", price: 350000, tag: "高价值" },
    { name: "crypto.io", price: 75000, tag: "热门" },
    { name: "invest.net", price: 45000, tag: "金融" },
    { name: "travel.app", price: 28000, tag: "新上架" },
    { name: "health.co", price: 32000, tag: "精品" },
    { name: "learn.xyz", price: 15000, tag: "教育" },
  ]

  // 合作伙伴品牌
  const partners = ["Verisign", "GoDaddy", "Namecheap", "PayPal", "Stripe", "Alipay"]

  return (
    <div className="flex flex-col">
      {/* Hero 区域 */}
      <section className="relative flex min-h-[600px] items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            发现您的完美域名
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            覆盖全球的域名交易平台，安全可靠的担保交易，让您的网络资产交易无忧
          </p>

          {/* 搜索框 */}
          <div className="mx-auto mb-8 flex max-w-2xl flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input type="text" placeholder="输入域名或关键词..." className="h-12 pl-10 pr-4 text-base" />
            </div>
            <Button className="h-12 bg-[#0046FF] px-8 text-base hover:bg-[#0035CC]">搜索域名</Button>
          </div>

          {/* 快速筛选标签 */}
          <div className="mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer bg-white px-4 py-2 text-sm hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              .com
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer bg-white px-4 py-2 text-sm hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              .io
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer bg-white px-4 py-2 text-sm hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              .net
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer bg-white px-4 py-2 text-sm hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              .app
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer bg-white px-4 py-2 text-sm hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              高价值
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer bg-white px-4 py-2 text-sm hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              短域名
            </Badge>
          </div>
        </div>
      </section>

      {/* 热门域名推荐 */}
      <section className="bg-white py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">热门域名推荐</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDomains.map((domain, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <Link href={`/market/${domain.name}`}>
                    <div className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{domain.name}</h3>
                        <Badge className="bg-[#0046FF]">{domain.tag}</Badge>
                      </div>
                      <p className="mb-4 text-2xl font-bold text-[#FF6A00]">${domain.price.toLocaleString()}</p>
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>注册商: GoDaddy</span>
                        <span>已验证</span>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild className="bg-[#0046FF] px-8 py-6 text-lg hover:bg-[#0035CC]">
              <Link href="/market">查看更多域名</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 快捷入口 */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">快捷入口</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/market">
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm transition-all hover:shadow-md dark:bg-gray-700">
                <Globe className="mb-4 h-10 w-10 text-[#0046FF]" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">域名市场</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">浏览所有域名</p>
              </div>
            </Link>
            <Link href="/user/listings">
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm transition-all hover:shadow-md dark:bg-gray-700">
                <Upload className="mb-4 h-10 w-10 text-[#0046FF]" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">我的上架</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">管理您的域名</p>
              </div>
            </Link>
            <Link href="/user/orders">
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm transition-all hover:shadow-md dark:bg-gray-700">
                <ShoppingCart className="mb-4 h-10 w-10 text-[#0046FF]" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">订单管理</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">查看交易记录</p>
              </div>
            </Link>
            <Link href="/user/wallet">
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm transition-all hover:shadow-md dark:bg-gray-700">
                <Wallet className="mb-4 h-10 w-10 text-[#0046FF]" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">我的钱包</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">充值与提现</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 合作伙伴 */}
      <section className="bg-white py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">合作伙伴</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="flex h-16 items-center justify-center">
                <span className="text-xl font-bold text-gray-400">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
