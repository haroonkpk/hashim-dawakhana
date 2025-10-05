"use client";
import { useState } from "react";

export const CategoryForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
        setMessage(" کیٹیگری کامیابی سے بن گئی!");
        setName("");
      } else if (res.status === 409) {
        setMessage(" یہ کیٹیگری پہلے سے موجود ہے!");
      } else if (res.status === 400) {
        setMessage(" براہ کرم کیٹیگری کا نام درج کریں!");
      } else {
        setMessage(" سرور میں خرابی، بعد میں کوشش کریں۔");
      }
    } catch (error) {
      console.error(error);
      setMessage("نیٹ ورک میں خرابی!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          نیا کیٹیگری بنائیں
        </h2>

        <form onSubmit={handleSubmit} dir="rtl" className="space-y-6">
          <div className="flex flex-col gap-4">
            <label className="text-gray-700 font-medium text-base">
              کیٹیگری کا نام درج کریں
            </label>
            <input
              type="text"
              name="name"
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

        {message && (
          <p className="text-center text-base font-medium text-gray-700 mt-3">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
