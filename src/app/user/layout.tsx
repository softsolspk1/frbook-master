

import type React from "react"
import { UserHeader } from "@/components/user/header"
import { UserFooter } from "@/components/user/footer"
import "../dashboard/global.css" // Import the LMS-specific styles
// import "../../app/lms-styles.css" // Import the LMS-specific styles


export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />
      <main className="flex-1">{children}</main>
      <UserFooter />
    </div>
  )
}



