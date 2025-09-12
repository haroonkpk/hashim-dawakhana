"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogs = [
  { id: 1, title: "ہربل ہیلتھ کے راز", image: "/finance.jpg" },
  { id: 2, title: "قدرتی توانائی کے نسخے", image: "/Oil.jpg" },
  { id: 3, title: "ذہنی وضاحت کے لئے ہربس", image: "/realestate.jpg" },
  { id: 4, title: "صحت مند طرز زندگی کی ٹپس", image: "/finance.jpg" },
  { id: 5, title: "روایتی ہربل حکمت", image: "/realestate.jpg" },
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
        className="absolute -bottom-9 bg-[#389958] text-white px-4 py-5 text-center sm:text-start 
             w-[90vw] md:w-[70%] lg:w-[50%] rounded-sm"
        dir="rtl"
        style={{ lineHeight: "1.6" }}
      >
        <h1 className="font-medium text-xl md:text-3xl leading-snug ">
          {currentBlog.title}
        </h1>
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
