import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import FloatingContactHub from '@/components/shared/FloatingContactHub'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import StructuredData from '@/components/shared/StructuredData'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import SessionProvider from '@/components/providers/SessionProvider'
import { META } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = META;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ErrorBoundary>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <FloatingContactHub />
              </div>
            </CartProvider>
          </ErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  )
}