import { Suspense } from "react"

import { buildMetadata } from "@/lib/seo"
import { ContactPage } from "@/views/ContactPage"

export const metadata = buildMetadata({
  title: "Contact & Book a Demo",
  description:
    "Book an IQ-Line demo for hospitals, diagnostic labs or medical colleges. Share your workflows and which product—LIMS, HIMS, campus, e-prescription or RIMS—you want to review.",
  path: "/contact-us",
})

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ContactPage />
    </Suspense>
  )
}
