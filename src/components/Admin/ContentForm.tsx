"use client";

import { ImageUpload } from "@/components/Admin/inputs/Image";
import { Table as TableBlock } from "@/components/Admin/inputs/Table";
import { Paragraph } from "@/components/Admin/inputs/Paragraph";
import { useState } from "react";
import { Heading } from "@/components/Admin/inputs/Heading";

import {
  Type,
  FileText,
  Image as ImageIcon,
  Table as TableIcon,
} from "lucide-react";

export default function ContentForm() {
  const [selectedBlock, setSelectedBlock] = useState("heading");

  const renderForm = () => {
    switch (selectedBlock) {
      case "heading":
        return <Heading />;

      case "paragraph":
        return <Paragraph />;

      case "image":
        return <ImageUpload />;

      case "table":
        return <TableBlock />;

      default:
        return <p>کوئی بلاک منتخب کریں</p>;
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-20">
      {/* top bar */}
      <div className="w-full flex justify-center">
        <div
          style={{ boxShadow: "0 8px 20px rgba(22,163,74,0.2)" }}
          className="bg-[#389958] text-white flex justify-center items-center py-6 px-10 gap-6 rounded-2xl"
        >
          <button
            className={`p-3 rounded-full ${
              selectedBlock === "heading" ? "bg-gray-100/90 text-[#389958]" : ""
            }`}
            onClick={() => setSelectedBlock("heading")}
          >
            <Type size={20} />
          </button>

          <button
            className={`p-3 rounded-full ${
              selectedBlock === "paragraph"
                ? "bg-gray-100/90 text-[#389958]"
                : ""
            }`}
            onClick={() => setSelectedBlock("paragraph")}
          >
            <FileText size={20} />
          </button>

          <button
            className={`p-3 rounded-full ${
              selectedBlock === "image" ? "bg-gray-100/90 text-[#389958]" : ""
            }`}
            onClick={() => setSelectedBlock("image")}
          >
            <ImageIcon size={20} />
          </button>

          <button
            className={`p-3 rounded-full ${
              selectedBlock === "table" ? "bg-gray-100/90 text-[#389958]" : ""
            }`}
            onClick={() => setSelectedBlock("table")}
          >
            <TableIcon size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="w-2xl bg-white rounded-xl p-6 space-y-6"
        style={{ boxShadow: "0 8px 20px rgba(22,163,74,0.2)" }}
      >
        {renderForm()}

        
      </div>
    </div>
  );
}
