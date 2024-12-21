"use client";

import Markdown from 'markdown-to-jsx';
import { type Post } from '@/lib/blog';
import { Card } from '@/components/ui/card';
import { MarkdownComponents } from '@/lib/markdown-components';
import { BackButton } from '@/components/post/back-button';

export function PostContent({ post }: { post: Post }) {
  return (
    <>
      <Card className="p-4 md:p-8">
        <BackButton className="md:hidden mb-6" />
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-8 text-sm text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>{post.category}</span>
          </div>
          <div className="mt-8">
            <Markdown options={{ overrides: MarkdownComponents }}>
              {post.content}
            </Markdown>
          </div>
        </article>
      </Card>
    </>
  );
}