export const dynamic = "force-dynamic";

async function getPage(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/pages?slug=${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.length ? data[0] : null;
}

export default async function Page({ params }) {
  const page = await getPage(params.pageSlug);

  if (!page) {
    return <h1>Page not found</h1>;
  }

  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </article>
  );
}
