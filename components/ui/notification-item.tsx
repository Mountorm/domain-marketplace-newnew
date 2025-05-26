"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface NotificationItemProps {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function NotificationItem({
  id,
  label,
  checked,
  onCheckedChange,
}: NotificationItemProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <Label 
        htmlFor={id}
        className="text-sm font-normal cursor-pointer"
      >
        {label}
      </Label>
      <Switch 
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  )
}
