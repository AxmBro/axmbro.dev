/** URL-safe slug from a section title (project TOC hashes). */
export function slugifySectionId(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
