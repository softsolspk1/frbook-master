import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Restrict access to `/admin`
  if (path.startsWith("/admin")) {
    const adminEmail = request.cookies.get("adminEmail")?.value;
    const adminPassword = request.cookies.get("adminPassword")?.value;

    // Replace with your specific admin credentials
    const validEmail = "admin@respire.com";
    const validPassword = "admin123";

    if (adminEmail !== validEmail || adminPassword !== validPassword) {
      // Redirect to login page if credentials are invalid
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to `/admin` and its subpaths
};
