import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types/blogs";
import { formatDate } from "@/lib/dateFormatter";

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => (
  <Link href={`/blogs/${blog?.slug}`}>
    <article
      className="overflow-hidden bg-white transition-transform transform hover:-translate-y-1"
      style={{ boxShadow: "0 2px 6px rgba(0,0,0,0)" }}
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
          className="w-full h-48 sm:h-46 lg:h-54 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h2 className="text-sm text-green-500">{blog.category.name}</h2>
        <h2 className="text-xl py-1 text-green-600 md:text-gray-800 md:hover:text-green-600 font-semibold mb-2 line-clamp-2">
          {blog.title}
        </h2>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{blog.author}</span>
          <span>{formatDate(blog.date)}</span>
        </div>
      </div>
    </article>
  </Link>
);
