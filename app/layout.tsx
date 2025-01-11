import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import { Toaster } from '@/components/ui/toaster'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Blog',
  description: 'A modern blog built with Next.js and Tailwind CSS',
  openGraph: {
    title: 'Modern Blog',
    description: 'A modern blog built with Next.js and Tailwind CSS',
    type: 'website',
    url: 'https://your-domain.com',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
        width: 1200,
        height: 630,
        alt: 'Modern Blog'
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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}