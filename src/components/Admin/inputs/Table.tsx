import React, { useState } from "react";
interface slugProps {
  slug: string;
}
export const Table: React.FC<slugProps> = ({ slug }) => {
  const [table, setTable] = useState({
    headers: ["", ""],
    rows: [["", ""]],
  });
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
        type="button"
        className="mt-6 px-6 py-2 bg-[#389958] text-white rounded-lg"
        onClick={() => alert("Block Save Ho Gya (DB Later)")}
      >
        بلاک شامل کریں
      </button>
    </div>
  );
};
