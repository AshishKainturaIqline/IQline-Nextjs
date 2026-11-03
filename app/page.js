import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import Top from "@/components/Top"
import { buildMetadata } from "@/lib/seo"
import { HomePage } from "@/views/HomePage"

export const metadata = buildMetadata({
  title: "Healthcare Software for Hospitals and Labs | IQ-Line",
  description:
    "IQ-Line builds software for hospitals, diagnostic laboratories and medical colleges. Manage patient records, laboratory testing, prescriptions, radiology and academic administration.",
  path: "/",
})

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <Top />
      <HomePage />
      <SiteFooter />
    </div>
  )
}
