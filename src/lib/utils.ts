// 🔥 helper function to create slug
export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")   // special chars hatao
    .replace(/\s+/g, "-");          // space -> dash
}