import { NextResponse } from "next/server";
import Blog from "@/models/blog.model";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug: params.slug });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching blog", error }, { status: 500 });
  }
}
