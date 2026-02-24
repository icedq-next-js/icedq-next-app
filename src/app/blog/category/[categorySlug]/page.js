export const dynamic = "force-dynamic";

async function getCategory(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/categories?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.length ? data[0] : null;
}

async function getPostsByCategory(categoryId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts?categories=${categoryId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function CategoryPage({ params }) {
  const category = await getCategory(params.categorySlug);

  if (!category) {
    return <h1>Category not found</h1>;
  }

  const posts = await getPostsByCategory(category.id);

  return (
    <main>
      <h1>{category.name}</h1>

      {posts.length === 0 && <p>No posts in this category.</p>}

      {posts.map(post => (
        <article key={post.id}>
          <a href={`/blog/${post.slug}`}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </a>
        </article>
      ))}
    </main>
  );
}
