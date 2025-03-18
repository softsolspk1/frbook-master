// src/app/dashboard/lms/modules/page.tsx
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import WithUserLayout from "@/layout/WithUserLayout"
import { PlusCircle, Search } from 'lucide-react'
import Link from "next/link"
import { me, getCourseById } from "@/api/client-operations"
import { toast } from "react-toastify"
import type { User } from "@/layout/LayoutTypes"

interface Course {
  id: string
  title: string
}

export default function ModulesPage() {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [friends, setFriends] = useState<User[]>([]);
  const [notfriends, setNotFriends] = useState<User[]>([]);
  const [friendsLoading, setFriendsLoading] = useState(false);


  const reloadAllFriends = async () => {
        setFriendsLoading(true);

    try {
      const resp = await fetch(`/api/friends`);
      setFriends(resp.status === 200 ? await resp.json() : []);
      const resp2 = await fetch(`/api/notfriends`);
      setNotFriends(resp2.status === 200 ? await resp2.json() : []);
    } catch (error) {
      console.error("Error fetching friends data:", error);
      setFriends([]);
      setNotFriends([]);
    }
    finally {
        setFriendsLoading(false);
      }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await me()
        setUser(userData)

        const courseData = await getCourseById()
        setCourses(courseData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    reloadAllFriends()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredCourses = courses.filter(
    (course) => course.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <WithUserLayout user={user} friends={friends} notfriends={notfriends} reloadFriends={reloadAllFriends} loaderName={loading ? "defaultLoader" : ""}
>
      
        <div className="page-center">
            <div className="container-fluid section-t-space px-0">
                <div className="page-content">
                    <div className="content-center content-full w-100">
              <div className="row">
                <div className="col-12 d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">Modules</h1>
                    <p className="text-muted">Manage your course modules</p>
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12">
                  <div className="d-flex">
                    <div className="position-relative flex-grow-1">
                      <Search className="position-absolute" style={{ left: "10px", top: "10px" }} />
                      <input
                        type="search"
                        placeholder="Search courses..."
                        className="form-control pl-5"
                        style={{ paddingLeft: "40px" }}
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                    <button className="btn btn-outline-secondary ml-2">Filters</button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {loading ? (
                    <div className="card">
                      <div className="card-body text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                        <p className="mt-3 mb-0">Loading courses...</p>
                      </div>
                    </div>
                  ) : filteredCourses.length === 0 ? (
                    <div className="card">
                      <div className="card-body text-center p-5">
                        <p className="mb-0">No courses found. Create your first course to add modules!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="card">
                      <div className="card-body p-0">
                        <div className="list-group list-group-flush">
                          {filteredCourses.map((course) => (
                            <div key={course.id} className="list-group-item">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h5 className="mb-1">{course.title}</h5>
                                </div>
                                <div>
                                  <Link href={`/dashboard/lms/courses/${course.id}`}>
                                    <button className="btn btn-sm btn-outline-primary mr-2">View Course</button>
                                  </Link>
                                  <Link href={`/dashboard/lms/courses/${course.id}/modules/new`}>
                                    <button className="btn btn-sm btn-primary">
                                      <PlusCircle className="h-4 w-4 mr-1" />
                                      Add Module
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
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