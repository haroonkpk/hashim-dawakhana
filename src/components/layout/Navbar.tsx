"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Blog } from "@/types/blogs";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/subCategories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, []);

  return (
    <nav className=" bg-white min-h-15 shadow-sm sticky top-0 z-50">
      <div className="relative max-w-3xl xl:max-w-6xl mx-auto p-4 sm:px-6  flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.PNG"
            alt="logo"
            width={200}
            height={150}
            className="absolute -bottom-8 md:-bottom-4"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6  text-gray-800 font-medium">
          {categories.map((cat) => {
            const relatedBlogs = blogs.filter(
              (b) => b.category._id === cat._id
            );

            return (
              <li
                key={cat._id}
                className="relative group"
                onMouseEnter={() => setActive(cat._id)}
                onMouseLeave={() => setActive(null)}
              >
                <Link href={`/category/${cat.slug}`}>
                  <button className="flex py-4 items-center gap-1 hover:text-emerald-600 transition">
                    {cat.name}
                    {relatedBlogs.length > 0 && (
                      <ChevronDown size={16} className="mt-1" />
                    )}
                  </button>
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {active === cat._id && relatedBlogs.length > 0 && (
                    <motion.div
                      key={cat._id}
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute w-96 bg-white shadow-xl rounded-xl overflow-hidden z-[9999]"
                      style={{
                        left: "-50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {relatedBlogs.map((blog) => (
                        <Link
                          key={blog._id}
                          href={`/blogs/${blog.slug}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition"
                        >
                          <div className="w-16 h-16 relative flex-shrink-0">
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <span className="text-sm text-gray-800 leading-5">
                            {blog.title}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-emerald-600 transition"
          onClick={() => setOpen(true)}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 h-full w-3/4 bg-white shadow-xl p-6 flex flex-col justify-between z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-6 border-gray-400 mb-8">
                  <Link href="/">
                    <Image
                      src="/logo.PNG"
                      alt="logo"
                      width={200}
                      height={150}
                      className="absolute -top-5"
                    />
                  </Link>
                  <button onClick={() => setOpen(false)}>
                    <X size={24} className="text-gray-700" />
                  </button>
                </div>

                {/* Menu Items */}
                <ul className="space-y-4 text-gray-800 font-medium">
                  {categories.map((cat) => {
                    const relatedBlogs = blogs.filter(
                      (b) => b.category._id === cat._id
                    );
                    return (
                      <li key={cat._id}>
                        <div className="flex justify-between w-full items-center">
                          <Link
                            href={`/category/${cat.slug}`}
                            className="hover:text-emerald-600 transition"
                            onClick={() => setOpen(false)}
                          >
                            {cat.name}
                          </Link>

                          {relatedBlogs.length > 0 && (
                            <ChevronDown
                              size={16}
                              className={`cursor-pointer transition-transform ${
                                active === cat._id ? "rotate-180" : ""
                              }`}
                              onClick={() =>
                                setActive(active === cat._id ? null : cat._id)
                              }
                            />
                          )}
                        </div>

                        {/* Submenu */}
                        <AnimatePresence>
                          {active === cat._id && relatedBlogs.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden ml-4 mt-2 border-l-2 border-emerald-100"
                            >
                              {relatedBlogs.map((blog) => (
                                <Link
                                  key={blog._id}
                                  href={`/blogs/${blog.slug}`}
                                  className="flex items-center gap-3 py-2 text-sm text-gray-700 hover:text-emerald-600"
                                  onClick={() => setOpen(false)}
                                >
                                  <div className="w-12 h-12 relative flex-shrink-0">
                                    <Image
                                      src={blog.image}
                                      alt={blog.title}
                                      fill
                                      className="object-cover rounded-md"
                                    />
                                  </div>
                                  <span>{blog.title}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="text-center text-xs text-gray-400 border-t pt-4">
                © 2025 Hashim Dawakhana
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
