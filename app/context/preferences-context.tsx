"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "zh-CN" | "en-US"
type Currency = "USD" | "CNY" | "EUR"

interface PreferencesContextType {
  language: Language
  currency: Currency
  setLanguage: (language: Language) => void
  setCurrency: (currency: Currency) => void
  formatCurrency: (amount: number) => string
  translate: (key: string) => string
}

// 简单的翻译映射
const translations: Record<Language, Record<string, string>> = {
  "zh-CN": {
    home: "首页",
    market: "域名市场",
    support: "支持",
    login: "登录 / 注册",
    // 可以添加更多翻译
  },
  "en-US": {
    home: "Home",
    market: "Domain Market",
    support: "Support",
    login: "Login / Register",
    // 可以添加更多翻译
  },
}

// 货币格式化配置
const currencyConfig: Record<Currency, { symbol: string; locale: string }> = {
  USD: { symbol: "$", locale: "en-US" },
  CNY: { symbol: "¥", locale: "zh-CN" },
  EUR: { symbol: "€", locale: "de-DE" },
}

// 货币汇率（相对于USD）
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  CNY: 7.2,
  EUR: 0.92,
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  // 从本地存储加载偏好设置，默认为中文和美元
  const [language, setLanguageState] = useState<Language>("zh-CN")
  const [currency, setCurrencyState] = useState<Currency>("USD")

  // 初始化时从本地存储加载偏好设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    const savedCurrency = localStorage.getItem("currency") as Currency

    if (savedLanguage && (savedLanguage === "zh-CN" || savedLanguage === "en-US")) {
      setLanguageState(savedLanguage)
    }

    if (savedCurrency && (savedCurrency === "USD" || savedCurrency === "CNY" || savedCurrency === "EUR")) {
      setCurrencyState(savedCurrency)
    }
  }, [])

  // 更新语言并保存到本地存储
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // 更新货币并保存到本地存储
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem("currency", newCurrency)
  }

  // 格式化货币金额
  const formatCurrency = (amount: number) => {
    // 转换货币
    const convertedAmount = amount * exchangeRates[currency]

    // 格式化
    return new Intl.NumberFormat(currencyConfig[currency].locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedAmount)
  }

  // 翻译函数
  const translate = (key: string) => {
    return translations[language][key] || key
  }

  const value = {
    language,
    currency,
    setLanguage,
    setCurrency,
    formatCurrency,
    translate,
  }

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

// 自定义钩子，用于在组件中访问偏好设置
export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}
