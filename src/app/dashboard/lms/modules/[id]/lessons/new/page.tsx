// src/app/dashboard/lms/modules/[id]/lessons/new/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import WithUserLayout from "@/layout/WithUserLayout"
import { me, getModule } from "@/api/client-operations"
import { toast } from "react-toastify"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import type { User } from "@/layout/LayoutTypes"

interface Module {
  id: string
  title: string
}

interface LessonFormData {
  title: string
  content: string
  type: string
  order: number
  duration: number
}

export default function NewLessonPage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params?.id as string

  const [user, setUser] = useState<User | undefined>(undefined)
  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<LessonFormData>({
    title: "",
    content: "",
    type: "video",
    order: 1,
    duration: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await me()
        setUser(userData)

        const moduleData = await getModule(moduleId)
        setModule(moduleData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load module data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [moduleId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      // Implement createLesson API call
      // const lessonData = {
      //   ...formData,
      //   module_id: moduleId,
      // }
      // const result = await createLesson(lessonData)

      // Simulate success for now
      const result = { success: true }

      if (result.success) {
        toast.success("Lesson created successfully")
        router.push(`/dashboard/lms/modules/${moduleId}`)
      } else {
        toast.error("An error occurred")
      }
    } catch (error) {
      console.error("Error submitting lesson:", error)
      toast.error("An error occurred while saving the lesson")
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
                  <Link href={`/dashboard/lms/modules/${moduleId}`}>
                    <button className="btn btn-outline-secondary">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Module
                    </button>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-4">
                  <h1 className="text-3xl font-bold">Create New Lesson</h1>
                  <p className="text-muted">
                    Add a new lesson to {module ? `"${module.title}"` : "this module"}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="title">Lesson Title</label>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter lesson title"
                            required
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="type">Lesson Type</label>
                          <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="video">Video</option>
                            <option value="text">Text</option>
                            <option value="quiz">Quiz</option>
                            <option value="assignment">Assignment</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="content">Content</label>
                          <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Enter lesson content"
                            rows={5}
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
                            placeholder="Enter lesson order"
                            min={1}
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="duration">Duration (minutes)</label>
                          <input
                            id="duration"
                            name="duration"
                            type="number"
                            value={formData.duration}
                            onChange={handleNumberChange}
                            placeholder="Enter lesson duration in minutes"
                            min={0}
                            className="form-control"
                          />
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                          <button
                            type="button"
                            onClick={() => router.push(`/dashboard/lms/modules/${moduleId}`)}
                            className="btn btn-outline-secondary mr-2"
                          >
                            Cancel
                          </button>
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting ? "Saving..." : "Create Lesson"}
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