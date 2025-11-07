"use client";

import { CategoryForm } from "@/components/Admin/CategoryForm";
import ContentForm from "@/components/Admin/ContentForm";
import { CreateBlog } from "@/components/Admin/CreateBlog";
import { useState, useEffect, useState as useClientState } from "react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("category");
  const [isMobile, setIsMobile] = useClientState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 px-6 text-center">
        <p className="text-lg font-bold text-gray-700 leading-relaxed">
          یہ صفحہ موبائل کے لیے دستیاب نہیں ہے۔ <br />
          براہ کرم اسے اپنے لیپ ٹاپ یا کمپیوٹر پر کھولیں۔
        </p>
      </div>
    );
  }

  const tabs = [
    { id: "category", label: "کیٹیگری بنائیں" },
    { id: "blog", label: "نیا بلاگ بنائیں" },
    { id: "content", label: "بلاگ کا مواد شامل کریں" },
  ];

  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-[#389958] text-white p-4 space-y-6 fixed top-22 right-0 h-full">
        <h2 className="text-2xl font-bold text-center mb-6">ایڈمن پینل</h2>
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

      {/* Scrollable Content Area */}
      <main className="flex-1 bg-gray-100 p-6 mr-64 overflow-y-auto">
        <div className="w-full flex flex-col justify-center items-center">
          {activeTab === "category" && <CategoryForm />}
          {activeTab === "blog" && <CreateBlog />}
          {activeTab === "content" && <ContentForm />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
