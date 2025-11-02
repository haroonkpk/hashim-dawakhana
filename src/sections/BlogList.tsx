"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Sidebar } from "@/components/Sidebar";
import { Blog } from "@/types/blogs";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchBlogs = async () => {
    try {
    
        const res = await fetch("/api/blogs", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch blogs")
        const data = await res.json();

        setBlogs(data);

    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    
    const interval = setInterval(fetchBlogs, 30000);

    return () => clearInterval(interval);
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
    <section className="relative flex flex-col md:flex-row gap-8 py-15 md:py-20 px-6 md:mt-4 md:p-20">
      <div className="grid gap-10 sm:grid-cols-2 2xl:grid-cols-3 flex-1">
        {blogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      <Sidebar />
    </section>
  );
}
