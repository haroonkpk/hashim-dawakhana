import React, { useState } from "react";
import { Blog } from "@/types/blogs";

interface TableProps {
  Id: string;
  onBlogUpdate: (blog: Blog) => void;
}

export const Table: React.FC<TableProps> = ({ Id, onBlogUpdate }) => {
  const [table, setTable] = useState({
    headers: ["", ""],
    rows: [["", ""]],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Id,
        block: {
          type: "table",
          content: table,
        },
      }),
    });

    const data = await res.json();
    onBlogUpdate(data);
    setTable({ headers: ["", ""], rows: [["", ""]] });
  };

  return (
    <div className="space-y-4 flex flex-col">
      <h2 className="text-gray-700 text-lg font-extrabold">ٹیبل ہیڈرز</h2>
      <div className="flex gap-2">
        {table.headers.map((h, i) => (
          <input
            key={i}
            type="text"
            value={h}
            onChange={(e) => {
              const newHeaders = [...table.headers];
              newHeaders[i] = e.target.value;
              setTable({ ...table, headers: newHeaders });
            }}
            className="border outline-green-600 border-gray-300 rounded-lg p-2 flex-1"
            placeholder={`ہیڈر ${i + 1}`}
          />
        ))}
      </div>

      <h2 className="font-semibold mt-4">ٹیبل رووز</h2>
      {table.rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 mb-2">
          {row.map((cell, cellIndex) => (
            <input
              key={cellIndex}
              type="text"
              value={cell}
              onChange={(e) => {
                const newRows = [...table.rows];
                newRows[rowIndex][cellIndex] = e.target.value;
                setTable({ ...table, rows: newRows });
              }}
              className="border outline-green-600 border-gray-300 rounded-lg p-2 flex-1"
              placeholder={`Cell ${cellIndex + 1}`}
            />
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setTable({
            ...table,
            rows: [...table.rows, ["", ""]],
          })
        }
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        رو شامل کریں
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-[#389958] text-white rounded-lg"
      >
        بلاک شامل کریں
      </button>
    </div>
  );
};
