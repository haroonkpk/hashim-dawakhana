import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user.model";

export async function POST() {
  await dbConnect();

  const existing = await User.findOne({ email: "haroon@gmail.com" });
  if (existing) {
    return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash("123456", 10);

  const admin = await User.create({
    name: "Super Admin",
    email: "haroon@gmail.com",
    password: hashed,
  });

  return NextResponse.json({ message: "Admin created", admin });
}
