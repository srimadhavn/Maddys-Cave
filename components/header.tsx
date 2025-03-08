import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
          <img 
            src="https://i.pinimg.com/736x/3b/5f/e6/3b5fe66e050039a49e401c078b944231.jpg" 
            alt="Logo" 
            className="h-8 w-8 mr-2 rounded-full" 
          />
          <span className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">
          </span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}