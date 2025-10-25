import dbConnect from "@/lib/mongodb";
import Meta from "@/models/meta.model";
import { NextResponse } from "next/server";


export async function GET() {
  await dbConnect();
  const meta = await Meta.findOne({ key: "blogs" });
  return NextResponse.json({ updatedAt: meta?.updatedAt || null });
}
