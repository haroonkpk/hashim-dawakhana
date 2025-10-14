import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog.model";
import { generateSlug } from "@/lib/utils";
import mongoose from "mongoose";

// 🟢 GET — All blogs
export async function GET() {
  try {
    await dbConnect();

    const blogs = await Blog.find({}, "slug title image category author date")
  .populate("category", "name slug") 
  .lean();

  console.log(blogs)
  if(!blogs){
     return NextResponse.json(
      { message: "blog not found" },
      { status: 500 }
    );
  }

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
  console.error("Error in GET /api/blogs:", error); 
  return NextResponse.json(
    { message: "Errorff fetching blogs", error },
    { status: 500 }
  );
}

}

// 🟢 POST — Create blog
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { title, image, category, author } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
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
    const message =
      error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// 🟢 PUT — Add new block to a blog
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
    const message =
      error instanceof Error ? error.message : "Database error";
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
    const message =
      error instanceof Error ? error.message : "Database error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
