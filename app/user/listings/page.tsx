"use client"

import Link from "next/link"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DomainTagSelector } from "@/components/domain-tag-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Upload,
  Calendar,
  Copy,
  ExternalLink,
  Info,
  DollarSign,
  Clock,
} from "lucide-react"

// 域名类型定义
interface DomainType {
  id: number;
  name: string;
  price: string | number;
  isVerified: boolean;
  isListed: boolean;
  listedDate: string;
  autoRenew: boolean;
  expireDate: string | null;
  registrar: string;
  tags?: string[];
  description?: string;
}

// 模拟域名数据
const mockDomains: DomainType[] = [
  {
    id: 1,
    name: "business.example",
    price: 35000,
    isVerified: true,
    isListed: true,
    listedDate: "2023-04-15",
    autoRenew: true,
    expireDate: "2023-07-15",
    registrar: "GoDaddy",
    tags: [],
    description: "",
  },
  {
    id: 2,
    name: "tech.example",
    price: 18500,
    isVerified: true,
    isListed: true,
    listedDate: "2023-04-20",
    autoRenew: false,
    expireDate: null,
    registrar: "Namecheap",
    tags: [],
    description: "",
  },
  {
    id: 3,
    name: "shop.example",
    price: 22000,
    isVerified: false,
    isListed: false,
    listedDate: "2023-04-25",
    autoRenew: true,
    expireDate: "2023-08-25",
    registrar: "Namecheap",
    tags: [],
    description: "",
  },
  {
    id: 4,
    name: "blog.example",
    price: 12000,
    isVerified: true,
    isListed: false,
    listedDate: "2023-05-05",
    autoRenew: true,
    expireDate: "2023-08-05",
    registrar: "GoDaddy",
    tags: [],
    description: "",
  },
  {
    id: 5,
    name: "app.example",
    price: 28000,
    isVerified: true,
    isListed: true,
    listedDate: "2023-05-10",
    autoRenew: false,
    expireDate: null,
    registrar: "Namecheap",
    tags: [],
    description: "",
  },
]

// 验证状态展示
const verificationStatus = {
  verified: {
    label: "已验证",
    color: "bg-green-500",
    icon: CheckCircle,
  },
  unverified: {
    label: "待验证",
    color: "bg-yellow-500",
    icon: AlertTriangle,
  },
}

// 域名标签选项类型
interface DomainTag {
  value: string;
  label: string;
}

// 域名标签选项
const DOMAIN_TAGS: DomainTag[] = [
  { value: "short", label: "短域名" },
  { value: "brand", label: "品牌域名" },
  { value: "numeric", label: "数字域名" },
  { value: "letter", label: "字母域名" },
  { value: "double", label: "双拼域名" },
  { value: "triple", label: "三拼域名" },
  { value: "quad", label: "四拼域名" },
  { value: "industry", label: "行业域名" },
  { value: "special", label: "特殊域名" },
  // 添加更多分类
  { value: "finance", label: "金融行业" },
  { value: "tech", label: "科技行业" },
  { value: "education", label: "教育行业" },
  { value: "health", label: "医疗健康" },
  { value: "ecommerce", label: "电子商务" },
  { value: "social", label: "社交媒体" },
  { value: "game", label: "游戏娱乐" },
  { value: "travel", label: "旅游出行" },
  { value: "food", label: "餐饮美食" },
  { value: "real-estate", label: "房地产" },
  { value: "automotive", label: "汽车行业" },
  // 数字特征
  { value: "2-digit", label: "两位数字" },
  { value: "3-digit", label: "三位数字" },
  { value: "4-digit", label: "四位数字" },
  { value: "5-digit", label: "五位数字" },
  { value: "6-digit", label: "六位数字" },
  // 字母特征
  { value: "1-letter", label: "单字母" },
  { value: "2-letter", label: "双字母" },
  { value: "3-letter", label: "三字母" },
  { value: "4-letter", label: "四字母" },
  { value: "5-letter", label: "五字母" }
]

