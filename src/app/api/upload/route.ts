import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const { image } = await req.json(); // base64 string from client

    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "blog-images", // optional folder name
    });

    return NextResponse.json({ url: uploaded.secure_url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Image upload failed" },
      { status: 500 }
    );
  }
}
