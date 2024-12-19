import { ThemeToggle } from "@/components/theme-toggle";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import Link from "next/link";

interface HeaderProps {
  categories: string[];
  recentPosts: any[];
  archives: { month: string; count: number }[];
  allPosts: any[];
}

export function Header({ categories, recentPosts, archives, allPosts }: HeaderProps) {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 h-14 flex justify-between items-center gap-4">
        <Link href="/" className="text-xl md:text-2xl font-bold hover:text-primary transition-colors">
      Maddy's Cave
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileSidebar
            categories={categories}
            recentPosts={recentPosts}
            archives={archives}
            allPosts={allPosts}
          />
        </div>
      </div>
    </header>
  );
}