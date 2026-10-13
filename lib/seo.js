import { productCardImageUrl } from "@/lib/utils"

const SITE_NAME = "IQ-Line"
const BASE_URL = "https://iqline.co.in"

/** Live default until public/og.png (1200×630) is added. */
const DEFAULT_OG_IMAGE_PATH = "/images/team.webp"
const OPTIONAL_BRANDED_OG_PATH = "/og.png"

export function buildPageTitle(title) {
  return title.includes("|") ? title : `${title} | ${SITE_NAME}`
}

export function truncateMetaDescription(text, maxLength = 160) {
  const normalized = (text ?? "").replace(/\s+/g, " ").trim()
  if (normalized.length <= maxLength) return normalized
  const slice = normalized.slice(0, maxLength + 1)
  const lastSpace = slice.lastIndexOf(" ")
  const cut = lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : normalized.slice(0, maxLength)
  return `${cut.replace(/[,;:\s]+$/, "")}…`
}

function resolveOgImagePath(ogImage) {
  return ogImage ?? DEFAULT_OG_IMAGE_PATH
}

export function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return BASE_URL
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl
  }
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
  return `${BASE_URL}${path}`
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  ogType = "website",
  publishedTime,
  authors,
}) {
  const pageTitle = buildPageTitle(title)
  const metaDescription = truncateMetaDescription(description)
  const url = `${BASE_URL}${path}`
  const imagePath = resolveOgImagePath(ogImage)

  const openGraph = {
    title: pageTitle,
    description: metaDescription,
    type: ogType,
    url,
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [
      {
        url: imagePath,
        alt: `${SITE_NAME} — ${title.replace(/\s*\|\s*IQ-Line\s*$/i, "").trim()}`,
      },
    ],
  }

  if (ogType === "article" && publishedTime) {
    openGraph.publishedTime = publishedTime
  }
  if (ogType === "article" && authors?.length) {
    openGraph.authors = authors
  }

  return {
    title: { absolute: pageTitle },
    description: metaDescription,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: metaDescription,
      images: [imagePath],
    },
  }
}

export function buildRootMetadata() {
  const verificationCode = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  const verification =
    verificationCode && verificationCode !== "YOUR_VERIFICATION_CODE"
      ? { google: verificationCode }
      : undefined

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: buildPageTitle("Healthcare Software for Hospitals and Labs"),
      template: `%s | ${SITE_NAME}`,
    },
    description: truncateMetaDescription(
      "IQ-Line delivers LIMS, HIMS, MESM, E-Prescription, and RIMS for hospitals, labs, and medical colleges across India."
    ),
    openGraph: {
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: DEFAULT_OG_IMAGE_PATH,
          alt: `${SITE_NAME} team`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [DEFAULT_OG_IMAGE_PATH],
    },
    ...(verification ? { verification } : {}),
    other: {
      "theme-color": "#0c4a6e",
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "IQ-Line Private Limited",
    url: BASE_URL,
    description:
      "AI-first healthcare workflow automation for hospitals, labs, and medical colleges across India.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@iqline.co.in",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Healthcare software for hospitals, diagnostic laboratories and medical colleges in India.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
  }
}

export function productJsonLd(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url: `${BASE_URL}/products/${product.id}`,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    category: product.fullTitle,
    image: absoluteUrl(productCardImageUrl(product.id)),
  }
}

export function articleJsonLd({ headline, description, path, datePublished, authorName, authorRole }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: truncateMetaDescription(description),
    datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorRole ? { jobTitle: authorRole } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${path}`,
    },
  }
}

export function productOgImagePath(productId) {
  return productCardImageUrl(productId)
}

export { BASE_URL, DEFAULT_OG_IMAGE_PATH, OPTIONAL_BRANDED_OG_PATH, SITE_NAME }
