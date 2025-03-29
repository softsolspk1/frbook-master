import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { me } from "./api/operations"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  var token = request.cookies.get("jwt")?.value

  // Check for admin credentials in cookies (set by AuthenticationForm)
  const adminEmail = request.cookies.get("adminEmail")?.value
  const adminPassword = request.cookies.get("adminPassword")?.value

  // Allow direct access to admin route if admin credentials are present
  if (path === "/admin" && adminEmail === "admin@respire.com" && adminPassword === "admin123") {
    return NextResponse.next()
  }

  if (path.split("/")[1] == "home") {
    if (token) {
      return NextResponse.redirect(new URL(`/dashboard/feed`, request.url))
    }
    return NextResponse.next()
  }

  if (path.split("/")[1] === "login" || path.split("/")[1] === "register") {
    return NextResponse.next()
  }

  if (!token) {
    if (path.split("/")[1] === "login" || path.split("/")[1] === "register") {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL(`/login`, request.url))
  }

  var meR = await me()

  if (meR) {
    if (meR.verified == false || !meR.verified) {
      return NextResponse.redirect(new URL(`/verification`, request.url))
    } else {
      if (path.split("/")[1] === "mid") {
        return NextResponse.redirect(new URL(`/dashboard/feed`, request.url))
      } else {
        return NextResponse.next()
      }
    }
  } else {
    return NextResponse.redirect(new URL(`/login`, request.url))
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
    "/admin", // Added admin path to the matcher
  ],
}

