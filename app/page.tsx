import { getAllPosts } from '@/lib/blog';
import { PostPreview } from '@/components/post-preview';
import { PageLayout } from '@/components/layout/page-layout';
import { FeaturedPost } from '@/components/featured-post';

export default function Home() {
  const posts = getAllPosts();
  const featuredPost = posts[0]; // Most recent post as featured
  const regularPosts = posts.slice(1);

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Featured Post */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
          <FeaturedPost post={featuredPost} />
        </section>

        {/* Latest Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
            {regularPosts.map((post) => (
              <PostPreview key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}