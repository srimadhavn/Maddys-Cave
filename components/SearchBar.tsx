"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Post {
  id: string
  title: string
  date: string
  excerpt: string
  category: string
  coverImage: string
  tags: string[]
}

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export default function SearchBar({ placeholder = "Search articles...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Post[]>([])
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [postsLoaded, setPostsLoaded] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Load posts
  useEffect(() => {
    if (postsLoaded) return

    fetch("/api/posts")
      .then((res) => res.json())
      .then((posts) => {
        setAllPosts(posts)
        setPostsLoaded(true)
      })
      .catch(console.error)
  }, [postsLoaded])

  // Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.excerpt.toLowerCase().includes(searchQuery) ||
        post.category.toLowerCase().includes(searchQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery)),
    )

    setResults(filtered.slice(0, 6))
    setIsOpen(true)
  }, [query, allPosts])

  // Click outside to close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  // SIMPLE NAVIGATION - KEEP THE WORKING VERSION
  const navigateToPost = (postId: string) => {
    console.log("🔥 NAVIGATING TO:", postId)
    setIsOpen(false)
    setQuery("")
    setResults([])
    window.location.href = `/blog/${postId}`
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 h-10 text-sm bg-background/80 backdrop-blur-sm border-border focus:border-foreground/50 transition-all duration-300 rounded-full"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted/50 rounded-full"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* IMPROVED RESULTS UI */}
      {isOpen && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-200"
          style={{ zIndex: 9999 }}
        >
          {/* Results Header */}
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <p className="text-sm text-muted-foreground font-medium">
              {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
            </p>
          </div>

          {/* Results List */}
          <div className="py-2">
            {results.map((post, index) => (
              <div
                key={post.id}
                className="group px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors duration-200 border-b border-border/30 last:border-b-0"
                onClick={() => navigateToPost(post.id)}
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1 mb-1">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-200">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Footer */}
          {results.length >= 6 && (
            <div className="px-4 py-3 border-t border-border bg-muted/30">
              <button
                onClick={() => {
                  setIsOpen(false)
                  setQuery("")
                  setResults([])
                  window.location.href = `/search?q=${encodeURIComponent(query)}`
                }}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                View all results →
              </button>
            </div>
          )}
        </div>
      )}

      {/* NO RESULTS MESSAGE */}
      {isOpen && query && results.length === 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl p-6 text-center animate-in slide-in-from-top-2 duration-200"
          style={{ zIndex: 9999 }}
        >
          <Search className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-medium mb-1">No articles found</p>
          <p className="text-xs text-muted-foreground/70">Try different keywords or check your spelling</p>
        </div>
      )}
    </div>
  )
}
