import { buildMetadata } from "@/lib/seo"
import { TermsAndConditionsPage } from "@/views/LegalPage"

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "Terms and conditions for access to IQ-Line websites, platforms and related services, including use of our hospital, laboratory and medical education software products.",
  path: "/terms-and-conditions",
})

export default function Page() {
  return <TermsAndConditionsPage />
}
