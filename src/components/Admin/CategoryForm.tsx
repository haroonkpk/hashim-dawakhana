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
        setMessage(" کیٹیگری کامیابی سے بنا دیا گیا!");
        setName("");
      } else if (res.status === 409) {
        setMessage(" یہ کیٹیگری پہلے سے موجود ہے!");
      } else if (res.status === 400) {
        setMessage(" براہ کرم کیٹیگری کا نام درج کریں!");
      } else {
        setMessage("سرور میں خرابی، بعد میں دوبارہ کوشش کریں۔");
      }
    } catch (error) {
      console.error(error);
      setMessage(" نیٹ ورک میں خرابی!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-6 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-extrabold text-gray-800 text-center">
        نیا کیٹیگری بنائیں
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
        <label className="flex flex-col gap-2">
          <span className="text-gray-700 text-lg font-extrabold">
            کیٹیگری کا نام درج کریں
          </span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="مثلاً ٹیکنالوجی، تعلیم، صحت..."
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-[#389958] text-white rounded-lg"
        >
          {loading ? "محفوظ کیا جا رہا ہے..." : "کیٹیگری محفوظ کریں"}
        </button>
      </form>

      {message && (
        <p className="text-center text-sm text-gray-600 mt-3">{message}</p>
      )}
    </div>
  );
};
