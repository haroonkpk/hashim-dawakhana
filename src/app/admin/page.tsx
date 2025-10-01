"use client";

import { Image as ImageBlock } from "@/components/Admin/Image";
import { Table as TableBlock } from "@/components/Admin/Table";
import { Paragraph } from "@/components/Admin/Paragraph";
import { useState } from "react";
import { Heading } from "@/components/Admin/Heading";

import {
  Type,
  FileText,
  Image as ImageIcon,
  Table as TableIcon,
} from "lucide-react";

export default function AdminPanel() {
  const [selectedBlock, setSelectedBlock] = useState("heading");

  const renderForm = () => {
    switch (selectedBlock) {
      case "heading":
        return <Heading />;

      case "paragraph":
        return <Paragraph />;

      case "image":
        return <ImageBlock />;

      case "table":
        return <TableBlock />;

      default:
        return <p>کوئی بلاک منتخب کریں</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-20 bg-gray-900 text-white flex flex-col items-center py-6 gap-6">
        <button
          className={`p-3 rounded-full ${
            selectedBlock === "heading" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedBlock("heading")}
        >
          <Type size={20} />
        </button>

        <button
          className={`p-3 rounded-full ${
            selectedBlock === "paragraph" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedBlock("paragraph")}
        >
          <FileText size={20} />
        </button>

        <button
          className={`p-3 rounded-full ${
            selectedBlock === "image" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedBlock("image")}
        >
          <ImageIcon size={20} />
        </button>

        <button
          className={`p-3 rounded-full ${
            selectedBlock === "table" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedBlock("table")}
        >
          <TableIcon size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">ایڈمن پینل</h1>
        <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
          {renderForm()}

          {/* Submit Button */}
          <button
            type="button"
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg"
            onClick={() => alert("Block Save Ho Gya (DB Later)")}
          >
            بلاک شامل کریں
          </button>
        </div>
      </div>
    </div>
  );
}
