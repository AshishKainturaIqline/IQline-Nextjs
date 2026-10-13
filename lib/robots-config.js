export const ROBOTS_USER_AGENTS = [
  "*",
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Applebot-Extended",
  "CCBot",
]

export function buildRobotsRules() {
  return ROBOTS_USER_AGENTS.map((userAgent) => ({
    userAgent,
    allow: "/",
  }))
}
