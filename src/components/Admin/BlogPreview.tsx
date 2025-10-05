import React from "react";
import { Blog } from "../../types/blogs";
import { BlogBlocks } from "../BlogBlocks";

interface BlogPreviewProps {
  blog: Blog | null;
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({ blog }) => {
  if (!blog) {
    return (
      <div className="bg-gray-50 p-6 rounded-xl text-center text-gray-500">
        کوئی بلاگ منتخب کریں تاکہ پری ویو دیکھا جا سکے۔
      </div>
    );
  }

  return <BlogBlocks blogBlocks={blog} />;
};
