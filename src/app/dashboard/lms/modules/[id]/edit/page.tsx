// src/app/dashboard/lms/modules/[id]/edit/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import WithUserLayout from "@/layout/WithUserLayout"
import { me, getModule, updateModule } from "@/api/client-operations"
import { toast } from "react-toastify"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import type { User } from "@/layout/LayoutTypes"

interface Module {
  id: string
  title: string
  course_id: string
  order: number
}

export default function EditModulePage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [user, setUser] = useState<User | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Module>({
    id: "",
    title: "",
    course_id: "",
    order: 1,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await me()
        setUser(userData)

        const moduleData = await getModule(id)
        setFormData(moduleData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load module data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

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
      const result = await updateModule(id, formData)

      if (result.success) {
        toast.success("Module updated successfully")
        router.push(`/dashboard/lms/modules/${id}`)
      } else {
        toast.error(result.message || "An error occurred")
      }
    } catch (error) {
      console.error("Error updating module:", error)
      toast.error("An error occurred while updating the module")
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
                  <Link href={`/dashboard/lms/modules/${id}`}>
                    <button className="btn btn-outline-secondary">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Module
                    </button>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-4">
                  <h1 className="text-3xl font-bold">Edit Module</h1>
                  <p className="text-muted">Update module details</p>
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
                            onClick={() => router.push(`/dashboard/lms/modules/${id}`)}
                            className="btn btn-outline-secondary mr-2"
                          >
                            Cancel
                          </button>
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting ? "Saving..." : "Update Module"}
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