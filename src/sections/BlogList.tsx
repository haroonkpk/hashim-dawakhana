"use client";
import { BlogCard } from "@/components/BlogCard";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

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
    id: 4,
    title: "روایتی ہربل حکمت",
    image: "/finance.jpg",
    category: "روایتی ہربل حکمت",
    author: "پروفیسر کریم",
    date: "2024-02-12",
  },
  {
    id: 5,
    title: "دل کی صحت کے لئے بہترین جڑی بوٹیاں",
    image: "/Oil.jpg",
    category: "دل کی صحت",
    author: "ہربلسٹ فاطمہ",
    date: "2024-02-20",
  },
  {
    id: 6,
    title: "قوت مدافعت بڑھانے والے قدرتی نسخے",
    image: "/realestate.jpg",
    category: "مدافعتی نظام",
    author: "ڈاکٹر نعمان",
    date: "2024-03-05",
  },
  {
    id: 7,
    title: "جلدی امراض کے لئے ہربل علاج",
    image: "/finance.jpg",
    category: "اسکین کیئر",
    author: "ہربلسٹ سارہ",
    date: "2024-03-18",
  },
  {
    id: 8,
    title: "ہاضمے کے مسائل اور ہربل حل",
    image: "/Oil.jpg",
    category: "ہاضمہ",
    author: "ڈاکٹر یاسر",
    date: "2024-04-01",
  },
  {
    id: 9,
    title: "بہتر نیند کے لئے قدرتی جڑی بوٹیاں",
    image: "/realestate.jpg",
    category: "نیند",
    author: "ہربلسٹ ریحانہ",
    date: "2024-04-12",
  },
  {
    id: 10,
    title: "ذیابیطس کنٹرول کے لئے ہربس",
    image: "/finance.jpg",
    category: "ذیابیطس",
    author: "ڈاکٹر عرفان",
    date: "2024-04-28",
  },
  {
    id: 11,
    title: "وزن کم کرنے کے قدرتی طریقے",
    image: "/Oil.jpg",
    category: "فٹنس",
    author: "ہربلسٹ سعدیہ",
    date: "2024-05-05",
  },
  {
    id: 12,
    title: "بلڈ پریشر اور جڑی بوٹیوں کا تعلق",
    image: "/realestate.jpg",
    category: "بلڈ پریشر",
    author: "ڈاکٹر زبیر",
    date: "2024-05-18",
  },
  {
    id: 13,
    title: "قدرتی تیلوں کے فوائد",
    image: "/finance.jpg",
    category: "قدرتی تیل",
    author: "ہربلسٹ ثناء",
    date: "2024-05-25",
  },
  {
    id: 14,
    title: "جوڑوں کے درد کا ہربل علاج",
    image: "/Oil.jpg",
    category: "جوڑوں کی صحت",
    author: "ڈاکٹر سلیمان",
    date: "2024-06-02",
  },
  {
    id: 15,
    title: "آنکھوں کی روشنی بڑھانے والے نسخے",
    image: "/realestate.jpg",
    category: "آنکھوں کی صحت",
    author: "ہربلسٹ مریم",
    date: "2024-06-10",
  },
  {
    id: 16,
    title: "بچوں کے لئے محفوظ ہربل ٹپس",
    image: "/finance.jpg",
    category: "بچوں کی صحت",
    author: "ڈاکٹر علی",
    date: "2024-06-25",
  },
  {
    id: 17,
    title: "خواتین کی صحت اور ہربل فوائد",
    image: "/Oil.jpg",
    category: "خواتین",
    author: "ہربلسٹ فرح",
    date: "2024-07-05",
  },
  {
    id: 18,
    title: "موسمی بیماریوں کے لئے قدرتی علاج",
    image: "/realestate.jpg",
    category: "موسمی صحت",
    author: "ڈاکٹر حارث",
    date: "2024-07-18",
  },
  {
    id: 19,
    title: "یادداشت بہتر بنانے والے ہربس",
    image: "/finance.jpg",
    category: "یادداشت",
    author: "ہربلسٹ کبریٰ",
    date: "2024-08-01",
  },
  {
    id: 20,
    title: "معدے کے السر کا ہربل علاج",
    image: "/Oil.jpg",
    category: "معدہ",
    author: "ڈاکٹر وسیم",
    date: "2024-08-15",
  },
  {
    id: 21,
    title: "خون کی کمی کا قدرتی علاج",
    image: "/realestate.jpg",
    category: "خون کی صحت",
    author: "ہربلسٹ اقبال",
    date: "2024-08-25",
  },
  {
    id: 23,
    title: "قدرتی حسن کے راز",
    image: "/Oil.jpg",
    category: "خوبصورتی",
    author: "ہربلسٹ انعم",
    date: "2024-09-15",
  },
  {
    id: 24,
    title: "جسمانی طاقت بڑھانے کے لئے ہربل پلان",
    image: "/realestate.jpg",
    category: "طاقت",
    author: "ڈاکٹر اویس",
    date: "2024-09-25",
  },
  {
    id: 25,
    title: "مدافعتی شربت کے فوائد",
    image: "/finance.jpg",
    category: "شربت",
    author: "ہربلسٹ رابعہ",
    date: "2024-10-05",
  },
];

export const BlogSection = () => {
  const [visible, setVisible] = useState(6);

  return (
    <section className="relative flex flex-col md:flex-row gap-8 py-15 md:py-20 px-6 md:mt-4 md:p-20">
      <div>
        <div className="grid gap-10 sm:grid-cols-2">
          {blogs.slice(0, visible).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {visible < blogs.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((prev) => prev + 6)}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-full shadow-lg hover:from-green-700 hover:to-emerald-600 transition"
            >
              مزید دیکھیں
            </button>
          </div>
        )}
      </div>
      <Sidebar />
    </section>
  );
};
