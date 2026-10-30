"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import logoDark from "@/assets/logo/Logo-Darktheme.svg"
import { StudioThemeSwitch } from "@/components/hq/studio-theme-switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useHqAuth } from "@/components/hq/hq-auth"
import { assetSrc } from "@/lib/utils"

export function LoginScreen() {
  const router = useRouter()
  const { login } = useHqAuth()
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    const result = login(id, password)
    if (!result.ok) {
      setError("That ID or password is not recognized.")
      return
    }
    router.replace("/hq")
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between bg-[#117a72] px-10 py-8 text-white lg:flex">
        <img src={assetSrc(logoDark)} alt="IQ-Line" className="h-24 w-auto self-start" />
        <div className="max-w-md">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance">
            Hire faster. Manage every role in one place.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
            Post Blogs, jobs And track their status and keep your careers page up to date.
          </p>
        </div>
        <p className="text-sm text-white/75">Elevating Lives Digitally</p>
      </aside>

      <main className="flex flex-col items-center justify-center bg-background px-6 py-12">
        <div className="mb-10 w-full max-w-sm lg:hidden">
          <img src={assetSrc(logoDark)} alt="IQ-Line" className="h-10 w-auto rounded-lg bg-[#117a72] px-3 py-2" />
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to IQ-Line Studio to manage your Website Content.</p>

          <div className="mt-8 grid gap-2">
            <Label htmlFor="studio-id">ID</Label>
            <Input
              id="studio-id"
              name="id"
              autoComplete="username"
              placeholder="Enter your ID"
              value={id}
              onChange={(event) => setId(event.target.value)}
              aria-invalid={Boolean(error)}
              className="h-11 rounded-lg"
            />
          </div>

          <div className="mt-4 grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="studio-password">Password</Label>
              <button
                type="button"
                className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-300"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <Input
              id="studio-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(error)}
              className="h-11 rounded-lg"
            />
          </div>

          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}

          <Button type="submit" className="mt-6 h-11 w-full rounded-lg bg-[#117a72] text-white hover:bg-[#0f6b64]">
            Sign in
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">Many things you can edit here.</p>
          <div className="mt-8 flex justify-center">
            <StudioThemeSwitch />
          </div>
        </form>
      </main>
    </div>
  )
}
