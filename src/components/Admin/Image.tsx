import React, { useState } from "react";

export const Image = () => {
  const [image, setImage] = useState({ src: "", alt: "" });
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-700">تصویر کا لنک (src):</span>
        <input
          type="text"
          value={image.src}
          onChange={(e) => setImage({ ...image, src: e.target.value })}
          className="mt-1 block w-full outline-green-600 border border-gray-300 rounded-lg p-2"
          placeholder="مثال: /finance.jpg"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">alt ٹیکسٹ:</span>
        <input
          type="text"
          value={image.alt}
          onChange={(e) => setImage({ ...image, alt: e.target.value })}
          className="mt-1 block w-full outline-green-600 border border-gray-300 rounded-lg p-2"
          placeholder="تصویر کی وضاحت"
        />
      </label>
    </div>
  );
};
