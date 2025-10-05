"use client";

import React, { useState } from "react";
import { Blog } from "@/types/blogs";

interface ParagraphProps {
  Id: string;
  onBlogUpdate: (blog: Blog) => void;
}

export const Paragraph: React.FC<ParagraphProps> = ({ Id, onBlogUpdate }) => {
  const [paragraph, setParagraph] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Id,
        block: {
          type: "paragraph",
          content: paragraph,
        },
      }),
    });

    const data = await res.json();
    setParagraph("");
    console.log("Response:", data);
    onBlogUpdate(data);
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 text-lg font-extrabold">پیراغراف</span>
        <textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          className="mt-1 block w-full outline-green-600 border border-gray-300 rounded-lg p-2 h-32"
          placeholder="یہاں پیراغراف لکھیں..."
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 px-6 py-2 bg-[#389958] text-white rounded-lg"
        onClick={handleSubmit}
      >
        بلاک شامل کریں
      </button>
    </div>
  );
};
