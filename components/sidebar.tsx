"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { type Post } from "@/lib/blog";
import { useSearch } from "@/hooks/use-search";
import { SearchResults } from "@/components/search/search-results";

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
    const date = new Date(month);
    return `/archives/${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  return (
    <div className="grid gap-6">
      {/* Search */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search posts..." 
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {isSearching && (
          <Card className="p-4 absolute left-4 right-4 lg:relative lg:left-0 lg:right-0 z-50">
            <SearchResults results={results} query={query} />
          </Card>
        )}
      </div>

      {/* About Me */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://i.pinimg.com/736x/0b/9f/b1/0b9fb14a69f26ab63719f21803425875.jpg" />
          </Avatar>
          <div>
            <h3 className="font-semibold">Srimadhavan G</h3>
            <p className="text-sm text-muted-foreground">Tech Enthusiast</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Learning and Sharing knowledge through writing! 
           </p>
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