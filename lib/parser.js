import {load} from "cheerio"

// Decode HTML entities
function decodeHTMLEntities(str) {
    return str
        .replace(/&#8221;/g, '"')  // right quote
        .replace(/&#8220;/g, '"')  // left quote
        .replace(/&#8243;/g, '"')  // another quote variant
        .replace(/&#8242;/g, "'")  // apostrophe
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
}

// Normalize quotes to standard straight quotes
function normalizeQuotes(str) {
    return str
        .replace(/[""]/g, '"')  // Replace fancy quotes with straight quotes
        .replace(/['']/g, "'")  // Replace fancy apostrophes
}

export function parseContent(html){
    const sections = []
    
    // First decode HTML entities
    const decoded = decodeHTMLEntities(html);
    console.log('Decoded content (first 300 chars):', decoded.substring(0, 300));
    
    const normalized = normalizeQuotes(decoded);

    // If shortcodes found, parse them directly
    if (normalized.includes('[vc_row]')) {
        const rowRegex = /\[vc_row\]([\s\S]*?)\[\/vc_row\]/g;
        let rowMatch;
        
        while ((rowMatch = rowRegex.exec(normalized)) !== null) {
            const rowContent = rowMatch[1];
            console.log('Row content (first 300 chars):', rowContent.substring(0, 300));
            
            // Extract image ID - should work now that entities are decoded
            const imageMatch = rowContent.match(/image=["'](\d+)["']/);
            console.log('Image match:', imageMatch);
            
            // Extract text from [vc_column_text]...[/vc_column_text]
            const textMatch = rowContent.match(/\[vc_column_text\]([\s\S]*?)\[\/vc_column_text\]/);
            console.log('Text match found:', !!textMatch);
            
            let leftColumn = '';
            let rightColumn = '';
            
            // Create image placeholder with ID
            if (imageMatch) {
                const imageId = imageMatch[1];
                console.log('Found image ID:', imageId);
                leftColumn = `<div style="background: #f0f0f0; padding: 20px; text-align: center; min-height: 300px; display: flex; align-items: center; justify-content: center;">
                  <div>
                    <p style="margin: 0 0 10px 0; color: #666;">Image ID: ${imageId}</p>
                    <p style="margin: 0; color: #999; font-size: 12px;">Loading image...</p>
                  </div>
                </div>`;
            }
            
            // Extract text content
            if (textMatch) {
                rightColumn = textMatch[1].trim();
                console.log('Extracted text:', rightColumn.substring(0, 100));
            }
            
            // Add section if we have content
            if (leftColumn || rightColumn) {
                sections.push({
                    type: "two-column",
                    columns: [leftColumn, rightColumn]
                });
            }
        }
    }
    
    // Fallback: check for CSS classes if no shortcodes parsed
    if (sections.length === 0 && html.includes('vc_row')) {
        const $ = load(html);
        
        $(".vc_row").each((i, row) => {
            const columns = [];
            $(row).find(".wpb_column").each((i, col) => {
                columns.push($(col).html());
            });
            
            if (columns.length > 0) {
                sections.push({
                    type: "two-column",
                    columns: columns
                });
            }
        });
    }
    
    return sections;
}