"use client";

import ContentForm from "@/components/Admin/ContentForm";
import { CreateBlog } from "@/components/Admin/CreateBlog";
import { useState } from "react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("category");

  // Sidebar Links (urdu)
  const tabs = [
    { id: "category", label: "کیٹیگری بنائیں" },
    { id: "blog", label: "نیا بلاگ بنائیں" },
    { id: "content", label: "بلاگ کا مواد شامل کریں" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#389958] text-white p-4 space-y-6">
        <h2 className="text-2xl font-bold">ایڈمن پینل</h2>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`block w-full text-right p-2 rounded transition
                  ${
                    activeTab === tab.id
                      ? "bg-gray-100/90 text-[#389958] font-semibold"
                      : "hover:bg-white/20"
                  }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <div className="w-full flex flex-col justify-center items-center ">
        {activeTab === "category" && <Category />}
        {activeTab === "blog" && <Blog />}
        {activeTab === "content" && <ContentFormfun />}
        </div>
      </main>
    </div>
  );
};

// Dummy Components
const Category = () => (
  <section>
    <h1 className="text-xl font-bold mb-4"> نئی کیٹیگری بنائیں</h1>
    {/* کیٹیگری کا فارم */}
  </section>
);

const Blog = () => (
  <CreateBlog/>
);
const ContentFormfun = () => <ContentForm />;

export default AdminPanel;
