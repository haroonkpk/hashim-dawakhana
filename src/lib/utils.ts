export function generateSlug(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // letters & numbers from ANY language
    .replace(/\s+/g, "-"); // space -> dash
}
