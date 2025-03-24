import type React from "react"
import { Sidebar } from "@/components/admin/sidebar"
import "../dashboard/global.css" // Import the global CSS from dashboard

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">{children}</main>
    </div>
  )
}

