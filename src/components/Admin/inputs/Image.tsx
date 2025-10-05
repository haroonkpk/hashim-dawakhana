"use client";
import React, { useState, ChangeEvent } from "react";
import { Blog } from "@/types/blogs";

interface ImageState {
  src: string;
  alt: string;
}

interface ImageUploadProps {
  Id: string;
  onBlogUpdate: (blog: Blog) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  Id,
  onBlogUpdate,
}) => {
  const [image, setImage] = useState<ImageState>({ src: "", alt: "" });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage((prev) => ({ ...prev, src: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image.src) return alert("پہلے تصویر منتخب کریں");

    setLoading(true);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: image.src }),
    });

    const uploadData = await uploadRes.json();
    const imageUrl = uploadData.url;

    const blogRes = await fetch("/api/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Id,
        block: {
          type: "image",
          content: { src: imageUrl, alt: image.alt },
        },
      }),
    });

    const data = await blogRes.json();
    onBlogUpdate(data);
    setImage({ src: "", alt: "" });
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      {/* Image Upload */}
      <label className="flex flex-col gap-3">
        <span className="text-gray-700 text-lg font-extrabold">
          تصویر منتخب کریں
        </span>

        <div
          className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            image.src
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
          }`}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {image.src ? (
            <img
              src={image.src}
              alt="preview"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16l4-4a3 3 0 014 0l5 5m-1-1l2 2M3 7h3m12 0h3m-9-4h.01M12 3v18"
                />
              </svg>
              <p className="text-gray-500 text-sm text-center">
                 تصویر منتخب کریں
              </p>
            </>
          )}
        </div>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {/* ALT input */}
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 text-sm font-semibold">
          تصویر کی وضاحت 
        </span>
        <input
          type="text"
          value={image.alt}
          onChange={(e) => setImage({ ...image, alt: e.target.value })}
          placeholder="مثلاً: پہاڑ کا منظر"
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-[#389958] text-white rounded-xl hover:bg-[#2d7a46] transition-all disabled:opacity-70"
      >
        {loading ? "اپ لوڈ ہو رہا ہے..." : "بلاک شامل کریں"}
      </button>
    </form>
  );
};
