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
import { Search, Github, Linkedin, Mail, Rss } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  categories: string[];
  recentPosts: Post[];
  archives: { month: string; count: number }[];
  allPosts: Post[];
}

export function Sidebar({ categories, recentPosts, archives, allPosts }: SidebarProps) {
  const [email, setEmail] = useState("");
  const { query, setQuery, results, isSearching } = useSearch(allPosts);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your newsletter subscription logic here
      console.log('Subscribe:', email);
      setEmail("");
      // Show success toast
    } catch (error) {
      // Show error toast
      console.error('Subscription error:', error);
    }
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
    <div className="grid gap-6 animate-in fade-in slide-in-from-right duration-500">
    
      {/* About Me */}
      <Card className="p-4 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage src="https://github.com/Srimadhavn.png" alt="Avatar" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Srimadhavan G</h2>
            <p className="text-sm text-muted-foreground">Full Stack Developer</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          I'm a Full Stack Developer passionate about cloud technologies and building scalable applications. 
        </p>
        <div className="flex gap-2">
          {[
            { icon: Github, href: "https://github.com/Srimadhavn", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/srimadhavn/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
            { icon: Rss, href: "/feed.xml", label: "RSS" }
          ].map(({ icon: Icon, href, label }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              className="h-8 w-8 transition-colors hover:text-primary"
              asChild
            >
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="h-4 w-4" />
                <span className="sr-only">{label}</span>
              </a>
            </Button>
          ))}
        </div>
      </Card>

      {/* Categories */}
      <Card className="p-4 transition-all duration-200 hover:shadow-md">
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="grid gap-1">
          {categories.map((category) => (
            <Link key={category} href={`/categories/${category.toLowerCase()}`}>
              <Button
                variant="ghost"
                className="w-full justify-start text-sm font-normal hover:font-medium transition-all"
              >
                {category}
              </Button>
            </Link>
          ))}
        </div>
      </Card>

      {/* Recent Posts */}
      <Card className="p-4 transition-all duration-200 hover:shadow-md">
        <h3 className="font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-1">
          {recentPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              className="block group"
            >
              <Button
                variant="ghost"
                className="w-full justify-start p-2 h-auto text-sm font-normal group-hover:font-medium"
              >
                <span className="line-clamp-1">{post.title}</span>
              </Button>
            </Link>
          ))}
        </div>
      </Card>

       {/* Archives */}
       <Card className="p-4">
        <h3 className="font-semibold mb-4">Archives</h3>
        <div className="space-y-2">
          {archives.map(({ month, count }) => (
            <Link key={month} href={getArchiveLink(month)}>
              <Button variant="ghost" className="w-full justify-start">
                {month} ({count})
              </Button>
            </Link>
          ))}
        </div>
      </Card>

    </div>
  );
}