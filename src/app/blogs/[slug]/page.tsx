import { Metadata } from "next";
import BlogDetailSection from "@/components/BlogDetail";

// 🟢 Dummy data (DB ki jagah)
export const blogs = [
  {
    slug: "first-blog",
    title: "Mera Pehla Blog",
    content: "Ye mera pehla blog hy jo Next.js per bana...",
    image: "/finance.jpg",
    category: "Next.js",
    author: "Haroon",
    date: "2025-09-01",
  },
  {
    slug: "second-blog",
    title: "Dusra Blog",
    content: "Ye dusra blog hy jisme hum SEO seekhenge...",
    image: "/Oil.jpg",
    category: "SEO",
    author: "Haroon",
    date: "2025-09-05",
  },
  {
    slug: "third-blog",
    title: "Teesra Blog",
    content: "Ye teesra blog hy jisme hum Next.js samjhenge...",
    image: "/realestate.jpg",
    category: "Web Dev",
    author: "Haroon",
    date: "2025-09-10",
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

  return {
    title: blog.title,
    description: blog.content.slice(0, 150),
    alternates: {
      canonical: `https://yourdomain.com/blogs/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 150),
      images: [`https://yourdomain.com${blog.image}`],
      type: "article",
      url: `https://yourdomain.com/blogs/${blog.slug}`,
      publishedTime: blog.date,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.content.slice(0, 150),
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

  return <BlogDetailSection  blog={blog}/>;
}


{/* <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.content.slice(0, 150),
      image: `https://yourdomain.com${blog.image}`,
      author: {
        "@type": "Person",
        name: blog.author,
      },
      datePublished: blog.date,
    }),
  }}
/>; */}