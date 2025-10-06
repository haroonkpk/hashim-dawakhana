import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 🧠 Skip API routes
  if (path.startsWith("/api")) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  const verified = token ? verifyToken(token) : null;

  const publicPaths = ["/admin/login", "/admin/create-admin"];

  // 🛡️ Protect all /admin routes except public ones
  if (path.startsWith("/admin") && !publicPaths.includes(path)) {
    if (!verified) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // 🔄 If logged in and visiting login page, redirect to dashboard
  if (path === "/admin/login" && verified) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs", 
};
