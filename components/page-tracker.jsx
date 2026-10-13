"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

import { trackPageView } from "@/lib/analytics"

export function PageTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.toString()
    const path = query ? `${pathname}?${query}` : pathname
    const timeout = setTimeout(() => {
      trackPageView(path, document.title)
    }, 100)
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return null
}
