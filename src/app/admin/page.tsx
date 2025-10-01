"use client";

import { useState } from "react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("category");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4 space-y-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setActiveTab("category")}
              className={`block w-full text-left p-2 rounded ${
                activeTab === "category" ? "bg-blue-700" : ""
              }`}
            >
              Create Category
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("blog")}
              className={`block w-full text-left p-2 rounded ${
                activeTab === "blog" ? "bg-blue-700" : ""
              }`}
            >
              Create Blog
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("content")}
              className={`block w-full text-left p-2 rounded ${
                activeTab === "content" ? "bg-blue-700" : ""
              }`}
            >
              Add Blog Content
            </button>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {activeTab === "category" && <Category />}
        {activeTab === "blog" && <Blog />}
        {activeTab === "content" && <BlogContent />}
      </div>
    </div>
  );
};

// Dummy Components - baad mein apna code add kar lena
const Category = () => (
  <div>
    <h1 className="text-xl font-bold mb-4">Create Category</h1>
    {/* Category ka form yahan dalna */}
  </div>
);

const Blog = () => (
  <div>
    <h1 className="text-xl font-bold mb-4">Create Blog</h1>
    {/* Blog ka form yahan dalna */}
  </div>
);

const BlogContent = () => (
  <div>
    <h1 className="text-xl font-bold mb-4">Add Blog Content</h1>
    {/* Blog content ka form yahan dalna */}
  </div>
);

export default AdminPanel;
