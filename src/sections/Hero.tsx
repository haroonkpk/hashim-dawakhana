"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Blog } from "@/types/blogs";
import { formatDate } from "@/lib/dateFormatter";
import { LoadingCompo } from "@/components/ui/Loading";

export const Hero = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data.slice(0, 3));
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  if (loading) {
    return <LoadingCompo />;
  }

  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] !overflow-visible">
      {/* Swiper */}
      {swiperReady && (
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{ delay: 5000 }}
          loop
          className="w-full h-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <div className="relative w-full h-[60vh] sm:h-[90vh]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Overlay Box */}
      <div
        className="absolute z-10 -bottom-12 sm:-bottom-20 left-1/2 -translate-x-1/2 
        bg-[#389958] text-white px-6 py-5 lg:py-10 text-center w-[90vw] lg:w-[85%]"
        dir="rtl"
        style={{ lineHeight: "1.6" }}
      >
        <h1 className="text-lg md:text-3xl">{blogs[activeIndex].title}</h1>
        <h3 className="mt-3 text-[12px] md:text-sm text-white/70 flex gap-5 justify-center">
          <span>{blogs[activeIndex].category?.name}</span>
          <span>{formatDate(blogs[activeIndex].date)}</span>
        </h3>
      </div>

      {/* Custom Arrows */}
      <button
        ref={prevRef}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 
        bg-white/50 text-[#389958] p-2 sm:p-3 rounded-full shadow-md hover:bg-[#389958] hover:text-white transition"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        ref={nextRef}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 
        bg-white/50 text-[#389958] p-2 sm:p-3 rounded-full shadow-md hover:bg-[#389958] hover:text-white transition"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};
