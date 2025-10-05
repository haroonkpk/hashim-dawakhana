"use client";
import { BlogCard } from "@/components/BlogCard";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Blog } from "@/types/blogs";

// data/blogs.ts
export const blogs: Blog[] = [
  {
    _id: "1",
    slug: "first-blog",
    title: "میرا پہلا بلاگ",
    image: "/finance.jpg",
    category: "نیکسٹ جے ایس",
    author: "ہارون",
    date: "۲۰۲۵-۰۹-۰۱",
    blocks: [
      { type: "heading", content: "مختلف" },
      {
        type: "paragraph",
        content: "یہ میرا پہلا بلاگ ہے جو نیکسٹ جے ایس پر بنا...",
      },
      {
        type: "image",
        content: { src: "/finance.jpg", alt: "فائنانس تصویر" },
      },
      {
        type: "table",
        content: {
          headers: ["نام", "قدر"],
          rows: [
            [
              "نیکسٹ جے ایس",
              "ر یکٹ فریم ورکیکٹ فریم ورکیکٹ فریم ورکیکٹ فریم ورک",
            ],
            ["ایس ای او", "آپٹیمائزیشن"],
          ],
        },
      },
    ],
  },
  {
    _id: "2",
    slug: "second-blog",
    title: "دوسرا بلاگ",
    image: "/Oil.jpg",
    category: "ایس ای او",
    author: "ہارون",
    date: "۲۰۲۵-۰۹-۰۵",
    blocks: [
      { type: "heading", content: "ایس ای او کی بنیادی باتیں" },
      {
        type: "paragraph",
        content: "یہ دوسرا بلاگ ہے جس میں ہم ایس ای او سیکھیں گے...",
      },
    ],
  },
  {
    _id: "3",
    slug: "third-blog",
    title: "تیسرا بلاگ",
    image: "/realestate.jpg",
    category: "ویب ڈویلپمنٹ",
    author: "ہارون",
    date: "۲۰۲۵-۰۹-۱۰",
    blocks: [
      { type: "heading", content: "نیکسٹ جے ایس کے تصورات" },
      {
        type: "paragraph",
        content: "یہ تیسرا بلاگ ہے جس میں ہم نیکسٹ جے ایس سمجھیں گے...",
      },
    ],
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
