export const Heading = () => {
  return (
    <div className="space-y-4">
      <label className="flex flex-col gap-2">
        <span className="text-gray-700 text-lg font-extrabold">
          ہیڈنگ درج کریں
        </span>
        <input
          type="text"
          dir="rtl"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="یہاں اپنی ہیڈنگ لکھیں..."
        />
      </label>
    </div>
  );
};
