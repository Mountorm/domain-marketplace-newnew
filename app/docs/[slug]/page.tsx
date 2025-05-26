import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ArrowRight, ExternalLink, BookOpen, ChevronRight, Home } from "lucide-react"

// 模拟文档内容
const documentContent: Record<string, { title: string; content: string }> = {
  "getting-started": {
    title: "平台使用入门",
    content: `
      <h2>欢迎使用域名交易平台</h2>
      <p>本指南将帮助您快速了解和使用我们的平台功能。</p>
      
      <h3>第一步：注册账户</h3>
      <p>点击网站右上角的"登录/注册"按钮，填写必要信息完成注册。您也可以使用Google等第三方账号快速注册。</p>
      
      <h3>第二步：浏览域名</h3>
      <p>在首页或域名市场页面，您可以浏览所有在售域名。使用过滤器可以帮助您更快找到理想的域名。</p>
      
      <h3>第三步：购买域名</h3>
      <p>找到心仪的域名后，点击域名卡片查看详情，确认价格和条件，然后点击"购买"按钮完成购买。</p>
      
      <h3>购买成功后</h3>
      <p>域名购买成功后，卖家将在48小时内完成域名转移。您可以在"订单管理"页面查看订单状态。</p>
    `,
  },
  "payment-methods": {
    title: "支付方式说明",
    content: `
      <h2>支付方式</h2>
      <p>我们支持多种支付方式，方便您选择最适合的付款方式。</p>
      
      <h3>支持的付款方式</h3>
      <ul>
        <li>信用卡/借记卡</li>
        <li>支付宝</li>
        <li>微信支付</li>
        <li>PayPal</li>
        <li>银行转账</li>
      </ul>
      
      <h3>支付后多久能收到确认？</h3>
      <p>大多数支付方式（如信用卡、支付宝等）会立即收到确认。银行转账可能需要1-3个工作日。</p>
      
      <h3>是否支持分期付款？</h3>
      <p>目前我们不直接提供分期付款选项，但您可以使用支持分期的信用卡进行支付。</p>
      
      <h3>如何查看我的支付历史？</h3>
      <p>您可以在"用户中心"的"钱包"或"订单管理"页面查看所有的支付记录。</p>
    `,
  },
  "domain-verification": {
    title: "域名所有权验证",
    content: `
      <h2>域名所有权验证指南</h2>
      <p>为了确保域名交易的安全性，我们需要验证您对要出售的域名拥有所有权。</p>
      
      <h3>验证方式</h3>
      <p>您可以选择以下任一方式验证域名所有权：</p>
      <ul>
        <li>添加 TXT 记录验证</li>
        <li>添加 CNAME 记录验证</li>
        <li>上传域名注册商后台截图</li>
      </ul>

      <h3>TXT 记录验证步骤</h3>
      <p>1. 在域名上架时，系统会生成一个唯一的验证码</p>
      <p>2. 登录您的域名注册商后台</p>
      <p>3. 添加一条新的 TXT 记录</p>
      <p>4. 等待记录生效后点击验证按钮</p>

      <h3>常见问题</h3>
      <p>Q: 记录添加后需要等多久？</p>
      <p>A: DNS 记录通常在10分钟内生效，最长可能需要48小时。</p>
    `,
  },
  "domain-transfer": {
    title: "域名转移流程",
    content: `
      <h2>域名转移流程说明</h2>
      <p>了解如何安全地完成域名转移流程。</p>

      <h3>转移方式</h3>
      <p>域名可以通过以下方式转移：</p>
      <ul>
        <li>推送转移（同一注册商）</li>
        <li>授权码转移（不同注册商）</li>
      </ul>

      <h3>转移步骤</h3>
      <ol>
        <li>解锁域名（如果已锁定）</li>
        <li>获取授权码（如需要）</li>
        <li>提交转移申请</li>
        <li>确认转移请求</li>
      </ol>

      <h3>注意事项</h3>
      <p>1. 确保域名已解除锁定状态</p>
      <p>2. 检查域名是否符合转移条件</p>
      <p>3. 准备好所需的转移信息</p>
    `,
  },
}

export default function DocumentPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const doc = documentContent[slug] || {
    title: "文档不存在",
    content: "<p>您请求的文档不存在或已被移除。</p>",
  }

  // 相关文档链接
  const relatedDocs = [
    { slug: "domain-verification", title: "域名所有权验证指南" },
    { slug: "payment-methods", title: "支付方式说明" },
    { slug: "domain-transfer", title: "域名转移流程" },
  ].filter((item) => item.slug !== slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="flex items-center hover:text-[#0046FF]">
          <Home className="mr-1 h-4 w-4" />
          首页
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href="/docs" className="hover:text-[#0046FF]">
          文档中心
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span>{doc.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* 侧边栏导航 */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold">文档导航</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs/domain-verification"
                    className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors ${
                      slug === "domain-verification"
                        ? "bg-[#0046FF] text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    域名所有权验证
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/payment-methods"
                    className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors ${
                      slug === "payment-methods"
                        ? "bg-[#0046FF] text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    支付方式说明
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/domain-transfer"
                    className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors ${
                      slug === "domain-transfer"
                        ? "bg-[#0046FF] text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    域名转移流程
                  </Link>
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3 text-lg font-semibold">支持</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/support"
                    className="flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    帮助中心
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support#contact"
                    className="flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    联系客服
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">{doc.title}</h1>
            <div
              className="prose max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-a:text-[#0046FF]"
              dangerouslySetInnerHTML={{ __html: doc.content }}
            />
          </div>

          {/* 相关文档 */}
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">相关文档</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {relatedDocs.map((relatedDoc) => (
                <Card key={relatedDoc.slug} className="transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <Link href={`/docs/${relatedDoc.slug}`} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-[#0046FF]" />
                        <span className="font-medium">{relatedDoc.title}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 反馈区域 */}
          <div className="mt-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">这篇文档对您有帮助吗？</h2>
            <div className="flex space-x-4">
              <Button variant="outline">有帮助</Button>
              <Button variant="outline">需要改进</Button>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              如果您有任何问题或建议，请
              <Link href="/support" className="text-[#0046FF] hover:underline">
                联系我们的客服团队
              </Link>
              。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
