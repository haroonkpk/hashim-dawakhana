"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogs = [
 {
    id: 2,
    title: "ذہنی وضاحت کے لئے ہربس",
    image: "/Oil.jpg",
    category: "ذہنی صحت",
    author: "ڈاکٹر عائشہ",
    date: "2024-01-15",
  },
  {
    id: 3,
    title: "صحت مند طرز زندگی کی ٹپس",
    image: "/realestate.jpg",
    category: "لائف اسٹائل",
    author: "ہربلسٹ یوسف",
    date: "2024-02-01",
  },
  {
    id: 4,
    title: "روایتی ہربل حکمت",
    image: "/finance.jpg",
    category: "طب یونانی",
    author: "پروفیسر کریم",
    date: "2024-02-12",
  },
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? blogs.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 200); // small delay for smooth fade
  };
 
  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
      setFade(true);
    }, 200);
  };

  const currentBlog = blogs[currentIndex];

  return (
    <section className="relative w-full h-[30vh] sm:h-[80vh] flex items-center justify-center">
      {/* Background Image with fade animation */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={currentBlog.image}
          alt={currentBlog.title}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay Green Box */}
      <div
        className="absolute -bottom-16 md:-bottom-22  bg-[#389958] text-white px-6 py-5 lg:py-10 text-center sm:text-start 
             w-[90vw] md:w-[70%] lg:w-[70%] rounded-sm"
        dir="rtl"
        style={{ lineHeight: "1.6" }}
      >
        <h1 className="text-lg md:text-3xl  ">
          {currentBlog.title}
        </h1>
        <h3 className="mt-3 text-[12px] md:text-sm text-white/70 flex gap-2 md:gap-5 justify-center md:justify-start ">
          <span>
            {currentBlog.category}
            </span>
          <span>
            {currentBlog.date}
            </span>
        </h3>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/80 p-2 rounded-full text-green-600"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/80 p-2 rounded-full text-green-600"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
};
