"use client";

import { useState } from "react";

export function Paragraph() {
  const [paragraph, setParagraph] = useState("");

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-700">پیراغراف:</span>
        <textarea
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          className="mt-1 block w-full outline-green-600 border border-gray-300 rounded-lg p-2 h-32"
          placeholder="یہاں پیراغراف لکھیں..."
        />
      </label>
    </div>
  );
}
