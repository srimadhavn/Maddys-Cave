"use client";

import { Post } from '@/lib/blog';
import { PostPreview } from '@/components/post-preview';

interface SearchResultsProps {
  results: Post[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  if (query.length < 2) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts found for "{query}"</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
      </h2>
      <div className="space-y-6">
        {results.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}