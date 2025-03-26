"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, GraduationCap, Menu, Search, User, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function UserHeader() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-100 text-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white text-gray-800">
              <nav className="flex flex-col gap-4 pt-4">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span>LMS Platform</span>
                </Link>
                <Link
                  href="/"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === "/" ? "bg-primary text-white" : "hover:bg-gray-200"
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/user/courses"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === "/user/courses" || pathname.startsWith("/user/courses/")
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200"
                  )}
                >
                  Courses
                </Link>
                <Link
                  href="/user/my-learning"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === "/user/my-learning" || pathname.startsWith("/user/my-learning/")
                      ? "bg-primary text-white"
                      : "hover:bg-gray-200"
                  )}
                >
                  My Learning
                </Link>
                <Link
                  href="/user/about"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === "/user/about" ? "bg-primary text-white" : "hover:bg-gray-200"
                  )}
                >
                  About
                </Link>
                <Link
                  href="/user/contact"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === "/user/contact" ? "bg-primary text-white" : "hover:bg-gray-200"
                  )}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">LMS Platform</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-gray-600"
              )}
            >
              Home
            </Link>
            <Link
              href="/user/courses"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/user/courses" || pathname.startsWith("/user/courses/")
                  ? "text-primary"
                  : "text-gray-600"
              )}
            >
              Courses
            </Link>
            <Link
              href="/user/my-learning"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/user/my-learning" || pathname.startsWith("/user/my-learning/")
                  ? "text-primary"
                  : "text-gray-600"
              )}
            >
              My Learning
            </Link>
            <Link
              href="/user/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/user/about" ? "text-primary" : "text-gray-600"
              )}
            >
              About
            </Link>
            <Link
              href="/user/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/user/contact" ? "text-primary" : "text-gray-600"
              )}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-[200px] md:w-[300px] bg-gray-50 text-gray-800"
              />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4 text-gray-600" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5 text-gray-600" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          {isAuthenticated ? (
            <>
              <Link href="/user/notifications">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full border border-gray-300 h-8 w-8">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white text-gray-800">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/user/my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/certificates">Certificates</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary text-white">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

