"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Sidebar } from "@/components/Sidebar";
import { Blog } from "@/types/blogs";

// SEO metadata (client components me ye kaam nahi karta, lekin rehne do harmless hai)
export const metadata = {
  title: "تمام بلاگز - Hashim Dawakhana",
  description: "تمام مضامین اور بلاگز کی فہرست۔",
};

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">
        بلاگز لوڈ ہو رہے ہیں...
      </div>
    );

  if (error || blogs.length === 0)
    return <div className="text-center py-20">کوئی بلاگ نہیں ملا</div>;

  return (
    <section
      className="relative flex flex-col md:flex-row gap-8 py-15 md:py-20 px-6 md:mt-4 md:p-20"
      aria-labelledby="blogs-heading"
    >
      <h2 id="blogs-heading" className="sr-only">
        Latest Blogs
      </h2>

      <div>
        <div className="grid gap-10 sm:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>

      <Sidebar />
    </section>
  );
}
