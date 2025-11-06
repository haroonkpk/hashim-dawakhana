"use client";

import { BlogCard } from "@/components/BlogCard";
import { Sidebar } from "@/components/Sidebar";
import { Blog } from "@/types/blogs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
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
    return;
  }
  return (
    <div>
      {/* Banner Image */}
      <div className="relative w-full h-[30vh] sm:h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/Oil.jpg"
            alt="oil"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Overlay Green Box */}
        <div
          className="absolute -bottom-16 md:-bottom-22 bg-[#389958] text-white px-6 py-5 lg:py-10 text-center sm:text-start 
             w-[90vw] lg:w-[85%]"
          dir="rtl"
          style={{ lineHeight: "1.6" }}
        >
          <h1 className="text-lg md:text-3xl">title</h1>
          <h3 className="mt-3 text-[12px] md:text-sm text-white/70 flex gap-2 md:gap-5 justify-center md:justify-start">
            <span>jsdfijiasf </span>
            <span>j fja</span>
          </h3>
        </div>
      </div>

      <section className="relative flex flex-col lg:flex-row gap-8 py-15 md:py-20 px-6 md:mt-4 md:p-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 flex-1">
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
    </div>
  );
}
