import { Suspense } from "react"
import Script from "next/script"

import { PageTracker } from "@/components/page-tracker"
import { StructuredData } from "@/components/structured-data"
import {
  buildRootMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo"
import { themeInitScript } from "@/lib/theme-script"
import { Providers } from "./providers"
import "./globals.css"

export const metadata = buildRootMetadata()

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <StructuredData data={organizationJsonLd()} />
        <StructuredData data={websiteJsonLd()} />
        {GTM_ID ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
      </head>
      <body>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <Providers>
          <Suspense fallback={null}>
            <PageTracker />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  )
}
