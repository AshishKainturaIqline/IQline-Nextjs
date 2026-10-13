import { buildRobotsRules } from "@/lib/robots-config"
import { BASE_URL } from "@/lib/seo"

export function generateRobotsTxt() {
  const lines = [
    `# IQ-Line — ${BASE_URL}`,
    "# Keep this file in sync with app/robots.js, app/sitemap.js and llms.txt.",
    "# Regenerate: npm run sync:seo",
    "",
  ]

  for (const rule of buildRobotsRules()) {
    lines.push(`User-agent: ${rule.userAgent}`, "Allow: /", "")
  }

  lines.push(
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    `# LLM index: ${BASE_URL}/llms.txt`,
    ""
  )

  return lines.join("\n")
}
