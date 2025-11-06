import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blog.model";
import dbConnect from "@/lib/mongodb";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params; 

    await dbConnect();
 
    const blog = await Blog.findOne({ slug })
      .populate("category", "name slug")
      .lean();
  
    if (!blog)
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blog", error },
      { status: 500 }
    );
  }
}