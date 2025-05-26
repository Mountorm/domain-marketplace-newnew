"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Filter, X, Grid, List, ChevronDown } from "lucide-react"

// 模拟域名数据
const mockDomains = [
  {
    id: 1,
    name: "business.com",
    price: 350000,
    registrar: "GoDaddy",
    registered: "2005-03-15",
    expires: "2025-03-15",
    tags: ["高价值", "商业"],
  },
  {
    id: 2,
    name: "crypto.io",
    price: 75000,
    registrar: "Namecheap",
    registered: "2017-08-22",
    expires: "2024-08-22",
    tags: ["热门", "加密货币"],
  },
  {
    id: 3,
    name: "invest.net",
    price: 45000,
    registrar: "Network Solutions",
    registered: "2010-05-10",
    expires: "2026-05-10",
    tags: ["金融", "投资"],
  },
  {
    id: 4,
    name: "travel.app",
    price: 28000,
    registrar: "GoDaddy",
    registered: "2019-11-30",
    expires: "2024-11-30",
    tags: ["新上架", "旅游"],
  },
  {
    id: 5,
    name: "health.co",
    price: 32000,
    registrar: "Namecheap",
    registered: "2018-02-14",
    expires: "2025-02-14",
    tags: ["精品", "健康"],
  },
  {
    id: 6,
    name: "learn.xyz",
    price: 15000,
    registrar: "Dynadot",
    registered: "2020-07-08",
    expires: "2024-07-08",
    tags: ["教育"],
  },
  {
    id: 7,
    name: "shop.store",
    price: 22000,
    registrar: "GoDaddy",
    registered: "2019-04-25",
    expires: "2024-04-25",
    tags: ["电商", "零售"],
  },
  {
    id: 8,
    name: "tech.dev",
    price: 18500,
    registrar: "Namecheap",
    registered: "2021-01-15",
    expires: "2025-01-15",
    tags: ["技术", "开发"],
  },
  {
    id: 9,
    name: "food.co",
    price: 12000,
    registrar: "Dynadot",
    registered: "2020-09-18",
    expires: "2024-09-18",
    tags: ["餐饮", "美食"],
  },
  {
    id: 10,
    name: "game.io",
    price: 35000,
    registrar: "GoDaddy",
    registered: "2018-11-05",
    expires: "2025-11-05",
    tags: ["游戏", "热门"],
  },
  {
    id: 11,
    name: "finance.com",
    price: 120000,
    registrar: "Network Solutions",
    registered: "2008-06-20",
    expires: "2026-06-20",
    tags: ["高价值", "金融"],
  },
  {
    id: 12,
    name: "media.net",
    price: 48000,
    registrar: "GoDaddy",
    registered: "2012-03-30",
    expires: "2025-03-30",
    tags: ["媒体", "精品"],
  },
]

// 域名后缀选项
const domainExtensions = [".com", ".net", ".org", ".io", ".co", ".app", ".dev", ".store", ".xyz", ".tech"]

// 注册商选项
const registrars = ["GoDaddy", "Namecheap", "Network Solutions", "Dynadot", "NameSilo", "Tucows"]

// 标签选项
const tagOptions = [
  "高价值",
  "精品",
  "热门",
  "新上架",
  "商业",
  "金融",
  "技术",
  "教育",
  "健康",
  "旅游",
  "电商",
  "游戏",
  "媒体",
]

