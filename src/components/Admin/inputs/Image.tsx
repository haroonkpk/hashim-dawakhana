"use client";

import React, { useState, ChangeEvent } from "react";

interface ImageState {
  src: string;
  alt: string;
}
interface slugProps {
  slug: string;
}
export const ImageUpload: React.FC<slugProps> = ({ slug }) => {
  const [image, setImage] = useState<ImageState>({ src: "", alt: "" });

  // file ko base64 me convert karna
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // safe optional chaining
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage((prev) => ({ ...prev, src: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* image upload */}
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 text-lg font-extrabold">
          تصویر منتخب کریں
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        />
      </label>

      {/* alt text */}
      <label className="flex flex-col gap-2">
        <span className="text-gray-700">تصویر کی وضاحت (alt):</span>
        <input
          type="text"
          value={image.alt}
          onChange={(e) => setImage({ ...image, alt: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 outline-green-600"
          placeholder="تصویر کے بارے میں لکھیں"
        />
      </label>

      {/* preview */}
      {image.src && (
        <div className="mt-4">
          <p className="text-gray-700 font-bold mb-2">پیش منظر:</p>
          <img
            src={image.src}
            alt={image.alt || "تصویر"}
            className="w-40 h-40 object-cover rounded-lg border"
          />
        </div>
      )}
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
