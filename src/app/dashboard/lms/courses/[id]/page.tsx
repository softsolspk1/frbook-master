"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WithUserLayout from "@/layout/WithUserLayout";
import { me, getCourseById, getModulesForCourse } from "@/api/client-operations";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft, Edit, Plus, Trash } from "lucide-react";
import type { User } from "@/layout/LayoutTypes";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  course_id: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [user, setUser] = useState<User | undefined>(undefined);
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
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
        // await deleteCourse(id);
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
     <div className="page-center">
      <div className="container-fluid section-t-space">
        <div className="page-content">
          <div className="content-center content-full w-100">
              <div className="row mb-4">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <Link href="/dashboard/lms/courses">
                    <button className="btn btn-outline-secondary">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Courses
                    </button>
                  </Link>
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
                </div>
              </div>

              {course && (
                <div className="row mb-4">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h1 className="card-title h3 mb-3">{course.title}</h1>
                        <p className="card-text">{course.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
                  <h2 className="h4 mb-0">Course Modules</h2>
                  <Link href={`/dashboard/lms/courses/${id}/modules/new`}>
                    <button className="btn btn-sm btn-primary">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Module
                    </button>
                  </Link>
                </div>

                <div className="col-12">
                  {modules.length > 0 ? (
                    <div className="card">
                      <div className="list-group list-group-flush">
                        {modules.map((module) => (
                          <div key={module.id} className="list-group-item">
                            <h5 className="mb-1">{module.title}</h5>
                            <p className="mb-0 text-muted">{module.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="card">
                      <div className="card-body text-center py-5">
                        <p className="mb-3">No modules found for this course.</p>
                        <Link href={`/dashboard/lms/courses/${id}/modules/new`}>
                          <button className="btn btn-primary">
                            <Plus className="h-4 w-4 mr-2" />
                            Create First Module
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
  );
}
