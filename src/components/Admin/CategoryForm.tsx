"use client";
import { useState, useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export const CategoryForm = () => {
  const [tab, setTab] = useState<"create" | "delete">("create");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // all categories fetch
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // create category
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("کیٹیگری کامیابی سے بن گئی!");
        setName("");
        fetchCategories();
      } else if (res.status === 409) {
        setMessage("یہ کیٹیگری پہلے سے موجود ہے!");
      } else if (res.status === 400) {
        setMessage("براہ کرم کیٹیگری کا نام درج کریں!");
      } else {
        setMessage("سرور میں خرابی، بعد میں کوشش کریں۔");
      }
    } catch (error) {
      console.error(error);
      setMessage("نیٹ ورک میں خرابی!");
    } finally {
      setLoading(false);
    }
  };

  // delete category
  const handleDelete = async (id: string) => {
    if (!confirm("کیا آپ واقعی اس کیٹیگری کو حذف کرنا چاہتے ہیں؟")) return;

    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage("کیٹیگری کامیابی سے حذف ہو گئی!");
        fetchCategories();
      } else {
        setMessage(data.message || "حذف کرنے میں خرابی!");
      }
    } catch (err) {
      console.error(err);
      setMessage("نیٹ ورک میں خرابی!");
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
          {/* Create Form */}
          {tab === "create" && (
            <form onSubmit={handleSubmit} dir="rtl" className="space-y-6">
              <div className="flex flex-col gap-4">
                <label className="text-gray-700 font-medium text-base">
                  نئی کیٹیگری کا نام درج کریں
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثلاً جوڑوں کا درد، معدہ، نزلہ زکام..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none bg-gray-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#389958] text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:bg-gray-300"
              >
                {loading ? "محفوظ کیا جا رہا ہے..." : "کیٹیگری محفوظ کریں"}
              </button>
            </form>
          )}

          {/* Delete Section */}
          {tab === "delete" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">موجودہ کیٹیگریز</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li
                    key={cat._id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <span>{cat.name}</span>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      حذف کریں
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Message */}
          {message && (
            <p className="text-center text-base font-medium text-gray-700 mt-3">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
