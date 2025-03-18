"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { createCourse, updateCourse } from "@/api/client-operations"

// Define types
interface Course {
  id?: string
  title: string
  description: string
  thumbnail: string
  duration: number
  is_published: boolean
}

interface CourseFormProps {
  course?: Course | null;
  onSubmit?: (course: Course) => Promise<void>; // Add onSubmit prop
}

export function CourseForm({ course = null, onSubmit }: CourseFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Course>({
    title: course?.title || "",
    description: course?.description || "",
    thumbnail: course?.thumbnail || "",
    duration: course?.duration || 0,
    is_published: course?.is_published || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseInt(value) || 0 }))
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, is_published: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      if (onSubmit) {
        await onSubmit(formData); // Call onSubmit if provided
      } else {
        let result;
        if (course?.id) {
          result = await updateCourse(course.id, formData);
        } else {
          result = await createCourse(formData);
        }
  
        if (result.success) {
          toast.success(course ? "Course updated successfully" : "Course created successfully");
          router.push(course ? `/dashboard/lms/courses/${course.id}` : "/dashboard/lms/courses");
        } else {
          toast.error(result.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error submitting course:", error);
      toast.error("An error occurred while saving the course");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
              rows={5}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="thumbnail">Thumbnail URL</label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="text"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="Enter thumbnail URL"
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
              placeholder="Enter course duration in minutes"
              min={0}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-switch">
              <input
                id="is_published"
                name="is_published"
                type="checkbox"
                checked={formData.is_published}
                onChange={handleSwitchChange}
                className="custom-control-input"
              />
              <label className="custom-control-label" htmlFor="is_published">
                Publish course
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              type="button"
              onClick={() => router.push(course ? `/dashboard/lms/courses/${course.id}` : "/dashboard/lms/courses")}
              className="btn btn-outline-secondary mr-2"
            >
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? "Saving..." : course ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

