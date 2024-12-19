import Link from 'next/link';
import { type Post } from '@/lib/blog';
import { Card } from '@/components/ui/card';

export function PostPreview({ post }: { post: Post }) {
  return (
    <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <Link 
          href={`/posts/${post.slug}`} 
          className="no-underline block group"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        <time dateTime={post.date} className="text-sm text-muted-foreground block mb-3 md:mb-4">
          {post.date}
        </time>
        <p className="text-base md:text-lg mb-4 leading-relaxed">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 md:gap-4 text-sm text-muted-foreground">
          <span>{post.readingTime}</span>
          <span className="hidden md:inline">•</span>
          <Link 
            href={`/categories/${post.category.toLowerCase()}`} 
            className="hover:text-primary transition-colors"
          >
            {post.category}
          </Link>
        </div>
      </article>
    </Card>
  );
}