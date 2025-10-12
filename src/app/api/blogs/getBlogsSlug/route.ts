import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blog.model";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();

    const blogs = await Blog.find({}, "slug title").lean();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blogs", error },
      { status: 500 }
    );
  }
}
