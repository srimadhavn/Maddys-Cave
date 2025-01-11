import Link from 'next/link'
import Image from 'next/image'
import { getSortedPostsData } from '@/lib/posts'
import { formatDistance } from 'date-fns'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const posts = await getSortedPostsData()
  const featuredPosts = posts.slice(0, 3)
  
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to Maddy's Cave
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          I love sharing what I learn by writing! 
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/blog">
              Explore Posts
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">View all posts →</Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardHeader className="p-0">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-lg transform group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
                  <span>{post.category}</span>
                  <time>
                    {formatDistance(new Date(post.date), new Date(), { addSuffix: true })}
                  </time>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}