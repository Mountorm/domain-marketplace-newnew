import Link from "next/link"
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* 产品栏 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">产品</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/market"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  域名市场
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  上架指南
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  费用说明
                </Link>
              </li>
            </ul>
          </div>

          {/* 公司栏 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">公司</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  关于我们
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  服务条款
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  隐私政策
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  加入我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 支持栏 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">支持</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  帮助中心
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  常见问题
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  联系我们
                </Link>
              </li>
              <li>
                <Link
                  href="/report"
                  className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
                >
                  举报问题
                </Link>
              </li>
            </ul>
          </div>

          {/* 社交媒体栏 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">关注我们</h3>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-[#0046FF] dark:text-gray-400 dark:hover:text-[#0046FF]"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">订阅我们的新闻通讯，获取最新域名资讯</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="您的邮箱地址"
                  className="w-full rounded-l-md border border-gray-300 px-3 py-2 focus:border-[#0046FF] focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button className="rounded-r-md bg-[#0046FF] px-4 py-2 text-white hover:bg-[#0035CC]">订阅</button>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} 域名交易平台. 保留所有权利.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">ICP备案号: 京ICP备XXXXXXXX号-X</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
