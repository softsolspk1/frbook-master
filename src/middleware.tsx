import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { me } from "./api/operations";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("jwt")?.value;

  // Restrict access to `/admin`
  if (path.startsWith("/admin")) {
    const adminEmail = request.cookies.get("adminEmail")?.value;
    const adminPassword = request.cookies.get("adminPassword")?.value;

    // Replace with your specific admin credentials
    const validEmail = "admin@respire.com";
    const validPassword = "admin123";

    if (adminEmail !== validEmail || adminPassword !== validPassword) {
      return NextResponse.redirect(new URL("/auth/login", request.url)); // Redirect to login page
    }
  }

  if (path.split("/")[1] == "home") {
    if (token) {
      return NextResponse.redirect(new URL(`/dashboard/feed`, request.url));
    }
    return NextResponse.next();
  }

  if (path === "/login" || path === "/register") {
    return NextResponse.next(); // Allow access to `/login` and `/register`
  }

  if (path.split("/")[1] === "login" || path.split("/")[1] === "register") {
    return NextResponse.next();
  }

  if (!token) {
    if (path.split("/")[1] === "login" || path.split("/")[1] === "register") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  const meR = await me();

  if (meR) {
    if (meR.verified == false || !meR.verified) {
      return NextResponse.redirect(new URL(`/verification`, request.url));
    } else {
      if (path.split("/")[1] === "mid") {
        return NextResponse.redirect(new URL(`/dashboard/feed`, request.url));
      } else {
        return NextResponse.next();
      }
    }
  } else {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/mid",
    "/register",
    "/auth/:path*",
    "/authentication/:path*",
    "/company/:path*",
    "/dashboard/feed",
    "/helpandsupport",
    "/newsfeed/:path*",
    "/dashboard/profile/:path*",
    "/profile",
    "/settings",
    "/admin/:path*", // Apply middleware to `/admin` and its subpaths
  ],
};
