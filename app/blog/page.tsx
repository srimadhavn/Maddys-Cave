import { getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogIndex() {
  const posts = getSortedPostsData()

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <p className='text-l text-muted-foreground text-center mb-9'>⚠️ Contents of the blog are updated in Data structures and node.js</p>

      <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-lg sm:max-w-none">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block group"
          >
            <article className="border rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
              {post.coverImage && (
                <div className="relative w-full h-[200px] sm:h-[250px]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-3 sm:p-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary line-clamp-2">
                  {post.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-2">
                  <span>{post.category}</span>
                  <span className="hidden sm:inline">•</span>
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
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