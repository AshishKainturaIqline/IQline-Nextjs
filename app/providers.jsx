"use client"

import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      {children}
    </ThemeProvider>
  )
}
