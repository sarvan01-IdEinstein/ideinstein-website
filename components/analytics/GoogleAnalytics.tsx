'use client'

import Script from 'next/script'
import { META } from '@/lib/constants'

const GoogleAnalytics = () => {
  const gaId = META.analytics?.googleAnalyticsId

  if (!gaId || gaId === 'G-XXXXXXXXXX') {
    return null // Don't load analytics in development or if not configured
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics