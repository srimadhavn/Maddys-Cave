import { getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogIndex() {
  const posts = getSortedPostsData()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block group"
          >
            <article className="border rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
              {post.coverImage && (
                <div className="relative w-full h-[200px]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary">
                  {post.title}
                </h2>
                <div className="flex items-center gap-4 text-muted-foreground mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                </div>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}