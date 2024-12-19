"use client";

import Markdown from 'markdown-to-jsx';
import { type Post } from '@/lib/blog';
import { Card } from '@/components/ui/card';

const MarkdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl font-bold mt-6 md:mt-8 mb-3 md:mb-4">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-4 md:mt-6 mb-2 md:mb-3">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 leading-relaxed text-base md:text-lg">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-base md:text-lg">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-base md:text-lg">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="ml-4">{children}</li>
  ),
};

export function PostContent({ post }: { post: Post }) {
  return (
    <Card className="p-4 md:p-8">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8 text-sm text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          <span className="hidden md:inline">•</span>
          <span>{post.readingTime}</span>
          <span className="hidden md:inline">•</span>
          <span>{post.category}</span>
        </div>
        <div className="mt-6 md:mt-8">
          <Markdown options={{ overrides: MarkdownComponents }}>
            {post.content}
          </Markdown>
        </div>
      </article>
    </Card>
  );
}