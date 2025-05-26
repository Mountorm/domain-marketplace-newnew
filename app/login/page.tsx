"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Twitter, Mail, Eye, EyeOff, Check, AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { noticeManager } from "@/components/ui/notice-message"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // 注册表单状态
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    agreeToTerms: false
  })

  // 其他状态
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  // 密码强度检查
  const checkPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
    const score = Object.values(checks).filter(Boolean).length
    return { checks, score }
  }

  // 表单验证
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // 用户名验证
    if (!registerForm.username.trim()) {
      newErrors.username = "请输入用户名"
    } else if (registerForm.username.length < 3) {
      newErrors.username = "用户名至少需要3个字符"
    } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(registerForm.username)) {
      newErrors.username = "用户名只能包含字母、数字、下划线和中文"
    }

    // 邮箱验证
    if (!registerForm.email.trim()) {
      newErrors.email = "请输入邮箱地址"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      newErrors.email = "请输入有效的邮箱地址"
    }

    // 密码验证
    if (!registerForm.password) {
      newErrors.password = "请输入密码"
    } else {
      const { score } = checkPasswordStrength(registerForm.password)
      if (score < 3) {
        newErrors.password = "密码强度不足，请包含大小写字母、数字或特殊字符"
      }
    }

    // 确认密码验证
    if (!registerForm.confirmPassword) {
      newErrors.confirmPassword = "请确认密码"
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致"
    }

    // 验证码验证
    if (isEmailSent && !registerForm.verificationCode) {
      newErrors.verificationCode = "请输入验证码"
    } else if (isEmailSent && registerForm.verificationCode.length !== 6) {
      newErrors.verificationCode = "验证码应为6位数字"
    }

    // 协议同意验证
    if (!registerForm.agreeToTerms) {
      newErrors.agreeToTerms = "请同意服务条款和隐私政策"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 发送验证码
  const handleSendVerificationCode = async () => {
    // 先验证邮箱
    if (!registerForm.email.trim()) {
      setErrors({ email: "请先输入邮箱地址" })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      setErrors({ email: "请输入有效的邮箱地址" })
      return
    }

    setIsSendingCode(true)

    // 模拟发送验证码
    setTimeout(() => {
      setIsSendingCode(false)
      setIsEmailSent(true)
      setCountdown(60)

      // 开始倒计时
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      toast({
        title: "验证码已发送",
        description: `验证码已发送到 ${registerForm.email}，请查收邮件`,
      })
    }, 1000)
  }

  // 登录表单验证
  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {}

    if (!loginForm.email.trim()) {
      newErrors.email = "请输入邮箱地址"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) {
      newErrors.email = "请输入有效的邮箱地址"
    }

    if (!loginForm.password.trim()) {
      newErrors.password = "请输入密码"
    } else if (loginForm.password.length < 6) {
      newErrors.password = "密码至少需要6个字符"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // 表单验证
    if (!validateLoginForm()) {
      noticeManager.error("表单验证失败", "请检查输入信息")
      return
    }

    setIsLoading(true)
    noticeManager.info("正在登录", "请稍候，我们正在验证您的账户信息")

    // 模拟登录请求
    setTimeout(() => {
      setIsLoading(false)

      // 模拟登录失败情况
      if (loginForm.email === "error@example.com") {
        noticeManager.error(
          "登录失败",
          "账户或密码错误，请检查后重试"
        )
        return
      }

      // 模拟账户被锁定
      if (loginForm.email === "locked@example.com") {
        noticeManager.warning(
          "账户已被锁定",
          "由于多次登录失败，您的账户已被临时锁定15分钟"
        )
        return
      }

      // 登录成功
      noticeManager.success("登录成功", "欢迎回来！正在跳转到主页面...")

      // 存储模拟的认证令牌
      localStorage.setItem("auth-token", "example-token")

      // 延迟跳转，让用户看到成功通知
      setTimeout(() => {
        router.push("/")
      }, 1500)
    }, 1500)
  }

  // 登录表单输入处理
  const handleLoginInputChange = (field: keyof typeof loginForm, value: string) => {
    setLoginForm(prev => ({ ...prev, [field]: value }))
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    // 表单验证
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // 模拟注册请求
    setTimeout(() => {
      setIsLoading(false)

      // 模拟检查邮箱是否已存在
      if (registerForm.email === "test@example.com") {
        setErrors({ email: "该邮箱已被注册，请使用其他邮箱" })
        return
      }

      // 模拟验证码验证
      if (registerForm.verificationCode !== "123456") {
        setErrors({ verificationCode: "验证码错误，请重新输入" })
        return
      }

      toast({
        title: "注册成功！",
        description: "您的账户已创建成功，请登录",
      })

      // 清空表单
      setRegisterForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        verificationCode: "",
        agreeToTerms: false
      })
      setIsEmailSent(false)
      setErrors({})

      // 切换到登录选项卡
      document.getElementById("login-tab")?.click()
    }, 1500)
  }

  // 表单输入处理
  const handleInputChange = (field: keyof typeof registerForm, value: string | boolean) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }))
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }



  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">账户访问</CardTitle>
          <CardDescription className="text-center">登录或注册以访问您的账户</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger id="login-tab" value="login">
                登录
              </TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>

            {/* 登录表单 */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginForm.email}
                    onChange={(e) => handleLoginInputChange('email', e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Demo: error@example.com (登录失败), locked@example.com (账户锁定)
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">密码</Label>
                    <Link href="/forgot-password" className="text-sm text-[#0046FF] hover:underline">
                      忘记密码?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                    value={loginForm.password}
                    onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-[#0046FF] hover:bg-[#0035CC]" disabled={isLoading}>
                  {isLoading ? "登录中..." : "登录"}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                      或通过以下方式登录
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Button variant="outline" className="w-full" disabled={isLoading}>
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" className="w-full" disabled={isLoading}>
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                    onClick={() => router.push("/auth/google/demo")}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* 注册表单 */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 pt-4">
                {/* 用户名 */}
                <div className="space-y-2">
                  <Label htmlFor="register-name">用户名</Label>
                  <Input
                    id="register-name"
                    type="text"
                    value={registerForm.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={errors.username ? "border-red-500" : ""}
                    placeholder="请输入用户名"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* 邮箱 */}
                <div className="space-y-2">
                  <Label htmlFor="register-email">邮箱</Label>
                  <Input
                    id="register-email"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 邮箱验证码 */}
                <div className="space-y-2">
                  <Label htmlFor="verification-code">邮箱验证码</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="verification-code"
                      type="text"
                      value={registerForm.verificationCode}
                      onChange={(e) => handleInputChange('verificationCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className={errors.verificationCode ? "border-red-500" : ""}
                      placeholder="请输入6位验证码"
                      maxLength={6}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendVerificationCode}
                      disabled={isSendingCode || countdown > 0}
                      className="whitespace-nowrap"
                    >
                      {isSendingCode ? "发送中..." : countdown > 0 ? `${countdown}s` : "发送验证码"}
                    </Button>
                  </div>
                  {errors.verificationCode && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.verificationCode}
                    </p>
                  )}
                  {isEmailSent && !errors.verificationCode && (
                    <p className="text-sm text-green-600 flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      验证码已发送到您的邮箱 (Demo: 123456)
                    </p>
                  )}
                </div>

                {/* 密码 */}
                <div className="space-y-2">
                  <Label htmlFor="register-password">密码</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      value={registerForm.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? "border-red-500" : ""}
                      placeholder="请输入密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>

                  {/* 密码强度指示器 */}
                  {registerForm.password && (
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600">密码强度：</div>
                      <div className="space-y-1">
                        {(() => {
                          const { checks, score } = checkPasswordStrength(registerForm.password)
                          const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']
                          const strengthTexts = ['很弱', '弱', '一般', '强', '很强']

                          return (
                            <>
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <div
                                    key={i}
                                    className={`h-1 flex-1 rounded ${
                                      i <= score ? strengthColors[score - 1] : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                              <div className="text-xs text-gray-600">
                                {strengthTexts[score - 1] || '很弱'} -
                                {!checks.length && ' 至少8个字符'}
                                {!checks.uppercase && ' 大写字母'}
                                {!checks.lowercase && ' 小写字母'}
                                {!checks.number && ' 数字'}
                                {!checks.special && ' 特殊字符'}
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* 确认密码 */}
                <div className="space-y-2">
                  <Label htmlFor="register-confirm">确认密码</Label>
                  <div className="relative">
                    <Input
                      id="register-confirm"
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerForm.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                      placeholder="请再次输入密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {registerForm.confirmPassword && registerForm.password === registerForm.confirmPassword && (
                    <p className="text-sm text-green-600 flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      密码匹配
                    </p>
                  )}
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* 用户协议 */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agree-terms"
                      checked={registerForm.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      className={errors.agreeToTerms ? "border-red-500" : ""}
                    />
                    <div className="text-sm leading-5">
                      <label htmlFor="agree-terms" className="cursor-pointer">
                        我已阅读并同意{" "}
                        <Link href="/terms" className="text-[#0046FF] hover:underline">
                          服务条款
                        </Link>{" "}
                        和{" "}
                        <Link href="/privacy" className="text-[#0046FF] hover:underline">
                          隐私政策
                        </Link>
                      </label>
                    </div>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.agreeToTerms}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#0046FF] hover:bg-[#0035CC]"
                  disabled={isLoading}
                >
                  {isLoading ? "注册中..." : "创建账户"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            需要帮助?{" "}
            <Link href="/support" className="text-[#0046FF] hover:underline">
              联系客服
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
