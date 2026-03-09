import https from 'https';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export async function getPage(slug) {
    const res = await fetch(
       `${process.env.NEXT_PUBLIC_WP_API}/pages?slug=${slug}&_embed`,
       {
            next: { revalidate: 60},
            agent: httpsAgent
       } 
    )
    if (!res.ok) {
        throw new Error(`Failed to fetch page: ${res.status}`);
    }
    const data = await res.json()
    if (!data || data.length === 0) {
        throw new Error('Page not found');
    }
    return data[0]
}

export async function getAttachment(id) {
    try {
        const res = await fetch(
           `${process.env.NEXT_PUBLIC_WP_API}/media/${id}`,
           {
                next: { revalidate: 3600 },
                agent: httpsAgent
           }
        )
        if (!res.ok) {
            console.error(`Media API returned ${res.status} for media/${id}`);
            throw new Error(`Failed to fetch attachment: ${res.status}`);
        }
        const data = await res.json()
        console.log(`Successfully fetched media/${id}:`, data);
        return data;
    } catch (error) {
        console.error(`Error fetching attachment ${id}:`, error);
        throw error;
    }
}

export function stripShortcodes(html) {
    // Remove WordPress shortcodes [tag]...[/tag]
    return html.replace(/\[\/?[^\]]+\]/g, '');
}

export async function getPosts(page = 1, perPage = 20) {
    const res = await fetch(
       `${process.env.NEXT_PUBLIC_WP_API}/posts?page=${page}&per_page=${perPage}`,
       {
            next: { revalidate: 3600 },
            agent: httpsAgent
       }
    )
    if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.status}`);
    }
    const data = await res.json()
    return Array.isArray(data) ? data : [];
}