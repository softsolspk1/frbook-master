"use client"

import { useEffect, useState, useCallback } from "react"
import { Container, Row, Col } from "reactstrap"
import WithUserLayout from "@/layout/WithUserLayout"
import type { User } from "@/layout/LayoutTypes"
import { CourseCard } from "@/components/course-card"
import { courses } from "@/utils/courses"

// Use the standard Next.js page component pattern
export default function Page() {
  const [friends, setFriends] = useState<User[]>([])
  const [notFriends, setNotFriends] = useState<User[]>([])

  // Create a default user object
  const defaultUser: User = {
    id: 1, // Number instead of string
    name: "User",
    email: "user@example.com",
  }

  // Use useCallback to prevent reloadAllFr from changing on every render
  const reloadAllFr = useCallback(async () => {
    var resp = await fetch(`/api/friends`)
    if (resp.status === 200) {
      var data = await resp.json()
      setFriends(data)
    } else {
      setFriends([])
    }

    var resp2 = await fetch(`/api/notfriends`)
    if (resp2.status === 200) {
      var data2 = await resp2.json()
      setNotFriends(data2)
    } else {
      setNotFriends([])
    }
  }, [])

  useEffect(() => {
    reloadAllFr()
  }, [reloadAllFr])

  return (
    <WithUserLayout
      friends={friends}
      notfriends={notFriends}
      reloadFriends={reloadAllFr}
      loaderName="courses"
      user={defaultUser}
    >
      <div className="page-center">
        <div className="pb-2">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                E-LEARNING COURSES
              </h2>
            </div>
          </div>
        </div>
        <Container fluid className="px-0">
          <div className="page-content">
            <div className="content-center content-full w-100">
              <Row>
                <Col xl="12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </WithUserLayout>
  )
}
