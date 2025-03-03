"use client"

import { type FC, useEffect, useState } from "react"
import { Container, Row, Col } from "reactstrap"
import WithUserLayout from "@/layout/WithUserLayout"
import type { User } from "@/layout/LayoutTypes"
import { courses } from "@/utils/courses"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { notFound } from "next/navigation"

interface CoursePageProps {
  params: {
    courseId: string
  }
  user: User
}

const CoursePage: FC<CoursePageProps> = ({ params, user }) => {
  const [friends, setFriends] = useState<User[]>([])
  const [notFriends, setNotFriends] = useState<User[]>([])

  const course = courses.find((c) => c.id === params.courseId)

  const reloadAllFr = async () => {
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
  }

  useEffect(() => {
    reloadAllFr()
  }, []) // Removed user from dependencies

  if (!course) {
    notFound()
  }

  return (
    <WithUserLayout
      friends={friends}
      notfriends={notFriends}
      reloadFriends={reloadAllFr}
      loaderName="course-details"
      user={user}
    >
      <div className="page-center">
        <div className="pb-2">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <Link href="/dashboard/E-learning/courses" className="flex items-center text-sm mb-4 hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to courses
              </Link>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {course.title}
              </h2>
            </div>
          </div>
        </div>
        <Container fluid className="px-0">
          <div className="page-content">
            <div className="content-center content-full w-100">
              <Row>
                <Col xl="8">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  </div>
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-semibold">Course Description</h3>
                    <p>{course.description}</p>
                    <h3 className="text-xl font-semibold">What You'll Learn</h3>
                    <ul>
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                    <h3 className="text-xl font-semibold">Course Content</h3>
                    <p>{course.content}</p>
                  </div>
                </Col>
                <Col xl="4">
                  <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h3 className="text-xl font-semibold mb-4">Course Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>
                        <p className="font-medium">{course.instructor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Level</p>
                        <p className="font-medium">{course.level}</p>
                      </div>
                      <div className="pt-4">
                        <button className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium">
                          Enroll Now
                        </button>
                      </div>
                    </div>
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

export default CoursePage

