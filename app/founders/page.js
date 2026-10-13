import { buildMetadata } from "@/lib/seo"
import { FoundersPage } from "@/views/FoundersPage"

export const metadata = buildMetadata({
  title: "Meet the Founders",
  description:
    "Meet Ayush Garg and Amit Kumar Jain, founders of IQ-Line. Learn how they lead product and engineering for hospital, lab and medical college software in India.",
  path: "/founders",
})

export default function Page() {
  return <FoundersPage />
}
