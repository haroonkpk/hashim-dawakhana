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
   const checkAndFetchBlogs = async () => {
     const cached = localStorage.getItem("blogs");
     const cachedTime = localStorage.getItem("blogsUpdatedAt");

     try {
       const res = await fetch("/api/blogs/meta"); 
       const { updatedAt } = await res.json();

       if (!cached || cachedTime !== updatedAt) {
         const res2 = await fetch("/api/blogs");
         const data = await res2.json();
         localStorage.setItem("blogs", JSON.stringify(data));
         localStorage.setItem("blogsUpdatedAt", updatedAt);
         setBlogs(data);
       } else {
         setBlogs(JSON.parse(cached));
       }
     } catch (err) {
       console.error(err);
       setError(true);
     } finally {
       setLoading(false);
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
    <section className="relative flex flex-col md:flex-row gap-8 py-15 md:py-20 px-6 md:mt-4 md:p-20">
      <div className="grid gap-10 sm:grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
      <Sidebar />
    </section>
  );
}
