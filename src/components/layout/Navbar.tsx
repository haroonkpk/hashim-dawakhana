"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/subCategories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <Link href="/" className="text-xl font-bold">
        Scholarship Zone
      </Link>

      <div className="flex gap-4">
        {loading ? (
          <span>Loading...</span>
        ) : (
          categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="hover:underline"
            >
              {cat.name}
            </Link>
          ))
        )}
      </div>
    </nav>
  );
}
