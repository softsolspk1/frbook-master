// src/app/dashboard/lms/courses/[id]/modules/new/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import WithUserLayout from "@/layout/WithUserLayout"
import { ModuleForm } from "@/components/lms/ModuleForm"
import { me, getCourseById } from "@/api/client-operations"
import { toast } from "react-toastify"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import type { User } from "@/layout/LayoutTypes"

interface Course {
  id: string
  title: string
}

export default function NewModulePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params?.id as string

  const [user, setUser] = useState<User | undefined>(undefined)
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await me()
        setUser(userData)

        const courseData = await getCourseById(courseId)
        setCourse(courseData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load course data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [courseId])

  return (
    <WithUserLayout user={user} loaderName={loading ? "defaultLoader" : ""}>
      <div className="content-center">
        <div className="container-fluid section-t-space px-0">
          <div className="page-content">
            <div className="content-center w-100">
              <div className="row mb-4">
                <div className="col-12">
                  <Link href={`/dashboard/lms/courses/${courseId}`}>
                    <button className="btn btn-outline-secondary">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Course
                    </button>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-4">
                  <h1 className="text-3xl font-bold">Create New Module</h1>
                  <p className="text-muted">
                    Add a new module to {course ? `"${course.title}"` : "this course"}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <ModuleForm courseId={courseId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithUserLayout>
  )
}