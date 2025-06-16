import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Analytics } from "@vercel/analytics/react"
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Macvulin",
  description: 'Ideas — forged in code, shaped in thought.',
  openGraph: {
    title: 'Macvulin',
    description: 'A digital archive of deep thoughts, dev logs, and discoveries carved in code.',
    type: 'website',
    url: 'https://macvulin.vercel.app/',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
        width: 1200,
        height: 630,
        alt: 'Macvulin'
      }
    ]
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
          <footer className="border-t py-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Macvulin. All rights reserved.
          </footer>
         <Toaster />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}