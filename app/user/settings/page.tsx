"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Bell, Globe, Mail, Shield, Eye, EyeOff, Settings, ShoppingCart, DollarSign, Megaphone, Smartphone, Copy, QrCode } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { noticeManager } from "@/components/ui/notice-message"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { NotificationItem } from "@/components/ui/notification-item"

export default function SettingsPage() {
  // 状态管理
  const [activeTab, setActiveTab] = useState("account")
  const [isLoading, setIsLoading] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [googleAuthEnabled, setGoogleAuthEnabled] = useState(false)
  const [showSetupDialog, setShowSetupDialog] = useState(false)
  const [showGoogleAuthDialog, setShowGoogleAuthDialog] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  const [tradingPassword, setTradingPassword] = useState("")
  const [confirmTradingPassword, setConfirmTradingPassword] = useState("")
  const [googleAuthCode, setGoogleAuthCode] = useState("")
  const [googleAuthSecret, setGoogleAuthSecret] = useState("JBSWY3DPEHPK3PXP")

  // 添加新的状态
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [hasOperationsChanged, setHasOperationsChanged] = useState(false)
  const [emailVerifyCode, setEmailVerifyCode] = useState("")

  // 修改 securityOperations 的类型和初始值
  const [securityOperations, setSecurityOperations] = useState({
    changePassword: true,
    changeEmail: true,
    orderPayment: true,
    confirmReceive: true,
    transferCode: true,
    withdrawal: true,
  })

  // 通知设置状态
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      enabled: true,
    },
    inApp: {
      enabled: true,
      badge: true,
      sound: true,
    },
    types: {
      order: {
        enabled: true,
        events: {
          placed: true,
          paid: true,
          transferred: true,
          completed: true,
          disputed: true,
        }
      },
      security: {
        enabled: true,
        events: {
          login: true,
          passwordChanged: true,
          emailChanged: true,
        }
      },
      system: {
        enabled: true,
        events: {
          maintenance: true,
          announcement: true,
          update: true,
        }
      },
      marketing: {
        enabled: false,
        events: {
          promotion: false,
          newsletter: false,
        }
      }
    }
  })

  // 模拟设置数据
  const settingsData = {
    email: "user@example.com",
    language: "zh-CN",
    timezone: "Asia/Shanghai",
    currency: "CNY",
    notifications: {
      email: true,
      browser: true,
      orderUpdates: true,
      marketingEmails: false,
    },
    security: {
      twoFactorEnabled: false,
      securityOperations: {
        orderPayment: true,
        withdrawal: true,
        profileChange: false,
        domainTransfer: true,
      },
    },
  }

  // 处理保存按钮点击
  const handleSave = () => {
    setIsLoading(true)

    // 验证交易密码设置
    if (twoFactorEnabled) {
      if (tradingPassword !== confirmTradingPassword) {
        toast({
          title: "交易密码不匹配",
          description: "请确保两次输入的交易密码相同",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      if (tradingPassword.length !== 6) {
        toast({
          title: "交易密码格式错误",
          description: "请输入6位数字交易密码",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }
    }

    // 模拟保存请求
    setTimeout(() => {
      setIsLoading(false)
      noticeManager.success(
        "设置已保存",
        twoFactorEnabled ? "两步验证已开启" : "更改已保存"
      )
      // 实际项目中应该更新用户设置
    }, 1000)
  }

  // 处理发送验证码
  const handleSendVerifyCode = () => {
    setIsSendingCode(true)
    // 模拟发送验证码
    setTimeout(() => {
      setIsSendingCode(false)
      noticeManager.success(
        "验证码已发送",
        "请查看您的邮箱"
      )
    }, 1000)
  }

  // 处理两步验证切换
  const handleTwoFactorToggle = (checked: boolean) => {
    if (checked) {
      setShowSetupDialog(true)
    } else {
      setTwoFactorEnabled(false)
    }
  }

  // 处理 Google Authenticator 切换
  const handleGoogleAuthToggle = (checked: boolean) => {
    if (checked) {
      setShowGoogleAuthDialog(true)
    } else {
      setGoogleAuthEnabled(false)
    }
  }

  // 处理 Google Authenticator 设置确认
  const handleGoogleAuthConfirm = () => {
    if (googleAuthCode.length !== 6) {
      toast({
        title: "验证码格式错误",
        description: "请输入6位数字验证码",
        variant: "destructive",
      })
      return
    }

    setGoogleAuthEnabled(true)
    setShowGoogleAuthDialog(false)
    noticeManager.success(
      "设置成功",
      "Google Authenticator 已启用"
    )
  }

  // 生成新的密钥
  const generateNewSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setGoogleAuthSecret(result)
  }

  // 复制密钥到剪贴板
  const copySecret = () => {
    navigator.clipboard.writeText(googleAuthSecret)
    noticeManager.success(
      "已复制",
      "密钥已复制到剪贴板"
    )
  }

  // 简化弹框确认函数
  const handleDialogConfirm = () => {
    if (tradingPassword !== confirmTradingPassword) {
      toast({
        title: "交易密码不匹配",
        description: "请确保两次输入的交易密码相同",
        variant: "destructive",
      })
      return
    }

    if (tradingPassword.length !== 6) {
      toast({
        title: "交易密码格式错误",
        description: "请输入6位数字交易密码",
        variant: "destructive",
      })
      return
    }

    setTwoFactorEnabled(true)
    setShowSetupDialog(false)
    noticeManager.success(
      "设置成功",
      "两步验证已开启，您可以在下方设置需要验证的操作"
    )
  }

  // 处理操作项变更
  const handleOperationChange = (operation: keyof typeof securityOperations) => {
    setSecurityOperations(prev => ({
      ...prev,
      [operation]: !prev[operation]
    }))
    setHasOperationsChanged(true)
  }

  // 处理修改密码
  const handlePasswordChange = () => {
    if (!currentPassword) {
      toast({ title: "请输入当前密码", variant: "destructive" })
      return
    }
    if (newPassword.length < 8) {
      toast({ title: "新密码至少需要8个字符", variant: "destructive" })
      return
    }
    if (newPassword !== confirmNewPassword) {
      toast({ title: "两次输入的新密码不匹配", variant: "destructive" })
      return
    }

    setIsLoading(true)
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false)
      setShowPasswordDialog(false)
      noticeManager.success("密码修改成功")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    }, 1000)
  }

  // 处理修改邮箱
  const handleEmailChange = () => {
    if (!currentPassword) {
      toast({ title: "请输入当前密码", variant: "destructive" })
      return
    }
    if (!newEmail) {
      toast({ title: "请输入新邮箱", variant: "destructive" })
      return
    }

    setIsLoading(true)
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false)
      setShowEmailDialog(false)
      noticeManager.success(
        "验证邮件已发送",
        "请查看新邮箱并点击验证链接以完成修改"
      )
      setNewEmail("")
      setCurrentPassword("")
    }, 1000)
  }

  // 添加保存安全操作设置的函数
  const handleSaveOperations = () => {
    setIsLoading(true)
    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false)
      setHasOperationsChanged(false)
      noticeManager.success(
        "设置已保存",
        "安全验证设置已更新"
      )
    }, 1000)
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">账户设置</h1>

      <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">账户安全</TabsTrigger>
          <TabsTrigger value="preferences">偏好设置</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
        </TabsList>

        {/* 账户安全选项卡 */}
        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>账户安全</CardTitle>
              <CardDescription>管理您的账户安全设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 邮箱部分 */}
              <div className="space-y-2">
                <Label>邮箱</Label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{settingsData.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEmailDialog(true)}
                  >
                    修改邮箱
                  </Button>
                </div>
              </div>

              <Separator />

              {/* 密码部分 */}
              <div className="space-y-2">
                <Label>登录密码</Label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <span>••••••••</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPasswordDialog(true)}
                  >
                    修改密码
                  </Button>
                </div>
              </div>

              <Separator />

              {/* 修改两步验证部分 */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <Label className="text-base font-medium">两步验证设置</Label>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  选择您偏好的两步验证方式以提高账户安全性
                </p>

                {/* 交易密码验证 */}
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20">
                        <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <Label htmlFor="trading-password-auth" className="text-sm font-medium">交易密码验证</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">使用6位数字密码进行验证</p>
                      </div>
                    </div>
                    <Switch
                      id="trading-password-auth"
                      checked={twoFactorEnabled}
                      onCheckedChange={handleTwoFactorToggle}
                    />
                  </div>
                </div>

                {/* Google Authenticator 验证 */}
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/20">
                        <Smartphone className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <Label htmlFor="google-auth" className="text-sm font-medium">Google Authenticator</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">使用身份验证器应用生成验证码</p>
                      </div>
                    </div>
                    <Switch
                      id="google-auth"
                      checked={googleAuthEnabled}
                      onCheckedChange={handleGoogleAuthToggle}
                    />
                  </div>
                </div>
              </div>

              {/* 添加已启用时的操作选择 */}
              {(twoFactorEnabled || googleAuthEnabled) && (
                <div className="mt-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium">需要两步验证的操作</h4>
                    {hasOperationsChanged && (
                      <Button
                        size="sm"
                        onClick={handleSaveOperations}
                        disabled={isLoading}
                      >
                        {isLoading ? "保存中..." : "保存更改"}
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="changePassword"
                        checked={securityOperations.changePassword}
                        onCheckedChange={() => handleOperationChange('changePassword')}
                      />
                      <Label htmlFor="changePassword">修改密码</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="changeEmail"
                        checked={securityOperations.changeEmail}
                        onCheckedChange={() => handleOperationChange('changeEmail')}
                      />
                      <Label htmlFor="changeEmail">修改邮箱</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="orderPayment"
                        checked={securityOperations.orderPayment}
                        onCheckedChange={() => handleOperationChange('orderPayment')}
                      />
                      <Label htmlFor="orderPayment">支付订单</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="confirmReceive"
                        checked={securityOperations.confirmReceive}
                        onCheckedChange={() => handleOperationChange('confirmReceive')}
                      />
                      <Label htmlFor="confirmReceive">确认收到域名</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="transferCode"
                        checked={securityOperations.transferCode}
                        onCheckedChange={() => handleOperationChange('transferCode')}
                      />
                      <Label htmlFor="transferCode">提交转移码</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="withdrawal"
                        checked={securityOperations.withdrawal}
                        onCheckedChange={() => handleOperationChange('withdrawal')}
                      />
                      <Label htmlFor="withdrawal">提现</Label>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 偏好设置选项卡 */}
        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>偏好设置</CardTitle>
              <CardDescription>自定义您的使用体验</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 货币设置 */}
              <div className="space-y-2">
                <Label htmlFor="currency">常用货币</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <Select
                    defaultValue={settingsData.currency || "CNY"}
                    onValueChange={(value) => {
                      // TODO: 实现货币切换
                      console.log('Currency changed:', value)
                    }}
                  >
                    <SelectTrigger id="currency" className="w-full">
                      <SelectValue placeholder="选择常用货币" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                      <SelectItem value="USD">美元 (USD)</SelectItem>
                      <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-500">选择您偏好的交易货币，系统将按照实时汇率自动换算金额</p>
              </div>

              <Separator />

              {/* 语言设置 */}
              <div className="space-y-2">
                <Label htmlFor="language">语言</Label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <Select
                    defaultValue={settingsData.language}
                    onValueChange={(value) => {
                      // TODO: 实现语言切换
                      console.log('Language changed:', value)
                    }}
                  >
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue placeholder="选择语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-CN">简体中文</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-500">选择您偏好的界面语言</p>
              </div>

              <Separator />

              {/* 时区设置 */}
              <div className="space-y-2">
                <Label htmlFor="timezone">时区</Label>
                <Select
                  defaultValue={settingsData.timezone}
                  onValueChange={(value) => {
                    // TODO: 实现时区切换
                    console.log('Timezone changed:', value)
                  }}
                >
                  <SelectTrigger id="timezone" className="w-full">
                    <SelectValue placeholder="选择时区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Shanghai">中国标准时间 (UTC+8)</SelectItem>
                    <SelectItem value="America/New_York">东部标准时间 (UTC-5)</SelectItem>
                    <SelectItem value="Europe/London">格林威治标准时间 (UTC+0)</SelectItem>
                    <SelectItem value="Asia/Tokyo">日本标准时间 (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">所有时间将按照所选时区显示</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-[#0046FF] hover:bg-[#0035CC]"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "保存中..." : "保存更改"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 通知设置选项卡 */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>管理您接收的通知方式和类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* 基本通知设置 */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">基本设置</h3>
                <div className="space-y-4 rounded-lg border p-4">
                  {/* 邮件通知设置 */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-50">
                        <Mail className="h-5 w-5 text-gray-500 group-hover:text-[#0046FF]" />
                      </div>
                      <div>
                        <Label htmlFor="email-notifications" className="text-base font-medium">邮件通知</Label>
                        <p className="text-sm text-gray-500">接收重要更新和通知到您的邮箱</p>
                      </div>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.email.enabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          email: { ...prev.email, enabled: checked }
                        }))
                      }
                    />
                  </div>

                  {/* 站内通知设置 */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-50">
                        <Bell className="h-5 w-5 text-gray-500 group-hover:text-[#0046FF]" />
                      </div>
                      <div>
                        <Label htmlFor="inapp-notifications" className="text-base font-medium">站内通知</Label>
                        <p className="text-sm text-gray-500">在平台内接收即时通知</p>
                      </div>
                    </div>
                    <Switch
                      id="inapp-notifications"
                      checked={notificationSettings.inApp.enabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings(prev => ({
                          ...prev,
                          inApp: { ...prev.inApp, enabled: checked }
                        }))
                      }
                    />
                  </div>

                  {/* 在站内通知启用时显示的额外选项 */}
                  {notificationSettings.inApp.enabled && (
                    <div className="mt-4 ml-12 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="badge-notifications" className="text-sm text-gray-600">显示未读角标</Label>
                        <Switch
                          id="badge-notifications"
                          checked={notificationSettings.inApp.badge}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              inApp: { ...prev.inApp, badge: checked }
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-notifications" className="text-sm text-gray-600">通知提示音</Label>
                        <Switch
                          id="sound-notifications"
                          checked={notificationSettings.inApp.sound}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              inApp: { ...prev.inApp, sound: checked }
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              {/* 通知类型设置 */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">通知类型</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {/* 订单通知卡片 */}
                  <Card className="border-2 transition-colors hover:border-[#0046FF] group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ShoppingCart className="h-5 w-5 text-gray-500 group-hover:text-[#0046FF]" />
                          <div className="space-y-1">
                            <CardTitle>订单通知</CardTitle>
                            <CardDescription>接收订单状态变更通知</CardDescription>
                          </div>
                        </div>
                        <Switch
                          id="order-notifications"
                          checked={notificationSettings.types.order.enabled}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                order: {
                                  ...prev.types.order,
                                  enabled: checked,
                                  events: checked ? {
                                    placed: true,
                                    paid: true,
                                    transferred: true,
                                    completed: true,
                                    disputed: true
                                  } : prev.types.order.events
                                }
                              }
                            }))
                          }
                        />
                      </div>
                    </CardHeader>
                    {notificationSettings.types.order.enabled && (
                      <CardContent className="grid gap-2 pt-0">
                        <NotificationItem
                          id="order-placed"
                          label="订单创建"
                          checked={notificationSettings.types.order.events.placed}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                order: {
                                  ...prev.types.order,
                                  events: {
                                    ...prev.types.order.events,
                                    placed: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                        <NotificationItem
                          id="order-paid"
                          label="支付完成"
                          checked={notificationSettings.types.order.events.paid}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                order: {
                                  ...prev.types.order,
                                  events: {
                                    ...prev.types.order.events,
                                    paid: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                        <NotificationItem
                          id="order-transferred"
                          label="域名转移"
                          checked={notificationSettings.types.order.events.transferred}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                order: {
                                  ...prev.types.order,
                                  events: {
                                    ...prev.types.order.events,
                                    transferred: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                        <NotificationItem
                          id="order-completed"
                          label="交易完成"
                          checked={notificationSettings.types.order.events.completed}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                order: {
                                  ...prev.types.order,
                                  events: {
                                    ...prev.types.order.events,
                                    completed: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                        <NotificationItem
                          id="order-disputed"
                          label="交易争议"
                          checked={notificationSettings.types.order.events.disputed}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                order: {
                                  ...prev.types.order,
                                  events: {
                                    ...prev.types.order.events,
                                    disputed: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                      </CardContent>
                    )}
                  </Card>

                  {/* 安全通知卡片 */}
                  <Card className="border-2 transition-colors hover:border-[#0046FF] group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-gray-500 group-hover:text-[#0046FF]" />
                          <div className="space-y-1">
                            <CardTitle>安全通知</CardTitle>
                            <CardDescription>接收账户安全相关通知</CardDescription>
                          </div>
                        </div>
                        <Switch
                          id="security-notifications"
                          checked={notificationSettings.types.security.enabled}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                security: {
                                  ...prev.types.security,
                                  enabled: checked,
                                  events: checked ? {
                                    login: true,
                                    passwordChanged: true,
                                    emailChanged: true
                                  } : prev.types.security.events
                                }
                              }
                            }))
                          }
                        />
                      </div>
                    </CardHeader>
                    {notificationSettings.types.security.enabled && (
                      <CardContent className="grid gap-2 pt-0">
                        <NotificationItem
                          id="security-login"
                          label="新设备登录"
                          checked={notificationSettings.types.security.events.login}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                security: {
                                  ...prev.types.security,
                                  events: {
                                    ...prev.types.security.events,
                                    login: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                        <NotificationItem
                          id="security-password"
                          label="密码变更"
                          checked={notificationSettings.types.security.events.passwordChanged}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                security: {
                                  ...prev.types.security,
                                  events: {
                                    ...prev.types.security.events,
                                    passwordChanged: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                        <NotificationItem
                          id="security-email"
                          label="邮箱变更"
                          checked={notificationSettings.types.security.events.emailChanged}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                security: {
                                  ...prev.types.security,
                                  events: {
                                    ...prev.types.security.events,
                                    emailChanged: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                      </CardContent>
                    )}
                  </Card>

                  {/* 系统通知卡片 */}
                  <Card className="border-2 transition-colors hover:border-[#0046FF] group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Settings className="h-5 w-5 text-gray-500 group-hover:text-[#0046FF]" />
                          <div className="space-y-1">
                            <CardTitle>系统通知</CardTitle>
                            <CardDescription>接收系统维护和更新通知</CardDescription>
                          </div>
                        </div>
                        <Switch
                          id="system-notifications"
                          checked={notificationSettings.types.system.enabled}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                system: {
                                  ...prev.types.system,
                                  enabled: checked,
                                  events: checked ? {
                                    maintenance: true,
                                    announcement: true,
                                    update: true
                                  } : prev.types.system.events
                                }
                              }
                            }))
                          }
                        />
                      </div>
                    </CardHeader>
                    {notificationSettings.types.system.enabled && (
                      <CardContent className="grid gap-2 pt-0">
                        <NotificationItem
                          id="system-maintenance"
                          label="系统维护"
                          checked={notificationSettings.types.system.events.maintenance}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                system: {
                                  ...prev.types.system,
                                  events: {
                                    ...prev.types.system.events,
                                    maintenance: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                        <NotificationItem
                          id="system-announcement"
                          label="平台公告"
                          checked={notificationSettings.types.system.events.announcement}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                system: {
                                  ...prev.types.system,
                                  events: {
                                    ...prev.types.system.events,
                                    announcement: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                        <NotificationItem
                          id="system-update"
                          label="功能更新"
                          checked={notificationSettings.types.system.events.update}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                system: {
                                  ...prev.types.system,
                                  events: {
                                    ...prev.types.system.events,
                                    update: checked
                                  }
                                }
                              }
                            }))
                          }
                        />
                      </CardContent>
                    )}
                  </Card>

                  {/* 营销通知卡片 */}
                  <Card className="border-2 transition-colors hover:border-[#0046FF] group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Megaphone className="h-5 w-5 text-gray-500 group-hover:text-[#0046FF]" />
                          <div className="space-y-1">
                            <CardTitle>营销通知</CardTitle>
                            <CardDescription>接收促销和平台动态通知</CardDescription>
                          </div>
                        </div>
                        <Switch
                          id="marketing-notifications"
                          checked={notificationSettings.types.marketing.enabled}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                marketing: {
                                  ...prev.types.marketing,
                                  enabled: checked,
                                  events: checked ? {
                                    promotion: true,
                                    newsletter: true
                                  } : prev.types.marketing.events
                                }
                              }
                            }))
                          }
                        />
                      </div>
                    </CardHeader>
                    {notificationSettings.types.marketing.enabled && (
                      <CardContent className="grid gap-2 pt-0">
                        <NotificationItem
                          id="marketing-promotion"
                          label="促销活动"
                          checked={notificationSettings.types.marketing.events.promotion}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                marketing: {
                                  ...prev.types.marketing,
                                  events: {
                                    ...prev.types.marketing.events,
                                    promotion: checked
                                  }
                                }
                              }}))
                          }
                        />
                        <NotificationItem
                          id="marketing-newsletter"
                          label="平台动态"
                          checked={notificationSettings.types.marketing.events.newsletter}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({
                              ...prev,
                              types: {
                                ...prev.types,
                                marketing: {
                                  ...prev.types.marketing,
                                  events: {
                                    ...prev.types.marketing.events,
                                    newsletter: checked
                                  }
                                }
                              }}))
                          }
                        />
                      </CardContent>
                    )}
                  </Card>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <p>通知设置将立即生效</p>
              </div>
              <Button
                className="bg-[#0046FF] hover:bg-[#0035CC] transition-all duration-200"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>保存中...</span>
                  </div>
                ) : (
                  "保存更改"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 修改设置弹框内容 */}
      <Dialog open={showSetupDialog} onOpenChange={setShowSetupDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>设置交易密码</DialogTitle>
            <DialogDescription>
              请设置6位数字交易密码，用于重要操作的二次验证
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trading-password">交易密码</Label>
              <div className="relative">
                <Input
                  id="trading-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入6位数字交易密码"
                  maxLength={6}
                  value={tradingPassword}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "")
                    setTradingPassword(value)
                  }}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-trading-password">确认交易密码</Label>
              <Input
                id="confirm-trading-password"
                type="password"
                placeholder="请再次输入交易密码"
                maxLength={6}
                value={confirmTradingPassword}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "")
                  setConfirmTradingPassword(value)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verify-code">邮箱验证码</Label>
              <div className="flex space-x-2">
                <Input
                  id="verify-code"
                  placeholder="请输入验证码"
                  value={emailVerifyCode}
                  onChange={(e) => setEmailVerifyCode(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={handleSendVerifyCode}
                  disabled={isSendingCode}
                >
                  {isSendingCode ? "发送中..." : "发送验证码"}
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
              <div className="flex items-start space-x-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>设置完成后，您可以在页面中选择需要验证的操作类型</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSetupDialog(false)}>
              取消
            </Button>
            <Button onClick={handleDialogConfirm}>
              确认
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 修改密码弹框 */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>修改密码</DialogTitle>
            <DialogDescription>
              请输入当前密码和新密码
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">当前密码</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="输入当前密码"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">新密码</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="输入新密码"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">确认新密码</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="再次输入新密码"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              取消
            </Button>
            <Button onClick={handlePasswordChange} disabled={isLoading}>
              {isLoading ? "修改中..." : "确认修改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 修改邮箱弹框 */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>修改邮箱</DialogTitle>
            <DialogDescription>
              更改邮箱需要验证您的密码，验证邮件将发送至新邮箱
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password-email">当前密码</Label>
              <Input
                id="current-password-email"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="输入当前密码"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email">新邮箱</Label>
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="输入新邮箱"
              />
            </div>
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
              <div className="flex items-start space-x-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>验证链接将发送到新邮箱，请注意查收并点击链接完成验证</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              取消
            </Button>
            <Button onClick={handleEmailChange} disabled={isLoading}>
              {isLoading ? "提交中..." : "提交"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Google Authenticator 设置弹框 */}
      <Dialog open={showGoogleAuthDialog} onOpenChange={setShowGoogleAuthDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-green-600" />
              <span>设置 Google Authenticator</span>
            </DialogTitle>
            <DialogDescription>
              请按照以下步骤设置 Google Authenticator 两步验证
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* 步骤 1: 下载应用 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  1
                </div>
                <Label className="text-sm font-medium">下载身份验证器应用</Label>
              </div>
              <p className="text-sm text-gray-500 ml-8">
                在您的手机上下载 Google Authenticator 或其他兼容的身份验证器应用
              </p>
            </div>

            {/* 步骤 2: 扫描二维码 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  2
                </div>
                <Label className="text-sm font-medium">扫描二维码或手动输入密钥</Label>
              </div>

              {/* 模拟二维码 */}
              <div className="ml-8 space-y-4">
                <div className="flex items-center justify-center w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">二维码</p>
                    <p className="text-xs text-gray-400">Demo 展示</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600">或手动输入密钥：</Label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 rounded bg-gray-100 px-3 py-2 text-xs font-mono dark:bg-gray-800">
                      {googleAuthSecret}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copySecret}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateNewSecret}
                    >
                      刷新
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 步骤 3: 输入验证码 */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  3
                </div>
                <Label className="text-sm font-medium">输入验证码</Label>
              </div>
              <div className="ml-8 space-y-2">
                <Label htmlFor="google-auth-code" className="text-sm">请输入应用中显示的6位验证码</Label>
                <Input
                  id="google-auth-code"
                  placeholder="000000"
                  maxLength={6}
                  value={googleAuthCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "")
                    setGoogleAuthCode(value)
                  }}
                  className="text-center text-lg tracking-widest font-mono"
                />
              </div>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
              <div className="flex items-start space-x-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">重要提示</p>
                  <p className="mt-1">请妥善保管您的身份验证器应用，丢失后可能无法访问账户</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGoogleAuthDialog(false)}>
              取消
            </Button>
            <Button onClick={handleGoogleAuthConfirm} disabled={googleAuthCode.length !== 6}>
              确认启用
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

