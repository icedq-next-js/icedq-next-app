export const dynamic = "force-dynamic";

async function getPost(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.length ? data[0] : null;
}

export default async function PostPage({ params }) {
  const { postSlug } = await params; // ✅ FIX HERE

  const post = await getPost(postSlug);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}
