import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog.model";
import { generateSlug } from "@/lib/utils";

// GET all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({});
    return NextResponse.json(blogs);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// POST a new blog
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title, image, category, author } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = generateSlug(title);

    const blog = new Blog({
      title,
      slug,
      image,
      category,
      author,
    }); 

    await blog.save();

    return NextResponse.json(blog, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}


// PUT — Add new blocks to an existing blog
export async function PUT(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { Id, block } = body;

    if (!Id || !block) {
      return NextResponse.json(
        { error: "Id and blocks are required" },
        { status: 400 }
      );
    }

    // Add new blocks without removing existing ones
    const updatedBlog = await Blog.findByIdAndUpdate(
      Id,
      { $push: { blocks: { $each: [block] } } },
      { new: true } // return updated document
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
