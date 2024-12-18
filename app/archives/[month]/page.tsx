import { getAllPosts } from '@/lib/blog';
import { PostPreview } from '@/components/post-preview';
import { PageLayout } from '@/components/layout/page-layout';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const posts = getAllPosts();
  const months = new Set(
    posts.map((post) => {
      const date = new Date(post.date);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    })
  );
  
  return Array.from(months).map((month) => ({ month }));
}

export default function ArchivePage({ params }: { params: { month: string } }) {
  const [year, month] = params.month.split('-').map(Number);
  const posts = getAllPosts().filter((post) => {
    const postDate = new Date(post.date);
    return (
      postDate.getFullYear() === year &&
      postDate.getMonth() === month - 1
    );
  });

  if (!posts.length) {
    notFound();
  }

  const monthName = new Date(year, month - 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <PageLayout>
      <div className="space-y-8">
        <h2 className="text-3xl font-bold mb-8">Archive: {monthName}</h2>
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </PageLayout>
  );
}