"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const categories = [
  {
    name: "طب و صحت",
    slug: "health",
    links: [
      {
        title: "رنگ و روشنی سے علاج – قدرتی، سادہ اور مؤثر تھراپی کا مکمل جائزہ",
        href: "https://blog.kamilherbal.com/health/chromotherapy/",
      },
      {
        title: "جامن کے 7 حیرت انگیز فوائد",
        href: "https://blog.kamilherbal.com/health/%d8%ac%d8%a7%d9%85%d9%86-%da%a9%db%92-7-%d8%ad%db%8c%d8%b1%d8%aa-%d8%a7%d9%86%da%af%db%8c%d8%b2-%d9%81%d9%88%d8%a7%d8%a6%d8%af/",
      },
    ],
  },
  { name: "فٹنس", slug: "fitness", links: [] },
  { name: "غذائیت", slug: "nutrition", links: [] },
  {
    name: "جڑی بوٹیاں اور ان کے خواص",
    slug: "herbs-properties",
    links: [
      {
        title: "نیم (Margosa) کے خواص، فوائد اور استعمال",
        href: "https://blog.kamilherbal.com/herbs-properties/%d9%86%db%8c%d9%85/",
      },
      {
        title: "ناگ کیسر (نارمشک) کے خواص، فوائد اور استعمال",
        href: "https://blog.kamilherbal.com/herbs-properties/%d9%86%d8%a7%da%af-%da%a9%db%8c%d8%b3%d8%b1/",
      },
    ],
  },
];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700">
          Hashim <span className="text-emerald-500">Dawakhana</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-800 font-medium">
          {categories.map((cat) => (
            <li
              key={cat.slug}
              className="relative group"
              onMouseEnter={() => setActive(cat.slug)}
              onMouseLeave={() => setActive(null)}
            >
              <button className="flex items-center gap-1 hover:text-emerald-600 transition">
                {cat.name}
                {cat.links.length > 0 && <ChevronDown size={16} className="mt-1" />}
              </button>

              {/* Dropdown */}
              {cat.links.length > 0 && (
                <div
                  className={`absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 ${
                    active === cat.slug
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-3 invisible"
                  }`}
                >
                  {cat.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="block px-4 py-3 hover:bg-emerald-50 text-right text-sm leading-6 transition"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
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
                <div className="flex justify-between items-center mb-8">
                  <Link
                    href="/"
                    className="text-xl font-bold text-green-700"
                    onClick={() => setOpen(false)}
                  >
                    Hashim <span className="text-emerald-500">Dawakhana</span>
                  </Link>
                  <button onClick={() => setOpen(false)}>
                    <X size={24} className="text-gray-700" />
                  </button>
                </div>

                {/* Menu Items */}
                <ul className="space-y-4 text-gray-800 font-medium">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        onClick={() =>
                          setActive(active === cat.slug ? null : cat.slug)
                        }
                        className="flex justify-between w-full hover:text-emerald-600 transition"
                      >
                        {cat.name}
                        {cat.links.length > 0 && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              active === cat.slug ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {/* Submenu */}
                      <AnimatePresence>
                        {active === cat.slug && cat.links.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-4 mt-2 border-l-2 border-emerald-100"
                          >
                            {cat.links.map((link, i) => (
                              <Link
                                key={i}
                                href={link.href}
                                className="block py-2 text-sm text-gray-700 hover:text-emerald-600"
                                onClick={() => setOpen(false)}
                              >
                                {link.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
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
