export const dynamic = "force-dynamic";

async function getHomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/pages?slug=home`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.length ? data[0] : null;
}

export default async function Home() {

  const page = await getHomePage();

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <main
      dangerouslySetInnerHTML={{
        __html: page?.content_full || ""
      }}
    />
  );
}
