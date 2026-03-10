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

// Decode base64 encoded content
function decodeBase64(str) {
    try {
        const decoded = Buffer.from(str, 'base64').toString('utf-8');
        // Also URL-decode if needed
        return decodeURIComponent(decoded);
    } catch (e) {
        return str;
    }
}

function parseVCRow(content) {
    const rowRegex = /\[vc_row([^\]]*)\]([\s\S]*?)\[\/vc_row\]/g;
    const rows = [];
    let match;

    while ((match = rowRegex.exec(content)) !== null) {
        const attrs = match[1];
        const rowContent = match[2];

        // Parse attributes
        const bgColor = attrs.match(/bg_color_value=["']([^"']*)["']/)?.[1] || '';
        const css = attrs.match(/css=["']([^"']*)["']/)?.[1] || '';
        const fullWidth = attrs.includes('full_width="stretch_row"');

        // Parse columns
        const columns = parseVCColumns(rowContent);

        rows.push({
            type: 'vc_row',
            bgColor,
            css,
            fullWidth,
            columns
        });
    }

    return rows;
}

function parseVCColumns(content) {
    const columnRegex = /\[vc_column([^\]]*)\]([\s\S]*?)\[\/vc_column\]/g;
    const columns = [];
    let match;

    while ((match = columnRegex.exec(content)) !== null) {
        const attrs = match[1];
        const columnContent = match[2];

        // Parse width
        const width = attrs.match(/width=["']([^"']*)["']/)?.[1] || '1/1';
        const offset = attrs.match(/offset=["']([^"']*)["']/)?.[1] || '';
        const css = attrs.match(/css=["']([^"']*)["']/)?.[1] || '';
        const elClass = attrs.match(/el_class=["']([^"']*)["']/)?.[1] || '';

        // Parse column content
        const parsedContent = parseColumnContent(columnContent);

        columns.push({
            width,
            offset,
            css,
            elClass,
            content: parsedContent
        });
    }

    return columns;
}

function parseColumnContent(content) {
    const elements = [];

    // Parse vc_column_text
    const textRegex = /\[vc_column_text([^\]]*)\]([\s\S]*?)\[\/vc_column_text\]/g;
    let match;
    while ((match = textRegex.exec(content)) !== null) {
        const attrs = match[1];
        const text = match[2];
        const css = attrs.match(/css=["']([^"']*)["']/)?.[1] || '';
        const elClass = attrs.match(/el_class=["']([^"']*)["']/)?.[1] || '';

        elements.push({
            type: 'vc_column_text',
            css,
            elClass,
            content: text
        });
    }

    // Parse vc_single_image
    const imageRegex = /\[vc_single_image([^\]]*)\]/g;
    while ((match = imageRegex.exec(content)) !== null) {
        const attrs = match[1];
        const imageId = attrs.match(/image=["']([^"']*)["']/)?.[1];
        const imgSize = attrs.match(/img_size=["']([^"']*)["']/)?.[1] || 'full';
        const alignment = attrs.match(/alignment=["']([^"']*)["']/)?.[1] || 'center';
        const elClass = attrs.match(/el_class=["']([^"']*)["']/)?.[1] || '';

        if (imageId) {
            elements.push({
                type: 'vc_single_image',
                imageId,
                imgSize,
                alignment,
                elClass
            });
        }
    }

    // Parse vc_raw_html
    const rawHtmlRegex = /\[vc_raw_html\]([\s\S]*?)\[\/vc_raw_html\]/g;
    while ((match = rawHtmlRegex.exec(content)) !== null) {
        const encoded = match[1];
        const decoded = decodeBase64(encoded);

        elements.push({
            type: 'vc_raw_html',
            content: decoded
        });
    }

    // Parse ult_sticky_section
    const stickyRegex = /\[ult_sticky_section([^\]]*)\]([\s\S]*?)\[\/ult_sticky_section\]/g;
    while ((match = stickyRegex.exec(content)) !== null) {
        const attrs = match[1];
        const stickyContent = match[2];
        const stickyGutter = attrs.match(/sticky_gutter=["']([^"']*)["']/)?.[1] || '0';
        const elClass = attrs.match(/el_class=["']([^"']*)["']/)?.[1] || '';

        const parsedStickyContent = parseColumnContent(stickyContent);

        elements.push({
            type: 'ult_sticky_section',
            stickyGutter,
            elClass,
            content: parsedStickyContent
        });
    }

    // Parse vc_raw_js
    const rawJsRegex = /\[vc_raw_js\]([\s\S]*?)\[\/vc_raw_js\]/g;
    while ((match = rawJsRegex.exec(content)) !== null) {
        const encoded = match[1];
        const decoded = decodeBase64(encoded);

        elements.push({
            type: 'vc_raw_js',
            content: decoded
        });
    }

    // Parse gravityform
    const gfRegex = /\[gravityform([^\]]*)\]/g;
    while ((match = gfRegex.exec(content)) !== null) {
        const attrs = match[1];
        const id = attrs.match(/id=["']([^"']*)["']/)?.[1];

        if (id) {
            elements.push({
                type: 'gravityform',
                id
            });
        }
    }

    // Parse shortcode
    const scRegex = /\[sc([^\]]*)\]([\s\S]*?)\[\/sc\]/g;
    while ((match = scRegex.exec(content)) !== null) {
        const attrs = match[1];
        const scContent = match[2];
        const name = attrs.match(/name=["']([^"']*)["']/)?.[1];

        elements.push({
            type: 'shortcode',
            name,
            content: scContent
        });
    }

    return elements;
}

export function parseContent(html){
    const decoded = decodeHTMLEntities(html);
    const normalized = normalizeQuotes(decoded);

    const rows = parseVCRow(normalized);

    if (rows.length > 0) {
        return rows;
    }

    // Fallback to old parsing for backward compatibility
    const sections = [];
    
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