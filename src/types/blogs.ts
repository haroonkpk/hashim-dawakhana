// types/blog.ts
export type BlogBlockTypes =
  | { type: "heading"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "image"; content: { src: string; alt: string } }
  | { type: "table"; content: { headers: string[]; rows: string[][] } };

export interface Blog {
  _id:string,
  slug: string;
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
  blocks: BlogBlockTypes[];
}
