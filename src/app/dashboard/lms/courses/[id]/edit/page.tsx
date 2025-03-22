"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WithUserLayout from "@/layout/WithUserLayout";
import { me, getCourseById, updateCourse } from "@/api/client-operations";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import type { User } from "@/layout/LayoutTypes";
import { CourseForm } from "@/components/lms/CourseForm";

interface Course {
  id: string;
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
}

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [user, setUser] = useState<User | undefined>(undefined);
  const [course, setCourse] = useState<Course | null>(null);
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
        
        if (userData?.role !== "admin") {
          toast.error("You don't have permission to edit courses");
          router.push(`/dashboard/lms/courses/${id}`);
          return;
        }

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
  }, [id, router]);

  const handleSubmit = async (updatedCourse: Course) => {
    try {
      const result = await updateCourse(updatedCourse);
      
      if (result.success) {
        toast.success("Course updated successfully");
        router.push(`/dashboard/lms/courses/${id}`);
      } else {
        toast.error(result.message || "Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    }
  };

  if (!isAdmin) {
    return null; // Don't render anything if not admin
  }

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

              {!loading && course && (
                <div className="row">
                  <div className="col-12">
                    <CourseForm course={course} onSubmit={handleSubmit} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WithUserLayout>
  );
}