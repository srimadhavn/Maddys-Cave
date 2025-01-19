import { getPostData, getAllPostIds } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ShareButton from '@/components/ShareButton'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map(path => ({
    id: path.params.id
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const post = await getPostData(params.id)
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.coverImage }],
      },
    }
  } catch {
    return {
      title: 'Post not found',
    }
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  try {
    const post = await getPostData(params.id)
    const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.id}`
    const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    })

    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/1] mb-6">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{post.category}</span>
              <span>•</span>
              <time>{formattedDate}</time>
            </div>
            <ShareButton url={postUrl} title={post.title} />
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
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
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
}

