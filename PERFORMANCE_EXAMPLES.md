// Example: Creating a new optimized page with WordPress data

// 1. Add a new function to src/lib/wordpress.js for your data type:
export async function getTestimonials() {
  return fetchWithCache(
    `${API_URL}/testimonials?_fields=id,name,content,rating`,
    { next: { revalidate: 3600 } }
  );
}

// 2. Create your page file (e.g., src/app/testimonials/page.js):
import { getTestimonials } from '@/lib/wordpress';

export const revalidate = 3600; // ISR: Revalidate every hour

export const metadata = {
  title: 'Testimonials',
  description: 'See what our customers say about our data testing platform.',
};

async function loadTestimonials() {
  try {
    return await getTestimonials();
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await loadTestimonials();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Customer Testimonials</h1>

      {testimonials.length === 0 ? (
        <p className="text-gray-600">No testimonials available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex mb-4">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
              <p className="font-semibold text-gray-900">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// 3. For Dynamic Routes (e.g., case studies):
// File: src/app/case-studies/[caseSlug]/page.js

import { getCaseStudies, getCaseStudyBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const studies = await getCaseStudies();
    return studies.map(study => ({
      caseSlug: study.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { caseSlug } = await params;
    const studies = await getCaseStudyBySlug(caseSlug);
    const study = studies[0];

    if (!study) return {};

    return {
      title: study.title?.rendered,
      description: study.excerpt?.rendered?.replace(/<[^>]*>/g, ''),
    };
  } catch (error) {
    return {};
  }
}

export default async function CaseStudyPage({ params }) {
  const { caseSlug } = await params;

  try {
    const studies = await getCaseStudyBySlug(caseSlug);
    const study = studies[0];

    if (!study) notFound();

    return (
      <article className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">{study.title?.rendered}</h1>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: study.content.rendered }} 
        />
      </article>
    );
  } catch (error) {
    console.error('Failed to fetch case study:', error);
    notFound();
  }
}

// Performance Best Practices Checklist:

/*
✅ DO:
- Use revalidate = 3600 for ISR
- Implement generateStaticParams() for dynamic routes
- Implement generateMetadata() for SEO
- Use centralized API functions from lib/wordpress.js
- Add try-catch for error handling
- Use Link component for internal navigation
- Use next/image for images
- Filter WordPress API responses with _fields
- Implement proper loading and error states
- Use .catch() to handle promise rejections

❌ DON'T:
- Don't use force-dynamic for content pages
- Don't fetch without revalidate time
- Don't hardcode API URLs (use env variables)
- Don't fetch the same URL twice in one page
- Don't forget error handling
- Don't use <a> tags for internal links
- Don't import large libraries unless needed
- Don't fetch all fields from WordPress
- Don't make synchronous API calls in sequence (use Promise.all)
- Don't forget to update lib/wordpress.js for new endpoints
*/

// Parallel Fetch Optimization:
export default async function OptimizedPage() {
  // ✅ Good: Fetch multiple things in parallel
  const [posts, categories, featured] = await Promise.all([
    getPosts(),
    getCategories(),
    getFeaturedPost(),
  ]);

  // ❌ Bad: Sequential fetching (slower)
  // const posts = await getPosts();
  // const categories = await getCategories();
  // const featured = await getFeaturedPost();

  return (
    // Render with all data
  );
}
