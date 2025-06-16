import { getPostData, getAllPostIds } from "@/lib/posts"
import { notFound } from "next/navigation"
import Image from "next/image"
import ShareButton from "@/components/ShareButton"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import ReadingProgress from "@/components/ReadingProgress"
import TableOfContents from "@/components/TableOfContents"

export async function generateStaticParams() {
  try {
    const paths = getAllPostIds()
    return paths.map((path) => ({
      id: path.params.id,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const post = await getPostData(params.id)
    return {
      title: `${post.title} | Maddy's Cave`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [{ url: post.coverImage }] : [],
        type: "article",
        publishedTime: post.date,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    }
  } catch {
    return {
      title: "Post not found | Maddy's Cave",
    }
  }
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function extractHeadings(content: string) {
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi
  const headings = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = Number.parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, "")
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    headings.push({
      level,
      text,
      id,
    })
  }

  return headings
}

export default async function Post({ params }: { params: { id: string } }) {
  try {
    const post = await getPostData(params.id)
    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog/${params.id}`
    const readingTime = estimateReadingTime(post.content)
    const headings = extractHeadings(post.content)

    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Enhanced content processing
    const contentWithIds = post.content
      .replace(/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi, (match, level, text) => {
        const id = text
          .replace(/<[^>]*>/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
        return `<h${level} id="${id}">${text}</h${level}>`
      })
      // Enhanced image processing with error handling
      .replace(/<img([^>]*)>/gi, (match, attributes) => {
        // Add error handling and enhanced styling
        const enhancedAttributes = attributes
          .replace(/loading=["'][^"']*["']/g, "") // Remove existing loading attribute
          .replace(/style=["']([^"']*)["']/g, (styleMatch: string, styles: string) => {
            // Enhance existing styles
            return `style="${styles}; max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); margin: 2rem auto; display: block; transition: transform 0.3s ease;"`
          })

        // If no style attribute exists, add default styles
        if (!attributes.includes("style=")) {
          return `<img${enhancedAttributes} loading="lazy" style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); margin: 2rem auto; display: block; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'" onerror="this.style.display='none'; this.nextElementSibling && this.nextElementSibling.style.display='block';">`
        }

        return `<img${enhancedAttributes} loading="lazy" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'" onerror="this.style.display='none';">`
      })

    return (
      <>
        <ReadingProgress />

        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/3 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/3 rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          {/* Back Navigation */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Button
                variant="ghost"
                asChild
                className="group hover:bg-muted/50 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/blog" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Table of Contents - Desktop */}
              {headings.length > 0 && (
                <div className="hidden lg:block lg:col-span-3">
                  <div className="sticky top-32 animate-fade-in-right" style={{ animationDelay: "200ms" }}>
                    <TableOfContents headings={headings} />
                  </div>
                </div>
              )}

              {/* Main Content */}
              <article
                className={`${headings.length > 0 ? "lg:col-span-9" : "lg:col-span-12"} max-w-4xl ${headings.length === 0 ? "mx-auto" : ""}`}
              >
                {/* Hero Section */}
                <header className="mb-12 animate-fade-in">
                  {post.coverImage && (
                    <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] mb-8 overflow-hidden rounded-2xl shadow-2xl group">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                      <div className="absolute top-6 left-6 animate-bounce-in" style={{ animationDelay: "500ms" }}>
                        <Badge
                          variant="secondary"
                          className="bg-background/95 backdrop-blur-sm text-foreground border-0 shadow-lg transform transition-all duration-300 hover:scale-110"
                        >
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <h1
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-foreground via-primary to-foreground/80 bg-clip-text text-transparent animate-slide-up"
                      style={{ animationDelay: "200ms" }}
                    >
                      {post.title}
                    </h1>

                    {post.excerpt && (
                      <p
                        className="text-xl text-muted-foreground leading-relaxed max-w-3xl animate-fade-in-up"
                        style={{ animationDelay: "300ms" }}
                      >
                        {post.excerpt}
                      </p>
                    )}

                    <div
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up"
                      style={{ animationDelay: "400ms" }}
                    >
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2 group">
                          <Calendar className="w-4 h-4 group-hover:text-primary transition-colors duration-300" />
                          <time dateTime={post.date}>{formattedDate}</time>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-2 group">
                          <Clock className="w-4 h-4 group-hover:text-primary transition-colors duration-300" />
                          <span>{readingTime} min read</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-2 group">
                          <BookOpen className="w-4 h-4 group-hover:text-primary transition-colors duration-300" />
                          <span>Article</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <ShareButton url={postUrl} title={post.title} />
                      </div>
                    </div>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                        {post.tags.map((tag, index) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="px-3 py-1 bg-muted/50 hover:bg-muted hover:scale-105 transition-all duration-300 cursor-pointer animate-bounce-in"
                            style={{ animationDelay: `${600 + index * 100}ms` }}
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </header>

                {headings.length > 0 && (
                  <div className="lg:hidden mb-8 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
                    <TableOfContents headings={headings} />
                  </div>
                )}

                <Separator className="mb-12 animate-expand" style={{ animationDelay: "800ms" }} />

                {/* Article Content with enhanced image support */}
                <div className="animate-fade-in-up" style={{ animationDelay: "900ms" }}>
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none
                      prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:animate-fade-in-up
                      prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
                      prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                      prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
                      prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-6
                      prose-p:text-base prose-p:leading-relaxed prose-p:mb-6
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-all prose-a:duration-300
                      prose-strong:text-foreground prose-strong:font-semibold
                      prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                      prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-pre:shadow-lg prose-pre:overflow-x-auto
                      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6 prose-blockquote:shadow-sm
                      prose-ul:my-6 prose-ol:my-6 prose-li:my-2
                      prose-img:rounded-xl prose-img:shadow-xl prose-img:my-8 prose-img:transition-transform prose-img:duration-300 hover:prose-img:scale-105 prose-img:mx-auto prose-img:block
                      prose-table:my-8 prose-th:bg-muted prose-th:font-semibold prose-th:p-3 prose-td:p-3 prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:shadow-sm
                      [&_.blog-image]:rounded-xl [&_.blog-image]:shadow-xl [&_.blog-image]:my-8 [&_.blog-image]:transition-transform [&_.blog-image]:duration-300 [&_.blog-image:hover]:scale-105 [&_.blog-image]:mx-auto [&_.blog-image]:block"
                    dangerouslySetInnerHTML={{ __html: contentWithIds }}
                  />
                </div>

                {/* Article Footer */}
                <footer
                  className="mt-16 pt-8 border-t border-border animate-fade-in-up"
                  style={{ animationDelay: "1000ms" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-muted/30 rounded-lg backdrop-blur-sm">
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Published on {formattedDate}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Estimated reading time: {readingTime} minutes
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Share this article:</span>
                      <ShareButton url={postUrl} title={post.title} />
                    </div>
                  </div>
                </footer>

                <div
                  className="mt-12 pt-8 border-t border-border animate-fade-in-up"
                  style={{ animationDelay: "1100ms" }}
                >
                  <div className="flex justify-center">
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Link href="/blog" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
                        Back to all posts
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error("Error rendering post:", error)
    notFound()
  }
}
