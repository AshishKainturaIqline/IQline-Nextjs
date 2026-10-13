import { buildMetadata } from "@/lib/seo"
import { ProductsPage } from "@/views/ProductsPage"

export const metadata = buildMetadata({
  title: "Healthcare Software Products",
  description:
    "Explore LabSaarthi LIMS, HospitalSaarthi HIMS, MeduCampus, Smart Parcha e-prescriptions and Paxoris RIMS—IQ-Line software for hospitals, labs and medical colleges.",
  path: "/products",
})

export default function Page() {
  return <ProductsPage />
}