export default function MarketPage() {
  // 状态管理
  const [domains, setDomains] = useState(mockDomains)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 400000])
  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([])
  const [selectedRegistrars, setSelectedRegistrars] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("price-asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [filteredCount, setFilteredCount] = useState(domains.length)

  // 过滤和排序域名
  useEffect(() => {
    let filtered = [...mockDomains]

    // 搜索词过滤
    if (searchTerm) {
      filtered = filtered.filter((domain) => domain.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // 价格范围过滤
    filtered = filtered.filter((domain) => domain.price >= priceRange[0] && domain.price <= priceRange[1])

    // 域名后缀过滤
    if (selectedExtensions.length > 0) {
      filtered = filtered.filter((domain) => selectedExtensions.some((ext) => domain.name.endsWith(ext)))
    }

    // 注册商过滤
    if (selectedRegistrars.length > 0) {
      filtered = filtered.filter((domain) => selectedRegistrars.includes(domain.registrar))
    }

    // 标签过滤
    if (selectedTags.length > 0) {
      filtered = filtered.filter((domain) => domain.tags.some((tag) => selectedTags.includes(tag)))
    }

    // 排序
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "date-asc":
        filtered.sort((a, b) => new Date(a.expires).getTime() - new Date(b.expires).getTime())
        break
      case "date-desc":
        filtered.sort((a, b) => new Date(b.expires).getTime() - new Date(a.expires).getTime())
        break
      default:
        break
    }

    setDomains(filtered)
    setFilteredCount(filtered.length)
  }, [searchTerm, priceRange, selectedExtensions, selectedRegistrars, selectedTags, sortBy])

  // 切换筛选面板显示
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  // 清除所有筛选条件
  const clearAllFilters = () => {
    setSearchTerm("")
    setPriceRange([0, 400000])
    setSelectedExtensions([])
    setSelectedRegistrars([])
    setSelectedTags([])
    setSortBy("price-asc")
  }

  // 处理域名后缀选择
  const handleExtensionChange = (extension: string) => {
    setSelectedExtensions((prev) =>
      prev.includes(extension) ? prev.filter((ext) => ext !== extension) : [...prev, extension],
    )
  }

  // 处理注册商选择
  const handleRegistrarChange = (registrar: string) => {
    setSelectedRegistrars((prev) =>
      prev.includes(registrar) ? prev.filter((reg) => reg !== registrar) : [...prev, registrar],
    )
  }

  // 处理标签选择
  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">域名市场</h1>

      {/* 搜索栏 */}
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索域名或关键词..."
            className="pl-10 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2" onClick={toggleFilter}>
            <Filter className="h-4 w-4" />
            <span>筛选</span>
            {!isFilterOpen && <ChevronDown className="h-4 w-4" />}
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">价格: 从低到高</SelectItem>
              <SelectItem value="price-desc">价格: 从高到低</SelectItem>
              <SelectItem value="name-asc">名称: A-Z</SelectItem>
              <SelectItem value="name-desc">名称: Z-A</SelectItem>
              <SelectItem value="date-asc">到期时间: 最近</SelectItem>
              <SelectItem value="date-desc">到期时间: 最远</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden items-center space-x-1 md:flex">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-[#0046FF]" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#0046FF]" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
        {/* 筛选面板 */}
        {isFilterOpen && (
          <div className="w-full shrink-0 lg:w-64">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">筛选条件</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-8 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  清除全部
                </Button>
              </div>

              {/* 价格范围 */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">价格范围</h3>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">${priceRange[0].toLocaleString()}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">${priceRange[1].toLocaleString()}</span>
                </div>
                <Slider
                  defaultValue={[0, 400000]}
                  max={400000}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>

              {/* 域名后缀 */}
              <Accordion type="single" collapsible defaultValue="extensions">
                <AccordionItem value="extensions">
                  <AccordionTrigger className="py-2 text-sm font-medium">域名后缀</AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 space-y-2">
                      {domainExtensions.map((ext) => (
                        <div key={ext} className="flex items-center space-x-2">
                          <Checkbox
                            id={`ext-${ext}`}
                            checked={selectedExtensions.includes(ext)}
                            onCheckedChange={() => handleExtensionChange(ext)}
                          />
                          <label
                            htmlFor={`ext-${ext}`}
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            {ext}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* 注册商 */}
              <Accordion type="single" collapsible defaultValue="registrars">
                <AccordionItem value="registrars">
                  <AccordionTrigger className="py-2 text-sm font-medium">注册商</AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 space-y-2">
                      {registrars.map((registrar) => (
                        <div key={registrar} className="flex items-center space-x-2">
                          <Checkbox
                            id={`reg-${registrar}`}
                            checked={selectedRegistrars.includes(registrar)}
                            onCheckedChange={() => handleRegistrarChange(registrar)}
                          />
                          <label
                            htmlFor={`reg-${registrar}`}
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            {registrar}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* 标签 */}
              <Accordion type="single" collapsible defaultValue="tags">
                <AccordionItem value="tags">
                  <AccordionTrigger className="py-2 text-sm font-medium">标签</AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tagOptions.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer ${selectedTags.includes(tag) ? "bg-[#0046FF]" : ""}`}
                          onClick={() => handleTagChange(tag)}
                        >
                          {tag}
                          {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}

        {/* 域名列表 */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              显示 <span className="font-medium">{filteredCount}</span> 个结果
            </p>
          </div>

          {domains.length === 0 ? (
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">未找到匹配的域名</p>
              <p className="text-gray-500 dark:text-gray-400">尝试调整您的筛选条件或搜索其他关键词</p>
              <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
                清除筛选条件
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {domains.map((domain) => (
                <Card key={domain.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <Link href={`/market/${domain.name}`}>
                      <div className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{domain.name}</h3>
                        </div>
                        <p className="mb-3 text-xl font-bold text-[#FF6A00]">${domain.price.toLocaleString()}</p>
                        <div className="mb-3 flex flex-wrap gap-1">
                          {domain.tags.map((tag, index) => (
                            <Badge key={index} className="bg-[#0046FF]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-col space-y-1 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex justify-between">
                            <span>注册商:</span>
                            <span>{domain.registrar}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>注册日期:</span>
                            <span>{domain.registered}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>到期日期:</span>
                            <span>{domain.expires}</span>
                          </div>
                        </div>
                        <Button className="mt-4 w-full bg-[#0046FF] hover:bg-[#0035CC]">查看详情</Button>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {domains.map((domain) => (
                <Card key={domain.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <Link href={`/market/${domain.name}`}>
                      <div className="flex flex-col p-4 md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0 md:w-1/3">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{domain.name}</h3>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {domain.tags.map((tag, index) => (
                              <Badge key={index} className="bg-[#0046FF]">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4 md:mb-0 md:w-1/3">
                          <div className="flex flex-col space-y-1 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex justify-between md:justify-start">
                              <span className="w-24">注册商:</span>
                              <span>{domain.registrar}</span>
                            </div>
                            <div className="flex justify-between md:justify-start">
                              <span className="w-24">注册日期:</span>
                              <span>{domain.registered}</span>
                            </div>
                            <div className="flex justify-between md:justify-start">
                              <span className="w-24">到期日期:</span>
                              <span>{domain.expires}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:w-1/3 md:flex-col md:items-end">
                          <p className="text-xl font-bold text-[#FF6A00] md:mb-2">${domain.price.toLocaleString()}</p>
                          <Button className="bg-[#0046FF] hover:bg-[#0035CC]">查看详情</Button>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* 分页 */}
          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mx-1">
              上一页
            </Button>
            <Button variant="outline" className="mx-1 bg-[#0046FF] text-white hover:bg-[#0035CC]">
              1
            </Button>
            <Button variant="outline" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="outline" className="mx-1">
              下一页
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
