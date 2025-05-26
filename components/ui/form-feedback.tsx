"use client"

import React from "react"
import { CheckCircle, XCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type FeedbackType = "success" | "error" | "warning" | "loading"

export interface FormFeedbackProps {
  type: FeedbackType
  title: string
  description?: string
  details?: string[]
  actionButton?: {
    text: string
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }
  secondaryButton?: {
    text: string
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }
  autoClose?: {
    duration: number
    onClose: () => void
  }
  className?: string
  showIcon?: boolean
}

const feedbackConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
    titleColor: "text-green-900 dark:text-green-100",
    descriptionColor: "text-green-700 dark:text-green-300"
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    titleColor: "text-red-900 dark:text-red-100",
    descriptionColor: "text-red-700 dark:text-red-300"
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    titleColor: "text-yellow-900 dark:text-yellow-100",
    descriptionColor: "text-yellow-700 dark:text-yellow-300"
  },
  loading: {
    icon: Loader2,
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "text-blue-900 dark:text-blue-100",
    descriptionColor: "text-blue-700 dark:text-blue-300"
  }
}

export function FormFeedback({
  type,
  title,
  description,
  details,
  actionButton,
  secondaryButton,
  autoClose,
  className,
  showIcon = true
}: FormFeedbackProps) {
  const config = feedbackConfig[type]
  const Icon = config.icon

  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        autoClose.onClose()
      }, autoClose.duration)

      return () => clearTimeout(timer)
    }
  }, [autoClose])

  return (
    <Card className={cn(
      "w-full",
      config.bgColor,
      config.borderColor,
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {showIcon && (
            <div className="flex-shrink-0">
              <Icon 
                className={cn(
                  "h-6 w-6",
                  config.iconColor,
                  type === "loading" && "animate-spin"
                )} 
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-semibold",
              config.titleColor
            )}>
              {title}
            </h3>
            
            {description && (
              <p className={cn(
                "mt-2 text-sm",
                config.descriptionColor
              )}>
                {description}
              </p>
            )}
            
            {details && details.length > 0 && (
              <ul className={cn(
                "mt-3 space-y-1 text-sm",
                config.descriptionColor
              )}>
                {details.map((detail, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <ArrowRight className="h-3 w-3 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {(actionButton || secondaryButton) && (
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {actionButton && (
                  <Button
                    onClick={actionButton.onClick}
                    variant={actionButton.variant || "default"}
                    className="w-full sm:w-auto"
                  >
                    {actionButton.text}
                  </Button>
                )}
                {secondaryButton && (
                  <Button
                    onClick={secondaryButton.onClick}
                    variant={secondaryButton.variant || "outline"}
                    className="w-full sm:w-auto"
                  >
                    {secondaryButton.text}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {autoClose && (
          <div className="mt-4">
            <div className={cn(
              "h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            )}>
              <div 
                className={cn(
                  "h-full transition-all ease-linear",
                  type === "success" && "bg-green-500",
                  type === "error" && "bg-red-500",
                  type === "warning" && "bg-yellow-500",
                  type === "loading" && "bg-blue-500"
                )}
                style={{
                  animation: `shrink ${autoClose.duration}ms linear forwards`
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </Card>
  )
}

// 预设的常用反馈组件
export function SuccessFeedback(props: Omit<FormFeedbackProps, "type">) {
  return <FormFeedback {...props} type="success" />
}

export function ErrorFeedback(props: Omit<FormFeedbackProps, "type">) {
  return <FormFeedback {...props} type="error" />
}

export function WarningFeedback(props: Omit<FormFeedbackProps, "type">) {
  return <FormFeedback {...props} type="warning" />
}

export function LoadingFeedback(props: Omit<FormFeedbackProps, "type">) {
  return <FormFeedback {...props} type="loading" />
}
