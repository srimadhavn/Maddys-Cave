import { getPostsByCategory, getCategories } from '@/lib/blog';
import { PostPreview } from '@/components/post-preview';
import { PageLayout } from '@/components/layout/page-layout';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const decodedCategory = decodeURIComponent(params.category);
  const posts = getPostsByCategory(decodedCategory);

  if (!posts.length) {
    notFound();
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        <h2 className="text-3xl font-bold mb-8">Category: {decodedCategory}</h2>
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </PageLayout>
  );
}