"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WithUserLayout from "@/layout/WithUserLayout";
import { me, getCourseById, getModulesForCourse, deleteCourse } from "@/api/client-operations";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft, Edit, Plus, Trash, Play, FileText, Clock, Calendar, Eye, Lock, User as Icon } from 'lucide-react';
import type { User } from "@/layout/LayoutTypes";

interface Course {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  long_description?: string;
  thumbnail: string;
  duration: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  instructor?: string;
  level?: string;
  prerequisites?: string[];
  tags?: string[];
  video_intro?: string;
  price?: number;
  enrollment_count?: number;
  rating?: number;
}

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  course_id: string;
  video_url?: string;
  duration?: number;
  is_free?: boolean;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [user, setUser] = useState<User | undefined>(undefined);
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [friends, setFriends] = useState<User[]>([]);
  const [notFriends, setNotFriends] = useState<User[]>([]);
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
    } finally {
      setFriendsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await me();
        setUser(userData);
        // Check if user has admin role
        setIsAdmin(userData?.role === "admin");

        const courseData = await getCourseById(id);
        setCourse(courseData);

        const modulesData = await getModulesForCourse(id);
        setModules(modulesData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load course data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    reloadAllFriends();
  }, [id]);

  const handleDeleteCourse = async () => {
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      try {
        await deleteCourse(id);
        toast.success("Course deleted successfully");
        router.push("/dashboard/lms/courses");
      } catch (error) {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete course");
      }
    }
  };

  return (
    <WithUserLayout user={user} friends={friends} notfriends={notFriends} reloadFriends={reloadAllFriends} loaderName={loading ? "defaultLoader" : ""}>
      <div className="content-center">
        <div className="container-fluid section-t-space px-0">
          <div className="page-content">
            <div className="content-center w-100">
              <div className="row mb-4">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <Link href="/dashboard/lms/courses">
                    <button className="btn btn-outline-secondary">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Courses
                    </button>
                  </Link>
                  {isAdmin && (
                    <div>
                      <Link href={`/dashboard/lms/courses/${id}/edit`}>
                        <button className="btn btn-primary mr-2">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Course
                        </button>
                      </Link>
                      <button className="btn btn-danger" onClick={handleDeleteCourse}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete Course
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {course && (
                <>
                  {/* Course Header with Thumbnail and Basic Info */}
                  <div className="row mb-4">
                    <div className="col-md-4 mb-4 mb-md-0">
                      <div className="card h-100">
                        <div className="position-relative">
                          {course.thumbnail ? (
                            <img 
                              src={course.thumbnail || "/placeholder.svg"} 
                              alt={course.title} 
                              className="card-img-top" 
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                          ) : (
                            <div 
                              className="bg-light d-flex justify-content-center align-items-center" 
                              style={{ height: "200px" }}
                            >
                              <p className="text-muted">No thumbnail available</p>
                            </div>
                          )}
                          {course.video_intro && (
                            <div className="position-absolute" style={{ bottom: "10px", right: "10px" }}>
                              <button 
                                className="btn btn-primary rounded-circle" 
                                data-toggle="modal" 
                                data-target="#introVideoModal"
                              >
                                <Play className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{course.title}</h5>
                          <p className="card-text text-muted">{course.short_description || course.description}</p>
                          
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className={`badge ${course.is_published ? "badge-success" : "badge-secondary"}`}>
                              {course.is_published ? "Published" : "Draft"}
                            </span>
                            {course.price !== undefined && (
                              <span className="font-weight-bold">
                                {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-8">
                      <div className="card h-100">
                        <div className="card-body">
                          <h1 className="card-title h3 mb-3">{course.title}</h1>
                          
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="d-flex align-items-center mb-2">
                                <Clock className="h-4 w-4 mr-2 text-primary" />
                                <span>Duration: {course.duration} minutes</span>
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <Calendar className="h-4 w-4 mr-2 text-primary" />
                                <span>Created: {new Date(course.created_at).toLocaleDateString()}</span>
                              </div>
                              <div className="d-flex align-items-center mb-2">
                                <Calendar className="h-4 w-4 mr-2 text-primary" />
                                <span>Updated: {new Date(course.updated_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              {course.instructor && (
                                <div className="d-flex align-items-center mb-2">
                                  <Icon className="h-4 w-4 mr-2 text-primary" />
                                  <span>Instructor: {course.instructor}</span>
                                </div>
                              )}
                              {course.level && (
                                <div className="d-flex align-items-center mb-2">
                                  <FileText className="h-4 w-4 mr-2 text-primary" />
                                  <span>Level: {course.level}</span>
                                </div>
                              )}
                              {course.enrollment_count !== undefined && (
                                <div className="d-flex align-items-center mb-2">
                                  <Eye className="h-4 w-4 mr-2 text-primary" />
                                  <span>Enrollments: {course.enrollment_count}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <h5 className="mb-3">About this course</h5>
                          <p className="card-text">{course.long_description || course.description}</p>
                          
                          {course.prerequisites && course.prerequisites.length > 0 && (
                            <div className="mt-4">
                              <h5 className="mb-2">Prerequisites</h5>
                              <ul className="list-group list-group-flush">
                                {course.prerequisites.map((prereq, index) => (
                                  <li key={index} className="list-group-item bg-transparent px-0">
                                    {prereq}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {course.tags && course.tags.length > 0 && (
                            <div className="mt-4">
                              <h5 className="mb-2">Tags</h5>
                              <div>
                                {course.tags.map((tag, index) => (
                                  <span key={index} className="badge badge-light mr-2 mb-2 p-2">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Intro Video Modal */}
                  {course.video_intro && (
                    <div className="modal fade" id="introVideoModal" tabIndex={-1} aria-labelledby="introVideoModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="introVideoModalLabel">Course Introduction</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body p-0">
                            <video 
                              src={course.video_intro} 
                              controls 
                              className="w-100" 
                              style={{ maxHeight: "70vh" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Modules Section */}
              <div className="row mt-4">
                <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
                  <h2 className="h4 mb-0">Course Modules</h2>
                  {isAdmin && (
                    <Link href={`/dashboard/lms/courses/${id}/modules/new`}>
                      <button className="btn btn-sm btn-primary">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Module
                      </button>
                    </Link>
                  )}
                </div>

                <div className="col-12">
                  {modules.length > 0 ? (
                    <div className="card">
                      <div className="list-group list-group-flush">
                        {modules.map((module, index) => (
                          <div key={module.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="flex-grow-1">
                                <div className="d-flex align-items-center">
                                  <span className="badge badge-light mr-2">{index + 1}</span>
                                  <h5 className="mb-1">{module.title}</h5>
                                  {!module.is_free && (
                                    <Lock className="h-4 w-4 ml-2 text-muted" />
                                  )}
                                </div>
                                <p className="mb-0 text-muted">{module.description}</p>
                                {module.duration && (
                                  <small className="text-muted d-flex align-items-center mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {module.duration} min
                                  </small>
                                )}
                              </div>
                              <div>
                                <Link href={`/dashboard/lms/modules/${module.id}`}>
                                  <button className="btn btn-sm btn-outline-primary mr-2">
                                    {module.video_url ? "Watch" : "View"}
                                  </button>
                                </Link>
                                {isAdmin && (
                                  <>
                                    <Link href={`/dashboard/lms/modules/${module.id}/edit`}>
                                      <button className="btn btn-sm btn-outline-secondary mr-2">Edit</button>
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                                  </>
                                )}
                              </div>
                            </div>
                            {module.video_url && (
                              <div className="mt-3">
                                <video 
                                  src={module.video_url} 
                                  controls 
                                  className="w-100" 
                                  style={{ maxHeight: "200px" }}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="card">
                      <div className="card-body text-center py-5">
                        <p className="mb-3">No modules found for this course.</p>
                        {isAdmin && (
                          <Link href={`/dashboard/lms/courses/${id}/modules/new`}>
                            <button className="btn btn-primary">
                              <Plus className="h-4 w-4 mr-2" />
                              Create First Module
                            </button>
                          </Link>
                        )}
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
  );
}