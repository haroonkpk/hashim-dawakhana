import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/category.model";
import { generateSlug } from "@/lib/utils"; 

export async function GET() {
  await dbConnect();
  const categories = await Category.find().sort({ createdAt: -1 });
  return NextResponse.json(categories);
}


export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "Category name required" }, { status: 400 });
    }

    const slug = generateSlug(name);

    const existing = await Category.findOne({ slug });
    if (existing) {
      return NextResponse.json({ message: "Category already exists" }, { status: 409 });
    }

    const category = await Category.create({ name, slug });
    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
