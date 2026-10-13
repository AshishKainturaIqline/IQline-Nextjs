import { buildMetadata } from "@/lib/seo"
import { CareerPage } from "@/views/CareerPage"

export const metadata = buildMetadata({
  title: "Careers at IQ-Line",
  description:
    "Join IQ-Line and help build healthcare software for hospitals, diagnostic laboratories and medical colleges across India. See current openings and how to apply.",
  path: "/careers",
})

export default function Page() {
  return <CareerPage />
}
