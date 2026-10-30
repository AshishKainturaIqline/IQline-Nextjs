"use client"

import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
]

export function StudioThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <div role="radiogroup" aria-label="Theme" className="flex items-center gap-1 rounded-full bg-muted p-1">
      {OPTIONS.map((option) => {
        const selected = theme === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setTheme(option.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium text-muted-foreground",
              selected && "bg-background text-teal-800 shadow-sm dark:text-teal-200"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
