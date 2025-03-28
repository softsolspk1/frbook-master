"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "@/components/admin/sidebar"
import WithUserLayout from "@/layout/WithUserLayout"
import type { User } from "@/layout/LayoutTypes"
import "../dashboard/global.css" // Keep your global CSS import

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [friends, setFriends] = useState<User[]>([])
  const [notFriends, setNotFriends] = useState<User[]>([])

  // Default admin user
  const defaultUser: User = {
    id: 1,
    name: "Admin User",
    email: "admin@respire.com",
  }

  // Function to reload friends
  const reloadAllFriends = useCallback(async () => {
    try {
      const resp = await fetch(`/api/friends`)
      if (resp.status === 200) {
        const data = await resp.json()
        setFriends(data)
      } else {
        setFriends([])
      }

      const resp2 = await fetch(`/api/notfriends`)
      if (resp2.status === 200) {
        const data2 = await resp2.json()
        setNotFriends(data2)
      } else {
        setNotFriends([])
      }
    } catch (error) {
      console.error("Error loading friends:", error)
    }
  }, [])

  useEffect(() => {
    reloadAllFriends()
  }, [reloadAllFriends])

  return (
    <WithUserLayout
      friends={friends}
      notfriends={notFriends}
      reloadFriends={reloadAllFriends}
      loaderName="admin"
      user={defaultUser}
    >
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1  bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </WithUserLayout>
  )
}

