import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';

export const revalidate = 3600; // ISR: Revalidate every hour

export const metadata = {
  title: 'Blog - Data Testing & Monitoring',
  description: 'Latest articles on data testing, ETL testing, and data observability.',
};

async function getBlogPosts() {
  try {
    const posts = await getPosts(1, 20);
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found.</p>
      ) : (
        <div className="grid gap-8">
          {posts.map(post => (
            <article
              key={post.id}
              className="border-b pb-8 hover:shadow-sm transition-shadow"
            >
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title?.rendered || 'Untitled'}
                </h2>
              </Link>

              {post.excerpt && (
                <div
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
                  }}
                />
              )}

              <div className="flex items-center text-sm text-gray-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
