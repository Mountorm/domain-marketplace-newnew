import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Shield, TrendingUp, Users, Award, Clock, CheckCircle, Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 公司介绍 */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">关于我们</h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            我们是全球领先的域名交易平台，致力于为用户提供安全、便捷、透明的域名交易服务。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">我们的使命</h2>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              我们的使命是连接全球域名买家和卖家，打造一个公平、透明的域名交易生态系统。我们致力于通过创新技术和优质服务，简化域名交易流程，保障交易安全，为互联网产业的发展贡献力量。
            </p>

            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">我们的愿景</h2>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              成为全球最值得信赖的域名交易平台，引领行业标准，推动互联网数字资产交易的创新与发展。
            </p>

            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">我们的价值观</h2>
            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-1 h-5 w-5 text-[#0046FF]" />
                <span>
                  <strong>诚信透明</strong> - 在所有交易和沟通中保持诚实和透明
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-1 h-5 w-5 text-[#0046FF]" />
                <span>
                  <strong>用户至上</strong> - 以用户需求为中心，不断优化产品和服务
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-1 h-5 w-5 text-[#0046FF]" />
                <span>
                  <strong>安全可靠</strong> - 确保平台和交易的安全性是我们的首要任务
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mr-2 mt-1 h-5 w-5 text-[#0046FF]" />
                <span>
                  <strong>创新进取</strong> - 不断探索和应用新技术，推动行业发展
                </span>
              </li>
            </ul>
          </div>

          <div className="relative rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-8 dark:from-gray-900 dark:to-gray-800">
            <div className="relative z-10">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">公司简介</h2>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                成立于2015年，我们已经发展成为域名交易行业的领军企业。我们的团队由一群充满激情的互联网和域名行业专家组成，他们拥有丰富的技术和行业经验。
              </p>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                多年来，我们不断创新和完善我们的平台，为用户提供更好的服务体验。我们的担保交易系统、域名验证机制和安全支付流程，为用户创造了一个安全可靠的交易环境。
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                目前，我们的平台已经服务了来自全球150多个国家的用户，促成了数十万笔成功交易，总交易额超过5亿美元。
              </p>
            </div>
            <div className="absolute bottom-0 right-0 h-40 w-40 opacity-10">
              <Globe className="h-full w-full text-[#0046FF]" />
            </div>
          </div>
        </div>
      </section>

      {/* 我们的优势 */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">我们的优势</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            为什么选择我们的域名交易平台？我们提供全方位的服务保障，确保您的交易安全无忧。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900 w-fit">
                <Shield className="h-6 w-6 text-[#0046FF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">安全担保交易</h3>
              <p className="text-gray-600 dark:text-gray-300">
                我们的担保交易系统确保买家在确认收到域名前，卖家无法收到款项，有效保障双方权益。
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900 w-fit">
                <CheckCircle className="h-6 w-6 text-[#0046FF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">域名所有权验证</h3>
              <p className="text-gray-600 dark:text-gray-300">
                严格的域名所有权验证机制，确保所有上架域名都经过真实性验证，防止欺诈行为。
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900 w-fit">
                <TrendingUp className="h-6 w-6 text-[#0046FF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">市场流动性</h3>
              <p className="text-gray-600 dark:text-gray-300">
                庞大的用户基础和活跃的交易环境，为卖家提供更多曝光机会，为买家提供更多选择。
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900 w-fit">
                <Clock className="h-6 w-6 text-[#0046FF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">高效交易流程</h3>
              <p className="text-gray-600 dark:text-gray-300">
                简化的交易流程和自动化系统，让域名交易变得快速、简单、高效。
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900 w-fit">
                <Users className="h-6 w-6 text-[#0046FF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">专业客服团队</h3>
              <p className="text-gray-600 dark:text-gray-300">
                经验丰富的客服团队提供全天候支持，随时解答您的问题，协助您完成交易。
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900 w-fit">
                <Award className="h-6 w-6 text-[#0046FF]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">行业领先地位</h3>
              <p className="text-gray-600 dark:text-gray-300">
                作为行业领导者，我们不断创新和完善服务，为用户提供最佳的域名交易体验。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="mb-20 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">平台数据</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              我们的成长离不开用户的信任和支持
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
              <p className="mb-2 text-4xl font-bold text-[#0046FF]">150+</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">覆盖国家和地区</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
              <p className="mb-2 text-4xl font-bold text-[#0046FF]">500,000+</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">注册用户</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
              <p className="mb-2 text-4xl font-bold text-[#0046FF]">200,000+</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">成功交易</p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
              <p className="mb-2 text-4xl font-bold text-[#0046FF]">$500M+</p>
              <p className="text-lg text-gray-600 dark:text-gray-300">交易总额</p>
            </div>
          </div>
        </div>
      </section>

      {/* 团队介绍 */}
      <section className="mb-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">我们的团队</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            由一群充满激情和专业知识的人才组成，致力于为用户提供最佳的域名交易体验
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* 团队成员卡片 - 这里可以根据实际情况添加团队成员信息 */}
          <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
            <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
              <img src="/placeholder.svg?height=128&width=128" alt="CEO" className="h-full w-full object-cover" />
            </div>
            <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">张三</h3>
            <p className="mb-3 text-[#0046FF]">首席执行官</p>
            <p className="text-gray-600 dark:text-gray-300">互联网行业资深专家，拥有15年域名和网络服务经验。</p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
            <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
              <img src="/placeholder.svg?height=128&width=128" alt="CTO" className="h-full w-full object-cover" />
            </div>
            <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">李四</h3>
            <p className="mb-3 text-[#0046FF]">首席技术官</p>
            <p className="text-gray-600 dark:text-gray-300">技术专家，曾在多家知名互联网公司担任技术领导职务。</p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
            <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
              <img src="/placeholder.svg?height=128&width=128" alt="COO" className="h-full w-full object-cover" />
            </div>
            <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">王五</h3>
            <p className="mb-3 text-[#0046FF]">首席运营官</p>
            <p className="text-gray-600 dark:text-gray-300">
              运营专家，擅长市场策略和用户增长，曾成功运营多个互联网产品。
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
            <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
              <img src="/placeholder.svg?height=128&width=128" alt="CMO" className="h-full w-full object-cover" />
            </div>
            <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">赵六</h3>
            <p className="mb-3 text-[#0046FF]">首席市场官</p>
            <p className="text-gray-600 dark:text-gray-300">市场营销专家，拥有丰富的品牌建设和市场推广经验。</p>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">联系我们</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            如果您有任何问题、建议或合作意向，欢迎随时联系我们
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">联系方式</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Globe className="mr-3 mt-1 h-5 w-5 text-[#0046FF]" />
                <div>
                  <p className="font-medium">公司地址</p>
                  <p className="text-gray-600 dark:text-gray-300">北京市朝阳区XX大厦100号</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="mr-3 mt-1 h-5 w-5 text-[#0046FF]" />
                <div>
                  <p className="font-medium">电子邮件</p>
                  <p className="text-gray-600 dark:text-gray-300">contact@example.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="mr-3 mt-1 h-5 w-5 text-[#0046FF]" />
                <div>
                  <p className="font-medium">电话</p>
                  <p className="text-gray-600 dark:text-gray-300">+86 10 1234 5678</p>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">关注我们</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">发送消息</h3>
            <form className="space-y-4">
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
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  消息
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-[#0046FF] focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                  placeholder="请输入您的消息..."
                ></textarea>
              </div>
              <Button className="bg-[#0046FF] hover:bg-[#0035CC]">发送消息</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
