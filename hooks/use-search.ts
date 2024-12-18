"use client";

import { useState, useEffect } from 'react';
import { Post } from '@/lib/blog';
import { searchPosts } from '@/lib/search';
import { useDebounce } from './use-debounce';

export function useSearch(posts: Post[]) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      const searchResults = searchPosts(posts, debouncedQuery);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, posts]);

  return {
    query,
    setQuery,
    results,
    hasResults: results.length > 0,
    isSearching: query.length >= 2,
  };
}