import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/sidebar";
import { getAllPosts, getCategories, getArchives } from "@/lib/blog";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const posts = getAllPosts();
  const categories = getCategories();
  const archives = getArchives();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {children}
          </div>
          <Sidebar
            categories={categories}
            recentPosts={posts.slice(0, 3)}
            archives={archives}
            allPosts={posts}
          />
        </div>
      </main>
    </div>
  );
}