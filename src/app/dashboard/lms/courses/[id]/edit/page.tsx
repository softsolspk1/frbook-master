"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WithUserLayout from "@/layout/WithUserLayout";
import { me, getCourseById, updateCourse } from "@/api/client-operations";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { User } from "@/layout/LayoutTypes";
import { CourseForm } from "@/components/lms/CourseForm";

interface Course {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  is_published: boolean;
}

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  console.log("Params Object:", params);
  console.log("Extracted Course ID:", id);

  const [user, setUser] = useState<User | undefined>(undefined);
  const [course, setCourse] = useState<Course | null>(null);
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


  console.log("Course ID from URL Params:", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await me();
        setUser(userData);

        const courseData = await getCourseById(id);
        if (!courseData) throw new Error("Course not found");
        setCourse(courseData);
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

  const handleUpdateCourse = async (updatedCourse: Course) => {
    try {
      await updateCourse(updatedCourse);
      toast.success("Course updated successfully");
      router.push(`/dashboard/lms/courses/${id}`);
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    }
  };

  return (
    <WithUserLayout user={user} friends={friends} notfriends={notFriends} reloadFriends={reloadAllFriends} loaderName={loading ? "defaultLoader" : ""}>
      <div className="page-center">
      <div className="container-fluid section-t-space">
        <div className="page-content">
          <div className="content-center content-full w-100">
              <div className="row mb-4">
                <div className="col-12">
                  <Link href={`/dashboard/lms/courses/${id}`}>
                    <button className="btn btn-outline-secondary flex items-center">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Course
                    </button>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mb-4">
                  <h1 className="text-3xl font-bold">Edit Course</h1>
                  <p className="text-muted">Update course details below</p>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {!loading && course && <CourseForm course={course} onSubmit={handleUpdateCourse} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithUserLayout>
  );
}
