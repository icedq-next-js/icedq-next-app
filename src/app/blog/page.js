export const dynamic = "force-dynamic";

async function getPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Blog</h1>

      {posts.length === 0 && <p>No posts found.</p>}

      {posts.map(post => (
        <article key={post.id}>
          <a href={`/blog/${post.slug}`}>
            <h2
              dangerouslySetInnerHTML={{
                __html: post.title.rendered,
              }}
            />
          </a>
        </article>
      ))}
    </main>
  );
}
