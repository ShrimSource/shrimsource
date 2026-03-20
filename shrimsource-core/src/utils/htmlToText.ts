/**
 * A simple utility to convert HTML to text.
 * In a real-world scenario, you might want to use a library like 'html-to-text' or 'cheerio'.
 */
export function htmlToText(html: string): string {
    // Very basic tag stripping (not suitable for complex HTML)
    return html.replace(/<[^>]*>?/gm, '');
}
