import Image from "next/image";
import React from "react";
import { Sidebar } from "./Sidebar";
import { Blog } from "@/types/blogs";

interface BlogDetailProps {
  blog: Blog;
}

export default function BlogDetailSection({ blog }: BlogDetailProps) {
  return (
    <div>
      <article>
        {/* 🟢 JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              description: blog.blocks
                .find((b) => b.type === "paragraph")
                ?.content.slice(0, 150), // ✅ SEO description from first paragraph
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
              <span>{blog.category}</span>
              <span>{blog.date}</span>
            </h3>
          </div>
        </div>
      </article>

      {/* Blog Content */}
      <div className="w-full flex justify-center my-32 ">
        <div className="w-full max-w-[85%] gap-y-8 sm:justify-between flex flex-col sm:flex-row ">
          <article className="prose prose-lg max-w-none flex flex-col gap-10 prose-headings:font-bold prose-headings:text-3xl prose-p:text-gray-700 dark:prose-invert">
            {blog.blocks.map((block, index) => {
              switch (block.type) {
                // 🟢 Heading
                case "heading":
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-extrabold text-[#389958]"
                    >
                      {block.content}
                    </h2>
                  );

                // 🟢 Paragraph
                case "paragraph":
                  return (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-gray-800 dark:text-gray-300"
                    >
                      {block.content}
                    </p>
                  );

                // 🟢 Image
                case "image":
                  return (
                    <div key={index} className="overflow-hidden ">
                      <img
                        src={block.content.src}
                        alt={block.content.alt}
                        className="w-full max-w-3xl"
                      />
                      <p className="text-sm text-center text-gray-500 dark:text-gray-400 p-2">
                        {block.content.alt}
                      </p>
                    </div>
                  );

                // 🟢 Table
                case "table":
                  return (
                    <div
                      key={index}
                      className="overflow-x-auto "
                    >
                      <table className="w-full text-right">
                        <thead className="border border-green-200 bg-gradient-to-r from-[#48c772] to-[#389958] text-white">
                          <tr>
                            {block.content.headers.map(
                              (h: string, i: number) => (
                                <th
                                  key={i}
                                  className="px-6 py-3 text-lg font-semibold tracking-wide"
                                >
                                  {h}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {block.content.rows.map(
                            (row: string[], r: number) => (
                              <tr key={r}>
                                {row.map((cell, c) => (
                                  <td
                                    key={c}
                                    className="px-6 py-4 text-gray-700 border border-green-200"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </article>

          {/* Sidebar */}
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
