"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/Admin/inputs/Image";
import { Table as TableBlock } from "@/components/Admin/inputs/Table";
import { Paragraph } from "@/components/Admin/inputs/Paragraph";
import { Heading } from "@/components/Admin/inputs/Heading";
import {
  Type,
  FileText,
  Image as ImageIcon,
  Table as TableIcon,
  ChevronDown,
} from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  image: string;
}

export default function ContentForm() {
  const [selectedBlock, setSelectedBlock] = useState<string>("heading");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const blogs: Blog[] = [
    {
      _id: "1",
      title: "Nature Blog",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&q=80",
    },
    {
      _id: "2",
      title: "Tech Trends",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&q=80",
    },
    {
      _id: "3",
      title: "Travel Diaries",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=80",
    },
  ];

  // 👇 ab slug simple string hai, object nahi
  const renderForm = (slug: string | undefined) => {
    if (!slug) return <p>براہ کرم کوئی بلاگ منتخب کریں</p>;

    switch (selectedBlock) {
      case "heading":
        return <Heading slug={slug} />;
      case "paragraph":
        return <Paragraph slug={slug} />;
      case "image":
        return <ImageUpload slug={slug} />;
      case "table":
        return <TableBlock slug={slug} />;
      default:
        return <p>کوئی بلاک منتخب کریں</p>;
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-20">
      {/* top bar */}
      <div className="w-full flex justify-center-safe gap-x-2 relative">
        {/* buttons */}
        <div
          style={{ boxShadow: "0 8px 20px rgba(22,163,74,0.2)" }}
          className="bg-[#389958] text-white flex justify-center items-center py-6 px-10 gap-6 rounded-r-2xl"
        >
          <button
            className={`p-3 rounded-full ${
              selectedBlock === "heading"
                ? "bg-gray-100/90 text-[#389958]"
                : "hover:bg-white/20"
            }`}
            onClick={() => setSelectedBlock("heading")}
          >
            <Type size={20} />
          </button>

          <button
            className={`p-3 rounded-full ${
              selectedBlock === "paragraph"
                ? "bg-gray-100/90 text-[#389958]"
                : "hover:bg-white/20"
            }`}
            onClick={() => setSelectedBlock("paragraph")}
          >
            <FileText size={20} />
          </button>

          <button
            className={`p-3 rounded-full ${
              selectedBlock === "image"
                ? "bg-gray-100/90 text-[#389958]"
                : "hover:bg-white/20"
            }`}
            onClick={() => setSelectedBlock("image")}
          >
            <ImageIcon size={20} />
          </button>

          <button
            className={`p-3 rounded-full ${
              selectedBlock === "table"
                ? "bg-gray-100/90 text-[#389958]"
                : "hover:bg-white/20"
            }`}
            onClick={() => setSelectedBlock("table")}
          >
            <TableIcon size={20} />
          </button>
        </div>

        {/* custom dropdown */}
        <div className="bg-[#389958] text-white flex items-center py-6 px-8 gap-3 rounded-l-2xl relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-md hover:bg-white/10 transition"
          >
            {selectedBlog ? (
              <>
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{selectedBlog.title}</span>
              </>
            ) : (
              <span>Select blog</span>
            )}
            <ChevronDown size={18} />
          </button>

          {openDropdown && (
            <div className="absolute top-[85%] right-0 bg-white text-[#389958] rounded-md shadow-lg w-56 z-20">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => {
                    setSelectedBlog(blog);
                    setOpenDropdown(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#e5f6eb] cursor-pointer transition"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-8 h-8 rounded-md object-cover"
                  />
                  <span>{blog.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* main content */}
      <div
        className="w-2xl bg-white rounded-xl p-6 space-y-6"
        style={{ boxShadow: "0 8px 20px rgba(22,163,74,0.2)" }}
      >
        {renderForm(selectedBlog?.title)}
      </div>
    </div>
  );
}
