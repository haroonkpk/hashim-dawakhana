import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { generateSlug } from "@/lib/utils";
import mongoose from "mongoose";
import { Blog } from "@/models";

//  GET — All blogs
export async function GET() {
  try {
    await dbConnect();

    const blogs = await Blog.find({}, "slug title image category author date")
      .populate("category", "name slug")
      .lean();

    console.log("GET /api/blogs -> found", blogs?.length ?? 0, "blogs");
    if (!blogs) {
      return NextResponse.json({ message: "blog not found" }, { status: 500 });
    }

    return NextResponse.json(blogs, { status: 200 });
  } catch (error: unknown) {
    console.error("Error in GET /api/blogs:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Error fetching blogs", error: message },
      { status: 500 }
    );
  }
}

// POST — Create blog
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { title, image, category, author } = body;

    if (!title || !image || !category || !author) {
      console.warn("POST /api/blogs validation failed:", { title, image, category, author });
      return NextResponse.json({ error: "title, image, category and author are required" }, { status: 400 });
    }

    const blog = new Blog({
      title,
      slug: generateSlug(title),
      image,
      category: category,
      author,
    });

    await blog.save();

    return NextResponse.json(blog, { status: 201 });
  } catch (error: unknown) {
    console.error("Error in POST /api/blogs:", error);
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT — Add new block to a blog
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { Id, block } = await req.json();

    if (!Id || !block) {
      return NextResponse.json(
        { error: "Id and blocks are required" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      Id,
      { $push: { blocks: { $each: [block] } } },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBlog);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE — Remove blog by ID
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
