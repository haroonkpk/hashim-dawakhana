"use client";
import { BlogCard } from "@/components/BlogCard";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

// data/blogs.ts
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

export const BlogSection = () => {
  const [visible, setVisible] = useState(6);

  return (
    <section
      className="relative flex flex-col md:flex-row gap-8 py-15 md:py-20 px-6 md:mt-4 md:p-20"
      aria-labelledby="blogs-heading"
    >
      {/* SEO friendly heading */}
      <h2 id="blogs-heading" className="sr-only">
        Latest Blogs
      </h2>

      <div>
        <div className="grid gap-10 sm:grid-cols-2">
          {blogs.slice(0, visible).map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        {visible < blogs.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((prev) => prev + 6)}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-full shadow-lg hover:from-green-700 hover:to-emerald-600 transition"
            >
              مزید دیکھیں
            </button>
          </div>
        )}
      </div>
      <Sidebar />
    </section>
  );
};
