"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Tag, ArrowLeft, FileText } from "lucide-react"

interface Post {
  id: string
  title: string
  date: string
  excerpt: string
  category: string
  coverImage: string
  tags: string[]
}

function SearchResults() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Post[]>([])
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load all posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch("/api/posts")
        if (!response.ok) throw new Error("Failed to fetch posts")
        const posts = await response.json()
        setAllPosts(posts)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load posts:", error)
        setIsLoading(false)
      }
    }
    loadPosts()
  }, [])

  // Perform search
  useEffect(() => {
    if (!query.trim() || allPosts.length === 0) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase().trim()
    const filteredPosts = allPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchQuery)
      const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery)
      const categoryMatch = post.category.toLowerCase().includes(searchQuery)
      const tagsMatch = post.tags.some((tag) => tag.toLowerCase().includes(searchQuery))

      return titleMatch || excerptMatch || categoryMatch || tagsMatch
    })

    setResults(filteredPosts)
  }, [query, allPosts])

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-foreground/20 text-foreground rounded px-1">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" asChild className="hover:bg-muted/50">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Search Articles</h1>

          {/* Search Input */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-12 text-base bg-background border-border focus:border-foreground/50"
            />
          </div>
        </div>

        {/* Results */}
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          {query ? (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {results.length > 0
                    ? `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
                    : `No results found for "${query}"`}
                </p>
              </div>

              {results.length > 0 ? (
                <div className="grid gap-6">
                  {results.map((post, index) => (
                    <Card
                      key={post.id}
                      className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-0 shadow-lg bg-card/50 backdrop-blur-sm animate-fade-in-up"
                      style={{ animationDelay: `${300 + index * 100}ms` }}
                    >
                      <Link href={`/blog/${post.id}`} className="block">
                        <div className="sm:flex">
                          {post.coverImage && (
                            <CardHeader className="p-0 sm:w-1/3 relative overflow-hidden">
                              <div className="relative aspect-[16/10] sm:aspect-[4/3] h-full">
                                <Image
                                  src={post.coverImage || "/placeholder.svg"}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 640px) 100vw, 33vw"
                                />
                              </div>
                            </CardHeader>
                          )}

                          <div className={`${post.coverImage ? "sm:w-2/3" : "w-full"} flex flex-col`}>
                            <CardContent className="p-6 flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline" className="bg-muted/50">
                                  {post.category}
                                </Badge>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <time>
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </time>
                                </div>
                              </div>

                              <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-foreground/80 transition-colors duration-300 line-clamp-2">
                                {highlightMatch(post.title, query)}
                              </h2>

                              <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                                {highlightMatch(post.excerpt, query)}
                              </p>

                              {post.tags.length > 0 && (
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Tag className="w-4 h-4 text-muted-foreground" />
                                  {post.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs bg-muted/30">
                                      {highlightMatch(tag, query)}
                                    </Badge>
                                  ))}
                                  {post.tags.length > 3 && (
                                    <Badge variant="outline" className="text-xs bg-muted/30">
                                      +{post.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </CardContent>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try searching with different keywords or check your spelling
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/blog">Browse all articles</Link>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start searching</h3>
              <p className="text-muted-foreground">Enter keywords to find articles, tutorials, and insights</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading search...</p>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
