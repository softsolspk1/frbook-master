"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, ChevronDown, GraduationCapIcon as Graduation, LayoutDashboard, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Graduation className="h-6 w-6" />
            <span>LMS Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                pathname === "/admin"
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            <NavGroup
              title="Courses"
              icon={<Book className="h-4 w-4" />}
              isActive={pathname.includes("/admin/courses")}
            >
              <NavSubGroup title="Manage Courses">
                <NavLink href="/admin/courses" isActive={pathname === "/admin/courses"}>
                  Courses List
                </NavLink>
                <NavLink href="/admin/courses/new" isActive={pathname === "/admin/courses/new"}>
                  Add Course
                </NavLink>
              </NavSubGroup>
              <NavLink href="/admin/courses/categories" isActive={pathname === "/admin/courses/categories"}>
                Course Categories
              </NavLink>
            </NavGroup>

            <NavGroup title="Users" icon={<Users className="h-4 w-4" />} isActive={pathname.includes("/admin/users")}>
              <NavSubGroup title="Admins">
                <NavLink href="/admin/users/admins" isActive={pathname === "/admin/users/admins"}>
                  Manage Admins
                </NavLink>
                <NavLink href="/admin/users/admins/new" isActive={pathname === "/admin/users/admins/new"}>
                  Add New Admin
                </NavLink>
              </NavSubGroup>
              <NavSubGroup title="Students">
                <NavLink href="/admin/users/students" isActive={pathname === "/admin/users/students"}>
                  Manage Students
                </NavLink>
                <NavLink href="/admin/users/students/new" isActive={pathname === "/admin/users/students/new"}>
                  Add New Student
                </NavLink>
              </NavSubGroup>
            </NavGroup>

            <Link
              href="/admin/settings"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                pathname === "/admin/settings"
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

interface NavGroupProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  isActive?: boolean
}

function NavGroup({ title, icon, children, isActive }: NavGroupProps) {
  return (
    <Collapsible defaultOpen={isActive}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex w-full items-center justify-between px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
            isActive && "text-gray-900 dark:text-gray-50",
          )}
        >
          <div className="flex items-center gap-3">
            {icon}
            <span>{title}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 pt-1">{children}</CollapsibleContent>
    </Collapsible>
  )
}

interface NavSubGroupProps {
  title: string
  children: React.ReactNode
}

function NavSubGroup({ title, children }: NavSubGroupProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between px-3 py-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        >
          <span>{title}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 pt-1">{children}</CollapsibleContent>
    </Collapsible>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive
          ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
      )}
    >
      {children}
    </Link>
  )
}

