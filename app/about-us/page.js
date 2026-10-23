import { buildMetadata } from "@/lib/seo"
import { AboutPage } from "@/views/AboutPage"

export const metadata = buildMetadata({
  title: "About IQ-Line",
  description:
    "Learn how IQ-Line builds hospital, laboratory and medical college software in India—from LIMS and HIMS to e-prescriptions, radiology and campus administration.",
  path: "/about-us",
})

export default function Page() {
  return <AboutPage />
}
