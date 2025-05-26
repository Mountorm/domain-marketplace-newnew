import React, { useEffect, useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Tag {
  value: string
  label: string
}

interface DomainTagSelectorProps {
  tags: Tag[]
  selectedTags: string[]
  maxTags?: number
  onTagsChange: (tags: string[]) => void
}

export function DomainTagSelector({
  tags,
  selectedTags,
  maxTags = 3,
  onTagsChange,
}: DomainTagSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const filteredTags = tags.filter((tag) =>
    tag.label.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleSelect = (value: string) => {
    if (selectedTags.includes(value)) {
      onTagsChange(selectedTags.filter((t) => t !== value))
    } else if (selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, value])
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between text-left font-normal"
          >
            选择标签
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="搜索标签..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>未找到相关标签</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {filteredTags.map((tag) => (
                <CommandItem
                  key={tag.value}
                  onSelect={() => handleSelect(tag.value)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTags.includes(tag.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tag.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tagValue) => {
          const tag = tags.find((t) => t.value === tagValue)
          if (!tag) return null
          return (
            <Badge
              key={tag.value}
              className="cursor-pointer bg-[#0046FF]"
              onClick={() => removeTag(tag.value)}
            >
              {tag.label}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )
        })}
      </div>
      <p className="text-sm text-gray-500">已选择 {selectedTags.length}/{maxTags} 个标签</p>
    </div>
  )
}
