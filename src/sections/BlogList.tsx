"use client";

import { BlogCard } from "@/components/BlogCard";
import { Sidebar } from "@/components/Sidebar";
import useSWR from "swr";
import { Blog } from "@/types/blogs";

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BlogSection() {
  // Using SWR for caching & revalidation
  const { data: blogs, error, isLoading } = useSWR<Blog[]>("/api/blogs", fetcher, {
    revalidateOnFocus: false,  
    dedupingInterval: 60000,  
  });

  // Loading state
  if (isLoading) {
    return (
      <section className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading blogs...</p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="flex justify-center items-center py-20">
        <p className="text-red-500 text-lg">Failed to load blogs. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col lg:flex-row gap-8 py-15 md:py-20 px-6 2xl:px-35 md:mt-4 md:p-20">
      
      {/* Blogs Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 flex-1">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No blogs found.
          </p>
        )}
      </div>

      {/* Sidebar */}
      <Sidebar />
    </section>
  );
}
