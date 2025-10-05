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

    // Step 1: Upload to Cloudinary
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: image.src }),
    });

    const uploadData = await uploadRes.json();
    const imageUrl = uploadData.url;

    // Step 2: Save in Blog document
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
    <div className="flex flex-col space-y-4">
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 text-lg font-extrabold">
          تصویر منتخب کریں
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded-lg p-2"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-gray-700">تصویر کی وضاحت (alt):</span>
        <input
          type="text"
          value={image.alt}
          onChange={(e) => setImage({ ...image, alt: e.target.value })}
          className="border rounded-lg p-2"
        />
      </label>

      {image.src && (
        <img
          src={image.src}
          alt={image.alt}
          className="w-40 h-40 object-cover rounded-lg border"
        />
      )}

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-[#389958] text-white rounded-lg"
      >
        {loading ? "اپ لوڈ ہو رہا ہے..." : "بلاک شامل کریں"}
      </button>
    </div>
  );
};
