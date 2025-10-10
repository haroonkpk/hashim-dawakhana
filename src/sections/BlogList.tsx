"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Sidebar } from "@/components/Sidebar";
import { Blog } from "@/types/blogs";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem("blogs");
    const cachedTime = localStorage.getItem("blogsUpdatedAt");

    if (cached) {
      setBlogs(JSON.parse(cached));
      setLoading(false);
    }

    // checking and updating latest data in background 
    const checkAndFetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs/meta");
        const { updatedAt } = await res.json();

        if (!cached || cachedTime !== updatedAt) {
          const res2 = await fetch("/api/blogs");
          const data = await res2.json();
          localStorage.setItem("blogs", JSON.stringify(data));
          localStorage.setItem("blogsUpdatedAt", updatedAt);
          setBlogs(data);
        }
      } catch (err) {
        console.error(err);
        if (!cached) setError(true); 
      } finally {
        if (!cached) setLoading(false); 
      }
    };

    checkAndFetchBlogs();
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
    <section className="relative flex flex-col lg:flex-row gap-8 py-15 md:py-20 px-6 md:mt-4 md:p-20">
      <div className="grid gap-10 sm:grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
      <Sidebar />
    </section>
  );
}
