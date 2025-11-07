import { Metadata } from "next";
import BlogDetailSection from "@/components/BlogDetail";
import { Blog } from "@/types/blogs";

//  1 ghante baad page revalidate hoga
export const revalidate = 3600;

generateStaticParams();

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Expected array but got:", data);
      return [];
    }

    return data.map((b) => ({ slug: b.slug }));
  } catch (err) {
    console.error("Error in generateStaticParams:", err);
    return [];
  }
}

// SEO metadata for each blog
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/getBySlug/${slug}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    return { title: "Blog Not Found" };
  }

  const blog: Blog = await res.json();
  const firstParagraph =
    blog?.blocks?.find((b) => b.type === "paragraph")?.content || "";

  return {
    title: blog.title,
    description: firstParagraph.slice(0, 150),
    openGraph: {
      title: blog.title,
      description: firstParagraph.slice(0, 150),
      images: [`${process.env.NEXT_PUBLIC_BASE_URL}${blog.image}`],
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: firstParagraph.slice(0, 150),
      images: [`${process.env.NEXT_PUBLIC_BASE_URL}${blog.image}`],
    },
  };
}

// BlogDetail() main
export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/getBySlug/${params.slug}`,
    { next: { revalidate: 3600 } }
  );
 
  if (!res.ok) {
    return <div>Blog not found</div>;
  }

  const blog: Blog = await res.json();

  return <BlogDetailSection blog={blog} />;
}
