"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import WithUserLayout from "@/layout/WithUserLayout"
import type { User } from "@/layout/LayoutTypes"
import "../dashboard/global.css" // Keep your global CSS import

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [friends, setFriends] = useState<User[]>([])
  const [notFriends, setNotFriends] = useState<User[]>([])

  // Default user
  const defaultUser: User = {
    id: 1,
    name: "User",
    email: "user@example.com",
  }

  // Function to reload friends data
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
      loaderName="user"
      user={defaultUser}
    >
      <div className="flex min-h-screen flex-col">{children}</div>
    </WithUserLayout>
  )
}

