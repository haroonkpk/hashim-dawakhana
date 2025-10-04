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
    const { title, image, category, author, blocks } = body;

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
      blocks,
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
