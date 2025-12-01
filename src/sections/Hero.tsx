"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import { Blog } from "@/types/blogs";
import { formatDate } from "@/lib/dateFormatter";
import { LoadingCompo } from "@/components/ui/Loading";

// SWR fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Hero = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // SWR hook for caching blogs
  const { data: blogs, error, isLoading } = useSWR<Blog[]>("/api/blogs", fetcher, {
    revalidateOnFocus: false,  
    dedupingInterval: 60000,    // 1 min caching
  });

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  // Loading state
  if (isLoading) return <LoadingCompo />;

  // Error state
  if (error)
    return (
      <section className="flex justify-center items-center py-20">
        <p className="text-red-500 text-lg">Failed to load blogs. Please try again later.</p>
      </section>
    );

  // Take first 3 blogs for Hero
  const heroBlogs = blogs?.slice(1, 4) || [];

  if (heroBlogs.length === 0)
    return (
      <section className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">No blogs available.</p>
      </section>
    );

  return (
    <section className="relative w-full h-[30vh] sm:h-[80vh] !overflow-visible">
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
          {heroBlogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <div className="relative w-full h-[30vh] sm:h-[80vh]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  unoptimized
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
        className="absolute z-10 -bottom-20 sm:-bottom-20 left-1/2 -translate-x-1/2 
        bg-[#389958] text-white px-6 py-5 lg:py-10 text-center w-[90vw] lg:w-[85%]"
        dir="rtl"
        style={{ lineHeight: "1.6" }}
      >
        <h1 className="text-lg md:text-3xl">{heroBlogs[activeIndex].title}</h1>
        <h3 className="mt-3 text-[12px] md:text-sm text-white/70 flex gap-5 justify-center">
          <span>{heroBlogs[activeIndex].category?.name}</span>
          <span>{formatDate(heroBlogs[activeIndex].date)}</span>
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
