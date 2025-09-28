import Image from "next/image";
import React from "react";
import { Sidebar } from "./Sidebar";

type HeadingBlock = {
  type: "heading";
  content: string;
};

type ParagraphBlock = {
  type: "paragraph";
  content: string;
};

type ImageBlock = {
  type: "image";
  content: {
    src: string;
    alt: string;
  };
};

type TableBlock = {
  type: "table";
  content: {
    headers: string[];
    rows: string[][];
  };
};

type BlogBlock = HeadingBlock | ParagraphBlock | ImageBlock | TableBlock;

type Blog = {
  slug: string;
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
  blocks: BlogBlock[];
};

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
             w-[90vw] md:w-[70%] lg:w-[70%]"
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
      <div className="w-full flex gap-8 p-10 mt-20 flex-col sm:flex-row ">
        <article className="prose max-w-none flex flex-col gap-8">
          {blog.blocks.map((block, index) => {
            switch (block.type) {
              case "heading":
                return <h2 key={index}>{block.content}</h2>;
              case "paragraph":
                return <p key={index}>{block.content}</p>;
              case "image":
                return (
                  <img
                    key={index}
                    src={block.content.src}
                    alt={block.content.alt}
                    className="w-full max-w-3xl"
                  />
                );
              case "table":
                return (
                  <table key={index} className="border">
                    <thead>
                      <tr>
                        {block.content.headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.content.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (
                            <td key={c}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
  );
}
