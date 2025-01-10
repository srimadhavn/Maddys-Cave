"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Post } from "@/lib/blog";
import { useSearch } from "@/lib/hooks/use-search";
import { SearchResults } from "@/components/search/search-results";
import { formatArchiveDate } from "@/lib/date-utils";
import { Search, Github, Linkedin } from "lucide-react";


interface SidebarProps {
  categories: string[];
  recentPosts: Post[];
  archives: { month: string; count: number }[];
  allPosts: Post[];
}

export function Sidebar({ categories, recentPosts, archives, allPosts }: SidebarProps) {
  const [email, setEmail] = useState("");
  const { query, setQuery, results, isSearching } = useSearch(allPosts);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
  };

  const getArchiveLink = (month: string) => {
    try {
      return `/archives/${formatArchiveDate(month)}`;
    } catch (error) {
      console.error('Error formatting archive date:', error);
      return '#';
    }
  };

  return (
    <div className="grid gap-6">
         {/* Search */}
         <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-8 text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {isSearching && (
            <div className="mt-4">
              <SearchResults results={results} query={query} />
            </div>
          )}
        </Card>

           {/* About Me */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-3">About Me</h2>
          <div className="prose prose-sm dark:prose-invert">
            <p className="text-sm text-muted-foreground leading-relaxed">
              I'm a Full Stack Developer passionate about cloud technologies and building scalable applications. 
              With expertise in modern web development and cloud architecture, I love creating efficient solutions 
              that make a difference.
            </p>
            <div className="flex gap-2 mt-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/Srimadhavn" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/srimadhavn/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </div>
          </div>
        </Card>

      {/* Categories */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
          {categories.map((category) => (
            <Link key={category} href={`/categories/${category.toLowerCase()}`}>
              <Button variant="ghost" className="w-full justify-start text-sm">
                {category}
              </Button>
            </Link>
          ))}
        </div>
      </Card>

      {/* Recent Posts */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-2">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <Button variant="link" className="w-full justify-start p-0 h-auto text-sm">
                {post.title}
              </Button>
            </Link>
          ))}
        </div>
      </Card>

      {/* Archives */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Archives</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
          {archives.map(({ month, count }) => (
            <Link key={month} href={getArchiveLink(month)}>
              <Button variant="ghost" className="w-full justify-start text-sm">
                {month} ({count})
              </Button>
            </Link>
          ))}
        </div>
      </Card>

      {/* Newsletter */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Newsletter</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Subscribe to get the latest posts delivered right to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Subscribe</Button>
        </form>
      </Card>
    </div>
  );
}