import { useState } from "react";

export const Heading = () => {
  const [heading, setHeading] = useState("");
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-700">ہیڈنگ لکھیں:</span>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="mt-1 block w-full  border outline-green-600 border-gray-300 rounded-lg p-2"
          placeholder="ہیڈنگ یہاں لکھیں"
        />
      </label>
    </div>
  );
};
