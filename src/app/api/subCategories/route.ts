import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { generateSlug } from "@/lib/utils";
import SubCategory from "@/models/subCategory.model";

// GET — all Subcategories (with parent info)
export async function GET() {
  try {
    await dbConnect();

    const categories = await SubCategory.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 }
    );
  }
}

//  POST — create category or subcategory
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, parentId } = await req.json();

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
      MainCategory: parentId || null, // link subcategory if exists
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

    //  Prevent deleting parent if it still has subcategories
    const hasChildren = await SubCategory.findOne({ parent: id });
    if (hasChildren) {
      return NextResponse.json(
        { message: "Cannot delete — category has subcategories." },
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
