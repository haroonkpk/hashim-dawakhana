"use client";

import { useState, useEffect } from "react";
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
import { BlogPreview } from "./BlogPreview";
import { Blog } from "@/types/blogs";

export default function ContentForm() {
  const [selectedBlock, setSelectedBlock] = useState<string>("heading");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleBlogUpdate = (updatedBlog: Blog) => {
    setSelectedBlog(updatedBlog);
    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
    );
  };

  const renderForm = (_id: string | undefined) => {
    if (!_id)
      return (
        <p className="text-center text-gray-600 font-medium">
          براہ کرم کوئی بلاگ منتخب کریں
        </p>
      );

    switch (selectedBlock) {
      case "heading":
        return <Heading Id={_id} onBlogUpdate={handleBlogUpdate} />;
      case "paragraph":
        return <Paragraph Id={_id} onBlogUpdate={handleBlogUpdate} />;
      case "image":
        return <ImageUpload Id={_id} onBlogUpdate={handleBlogUpdate} />;
      case "table":
        return <TableBlock Id={_id} onBlogUpdate={handleBlogUpdate} />;
      default:
        return <p>کوئی بلاک منتخب کریں</p>;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        بلاگز لوڈ ہو رہے ہیں...
      </div>
    );

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10">
      {/* Container Box */}
      <div className="w-full max-w-2xl rounded-2xl shadow-sm border border-gray-100">
        {/* Green Top Navbar */}
        <div
          style={{ boxShadow: "0 8px 20px rgba(22,163,74,0.2)" }}
          className="bg-[#389958] text-white flex justify-between items-center py-5 px-6 gap-6 rounded-t-2xl relative"
        >
          {/* Left Side Icons */}
          <div className="flex gap-4">
            <button
              className={`p-3 rounded-full transition ${
                selectedBlock === "heading"
                  ? "bg-gray-100/90 text-[#389958]"
                  : "hover:bg-white/20"
              }`}
              onClick={() => setSelectedBlock("heading")}
            >
              <Type size={22} />
            </button>

            <button
              className={`p-3 rounded-full transition ${
                selectedBlock === "paragraph"
                  ? "bg-gray-100/90 text-[#389958]"
                  : "hover:bg-white/20"
              }`}
              onClick={() => setSelectedBlock("paragraph")}
            >
              <FileText size={22} />
            </button>

            <button
              className={`p-3 rounded-full transition ${
                selectedBlock === "image"
                  ? "bg-gray-100/90 text-[#389958]"
                  : "hover:bg-white/20"
              }`}
              onClick={() => setSelectedBlock("image")}
            >
              <ImageIcon size={22} />
            </button>

            <button
              className={`p-3 rounded-full transition ${
                selectedBlock === "table"
                  ? "bg-gray-100/90 text-[#389958]"
                  : "hover:bg-white/20"
              }`}
              onClick={() => setSelectedBlock("table")}
            >
              <TableIcon size={22} />
            </button>
          </div>

          {/* Dropdown (Right Side) */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-6 py-4 rounded-lg"
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
                <span>بلاگ منتخب کریں</span>
              )}
              <ChevronDown size={18} />
            </button>

            {openDropdown && (
              <div className="absolute top-[110%] right-0 bg-white text-[#389958] rounded-md shadow-lg w-64 z-20 overflow-hidden">
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

        {/* White Content Box */}
        <div className=" bg-white p-8 space-y-10 rounded-b-2xl" dir="rtl">
          {/* Editor Section */}
          <div className="w-full">{renderForm(selectedBlog?._id)}</div>

          {/* Divider */}
          <hr className="mt-20 border-1 border-dashed border-green-600" />

          {/* Preview Section */}
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              بلاگ کا پری ویو
            </h3>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <BlogPreview blog={selectedBlog} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
