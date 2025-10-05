"use client";
import { useEffect, useState, ChangeEvent } from "react";
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

  // Fetch categories 
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

  // handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle image change + preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // upload + submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return alert("براہ کرم زمرہ منتخب کریں!");
    if (!preview) return alert("براہ کرم تصویر منتخب کریں!");

    setLoading(true);
    try {
      // Step 1: Upload to Cloudinary
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: preview }),
      });

      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.url;

      // Step 2: Create blog
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
    <div className="w-full max-w-2xl space-y-6 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-extrabold text-gray-800 text-center">
        نیا بلاگ بنائیں
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
        {/* Category Dropdown */}
        <div className="flex flex-col gap-2">
          <span className="text-gray-700 text-lg font-extrabold">
            کیٹیگری منتخب کریں
          </span>
          <div className="bg-[#389958] text-white flex items-center py-3 px-4 gap-3 rounded-lg relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center justify-between w-full text-white"
            >
              {selectedCategory ? selectedCategory.name : "کیٹیگری منتخب کریں"}
              <ChevronDown size={18} />
            </button>

            {openDropdown && (
              <div className="absolute top-[110%] right-0 bg-white text-[#389958] rounded-md shadow-lg w-full z-20 max-h-56 overflow-y-auto">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-[#e5f6eb] cursor-pointer transition"
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Blog Title */}
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

        {/* Image Upload */}
        <label className="flex flex-col gap-3">
          <span className="text-gray-700 text-lg font-extrabold">
            تصویر منتخب کریں
          </span>

          <div
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              preview
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
            }`}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {preview ? (
              <img
                src={preview}
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
        </label>

        {/* Author */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#389958] text-white rounded-lg hover:bg-[#2f7e49] transition"
        >
          {loading ? "محفوظ کیا جا رہا ہے..." : "بلاگ محفوظ کریں"}
        </button>
      </form>
    </div>
  );
};
