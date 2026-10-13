import { buildMetadata } from "@/lib/seo"
import { PrivacyPolicyPage } from "@/views/LegalPage"

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for IQ-Line Private Limited: how we collect, use, store, process, disclose and safeguard information on our websites, platforms and healthcare software services.",
  path: "/privacy-policy",
})

export default function Page() {
  return <PrivacyPolicyPage />
}
