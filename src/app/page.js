import https from 'https';

export const revalidate = 3600; // Revalidate every hour

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function getHomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/pages?slug=home`,
    { next: { revalidate: 3600 }, agent: httpsAgent }
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
