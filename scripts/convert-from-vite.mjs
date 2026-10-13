import * as esbuild from "esbuild"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const SRC = path.join(ROOT, "..", "src")

const SKIP = new Set(["App.tsx", "main.tsx", "seo-head.tsx"])

const MAP_DIRS = [
  { from: "components", to: "components" },
  { from: "lib", to: "lib" },
  { from: "hooks", to: "hooks" },
  { from: "modal", to: "modal" },
  { from: "pages", to: "views" },
]

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full, acc)
    else if (/\.(tsx?|jsx?)$/.test(name)) acc.push(full)
  }
  return acc
}

function outPath(relFromSrc, fileName) {
  const base = fileName.replace(/\.tsx?$/, "")
  const ext = fileName.endsWith(".ts") && !fileName.endsWith(".tsx") ? ".js" : ".jsx"
  for (const { from, to } of MAP_DIRS) {
    if (relFromSrc === from || relFromSrc.startsWith(`${from}${path.sep}`)) {
      const sub = relFromSrc.slice(from.length).replace(/^[/\\]/, "")
      return path.join(ROOT, to, sub, base + ext)
    }
  }
  return null
}

function stripSeoHead(source) {
  let out = source
  out = out.replace(/import\s*\{[^}]*SeoHead[^}]*\}\s*from\s*["']@\/components\/seo-head["']\s*\n?/g, "")
  out = out.replace(/<SeoHead[\s\S]*?\/>/g, "")
  return out
}

function patchSource(code, filePath) {
  let out = code

  out = out.replace(/from ["']@\/([^"']+)\.tsx["']/g, 'from "@/$1"')
  out = out.replace(/from ["']@\/([^"']+)\.ts["']/g, 'from "@/$1"')
  out = out.replace(/import\.meta\.env\.VITE_([A-Z0-9_]+)/g, "process.env.NEXT_PUBLIC_$1")

  if (out.includes("react-router-dom")) {
    const needsLink = /<Link\b/.test(out)
    const needsNav =
      out.includes("useNavigate") ||
      out.includes("useParams") ||
      out.includes("useLocation") ||
      out.includes("useSearchParams")

    out = out.replace(
      /import\s*\{[^}]*\}\s*from\s*["']react-router-dom["']\s*\n?/g,
      ""
    )

    const imports = []
    if (needsLink) imports.push('import Link from "next/link"')
    if (needsNav) {
      const navParts = []
      if (out.includes("useNavigate")) navParts.push("useRouter")
      if (out.includes("useParams")) navParts.push("useParams")
      if (out.includes("useLocation")) {
        navParts.push("usePathname")
        if (!navParts.includes("useSearchParams") && out.includes("location.search")) {
          navParts.push("useSearchParams")
        }
      }
      if (out.includes("useSearchParams")) navParts.push("useSearchParams")
      imports.push(`import { ${[...new Set(navParts)].join(", ")} } from "next/navigation"`)
    }
    if (imports.length) {
      out = `${imports.join("\n")}\n${out}`
    }

    out = out.replace(/\bconst navigate = useNavigate\(\)/g, "const router = useRouter()")
    out = out.replace(/\buseNavigate\(\)/g, "useRouter()")
    out = out.replace(/\bnavigate\(/g, "router.push(")

    if (out.includes("useLocation")) {
      out = out.replace(/\bconst location = useLocation\(\)/g, "const pathname = usePathname()")
      out = out.replace(/\blocation\.pathname/g, "pathname")
      out = out.replace(/\blocation\.search/g, "searchParams.toString() ? `?${searchParams.toString()}` : ''")
      out = out.replace(/\blocation\.hash/g, "hash")
      if (out.includes("useLocation") && !out.includes("const hash")) {
        out = out.replace(
          /(const pathname = usePathname\(\))/,
          `$1
  const hash = typeof window !== "undefined" ? window.location.hash : ""`
        )
      }
      if (out.includes("searchParams.toString()") && !out.includes("useSearchParams()")) {
        out = out.replace(
          /(const pathname = usePathname\(\))/,
          `$1
  const searchParams = useSearchParams()`
        )
      }
      out = out.replace(/\buseLocation\(\)/g, "usePathname()")
    }

    out = out.replace(/\sto=\{/g, " href={")
    out = out.replace(/\sto="/g, ' href="')
    out = out.replace(/\sto='/g, " href='")
  }

  out = out.replace(/\s+as const\b/g, "")

  const isClient =
    filePath.includes(`${path.sep}components${path.sep}`) ||
    filePath.includes(`${path.sep}views${path.sep}`) ||
    filePath.includes(`${path.sep}hooks${path.sep}`) ||
    filePath.includes(`${path.sep}modal${path.sep}`)

  const usesClientHooks =
    /\b(useState|useEffect|useRef|useCallback|useMemo|useContext|framer-motion|window\.|document\.|localStorage)\b/.test(
      out
    ) || out.includes('"use client"')

  if (isClient && usesClientHooks && !out.startsWith('"use client"')) {
    out = `"use client"\n\n${out}`
  }

  return out
}

async function convertFile(absPath) {
  const rel = path.relative(SRC, absPath)
  const relDir = path.dirname(rel)
  const fileName = path.basename(absPath)

  if (SKIP.has(fileName)) return

  if (fileName.endsWith(".js") && !fileName.endsWith(".jsx")) {
    const dest = outPath(relDir, fileName)
    if (!dest) return
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(absPath, dest)
    return
  }

  const dest = outPath(relDir, fileName)
  if (!dest) return

  let source = fs.readFileSync(absPath, "utf8")
  source = stripSeoHead(source)
  const loader = fileName.endsWith(".tsx") ? "tsx" : "ts"

  const { code } = await esbuild.transform(source, {
    loader,
    format: "esm",
    target: "es2020",
    jsx: "preserve",
  })

  let patched = patchSource(code, dest)
  patched = patched.replace(/\.tsx["']/g, '"').replace(/\.ts["']/g, '"')

  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.writeFileSync(dest, patched, "utf8")
  console.log("wrote", path.relative(ROOT, dest))
}

async function main() {
  const files = walk(SRC)
  for (const file of files) {
    await convertFile(file)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
