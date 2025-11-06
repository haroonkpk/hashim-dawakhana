import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blog.model";
import SubCategory from "@/models/subCategory.model";
import dbConnect from "@/lib/mongodb";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    await dbConnect();

    if (!slug) {
      return NextResponse.json({ message: "Slug is requird" }, { status: 404 });
    }
    const subCategory = (await SubCategory.findOne({ slug }).lean()) as {
      _id: string;
      name: string;
      slug: string;
    } | null;

    if (!subCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const blogs = await Blog.find({ category: subCategory._id })
      .populate("category", "name slug")
      .lean();

    if (!blogs || blogs.length === 0) {
      return NextResponse.json(
        { message: "No blogs found for this category" },
        { status: 404 }
      );
    }

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Error fetching blogs", error },
      { status: 500 }
    );
  }
}
