"use client";

import Link from 'next/link';
import { type Post } from '@/lib/blog';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Tag } from 'lucide-react';

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Link 
            href={`/posts/${post.slug}`}
            className="block group"
          >
            <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <Link 
                href={`/categories/${post.category.toLowerCase()}`}
                className="hover:text-primary transition-colors"
              >
                {post.category}
              </Link>
            </div>
          </div>
        </div>

        <p className="text-lg leading-relaxed">{post.excerpt}</p>
        
        <Link 
          href={`/posts/${post.slug}`}
          className="inline-block text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Read more →
        </Link>
      </div>
    </Card>
  );
}