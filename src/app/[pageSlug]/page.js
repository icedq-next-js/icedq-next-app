import { getPage, stripShortcodes, getAttachment } from "@/lib/wordpress"
import { parseContent } from "@/lib/parser"

import ImageTextSection from "@/components/ImageTextSection"
import { notFound } from 'next/navigation'

export default async function Page({ params }) {
  const { pageSlug } = await params;

  let page;
  try {
    page = await getPage(pageSlug)
  } catch (error) {
    console.error(error);
    notFound();
  }

  const sections = parseContent(page.content.rendered)
  console.log('Raw content:', page.content.rendered.substring(0, 500));
  console.log('Parsed sections:', JSON.stringify(sections, null, 2));
  const hasShortcodes = page.content.rendered.includes('[')
  
  // Process sections to fetch actual images
  const processedSections = await Promise.all(sections.map(async (section) => {
    if (section.type === "two-column" && section.columns) {
      const leftColumn = section.columns[0] || '';
      const rightColumn = section.columns[1] || '';
      
      // Check if left column has image ID
      const imageIdMatch = leftColumn.match(/Image ID: (\d+)/);
      let leftHTML = leftColumn;
      
      if (imageIdMatch) {
        try {
          const imageId = imageIdMatch[1];
          console.log(`Fetching image ${imageId}...`);
          const attachment = await getAttachment(imageId);
          console.log(`Attachment data:`, attachment);
          
          // Extract image URL from various possible locations
          const imageUrl = attachment.source_url 
            || attachment.guid?.rendered
            || attachment.media_details?.sizes?.full?.source_url
            || attachment.media_details?.sizes?.large?.source_url
            || '';
          
          console.log(`Image URL for ${imageId}:`, imageUrl);
          
          if (imageUrl) {
            leftHTML = `<img src="${imageUrl}" alt="${attachment.alt_text || 'Content Image'}" style="max-width: 100%; height: auto; display: block;" />`;
          } else {
            leftHTML = `<div style="background: #fee; padding: 20px; text-align: center; color: red;">No image URL found for ID: ${imageId}</div>`;
          }
        } catch (error) {
          console.error(`Failed to fetch image ${imageIdMatch[1]}:`, error.message);
          leftHTML = `<div style="background: #fee; padding: 20px; text-align: center; color: red;">Error loading image: ${error.message}</div>`;
        }
      }
      
      return {
        type: "two-column",
        columns: [leftHTML, rightColumn]
      };
    }
    return section;
  }));
  
  const content = hasShortcodes ? stripShortcodes(page.content.rendered) : page.content.rendered

  return (

    <main style={{ padding: '20px' }}>
      {/* If we have structured sections, render them */}
      {processedSections.length > 0 ? (
        processedSections.map((section, index) => {
          if (section.type === "two-column") {
            return (
              <ImageTextSection
                key={index}
                left={section.columns[0]}
                right={section.columns[1]}
              />
            )
          }
          return null;
        })
      ) : (
        /* Fallback: render stripped shortcode content */
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </main>

  )
}