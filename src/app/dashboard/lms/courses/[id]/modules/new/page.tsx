// src/app/dashboard/lms/courses/[id]/modules/new/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import WithUserLayout from "@/layout/WithUserLayout"
import { me, getCourseById, createModule } from "@/api/client-operations"
import { toast } from "react-toastify"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import type { User } from "@/layout/LayoutTypes"

interface Course {
  id: string
  title: string
}

interface ModuleFormData {
  title: string
  order: number
}

export default function NewModulePage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params?.id as string

  const [user, setUser] = useState<User | undefined>(undefined)
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ModuleFormData>({
    title: "",
    order: 1,
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const moduleData = {
        ...formData,
        course_id: courseId,
      }

      const result = await createModule(moduleData)

      if (result.success) {
        toast.success("Module created successfully")
        router.push(`/dashboard/lms/courses/${courseId}`)
      } else {
        toast.error(result.message || "An error occurred")
      }
    } catch (error) {
      console.error("Error submitting module:", error)
      toast.error("An error occurred while saving the module")
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="title">Module Title</label>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter module title"
                            required
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="order">Order</label>
                          <input
                            id="order"
                            name="order"
                            type="number"
                            value={formData.order}
                            onChange={handleNumberChange}
                            placeholder="Enter module order"
                            min={1}
                            className="form-control"
                          />
                          <small className="form-text text-muted">
                            The order in which this module appears in the course
                          </small>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                          <button
                            type="button"
                            onClick={() => router.push(`/dashboard/lms/courses/${courseId}`)}
                            className="btn btn-outline-secondary mr-2"
                          >
                            Cancel
                          </button>
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting ? "Saving..." : "Create Module"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithUserLayout>
  )
}