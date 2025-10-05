import { Metadata } from "next";
import BlogDetailSection from "@/components/BlogDetail";
import { Blog } from "@/types/blogs";

// 🟢 Dummy data (DB ki jagah)
export const blogs: Blog[] = [
  {
    _id: "1",
    slug: "first-blog",
    title: "میرا پہلا بلاگ",
    image: "/finance.jpg",
    category: "نیکسٹ جے ایس",
    author: "ہارون",
    date: "۲۰۲۵-۰۹-۰۱",
    blocks: [
      { type: "heading", content: "مختلف" },
      {
        type: "paragraph",
        content: "یہ میرا پہلا بلاگ ہے جو نیکسٹ جے ایس پر بنا...",
      },
      {
        type: "image",
        content: { src: "/finance.jpg", alt: "فائنانس تصویر" },
      },
      {
        type: "table",
        content: {
          headers: ["نام", "قدر"],
          rows: [
            [
              "نیکسٹ جے ایس",
              "ر یکٹ فریم ورکیکٹ فریم ورکیکٹ فریم ورکیکٹ فریم ورک",
            ],
            ["ایس ای او", "آپٹیمائزیشن"],
          ],
        },
      },
    ],
  },
  {
    _id: "1",
    slug: "second-blog",
    title: "دوسرا بلاگ",
    image: "/Oil.jpg",
    category: "ایس ای او",
    author: "ہارون",
    date: "۲۰۲۵-۰۹-۰۵",
    blocks: [
      { type: "heading", content: "ایس ای او کی بنیادی باتیں" },
      {
        type: "paragraph",
        content: "یہ دوسرا بلاگ ہے جس میں ہم ایس ای او سیکھیں گے...",
      },
    ],
  },
  {
    _id: "1",
    slug: "third-blog",
    title: "تیسرا بلاگ",
    image: "/realestate.jpg",
    category: "ویب ڈویلپمنٹ",
    author: "ہارون",
    date: "۲۰۲۵-۰۹-۱۰",
    blocks: [
      { type: "heading", content: "نیکسٹ جے ایس کے تصورات" },
      {
        type: "paragraph",
        content: "یہ تیسرا بلاگ ہے جس میں ہم نیکسٹ جے ایس سمجھیں گے...",
      },
    ],
  },
];


//  Static paths (sab blogs ke slug build time per generate)
export async function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog does not exist.",
    };
  }

  // ✅ First paragraph ko description ke liye use karo
  const firstParagraph =
    blog.blocks.find((b) => b.type === "paragraph")?.content || "";

  return {
    title: blog.title,
    description: firstParagraph.slice(0, 150),
    alternates: {
      canonical: `https://yourdomain.com/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: firstParagraph.slice(0, 150),
      images: [`https://yourdomain.com${blog.image}`],
      type: "article",
      url: `https://yourdomain.com/blogs/${blog.slug}`,
      publishedTime: blog.date,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: firstParagraph.slice(0, 150),
      images: [`https://yourdomain.com${blog.image}`],
    },
    keywords: [blog.category, blog.title, "Next.js", "SEO", "Web Development"],
    authors: [{ name: blog.author }],
  };
}

// ISR (Incremental Static Regeneration) – 1 ghante baad refresh
export const revalidate = 3600;

// Blog Detail Page
export default function BlogDetail({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return <BlogDetailSection blog={blog} />;
}
