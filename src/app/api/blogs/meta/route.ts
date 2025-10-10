import { NextResponse } from "next/server";
import Blog from "@/models/blog.model";
import connectDB from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const lastBlog = await Blog.findOne().sort({ updatedAt: -1 });
  return NextResponse.json({ updatedAt: lastBlog?.updatedAt || null });
}
