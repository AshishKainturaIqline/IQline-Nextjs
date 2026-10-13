import fs from "fs"
import path from "path"

import { generateLlmsTxt } from "@/lib/llms"
import { generateRobotsTxt } from "@/lib/robots-text"

const publicDir = path.join(process.cwd(), "public")

fs.writeFileSync(path.join(publicDir, "llms.txt"), generateLlmsTxt(), "utf8")
fs.writeFileSync(path.join(publicDir, "robots.txt"), generateRobotsTxt(), "utf8")

console.log("Updated public/robots.txt and public/llms.txt")
