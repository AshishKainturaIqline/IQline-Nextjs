import { buildRobotsRules } from "@/lib/robots-config"
import { BASE_URL } from "@/lib/seo"

export default function robots() {
  return {
    rules: buildRobotsRules(),
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
