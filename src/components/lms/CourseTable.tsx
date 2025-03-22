"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Pencil, Eye, Trash } from 'lucide-react'
import { toast } from "react-toastify"
import { getCourses, deleteCourse } from "@/api/client-operations"
import { me } from "@/api/client-operations"

// Define types
interface Course {
  id?: string;
  title: string;
  description: string;
  short_description?: string;
  long_description?: string;
  thumbnail: string;
  duration: number;
  is_published: boolean;
  instructor?: string;
  level?: string;
  prerequisites?: string[];
  tags?: string[];
  video_intro?: string;
  price?: number;
  created_at?: string;
  updated_at?: string;
}

interface CourseTableProps {
  searchTerm?: string
}

export function CourseTable({ searchTerm = "" }: CourseTableProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Fetch courses on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await me();
        setIsAdmin(userData?.role === "admin");
        
        const data = await getCourses()
        setCourses(data || [])
        setFilteredCourses(data || [])
      } catch (error) {
        console.error("Error fetching courses:", error)
        toast.error("Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter courses when searchTerm changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCourses(courses)
      return
    }

    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCourses(filtered)
  }, [searchTerm, courses])

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      toast.error("You don't have permission to delete courses");
      return;
    }
    
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      try {
        const result = await deleteCourse(id)

        if (result.success) {
          toast.success("Course deleted successfully")
          setCourses(courses.filter((course) => course.id !== id))
        } else {
          toast.error(result.message || "Failed to delete course")
        }
      } catch (err) {
        console.error("Error deleting course:", err)
        toast.error("Failed to delete course")
      }
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-3 mb-0">Loading courses...</p>
        </div>
      </div>
    )
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center p-5">
          {searchTerm ? (
            <p className="mb-0">No courses found matching "{searchTerm}"</p>
          ) : (
            <p className="mb-0">No courses found. Create your first course!</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="font-weight-bold">{course.title}</td>
                  <td className="text-truncate" style={{ maxWidth: "300px" }}>
                    {course.description}
                  </td>
                  <td>{course.duration} min</td>
                  <td>
                    <span className={`badge ${course.is_published ? "badge-success" : "badge-secondary"}`}>
                      {course.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{course.updated_at ? new Date(course.updated_at).toLocaleDateString() : "N/A"}</td>
                  <td className="text-right">
                    <div className="d-flex justify-content-end">
                      <Link href={`/dashboard/lms/courses/${course.id}`}>
                        <button className="btn btn-sm btn-outline-primary mr-2">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      {isAdmin && (
                        <>
                          <Link href={`/dashboard/lms/courses/${course.id}/edit`}>
                            <button className="btn btn-sm btn-outline-secondary mr-2">
                              <Pencil className="h-4 w-4" />
                            </button>
                          </Link>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => course.id && handleDelete(course.id)}>
                            <Trash className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}