"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface Category {
  _id: string;
  name: string;
  slug: string;
  count: number;
}

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Sidebar = () => {
  const { data: categories } = useSWR<Category[]>(
    "/api/subCategories",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

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
          {categories &&
            categories.map((cat) => (
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

      <div
        className="sticky top-26
       z-10 w-full sm:w-[300px] h-[350px]"
      >
        <Image
          src="/No-Image-Available.png"
          alt="hashim dawakhana products"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
