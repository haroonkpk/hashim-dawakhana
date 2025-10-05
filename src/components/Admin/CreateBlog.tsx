"use client";
import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    author: "",
  });

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<{
    _id: string;
    name: string;
  } | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return alert("براہ کرم زمرہ منتخب کریں!");
    if (!preview) return alert("براہ کرم تصویر منتخب کریں!");

    setLoading(true);
    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: preview }),
      });

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.url;

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          image: imageUrl,
          author: form.author,
          category: selectedCategory.name,
        }),
      });

      const data = await res.json();
      alert(data.success ? "بلاگ کامیابی سے بن گیا!" : "خرابی پیش آگئی!");
      setForm({ title: "", image: "", category: "", author: "" });
      setPreview("");
      setSelectedCategory(null);
    } catch (error) {
      console.error(error);
      alert("نیٹ ورک میں خرابی!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        نیا بلاگ بنائیں
      </h2>

      <form onSubmit={handleSubmit} dir="rtl" className="space-y-6">
        {/* Category Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium text-base">
            کیٹیگری منتخب کریں
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(!openDropdown)}
              className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 flex items-center justify-between text-gray-700 hover:bg-gray-100 transition"
            >
              {selectedCategory ? selectedCategory.name : "زمرہ منتخب کریں"}
              <ChevronDown size={18} className="text-gray-500" />
            </button>

            {openDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md z-20 max-h-52 overflow-y-auto">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-green-50 text-gray-700 cursor-pointer transition"
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium text-base">
            عنوان درج کریں
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="یہاں بلاگ کا عنوان لکھیں..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none bg-gray-50"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium text-base">
            تصویر منتخب کریں
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition ${
              preview
                ? "border-green-400 bg-green-50"
                : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
            }`}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {preview ? (
              <div className="relative w-40 h-40">
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  className="object-cover rounded-lg shadow-sm"
                />
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 16l4-4a3 3 0 014 0l5 5m-1-1l2 2M3 7h3m12 0h3m-9-4h.01M12 3v18"
                  />
                </svg>
                <p className="text-gray-500 text-sm">تصویر منتخب کریں</p>
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
        </div>

        {/* Author */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium text-base">
            مصنف کا نام
          </label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="یہاں مصنف کا نام لکھیں..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none bg-gray-50"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#389958] text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:bg-gray-300"
        >
          {loading ? "محفوظ کیا جا رہا ہے..." : "بلاگ محفوظ کریں"}
        </button>
      </form>
    </div>
  );
};
