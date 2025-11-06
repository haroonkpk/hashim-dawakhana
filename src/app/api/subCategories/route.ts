import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { generateSlug } from "@/lib/utils";
import { Blog, SubCategory } from "@/models";

// GET — all Subcategories (with parent info)
export async function GET() {
  try {
    await dbConnect();

    const categories = await SubCategory.find().sort({ createdAt: -1 }).lean();

    // map karke count add karna
    const withCounts = await Promise.all(
      categories.map(async (cat) => {
        const count = await Blog.countDocuments({ category: cat._id });
        return { ...cat.toObject(), count };
      })
    );

    return NextResponse.json(withCounts, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 }
    );
  }
}

//  POST — create subcategory
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name } = await req.json();

    if (!name)
      return NextResponse.json(
        { message: "Category name required" },
        { status: 400 }
      );

    const slug = generateSlug(name);
    const existing = await SubCategory.findOne({ slug });
    if (existing)
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 409 }
      );

    const category = await SubCategory.create({
      name,
      slug,
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE — delete category by ID
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Category ID required" },
        { status: 400 }
      );
    }

    const deleted = await SubCategory.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
