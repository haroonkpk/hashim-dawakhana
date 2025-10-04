import React, { useState } from "react";
interface slugProps {
  slug: string;
}
export const Heading: React.FC<slugProps> = ({ slug }) => {
  const [Heading, setHeading] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Heading),
    });

    const data = await res.json();
    console.log("Response:", data);
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-gray-700 text-lg font-extrabold">
            ہیڈنگ درج کریں
          </span>
          <span className="text-gray-700 text-lg font-extrabold">{slug}</span>
        </div>
        <input
          type="text"
          dir="rtl"
          value={Heading}
          onChange={(e) => setHeading(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="یہاں اپنی ہیڈنگ لکھیں..."
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
