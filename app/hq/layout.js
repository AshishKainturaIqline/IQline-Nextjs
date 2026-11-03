import { HqProviders } from "@/components/hq/hq-providers"

export const metadata = {
  title: {
    absolute: "Dashboard",
    default: "Dashboard",
    template: "%s",
  },
  description: "Private studio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: "Studio",
    description: "Private studio.",
  },
  twitter: {
    card: "summary",
    title: "Studio",
    description: "Private studio.",
  },
}

export default function HqLayout({ children }) {
  return <HqProviders>{children}</HqProviders>
}
