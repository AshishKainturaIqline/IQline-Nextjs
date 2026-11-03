"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, Plus, X } from "lucide-react"

import logoDark from "@/assets/logo/Logo-Darktheme.svg"
import logoLight from "@/assets/logo/Logo-Lighttheme.svg"
import { StudioThemeSwitch } from "@/components/hq/studio-theme-switch"
import { Button } from "@/components/ui/button"
import { assetSrc, cn } from "@/lib/utils"
import { useHqAuth } from "@/components/hq/hq-auth"

function StudioMark({ className }) {
  return (
    <>
      <img src={assetSrc(logoLight)} alt="iqline" className={cn("h-20 w-auto dark:hidden", className)} />
      <img src={assetSrc(logoDark)} alt="iqline" className={cn("hidden h-20 w-auto dark:block", className)} />
    </>
  )
}

const NAV = [
  { href: "/hq", label: "Dashboard", exact: true },
  { href: "/hq/jobs", label: "Jobs", exact: false },
]

export function HqLoading({ label = "Loading studio…" }) {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
      {label}
    </div>
  )
}

export function HqMissing({ title = "Job not found", body = "This job is not in the studio list." }) {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <h1 className="font-heading text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <Button asChild className="mt-6">
        <Link href="/hq/jobs">Back to jobs</Link>
      </Button>
    </div>
  )
}

function initials(name) {
  const letters = (name ?? "")
    .split(" ")
    .map((part) => part.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
  return letters.join("").toUpperCase() || "IQ"
}

function NavLinks({ onNavigate }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
              active && "bg-teal-50 text-teal-900 hover:bg-teal-50 hover:text-teal-900 dark:bg-teal-950 dark:text-teal-100"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function HqShell({ children }) {
  const { user, logout } = useHqAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    function onKey(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        document.getElementById("hq-search")?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function signOut() {
    logout()
    router.replace("/hq/login")
  }

  function submitSearch(event) {
    event.preventDefault()
    const value = search.trim()
    router.push(value ? `/hq/jobs?q=${encodeURIComponent(value)}` : "/hq/jobs")
    setOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-[#f3f6f5] dark:bg-background">
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-sidebar-border bg-background md:static",
          open ? "flex" : "hidden md:flex"
        )}
      >
        <div className="flex items-center justify-between gap-2 px-4 ">
          <Link href="/hq" className="flex min-w-0 flex-col items-start gap-1" aria-label="IQ-Line Studio" onClick={() => setOpen(false)}>
            <StudioMark />
            {/* <span className="text-xs text-muted-foreground">Careers admin</span> */}
          </Link>
          <Button variant="ghost" size="icon-sm" className="md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X />
          </Button>
        </div>
        <NavLinks onNavigate={() => setOpen(false)} />
        <div className="grid gap-2 p-3">
          <div className="flex items-center gap-3 rounded-xl border px-3 py-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-teal-50 text-xs font-semibold text-teal-800">
              {initials(user?.name)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{user?.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{user?.role}</span>
            </span>
          </div>
          <Button variant="outline" className="w-full" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur-sm md:px-6">
          <Button variant="outline" size="icon-sm" className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu />
          </Button>
       
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:block">
              <StudioThemeSwitch />
            </div>
            <Button asChild className="rounded-lg bg-[#117a72] text-white hover:bg-[#0f6b64]">
              <Link href="/hq/jobs/new">
                <Plus />
                Add job
              </Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
