"use client";
import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { ChevronDown, Trash2, PlusCircle } from "lucide-react";

export const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    author: "",
  });
  const [tab, setTab] = useState<"create" | "delete">("create");

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

  const [blogs, setBlogs] = useState<{ _id: string; title: string }[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/subCategories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

      await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          image: imageUrl,
          author: form.author,
          category: selectedCategory._id,
        }),
      });

      alert("بلاگ کامیابی سے بن گیا!");
      setForm({ title: "", image: "", category: "", author: "" });
      setPreview("");
      setSelectedCategory(null);
      fetchBlogs(); // refresh list
    } catch (error) {
      console.error(error);
      alert("نیٹ ورک میں خرابی!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("کیا آپ واقعی اس بلاگ کو حذف کرنا چاہتے ہیں؟")) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("بلاگ کامیابی سے حذف ہو گیا!");
        fetchBlogs();
      } else {
        alert(data.error || "حذف کرنے میں خرابی!");
      }
    } catch (err) {
      console.error(err);
      alert("نیٹ ورک میں خرابی!");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-10">
      <div className="w-full max-w-2xl mx-auto rounded-2xl shadow-sm border border-gray-100">
        {/* Top Green Navbar with Icons */}
        <div
          style={{ boxShadow: "0 8px 20px rgba(22,163,74,0.2)" }}
          className="bg-[#389958] text-white flex justify-center items-center py-4 px-6 gap-6 rounded-t-2xl"
        >
          <button
            className={`p-3 rounded-full transition ${
              tab === "create"
                ? "bg-gray-100/90 text-[#389958]"
                : "hover:bg-white/20"
            }`}
            onClick={() => setTab("create")}
          >
            <PlusCircle size={22} />
          </button>

          <button
            className={`p-3 rounded-full transition ${
              tab === "delete"
                ? "bg-gray-100/90 text-[#389958]"
                : "hover:bg-white/20"
            }`}
            onClick={() => setTab("delete")}
          >
            <Trash2 size={22} />
          </button>
        </div>

        {/* White Content Box */}
        <div className="bg-white p-8 space-y-6 rounded-b-2xl">
          {/* Create Blog Form */}
          {tab === "create" && (
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
                    {selectedCategory
                      ? selectedCategory.name
                      : "زمرہ منتخب کریں"}
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
          )}

          {/* Delete Blog Tab */}
          {tab === "delete" && (
            <div className="space-y-4" dir="rtl">
              <h3 className="text-xl font-semibold">موجودہ بلاگز</h3>
              <ul className="space-y-3">
                {blogs.length === 0 && (
                  <p className="text-gray-500">کوئی بلاگ موجود نہیں ہے۔</p>
                )}
                {blogs.map((blog) => (
                  <li
                    key={blog._id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <span>{blog.title}</span>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      حذف کریں
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
