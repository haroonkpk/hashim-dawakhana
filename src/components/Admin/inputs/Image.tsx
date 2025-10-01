"use client";

import { useState, ChangeEvent } from "react";

interface ImageState {
  src: string;
  alt: string;
}

export const ImageUpload = () => {
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
    <div className="space-y-4">
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
    </div>
  );
};
