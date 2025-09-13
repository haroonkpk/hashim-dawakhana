"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 24,
    name: "بچوں کے امراض",
    count: 1,
  },
  {
    id: 26,
    name: "جڑی بوٹیاں اور ان کے خواص",
    count: 71,
  },
  {
    id: 25,
    name: "جوڑوں کے امراض",
    count: 1,
  },
  {
    id: 3,
    name: "طب و صحت",
    count: 2,
  },
  {
    id: 23,
    name: "عورتوں کے مخصوص امراض",
    count: 2,
  },
  {
    id: 15,
    name: "کان کے امراض",
    count: 2,
  },
  {
    id: 22,
    name: "مردوں کے مخصوص امراض",
    count: 3,
  },
  {
    id: 10,
    name: "معدے کے امراض",
    count: 1,
  },
];

export const Sidebar = () => {
  return (
    <div className="space-y-8">
      <nav className="w-[300px] h-fit border border-gray-200 p-6" dir="rtl">
        <h4 className="text-lg font-bold pb-2 mb-3">
          <span>کیٹگریز</span>
        </h4>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex gap-2 justify-between items-center pb-1 last:border-b-0"
            >
              <span className="w-6 h-6 flex items-center justify-center text-xs text-white bg-[#389958] rounded-full">
                {cat.count}
              </span>

              <Link
                href="#"
                className="flex-1 text-gray-800 hover:text-green-600 transition-colors "
              >
                <span>{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sticky top-10 z-10 w-full h-[350px]">
        <Image
          src="/Oil.jpg"
          alt="hashim dawakhana"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
