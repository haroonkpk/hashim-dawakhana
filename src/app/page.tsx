import BlogSection from "@/sections/BlogList";
import { Hero } from "@/sections/Hero";

export default function Home() {
  
  return (
   <div className="flex flex-col gap-14">
    <Hero/>
    <BlogSection/>
   
   </div>
  );
}
