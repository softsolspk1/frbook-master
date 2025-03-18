// src/app/dashboard/lms/modules/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import WithUserLayout from "@/layout/WithUserLayout"
import { me, getModule, getLessonsForModule } from "@/api/client-operations"
import { toast } from "react-toastify"
import Link from "next/link"
import { ArrowLeft, Edit, Plus, Trash } from 'lucide-react'
import type { User } from "@/layout/LayoutTypes"

interface Module {
  id: string
  title: string
  course_id: string
  order: number
  created_at: string
  updated_at: string
}

interface Lesson {
  id: string
  title: string
  content: string
  type: string
  order: number
  duration: number
  module_id: string
}

export default function ModuleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [user, setUser] = useState<User | undefined>(undefined)
  const [module, setModule] = useState<Module | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await me()
        setUser(userData)

        const moduleData = await getModule(id)
        setModule(moduleData)

        const lessonsData = await getLessonsForModule(id)
        setLessons(lessonsData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load module data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleDeleteModule = async () => {
    if (confirm("Are you sure you want to delete this module? This action cannot be undone.")) {
      try {
        // Call your delete API here
        // await deleteModule(id)
        toast.success("Module deleted successfully")
        if (module?.course_id) {
          router.push(`/dashboard/lms/courses/${module.course_id}`)
        } else {
          router.push("/dashboard/lms/modules")
        }
      } catch (error) {
        console.error("Error deleting module:", error)
        toast.error("Failed to delete module")
      }
    }
  }

  return (
    <WithUserLayout user={user} loaderName={loading ? "defaultLoader" : ""}>
      <div className="content-center">
        <div className="container-fluid section-t-space px-0">
          <div className="page-content">
            <div className="content-center w-100">
              {/* Back button and actions */}
              <div className="row mb-4">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  {module?.course_id ? (
                    <Link href={`/dashboard/lms/courses/${module.course_id}`}>
                      <button className="btn btn-outline-secondary">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Course
                      </button>
                    </Link>
                  ) : (
                    <Link href="/dashboard/lms/modules">
                      <button className="btn btn-outline-secondary">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Modules
                      </button>
                    </Link>
                  )}

                  <div>
                    <Link href={`/dashboard/lms/modules/${id}/edit`}>
                      <button className="btn btn-primary mr-2">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Module
                      </button>
                    </Link>
                    <button className="btn btn-danger" onClick={handleDeleteModule}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Module
                    </button>
                  </div>
                </div>
              </div>

              {/* Module details */}
              {module && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <h1 className="card-title h3 mb-3">{module.title}</h1>
                        <div className="d-flex mb-3">
                          <span className="text-muted">Order: {module.order}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lessons section */}
              <div className="row">
                <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
                  <h2 className="h4 mb-0">Module Lessons</h2>
                  <Link href={`/dashboard/lms/modules/${id}/lessons/new`}>
                    <button className="btn btn-sm btn-primary">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Lesson
                    </button>
                  </Link>
                </div>

                <div className="col-12">
                  {lessons.length > 0 ? (
                    <div className="card">
                      <div className="list-group list-group-flush">
                        {lessons.map((lesson, index) => (
                          <div key={lesson.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5 className="mb-1">{lesson.title}</h5>
                                <p className="mb-0 text-muted">
                                  {lesson.type} • {lesson.duration} min
                                </p>
                              </div>
                              <div>
                                <Link href={`/dashboard/lms/lessons/${lesson.id}`}>
                                  <button className="btn btn-sm btn-outline-primary mr-2">View</button>
                                </Link>
                                <Link href={`/dashboard/lms/lessons/${lesson.id}/edit`}>
                                  <button className="btn btn-sm btn-outline-secondary mr-2">Edit</button>
                                </Link>
                                <button className="btn btn-sm btn-outline-danger">Delete</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="card">
                      <div className="card-body text-center py-5">
                        <p className="mb-3">No lessons found for this module.</p>
                        <Link href={`/dashboard/lms/modules/${id}/lessons/new`}>
                          <button className="btn btn-primary">
                            <Plus className="h-4 w-4 mr-2" />
                            Create First Lesson
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithUserLayout>
  )
}