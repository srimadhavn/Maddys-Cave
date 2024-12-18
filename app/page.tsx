import { getAllPosts } from '@/lib/blog';
import { PostPreview } from '@/components/post-preview';
import { PageLayout } from '@/components/layout/page-layout';

export default function Home() {
  const posts = getAllPosts();

  return (
    <PageLayout>
      <div className="space-y-8">
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
    </PageLayout>
  );
}