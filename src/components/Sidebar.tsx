"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  count: number;
}

export const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categoriess
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/subCategories");
      const data = await res.json();
      setCategories(data.slice(-8));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-8">
      <nav
        className="w-full sm:w-[300px] h-fit border border-gray-200 p-6"
        dir="rtl"
      >
        <h4 className="text-lg font-bold pb-2 mb-3">
          <span>کیٹگریز</span>
        </h4>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="flex gap-2 justify-between items-center pb-1 last:border-b-0"
            >
              <span className="w-6 h-6 flex items-center justify-center text-xs text-white bg-[#389958] rounded-full">
                {cat.count}
              </span>

              <Link
                href={`/category/${cat.slug}`}
                className="flex-1 text-gray-800 hover:text-green-600 transition-colors"
              >
                <span>{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sticky top-10 z-10 w-full sm:w-[300px] h-[350px]">
        <Image
          src="/finance.jpg"
          alt="hashim dawakhana"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
