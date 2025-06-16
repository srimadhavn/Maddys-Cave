import { getSortedPostsData } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Tag, ArrowRight, Clock, Eye } from "lucide-react"

export default function BlogIndex() {
  const posts = getSortedPostsData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-block mb-4 animate-bounce-in">
            <Badge variant="outline" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              Latest Articles
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground/70 bg-clip-text text-transparent mb-4 sm:mb-6 animate-slide-up">
            Blog Posts
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in-delayed">
            Discover insights, tutorials, and thoughts on technology, development, and more.
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mt-6 sm:mt-8 rounded-full animate-expand"></div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const postDate = new Date(post.date)
            return (
              <div
                key={post.id}
                className="animate-fade-in-up group h-full"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                <Link href={`/blog/${post.id}`} className="block h-full">
                  <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:rotate-1 bg-card/50 backdrop-blur-sm hover:bg-card/80 flex flex-col group-hover:border-primary/20 relative">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>

                    {/* Cover Image */}
                    {post.coverImage && (
                      <CardHeader className="p-0 relative overflow-hidden flex-shrink-0">
                        <div className="relative w-full h-48 sm:h-52 lg:h-48 xl:h-56 overflow-hidden">
                          <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                          {/* Floating elements on hover */}
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            <div className="bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                              <Eye className="w-4 h-4 text-primary" />
                            </div>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <Badge
                          variant="secondary"
                          className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-background/95 backdrop-blur-sm text-foreground border-0 shadow-lg text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 transform transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          {post.category}
                        </Badge>
                      </CardHeader>
                    )}

                    {/* Card Content - Using CSS Grid for proper layout */}
                    <div className="flex flex-col flex-1 p-4 sm:p-6 relative min-h-0">
                      {/* Title */}
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-all duration-300 line-clamp-2 leading-tight transform group-hover:translate-x-1">
                        {post.title}
                      </h2>

                      {/* Date and Reading Time */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 sm:mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <time>
                            {postDate.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>5 min</span>
                        </div>
                      </div>

                      {/* Excerpt - Takes available space */}
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 flex-1">
                            {post.tags.slice(0, 2).map((tag, tagIndex) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs px-2 py-0.5 sm:py-1 bg-muted/50 hover:bg-muted transition-all duration-300 border-muted-foreground/20 transform hover:scale-105"
                                style={{ animationDelay: `${index * 150 + tagIndex * 100}ms` }}
                              >
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-0.5 sm:py-1 bg-muted/50 border-muted-foreground/20"
                              >
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Read More Button - Fixed at bottom with proper styling */}
                      <div className="mt-auto pt-4 border-t border-border/30">
                        <div className="flex items-center justify-between group/btn cursor-pointer">
                          <span className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-300">
                            Read full article
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 group-hover/btn:bg-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12">
                              <ArrowRight className="w-4 h-4 text-primary group-hover:text-primary-foreground group-hover/btn:translate-x-1 transition-all duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center animate-pulse-slow">
              <Tag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 animate-slide-up">No posts yet</h3>
            <p className="text-muted-foreground animate-fade-in-delayed">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}
