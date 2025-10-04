"use client";
import { useState } from "react";

export const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    author: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Response:", data);
  };

  return (
    <div className="w-full max-w-2xl space-y-6 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-extrabold text-gray-800 text-center">
        نیا بلاگ بنائیں
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
        <label className="flex flex-col gap-2">
          <span className="text-gray-700 text-lg font-extrabold">
            عنوان درج کریں
          </span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="یہاں بلاگ کا عنوان لکھیں..."
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-gray-700 text-lg font-extrabold">
            تصویر کا لنک
          </span>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="مثلاً https://example.com/image.jpg"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-gray-700 text-lg font-extrabold">
            زمرہ درج کریں
          </span>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="مثلاً ٹیکنالوجی، تعلیم، صحت..."
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-gray-700 text-lg font-extrabold">
            مصنف کا نام
          </span>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="یہاں مصنف کا نام لکھیں..."
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-[#389958] text-white rounded-lg "
        >
          بلاگ محفوظ کریں
        </button>
      </form>
    </div>
  );
};
