"use client";

import { BlogCard } from "@/components/BlogCard";
import { Blog } from "@/types/blogs";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { BookOpen } from "lucide-react";
import { LoadingCompo } from "@/components/ui/Loading";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: blogs, isLoading } = useSWR<Blog[]>(
    `/api/blogs/getBlogsByCategorySlug/${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  if (isLoading) {
    return <LoadingCompo />;
  }

  const firstBlog = (blogs && blogs[0]) || null;

  return (
    <div>
      {/*  Hero Section (First Blog) */}
      {firstBlog ? (
        <div className="relative w-full h-[30vh] sm:h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src={firstBlog.image || "/default.jpg"}
              alt={firstBlog.title}
              fill
              unoptimized
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Overlay Box */}
          <div
            className="absolute -bottom-16 md:-bottom-22 bg-[#389958] text-white px-6 py-5 lg:py-10 text-center sm:text-start 
              w-[90vw] lg:w-[85%]"
            dir="rtl"
            style={{ lineHeight: "1.6" }}
          >
            <h1 className="text-lg md:text-3xl capitalize">
              {firstBlog.title}
            </h1>
            <h3 className="mt-3 text-[12px] md:text-sm text-white/70 flex gap-2 md:gap-5 justify-center md:justify-start">
              <span>{firstBlog.author || "حکیم ہاشم دواخانہ"}</span>
              <span>
                {new Date(firstBlog.date).toLocaleDateString("ur-PK", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </h3>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 text-center px-6">
          <BookOpen size={60} className="text-emerald-600 mb-6" />
          <h2
            dir="rtl"
            className="text-2xl md:text-3xl font-semibold text-emerald-700"
          >
            معذرت! اس زمرے میں فی الحال کوئی بلاگ موجود نہیں ہے۔
          </h2>
          <p
            dir="rtl"
            className="mt-3 text-gray-600 text-sm md:text-base max-w-xl leading-relaxed"
          >
            ہماری ٹیم جلد ہی اس موضوع پر مفید تحریریں شامل کرے گی۔ براہ کرم بعد
            میں دوبارہ ملاحظہ فرمائیں۔
          </p>
        </div>
      )}

      {/*  Blogs Section */}
      <section className="w-full md:max-lg:w-[85%] relative flex flex-col lg:flex-row gap-8 py-25 md:py-32 2xl:px-35 px-6 md:mt-4 md:p-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 flex-1">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <div className="text-center col-span-full">
              <p
                dir="rtl"
                className="text-lg text-emerald-700 font-medium bg-emerald-50 py-4 px-6 rounded-lg shadow-sm inline-block"
              >
                اس زمرے میں فی الحال کوئی بلاگ دستیاب نہیں ہے۔
              </p>
            </div>
          )}
        </div>

        <Sidebar />
      </section>
    </div>
  );
}
