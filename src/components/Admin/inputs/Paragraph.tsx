"use client";

import { useState } from "react";
interface slugProps {
  slug: string;
}
export const Paragraph: React.FC<slugProps> = ({ slug }) => {
  const [paragraph, setParagraph] = useState("");

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
        type="button"
        className="mt-6 px-6 py-2 bg-[#389958] text-white rounded-lg"
        onClick={() => alert("Block Save Ho Gya (DB Later)")}
      >
        بلاک شامل کریں
      </button>
    </div>
  );
};
