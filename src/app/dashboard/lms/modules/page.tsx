// Place this in: src/app/dashboard/lms/modules/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WithUserLayout from "@/layout/WithUserLayout";
import { me, getModule, getLessonsForModule, deleteLesson } from "@/api/client-operations";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft, Edit, Plus, Trash, Play, FileText } from 'lucide-react';
import type { User } from "@/layout/LayoutTypes";

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  course_id: string;
  video_url?: string;
  document_url?: string;
  duration?: number;
  is_free?: boolean;
  created_at: string;
  updated_at: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  module_id: string;
  video_url?: string;
  document_url?: string;
  duration?: number;
  is_free?: boolean;
  created_at: string;
  updated_at: string;
}

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [user, setUser] = useState<User | undefined>(undefined);
  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
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
        setIsAdmin(userData?.role === "admin");

        const moduleData = await getModule(id);
        setModule(moduleData);

        const lessonsData = await getLessonsForModule(id);
        setLessons(lessonsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load module data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    reloadAllFriends();
  }, [id]);

  const handleDeleteModule = async () => {
    if (!isAdmin) {
      toast.error("You don't have permission to delete modules");
      return;
    }

    if (confirm("Are you sure you want to delete this module? This action cannot be undone.")) {
      try {
        // Call your delete API here
        // await deleteModule(id)
        toast.success("Module deleted successfully");
        if (module?.course_id) {
          router.push(`/dashboard/lms/courses/${module.course_id}`);
        } else {
          router.push("/dashboard/lms/courses");
        }
      } catch (error) {
        console.error("Error deleting module:", error);
        toast.error("Failed to delete module");
      }
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!isAdmin) {
      toast.error("You don't have permission to delete lessons");
      return;
    }

    if (confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      try {
        const result = await deleteLesson(lessonId);
        if (result.success) {
          toast.success("Lesson deleted successfully");
          // Update the lessons list
          setLessons(lessons.filter(lesson => lesson.id !== lessonId));
        } else {
          toast.error(result.message || "Failed to delete lesson");
        }
      } catch (error) {
        console.error("Error deleting lesson:", error);
        toast.error("Failed to delete lesson");
      }
    }
  };

  return (
    <WithUserLayout user={user} friends={friends} notfriends={notFriends} reloadFriends={reloadAllFriends} loaderName={loading ? "defaultLoader" : ""}>
      <div className="content-center">
        <div className="container-fluid section-t-space px-0">
          <div className="page-content">
            <div className="content-center w-100">
              {/* Back button and actions */}
              <div className="row mb-4">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  {module?.course_id && (
                    <Link href={`/dashboard/lms/courses/${module.course_id}`}>
                      <button className="btn btn-outline-secondary">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Course
                      </button>
                    </Link>
                  )}

                  {isAdmin && (
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
                  )}
                </div>
              </div>

              {/* Module details */}
              {module && (
                <div className="row mb-4">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h1 className="card-title h3 mb-3">{module.title}</h1>
                        <div className="d-flex mb-3">
                          {module.is_free && (
                            <span className="badge badge-success mr-2">Free Preview</span>
                          )}
                          {module.duration && (
                            <span className="text-muted">Duration: {module.duration} minutes</span>
                          )}
                        </div>
                        <p className="card-text">{module.description}</p>

                        {/* Video player if available */}
                        {module.video_url && (
                          <div className="mt-4">
                            <h5 className="mb-3">Video</h5>
                            <div className="embed-responsive embed-responsive-16by9">
                              <video 
                                className="embed-responsive-item" 
                                controls
                                src={module.video_url}
                                poster="/placeholder.svg?height=400&width=600"
                              >
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        )}

                        {/* Document link if available */}
                        {module.document_url && (
                          <div className="mt-4">
                            <h5 className="mb-3">Document</h5>
                            <a 
                              href={module.document_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-outline-primary"
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              View Document
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Module Information</h5>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Order</span>
                            <span>{module.order}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Created</span>
                            <span>{new Date(module.created_at).toLocaleDateString()}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Last Updated</span>
                            <span>{new Date(module.updated_at).toLocaleDateString()}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <span>Lessons</span>
                            <span>{lessons.length}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lessons section */}
              <div className="row">
                <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
                  <h2 className="h4 mb-0">Lessons</h2>
                  {isAdmin && (
                    <Link href={`/dashboard/lms/modules/${id}/lessons/new`}>
                      <button className="btn btn-sm btn-primary">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Lesson
                      </button>
                    </Link>
                  )}
                </div>

                <div className="col-12">
                  {lessons.length > 0 ? (
                    <div className="card">
                      <div className="list-group list-group-flush">
                        {lessons.map((lesson, index) => (
                          <div key={lesson.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="mr-3 text-center" style={{ width: "30px" }}>
                                  {lesson.order}
                                </div>
                                <div>
                                  <h5 className="mb-1">{lesson.title}</h5>
                                  <p className="mb-0 text-muted">{lesson.description}</p>
                                  <div className="d-flex align-items-center mt-1">
                                    {lesson.video_url && (
                                      <span className="badge badge-light mr-2">
                                        <Play className="h-3 w-3 mr-1" />
                                        Video
                                      </span>
                                    )}
                                    {lesson.document_url && (
                                      <span className="badge badge-light mr-2">
                                        <FileText className="h-3 w-3 mr-1" />
                                        Document
                                      </span>
                                    )}
                                    {lesson.duration && (
                                      <span className="text-muted small">
                                        {lesson.duration} min
                                      </span>
                                    )}
                                    {lesson.is_free && (
                                      <span className="badge badge-success ml-2">Free</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Link href={`/dashboard/lms/lessons/${lesson.id}`}>
                                  <button className="btn btn-sm btn-outline-primary mr-2">View</button>
                                </Link>
                                {isAdmin && (
                                  <>
                                    <Link href={`/dashboard/lms/lessons/${lesson.id}/edit`}>
                                      <button className="btn btn-sm btn-outline-secondary mr-2">Edit</button>
                                    </Link>
                                    <button 
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => handleDeleteLesson(lesson.id)}
                                    >
                                      Delete
                                    </button>
                                  </>
                                )}
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
                        {isAdmin && (
                          <Link href={`/dashboard/lms/modules/${id}/lessons/new`}>
                            <button className="btn btn-primary">
                              <Plus className="h-4 w-4 mr-2" />
                              Create First Lesson
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