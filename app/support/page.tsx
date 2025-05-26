"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Mail, MessageSquare, Phone, Search, FileText, BookOpen } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">客户支持中心</h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          我们随时为您提供帮助，解决您在域名交易过程中遇到的任何问题
        </p>

        {/* 搜索框 */}
        <div className="mx-auto mb-8 flex max-w-xl flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="搜索帮助文档..." className="h-12 pl-10 pr-4 text-base" />
          </div>
          <Button className="h-12 bg-[#0046FF] px-8 text-base hover:bg-[#0035CC]">搜索</Button>
        </div>
      </div>

      {/* 快速链接 */}
      <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all hover:shadow-md">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <HelpCircle className="mb-4 h-12 w-12 text-[#0046FF]" />
            <h3 className="mb-2 text-xl font-semibold">常见问题</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">查找最常见问题的答案</p>
            <Button variant="outline" className="mt-auto">
              浏览常见问题
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <BookOpen className="mb-4 h-12 w-12 text-[#0046FF]" />
            <h3 className="mb-2 text-xl font-semibold">文档中心</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">详细的平台使用指南</p>
            <Button variant="outline" className="mt-auto" asChild>
              <Link href="/docs">查看文档</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <MessageSquare className="mb-4 h-12 w-12 text-[#0046FF]" />
            <h3 className="mb-2 text-xl font-semibold">联系我们</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">获取专业客服支持</p>
            <Button variant="outline" className="mt-auto">
              联系客服
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <FileText className="mb-4 h-12 w-12 text-[#0046FF]" />
            <h3 className="mb-2 text-xl font-semibold">政策条款</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">服务条款和隐私政策</p>
            <Button variant="outline" className="mt-auto">
              查看政策
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 常见问题 */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">常见问题</h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            以下是用户最常问的一些问题，如果您没有找到需要的答案，请联系我们的客服团队
          </p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <div className="mb-6 flex justify-center">
            <TabsList>
              <TabsTrigger value="general">一般问题</TabsTrigger>
              <TabsTrigger value="buying">购买域名</TabsTrigger>
              <TabsTrigger value="selling">出售域名</TabsTrigger>
              <TabsTrigger value="payment">支付问题</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="general">
            <Accordion type="single" collapsible className="mx-auto max-w-3xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>什么是域名交易平台？</AccordionTrigger>
                <AccordionContent>
                  域名交易平台是一个专门用于买卖域名的在线市场。我们提供安全的交易环境，包括域名验证、担保交易和支付保障等服务，确保买卖双方的权益。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>如何创建账户？</AccordionTrigger>
                <AccordionContent>
                  点击网站右上角的"登录/注册"按钮，填写您的电子邮件地址和密码，然后按照提示完成注册流程。您也可以使用第三方账号（如Google、Facebook等）快速注册。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>平台收取哪些费用？</AccordionTrigger>
                <AccordionContent>
                  我们对成功的交易收取一定比例的服务费。买家无需支付额外费用，卖家需要支付成交价的2%作为服务费。某些特殊服务可能会有额外费用，详情请查看我们的费用说明页面。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>如何联系客服？</AccordionTrigger>
                <AccordionContent>
                  您可以通过网站底部的"联系我们"链接，或直接发送邮件至support@example.com与我们联系。我们的客服团队会在24小时内回复您的问题。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="buying">
            <Accordion type="single" collapsible className="mx-auto max-w-3xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>如何购买域名？</AccordionTrigger>
                <AccordionContent>
                  浏览我们的域名市场，找到您感兴趣的域名后，点击"购买"按钮，按照提示完成支付流程。支付成功后，卖家会收到通知并开始域名转移流程。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>购买域名后如何接收？</AccordionTrigger>
                <AccordionContent>
                  域名转移通常通过以下方式之一完成：1) 推送转移：卖家将域名直接推送到您在同一注册商的账户；2)
                  授权码转移：卖家提供授权码，您使用该授权码将域名转入您选择的注册商。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>如何确保购买的域名安全？</AccordionTrigger>
                <AccordionContent>
                  我们的平台要求所有卖家验证域名所有权，并提供担保交易服务。您的付款会被安全托管，只有在您确认收到域名后才会释放给卖家，这样可以最大限度地保障您的权益。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="selling">
            <Accordion type="single" collapsible className="mx-auto max-w-3xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>如何上架我的域名？</AccordionTrigger>
                <AccordionContent>
                  登录您的账户，进入"用户中心"，点击"我的上架"，然后点击"新增上架"按钮。填写域名信息和价格，完成域名所有权验证后，您的域名就会在市场上展示。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>如何验证域名所有权？</AccordionTrigger>
                <AccordionContent>
                  上架域名后，系统会生成一个唯一的验证ID。您需要在域名的DNS设置中添加一条TXT记录或CNAME记录。添加完成后，点击"验证所有权"按钮，系统会自动检查并验证您的域名所有权。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>卖出域名后如何收款？</AccordionTrigger>
                <AccordionContent>
                  当买家购买您的域名并完成支付后，您会收到通知。您需要按照系统提示完成域名转移。买家确认收到域名后，款项会自动转入您的平台钱包，您可以随时提现到您的银行账户或其他支付方式。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="payment">
            <Accordion type="single" collapsible className="mx-auto max-w-3xl">
              <AccordionItem value="item-1">
                <AccordionTrigger>支持哪些支付方式？</AccordionTrigger>
                <AccordionContent>
                  我们支持多种支付方式，包括信用卡/借记卡、PayPal、支付宝、微信支付以及部分加密货币。您可以在结算页面选择最适合您的支付方式。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>如何充值和提现？</AccordionTrigger>
                <AccordionContent>
                  在"用户中心"的"钱包"页面，您可以点击"充值"按钮向您的账户充值，或点击"提现"按钮将余额提取到您的银行账户或其他支付方式。提现通常在1-3个工作日内处理完成。
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>交易安全如何保障？</AccordionTrigger>
                <AccordionContent>
                  我们使用行业标准的SSL加密技术保护您的支付信息。所有交易都通过我们的担保服务进行，确保买家在确认收到域名前，卖家无法收到款项，从而保障双方权益。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>

      {/* 联系方式 */}
      <div className="mb-16">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">联系我们</h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            如果您有任何问题或需要帮助，请通过以下方式联系我们的客服团队
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Mail className="mb-4 h-12 w-12 text-[#0046FF]" />
              <h3 className="mb-2 text-xl font-semibold">电子邮件</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">support@example.com</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">24小时内回复</p>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <MessageSquare className="mb-4 h-12 w-12 text-[#0046FF]" />
              <h3 className="mb-2 text-xl font-semibold">在线客服</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">工作日 9:00-18:00</p>
              <Button className="bg-[#0046FF] hover:bg-[#0035CC]">开始聊天</Button>
            </CardContent>
          </Card>

          <Card className="transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Phone className="mb-4 h-12 w-12 text-[#0046FF]" />
              <h3 className="mb-2 text-xl font-semibold">电话支持</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">+1 (800) 123-4567</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">工作日 9:00-18:00</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 提交工单 */}
      <div className="rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">提交工单</h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
            如果您需要更详细的帮助，请填写以下表单，我们的客服团队会尽快与您联系
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                姓名
              </label>
              <Input id="name" placeholder="您的姓名" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                电子邮件
              </label>
              <Input id="email" type="email" placeholder="您的邮箱地址" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">
              主题
            </label>
            <Input id="subject" placeholder="问题主题" />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              详细描述
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-[#0046FF] focus:outline-none dark:border-gray-700 dark:bg-gray-800"
              placeholder="请详细描述您遇到的问题..."
            ></textarea>
          </div>

          <div className="text-center">
            <Button className="bg-[#0046FF] px-8 py-2 hover:bg-[#0035CC]">提交工单</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
