import Image from "next/image";
import React from "react";

type Blog = {
  slug: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
};

interface BlogDetailProps {
  blog: Blog;
}

export default function BlogDetailSection({ blog }: BlogDetailProps) {
  return (
    <article >
      {/* 🟢 JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.content.slice(0, 150),
            image: `https://yourdomain.com${blog.image}`,
            author: {
              "@type": "Person",
              name: blog.author,
            },
            datePublished: blog.date,
          }),
        }}
      />

      <div className="relative w-full h-[30vh] sm:h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Overlay Green Box */}
        <div
          className="absolute -bottom-16 md:-bottom-22  bg-[#389958] text-white px-6 py-5 lg:py-10 text-center sm:text-start 
             w-[90vw] md:w-[70%] lg:w-[70%]"
          dir="rtl"
          style={{ lineHeight: "1.6" }}
        >
          <h1 className="text-lg md:text-3xl  ">{blog.title}</h1>
          <h3 className="mt-3 text-[12px] md:text-sm text-white/70 flex gap-2 md:gap-5 justify-center md:justify-start ">
            <span>{blog.category}</span>
            <span>{blog.date}</span>
          </h3>
        </div>
      </div>

      <p>
        <b>Author:</b> {blog.author} | <b>Date:</b> {blog.date}
      </p>
      <p>
        <b>Category:</b> {blog.category}
      </p>

      <p className="mt-5">{blog.content}</p>
    </article>
  );
}