// 上架状态展示
const listingStatus = {
  listed: {
    label: "已上架",
    color: "bg-blue-500",
    icon: CheckCircle,
  },
  unlisted: {
    label: "未上架",
    color: "bg-gray-500",
    icon: XCircle,
  },
}

export default function ListingsPage() {
  // 状态管理
  const [domains, setDomains] = useState<DomainType[]>(mockDomains)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
  const [currentDomain, setCurrentDomain] = useState<DomainType | null>(null)
  const [newDomain, setNewDomain] = useState({
    name: "",
    price: "",
    autoRenew: true,
    expireDate: "",
    tags: [] as string[],
    description: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("single")
  const [bulkDomains, setBulkDomains] = useState("")
  const [verifyMethod, setVerifyMethod] = useState<"txt" | "cname">("txt")

  // 生成唯一的验证ID
  const generateVerificationId = () => {
    return `verify-${Math.random().toString(36).substring(2, 10)}`
  }

  // 验证信息
  const [verificationInfo, setVerificationInfo] = useState({
    id: generateVerificationId(),
    txtRecord: {
      host: "_domainkey",
      value: "",
    },
    cnameRecord: {
      host: "verify",
      value: "verify.domainmarket.com",
    },
  })

  // 过滤域名
  const filteredDomains = domains.filter((domain) => {
    if (searchTerm && !domain.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    return true
  })    // 处理添加域名
  const handleAddDomain = () => {
    setIsProcessing(true)

    // 生成新的验证ID
    const newVerificationId = generateVerificationId()
    setVerificationInfo({
      ...verificationInfo,
      id: newVerificationId,
      txtRecord: {
        ...verificationInfo.txtRecord,
        value: `domain-verify=${newVerificationId}`,
      },
    })

    // 模拟添加请求
    setTimeout(() => {
      if (activeTab === "single") {
        // 添加单个域名
        const newId = Math.max(...domains.map((d) => d.id)) + 1
        const domainToAdd = {
          id: newId,
          name: newDomain.name,
          price: Number(newDomain.price),
          isVerified: false,
          isListed: false,
          listedDate: new Date().toISOString().split("T")[0],
          autoRenew: newDomain.autoRenew,
          expireDate: newDomain.autoRenew ? newDomain.expireDate : null,
          registrar: "Unknown",
          tags: newDomain.tags,
          description: newDomain.description,
        }

        setDomains([...domains, domainToAdd])
        setCurrentDomain(domainToAdd)
        setIsAddDialogOpen(false)
        setIsVerifyDialogOpen(true)
      } else {
        // 添加批量域名
        const domainLines = bulkDomains.split("\n").filter((line) => line.trim())
        const newDomainsToAdd = domainLines.map((line, index) => {
          const parts = line.split(",")
          const name = parts[0].trim()
          const price = Number(parts[1]?.trim() || 10000)

          return {
            id: Math.max(...domains.map((d) => d.id)) + index + 1,
            name,
            price,
            isVerified: false,
            isListed: false,
            listedDate: new Date().toISOString().split("T")[0],
            autoRenew: true,
            expireDate: null,
            registrar: "Unknown",
            tags: [],
            description: "",
          }
        })

        setDomains([...domains, ...newDomainsToAdd])
        setIsAddDialogOpen(false)

        // 如果有域名添加，打开第一个域名的验证对话框
        if (newDomainsToAdd.length > 0) {
          setCurrentDomain(newDomainsToAdd[0])
          setIsVerifyDialogOpen(true)
        }
      }

      setIsProcessing(false)
      setNewDomain({
        name: "",
        price: "",
        autoRenew: true,
        expireDate: "",
        tags: [] as string[],
        description: "",
      })
      setBulkDomains("")
    }, 1500)
  }

  // 处理编辑域名
  const handleEditDomain = () => {
    if (!currentDomain) return

    const updatedDomains = domains.map((domain) => {
      if (domain.id === currentDomain.id) {
        return {
          ...domain,
          price: Number(currentDomain.price),
          isListed: currentDomain.isListed,
          autoRenew: currentDomain.autoRenew,
          expireDate: currentDomain.autoRenew ? currentDomain.expireDate : null,
          tags: currentDomain.tags || [],
          description: currentDomain.description || "",
        }
      }
      return domain
    })

    setDomains(updatedDomains)
    setIsEditDialogOpen(false)
    setCurrentDomain(null)
  }

  // 处理删除域名
  const handleDeleteDomain = (id: number) => {
    // 模拟删除请求
    const updatedDomains = domains.filter((domain) => domain.id !== id)
    setDomains(updatedDomains)
  }

  // 打开编辑对话框
  const openEditDialog = (domain: DomainType) => {
    setCurrentDomain({
      ...domain,
      price: domain.price.toString(),
      tags: domain.tags || [],
      description: domain.description || "",
    })
    setIsEditDialogOpen(true)
  }

  // 打开验证对话框
  const openVerifyDialog = (domain: DomainType) => {
    setCurrentDomain(domain)

    // 更新验证信息，确保域名特定
    const newVerificationId = generateVerificationId()
    setVerificationInfo({
      id: newVerificationId,
      txtRecord: {
        host: `_domainkey.${domain.name}`,
        value: `domain-verify=${newVerificationId}`,
      },
      cnameRecord: {
        host: `verify.${domain.name}`,
        value: "verify.domainmarket.com",
      },
    })

    setIsVerifyDialogOpen(true)
  }

  // 复制验证信息
  const copyVerificationInfo = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("已复制到剪贴板")
      })
      .catch((err) => {
        console.error("复制失败:", err)
      })
  }

  // 验证域名所有权
  const verifyDomainOwnership = () => {
    if (!currentDomain) return

    setIsProcessing(true)

    // 模拟验证请求
    setTimeout(() => {
      const updatedDomains = domains.map((domain) => {
        if (domain.id === currentDomain.id) {
          return {
            ...domain,
            isVerified: true,
            isListed: true,
          }
        }
        return domain
      })

      setDomains(updatedDomains)
      setIsProcessing(false)
      setIsVerifyDialogOpen(false)
    }, 2000)
  }

  // 切换域名上架状态
  const toggleDomainStatus = (domain: DomainType) => {
    const updatedDomains = domains.map((d) => {
      if (d.id === domain.id) {
        const newStatus = d.isListed ? false : true
        return { ...d, isListed: newStatus }
      }
      return d
    })
    setDomains(updatedDomains)
  }

  // 切换域名上架状态
  const toggleListingStatus = (domain: DomainType) => {
    const updatedDomains = domains.map((d) => {
      if (d.id === domain.id) {
        return { ...d, isListed: !d.isListed }
      }
      return d
    })
    setDomains(updatedDomains)
  }

  // 验证域名所有权
  const verifyDomain = (domain: DomainType) => {
    const updatedDomains = domains.map((d) => {
      if (d.id === domain.id) {
        return { ...d, isVerified: true }
      }
      return d
    })
    setDomains(updatedDomains)
    setIsVerifyDialogOpen(false)
  }

  // 删除域名
  const deleteDomain = (id: number) => {
    setDomains(domains.filter(d => d.id !== id))
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">我的上架</h1>
        <Button className="bg-[#0046FF] hover:bg-[#0035CC]" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          <span>新增上架</span>
        </Button>
      </div>

      {/* 手续费和结算提示 */}
      <Card className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                交易费用与结算说明
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>平台手续费：</strong>成交金额的 10%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>
                    <strong>结算周期：</strong>T+3 个工作日到账
                  </span>
                </div>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                域名成功交易后，平台将收取成交金额 10% 的手续费，剩余款项将在 3 个工作日内转入您的账户
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>域名列表</CardTitle>
          <CardDescription>管理您已上架的域名</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="搜索域名..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">共 {domains.length} 个域名</span>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>域名</TableHead>
                  <TableHead>价格</TableHead>
                  <TableHead>验证状态</TableHead>
                  <TableHead>上架状态</TableHead>
                  <TableHead>上架日期</TableHead>
                  <TableHead>自动下架</TableHead>
                  <TableHead>注册商</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDomains.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      暂无域名数据
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDomains.map((domain) => (
                    <TableRow key={domain.id}>
                      <TableCell className="font-medium">{domain.name}</TableCell>
                      <TableCell>${domain.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={domain.isVerified ? verificationStatus.verified.color : verificationStatus.unverified.color}>
                          {domain.isVerified ? verificationStatus.verified.label : verificationStatus.unverified.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={domain.isListed ? listingStatus.listed.color : listingStatus.unlisted.color}>
                          {domain.isListed ? listingStatus.listed.label : listingStatus.unlisted.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{domain.listedDate}</TableCell>
                      <TableCell>
                        {domain.autoRenew ? (
                          <div className="flex items-center">
                            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                            <span>{domain.expireDate}</span>
                          </div>
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-500" />
                        )}
                      </TableCell>
                      <TableCell>{domain.registrar}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {!domain.isVerified && (
                            <Button variant="ghost" size="icon" onClick={() => openVerifyDialog(domain)}>
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(domain)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>确认删除</AlertDialogTitle>
                                <AlertDialogDescription>
                                  您确定要删除域名 "{domain.name}" 吗？此操作无法撤销。
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>取消</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() => deleteDomain(domain.id)}
                                >
                                  确认删除
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 添加域名对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>新增上架</DialogTitle>
            <DialogDescription>添加您想要上架的域名</DialogDescription>
          </DialogHeader>

          {/* 费用提示 */}
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 dark:bg-blue-950/20 dark:border-blue-800">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-800 dark:text-blue-200 font-medium mb-1">交易费用说明</p>
                <p className="text-blue-700 dark:text-blue-300">
                  域名成功售出后，平台将收取成交金额 <strong>10%</strong> 的手续费，剩余 <strong>90%</strong> 将在 <strong>T+3 个工作日</strong>内转入您的账户。
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="single" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">单个域名</TabsTrigger>
              <TabsTrigger value="bulk">批量添加</TabsTrigger>
            </TabsList>

            {/* 单个域名表单 */}
            <TabsContent value="single" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="domain-name">域名</Label>
                <Input
                  id="domain-name"
                  placeholder="example.com"
                  value={newDomain.name}
                  onChange={(e) => setNewDomain({ ...newDomain, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain-price">价格 (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="domain-price"
                    type="number"
                    className="pl-8"
                    placeholder="输入价格"
                    value={newDomain.price}
                    onChange={(e) => setNewDomain({ ...newDomain, price: e.target.value })}
                  />
                </div>
                {newDomain.price && Number(newDomain.price) > 0 && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded p-2">
                    <div className="flex justify-between">
                      <span>售价：</span>
                      <span>${Number(newDomain.price).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>平台手续费 (10%)：</span>
                      <span>-${(Number(newDomain.price) * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium text-green-600 dark:text-green-400 border-t border-gray-200 dark:border-gray-600 pt-1 mt-1">
                      <span>您将收到：</span>
                      <span>${(Number(newDomain.price) * 0.9).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>域名标签（最多选择3个）</Label>
                <DomainTagSelector
                  tags={DOMAIN_TAGS}
                  selectedTags={newDomain.tags}
                  maxTags={3}
                  onTagsChange={(tags) => setNewDomain({ ...newDomain, tags })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain-description">域名描述</Label>
                <Textarea
                  id="domain-description"
                  placeholder="请输入域名描述信息（最多50字）"
                  value={newDomain.description}
                  onChange={(e) => {
                    const text = e.target.value
                    if (text.length <= 50) {
                      setNewDomain({ ...newDomain, description: text })
                    }
                  }}
                  className="resize-none"
                  rows={3}
                />
                <p className="text-sm text-gray-500">{newDomain.description.length}/50 字</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-renew">自动下架</Label>
                  <Switch
                    id="auto-renew"
                    checked={newDomain.autoRenew}
                    onCheckedChange={(checked) => setNewDomain({ ...newDomain, autoRenew: checked })}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">设置域名在指定日期自动下架</p>
              </div>

              {newDomain.autoRenew && (
                <div className="space-y-2">
                  <Label htmlFor="expire-date">下架日期</Label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <Input
                      id="expire-date"
                      type="date"
                      value={newDomain.expireDate}
                      onChange={(e) => setNewDomain({ ...newDomain, expireDate: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            {/* 批量添加表单 */}
            <TabsContent value="bulk" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-domains">批量域名</Label>
                <Textarea
                  id="bulk-domains"
                  placeholder="每行一个域名，格式：域名,价格
example1.com,10000
example2.com,15000"
                  className="min-h-[150px]"
                  value={bulkDomains}
                  onChange={(e) => setBulkDomains(e.target.value)}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">每行一个域名，可选添加价格（用逗号分隔）</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <h4 className="mb-2 flex items-center text-sm font-medium">
                  <Upload className="mr-2 h-4 w-4 text-[#0046FF]" />
                  <span>文件导入</span>
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  您也可以通过上传 CSV 或 Excel 文件批量导入域名
                </p>
                <Button variant="outline" size="sm">
                  选择文件
                </Button>
              </div>

              <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
                <h4 className="mb-2 flex items-center text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>批量域名验证</span>
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  批量添加域名后，您需要逐个验证域名所有权。我们将引导您完成每个域名的验证过程。
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isProcessing}>
              取消
            </Button>
            <Button
              className="bg-[#0046FF] hover:bg-[#0035CC]"
              onClick={handleAddDomain}
              disabled={
                (activeTab === "single" && (!newDomain.name || !newDomain.price)) ||
                (activeTab === "bulk" && !bulkDomains.trim()) ||
                isProcessing
              }
            >
              {isProcessing ? "处理中..." : "添加域名"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑域名对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>编辑域名</DialogTitle>
            <DialogDescription>修改域名的价格和设置</DialogDescription>
          </DialogHeader>

          {currentDomain && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>域名</Label>
                <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                  {currentDomain.name}
                </div>
              </div>

              {currentDomain.isVerified && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="domain-listed">域名上架</Label>
                    <Switch
                      id="domain-listed"
                      checked={currentDomain.isListed}
                      onCheckedChange={(checked) => setCurrentDomain({ ...currentDomain, isListed: checked })}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentDomain.isListed ? "域名当前已上架，买家可以看到并购买此域名" : "域名当前未上架，买家无法看到此域名"}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="edit-price">价格 (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="edit-price"
                    type="number"
                    className="pl-8"
                    value={currentDomain.price}
                    onChange={(e) => setCurrentDomain({ ...currentDomain, price: e.target.value })}
                  />
                </div>
                {currentDomain.price && Number(currentDomain.price) > 0 && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded p-2">
                    <div className="flex justify-between">
                      <span>售价：</span>
                      <span>${Number(currentDomain.price).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>平台手续费 (10%)：</span>
                      <span>-${(Number(currentDomain.price) * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium text-green-600 dark:text-green-400 border-t border-gray-200 dark:border-gray-600 pt-1 mt-1">
                      <span>您将收到：</span>
                      <span>${(Number(currentDomain.price) * 0.9).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>域名标签（最多选择3个）</Label>
                <DomainTagSelector
                  tags={DOMAIN_TAGS}
                  selectedTags={currentDomain.tags || []}
                  maxTags={3}
                  onTagsChange={(tags) => setCurrentDomain({ ...currentDomain, tags })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain-description">域名描述</Label>
                <Textarea
                  id="domain-description"
                  placeholder="请输入域名描述信息（最多50字）"
                  value={currentDomain.description || ""}
                  onChange={(e) => {
                    const text = e.target.value
                    if (text.length <= 50) {
                      setCurrentDomain({ ...currentDomain, description: text })
                    }
                  }}
                  className="resize-none"
                  rows={3}
                />
                <p className="text-sm text-gray-500">{(currentDomain.description || "").length}/50 字</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-auto-renew">自动下架</Label>
                  <Switch
                    id="edit-auto-renew"
                    checked={currentDomain.autoRenew}
                    onCheckedChange={(checked) => setCurrentDomain({ ...currentDomain, autoRenew: checked })}
                  />
                </div>
              </div>

              {currentDomain.autoRenew && (
                <div className="space-y-2">
                  <Label htmlFor="edit-expire-date">下架日期</Label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <Input
                      id="edit-expire-date"
                      type="date"
                      value={currentDomain.expireDate || ""}
                      onChange={(e) => setCurrentDomain({ ...currentDomain, expireDate: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isProcessing}>
              取消
            </Button>
            <Button
              className="bg-[#0046FF] hover:bg-[#0035CC]"
              onClick={handleEditDomain}
              disabled={!currentDomain || !currentDomain.price || isProcessing}
            >
              {isProcessing ? "处理中..." : "保存修改"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 域名验证对话框 */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>验证域名所有权</DialogTitle>
            <DialogDescription>请按照以下步骤验证您对域名 {currentDomain?.name} 的所有权</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
              <h4 className="mb-2 text-sm font-medium text-blue-800 dark:text-blue-200">为什么需要验证？</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                验证域名所有权是为了确保您是该域名的合法所有者，防止欺诈行为，保护买家和卖家的权益。
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">选择验证方式</h3>
                <div className="flex space-x-2">
                  <Button
                    variant={verifyMethod === "txt" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVerifyMethod("txt")}
                    className={verifyMethod === "txt" ? "bg-[#0046FF]" : ""}
                  >
                    TXT 记录
                  </Button>
                  <Button
                    variant={verifyMethod === "cname" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVerifyMethod("cname")}
                    className={verifyMethod === "cname" ? "bg-[#0046FF]" : ""}
                  >
                    CNAME 记录
                  </Button>
                </div>
              </div>

              {verifyMethod === "txt" && (
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <h4 className="mb-4 text-base font-medium">添加 TXT 记录（推荐）</h4>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    请在您的域名注册商或 DNS 提供商处添加以下 TXT 记录：
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                      <span className="text-sm font-medium">主机记录:</span>
                      <div className="flex items-center">
                        <span className="text-sm">{verificationInfo.txtRecord.host}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-6 w-6"
                          onClick={() => copyVerificationInfo(verificationInfo.txtRecord.host)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                      <span className="text-sm font-medium">记录类型:</span>
                      <div className="flex items-center">
                        <span className="text-sm">TXT</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-6 w-6"
                          onClick={() => copyVerificationInfo("TXT")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                      <span className="text-sm font-medium">记录值:</span>
                      <div className="flex items-center">
                        <span className="text-sm">{verificationInfo.txtRecord.value}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-6 w-6"
                          onClick={() => copyVerificationInfo(verificationInfo.txtRecord.value)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {verifyMethod === "cname" && (
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <h4 className="mb-4 text-base font-medium">添加 CNAME 记录</h4>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    如果您无法添加 TXT 记录，可以选择添加以下 CNAME 记录：
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                      <span className="text-sm font-medium">主机记录:</span>
                      <div className="flex items-center">
                        <span className="text-sm">{verificationInfo.cnameRecord.host}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-6 w-6"
                          onClick={() => copyVerificationInfo(verificationInfo.cnameRecord.host)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                      <span className="text-sm font-medium">记录类型:</span>
                      <div className="flex items-center">
                        <span className="text-sm">CNAME</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-6 w-6"
                          onClick={() => copyVerificationInfo("CNAME")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                      <span className="text-sm font-medium">记录值:</span>
                      <div className="flex items-center">
                        <span className="text-sm">{verificationInfo.cnameRecord.value}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2 h-6 w-6"
                          onClick={() => copyVerificationInfo(verificationInfo.cnameRecord.value)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-950">
              <h4 className="mb-2 flex items-center text-sm font-medium text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                <span>重要提示</span>
              </h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                DNS 记录可能需要几分钟到几小时才能生效，这取决于您的 DNS 提供商。添加记录后，点击"验证所有权"按钮。
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Link
                href="/docs/domain-verification"
                className="flex items-center text-sm text-[#0046FF] hover:underline"
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                <span>如何在常见注册商添加 DNS 记录?</span>
              </Link>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)} disabled={isProcessing}>
              稍后验证
            </Button>
            <Button className="bg-[#0046FF] hover:bg-[#0035CC]" onClick={verifyDomainOwnership} disabled={isProcessing}>
              {isProcessing ? "验证中..." : "验证所有权"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

