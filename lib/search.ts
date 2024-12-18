import { Post } from './blog';

export function searchPosts(posts: Post[], query: string): Post[] {
  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
  
  if (searchTerms.length === 0) return [];

  return posts.filter(post => {
    const searchableText = `
      ${post.title}
      ${post.excerpt}
      ${post.content}
      ${post.category}
    `.toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}