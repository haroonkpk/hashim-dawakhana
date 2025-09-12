import Image from "next/image";

export const BlogCard = ({ blog }:any) => (
  <article
    className="overflow-hidden bg-white transition-transform transform hover:-translate-y-1"
    style={{ boxShadow: "0 2px 6px rgba(0,0,0,0)" }} // normal state light gray
    onMouseEnter={
      (e) =>
        (e.currentTarget.style.boxShadow = "0 8px 20px rgba(22,163,74,0.2)") // hover green
    }
    onMouseLeave={
      (e) => (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0)") // back to normal
    }
  >
    <div className="relative">
      <Image
        src={blog.image}
        alt={blog.title}
        width={500}
        height={300}
        className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 hover:scale-105"
      />
      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-green-600 text-white text-[8px] sm:text-xs px-3 py-2  rounded-full shadow-md">
        {blog.category}
      </span>
    </div> 

    <div className="p-5">
      <h2 className="text-md py-1 text-green-600 md:text-gray-800 md:hover:text-green-600 font-semibold mb-2 line-clamp-2">
        {blog.title}
      </h2>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{blog.author}</span>
        <span>{blog.date}</span>
      </div>
    </div>
  </article>
);
