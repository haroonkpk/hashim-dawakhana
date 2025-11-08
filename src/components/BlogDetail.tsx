import Image from "next/image";
import React from "react";
import { Sidebar } from "./Sidebar";
import { Blog } from "@/types/blogs";
import { BlogBlocks } from "./BlogBlocks";
import { formatDate } from "@/lib/dateFormatter";

interface BlogDetailProps {
  blog: Blog;
}

export default function BlogDetailSection({ blog }: BlogDetailProps) {
  console.log(blog);

  return (
    <div>
      <article>
        {/*  JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              description: blog.blocks
                .find((b) => b.type === "paragraph")
                ?.content.slice(0, 150), // SEO description from first paragraph
              image: `https://yourdomain.com${blog.image}`,
              author: {
                "@type": "Person",
                name: blog.author,
              },
              datePublished: blog.date,
            }),
          }}
        />

        {/* Banner Image */}
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
            className="absolute -bottom-16 md:-bottom-22 bg-[#389958] text-white px-6 py-5 lg:py-10 text-center sm:text-start 
             w-[90vw] lg:w-[85%]"
            dir="rtl"
            style={{ lineHeight: "1.6" }}
          >
            <h1 className="text-lg md:text-3xl">{blog.title}</h1>
            <h3 className="mt-3 text-[12px] md:text-sm text-white/70 flex gap-2 md:gap-5 justify-center md:justify-start">
              <span>{blog.category.name}</span>
              <span>{formatDate(blog.date)}</span>
            </h3>
          </div>
        </div>
      </article>

      {/* Blog Content */}
      <div className="w-full flex justify-center my-32 ">
        <div className="w-full max-w-[85%] gap-y-8 lg:justify-between flex flex-col lg:flex-row ">
          <BlogBlocks blogBlocks={blog} />

          {/* Sidebar */}

          <Sidebar />
        </div>
      </div>
    </div>
  );
}
