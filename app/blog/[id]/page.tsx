import { getPostData, getAllPostIds } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map(path => ({
    id: path.params.id
  }))
}

export default async function Post({ params }: { params: { id: string } }) {
  try {
    const post = await getPostData(params.id)

     return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/1] mb-6">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <span>{post.category}</span>
            <span>•</span>
            <time>{new Date(post.date).toLocaleDateString()}</time>
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