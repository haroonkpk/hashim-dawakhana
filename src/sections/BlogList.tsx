"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Sidebar } from "@/components/Sidebar";
import { Blog } from "@/types/blogs";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true); 

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

 if (loading) {
    return 
  }

  return (
    <section className="relative flex flex-col md:flex-row gap-8 py-15 md:py-20 px-6 md:mt-4 md:p-20">
      <div className="grid gap-10 sm:grid-cols-2 2xl:grid-cols-3 flex-1">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No blogs found.
          </p>
        )}
      </div>
      <Sidebar />
    </section>
  );
}
