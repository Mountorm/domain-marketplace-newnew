import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileText, Search, BookOpen, Shield, CreditCard, Globe, ArrowRight } from "lucide-react"

export default function DocsPage() {
  // 文档分类
  const docCategories = [
    {
      title: "入门指南",
      description: "了解如何开始使用我们的平台",
      docs: [
        { slug: "getting-started", title: "平台使用入门" },
        { slug: "account-setup", title: "账户设置指南" },
        { slug: "domain-basics", title: "域名基础知识" },
      ],
      icon: BookOpen,
    },
    {
      title: "域名交易",
      description: "买卖域名的详细指南",
      docs: [
        { slug: "domain-verification", title: "域名所有权验证" },
        { slug: "domain-transfer", title: "域名转移流程" },
      ],
      icon: Globe,
    },
    {
      title: "支付与安全",
      description: "支付方式和安全保障",
      docs: [
        { slug: "payment-methods", title: "支付方式说明" },
        { slug: "security-measures", title: "安全措施" },
        { slug: "fraud-prevention", title: "防欺诈指南" },
      ],
      icon: Shield,
    },
    {
      title: "账户管理",
      description: "管理您的账户和设置",
      docs: [
        { slug: "profile-management", title: "个人资料管理" },
        { slug: "wallet-guide", title: "钱包使用指南" },
        { slug: "notification-settings", title: "通知设置" },
      ],
      icon: CreditCard,
    },
  ]

  // 热门文档
  const popularDocs = [
    { slug: "domain-verification", title: "域名所有权验证指南" },
    { slug: "payment-methods", title: "支付方式说明" },
    { slug: "domain-transfer", title: "域名转移流程详解" },
    { slug: "wallet-guide", title: "平台钱包使用指南" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">文档中心</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          查找您需要的所有指南、教程和参考资料，帮助您更好地使用我们的平台
        </p>

        {/* 搜索框 */}
        <div className="mx-auto mb-8 flex max-w-xl flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="搜索文档..." className="h-12 pl-10 pr-4 text-base" />
          </div>
          <Button className="h-12 bg-[#0046FF] px-8 text-base hover:bg-[#0035CC]">搜索</Button>
        </div>
      </div>

      {/* 热门文档 */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">热门文档</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularDocs.map((doc) => (
            <Card key={doc.slug} className="transition-all hover:shadow-md">
              <CardContent className="p-4">
                <Link href={`/docs/${doc.slug}`} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-[#0046FF]" />
                    <span className="font-medium">{doc.title}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 文档分类 */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {docCategories.map((category) => (
          <Card key={category.title} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <category.icon className="h-5 w-5 text-[#0046FF]" />
              </div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.docs.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      href={`/docs/${doc.slug}`}
                      className="flex items-center rounded-md py-1 text-gray-700 transition-colors hover:text-[#0046FF] dark:text-gray-300 dark:hover:text-[#0046FF]"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="mt-4 p-0 text-[#0046FF]" asChild>
                <Link href={`/docs/category/${category.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  查看全部 <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 帮助和支持 */}
      <div className="mt-16 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-8 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">找不到您需要的内容？</h2>
            <p className="text-gray-600 dark:text-gray-300">
              如果您在文档中找不到所需的信息，我们的客服团队随时为您提供帮助。
            </p>
          </div>
          <Button className="bg-[#0046FF] hover:bg-[#0035CC]" asChild>
            <Link href="/support">联系客服</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
