import Link from "next/link"
import Image from "next/image"
import { getSortedPostsData } from "@/lib/posts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Sparkles, BookOpen } from "lucide-react"

export default async function Home() {
  const posts = await getSortedPostsData()
  const featuredPost = posts[0]
  const featuredPosts = posts.slice(1, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-8 lg:py-28 text-center space-y-8 animate-fade-in">
        <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-bounce-subtle mt-0">
          <Sparkles className="w-4 h-4" />
         A battlefield of ideas, carved in code and conviction.      
 </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Macvulin
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              As battles demand steel, creation demands clarity <br />
               — deliberate, relentless.
            </p>

          </div>

          <div
            className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <Button asChild size="lg" className="group shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/blog" className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Explore Posts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* Featured Post Section */}
        {featuredPost && (
          <section className="py-6 lg:py-24 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Post</h2>
              <p className="text-muted-foreground text-lg">Don't miss this highlighted content</p>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Link href={`/blog/${featuredPost.id}`} className="block group">
                <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  <div className="lg:flex">
                    <CardHeader className="p-0 lg:w-1/2 relative overflow-hidden">
                      <div className="relative aspect-[16/10] lg:aspect-[4/3] h-full">
                        <Image
                          src={featuredPost.coverImage || "/placeholder.svg"}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        <Badge
                          variant="secondary"
                          className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm text-foreground border-0 shadow-lg"
                        >
                          Featured
                        </Badge>
                      </div>
                    </CardHeader>

                    <div className="lg:w-1/2 flex flex-col">
                      <CardContent className="p-8 lg:p-10 flex-1 flex flex-col justify-center">
                        <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                          {featuredPost.title}
                        </CardTitle>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-6 line-clamp-4">
                          {featuredPost.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <Badge variant="outline" className="bg-muted/50">
                            {featuredPost.category}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time>
                              {new Date(featuredPost.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                          </div>
                        </div>

                        <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors duration-300">
                          Read full article
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </section>
        )}

        {/* Latest Posts Section */}
        <section className="py-16 lg:py-24 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Latest Posts</h2>
              <p className="text-muted-foreground text-lg">Fresh content from the cave</p>
            </div>
            <Button variant="ghost" asChild className="group hover:bg-muted/50 transition-all duration-300">
              <Link href="/blog" className="flex items-center gap-2">
                View all posts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-fade-in-up group"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <Link href={`/blog/${post.id}`} className="block h-full">
                  <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-card/50 backdrop-blur-sm hover:bg-card/80">
                    <CardHeader className="p-0 relative overflow-hidden">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 flex-1 flex flex-col">
                      <CardTitle className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                        {post.title}
                      </CardTitle>

                      <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">{post.excerpt}</p>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 flex justify-between items-center text-sm text-muted-foreground">
                      <Badge variant="outline" className="bg-muted/50">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
