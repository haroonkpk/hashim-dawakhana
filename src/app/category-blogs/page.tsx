import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div>
        {/* Banner Image */}
        <div className="relative w-full h-[30vh] sm:h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/Oil.jpg"
              alt="oil"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Overlay Green Box */}
          <div
            className="absolute -bottom-16 md:-bottom-22 bg-[#389958] text-white px-6 py-5 lg:py-10 text-center sm:text-start 
             w-[90vw] lg:w-[85%]"
            dir="rtl"
            style={{ lineHeight: "1.6" }}
          >
            <h1 className="text-lg md:text-3xl">title</h1>
            <h3 className="mt-3 text-[12px] md:text-sm text-white/70 flex gap-2 md:gap-5 justify-center md:justify-start">
              <span>jsdfijiasf </span>
              <span>j fja</span>
            </h3>
          </div>
        </div>
    </div>
  )
}
