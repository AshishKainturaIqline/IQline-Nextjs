"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import { HqAuthProvider, useHqAuth } from "@/components/hq/hq-auth"
import { HqJobsProvider } from "@/components/hq/hq-jobs"
import { HqLoading, HqShell } from "@/components/hq/hq-shell"

function HqGate({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, ready } = useHqAuth()
  const onLogin = pathname === "/hq/login"

  useEffect(() => {
    if (!ready) return
    if (!user && !onLogin) router.replace("/hq/login")
    if (user && onLogin) router.replace("/hq")
  }, [onLogin, ready, router, user])

  if (!ready) return <HqLoading />
  if (!user && !onLogin) return <HqLoading label="Redirecting to sign in…" />
  if (user && onLogin) return <HqLoading label="Opening studio…" />
  if (onLogin) return children
  return <HqShell>{children}</HqShell>
}

export function HqProviders({ children }) {
  return (
    <HqAuthProvider>
      <HqJobsProvider>
        <HqGate>{children}</HqGate>
      </HqJobsProvider>
    </HqAuthProvider>
  )
}
