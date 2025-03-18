"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WithUserLayout from "@/layout/WithUserLayout";
import { CourseForm } from "@/components/lms/CourseForm";
import { me, createCourse } from "@/api/client-operations";
import { toast } from "react-toastify";
import type { User } from "@/layout/LayoutTypes";

export default function NewCoursePage() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<User[]>([]);
  const [notFriends, setNotFriends] = useState<User[]>([]);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const router = useRouter();

  const reloadAllFriends = async () => {
    setFriendsLoading(true);
    try {
      const [friendsResp, notFriendsResp] = await Promise.all([
        fetch(`/api/friends`),
        fetch(`/api/notfriends`)
      ]);
      setFriends(friendsResp.status === 200 ? await friendsResp.json() : []);
      setNotFriends(notFriendsResp.status === 200 ? await notFriendsResp.json() : []);
    } catch (error) {
      console.error("Error fetching friends data:", error);
      setFriends([]);
      setNotFriends([]);
    } finally {
      setFriendsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    reloadAllFriends();
  }, []);

  // Function to handle new course creation
  const handleCreateCourse = async (newCourse: any) => {
    try {
      const createdCourse = await createCourse(newCourse);
      if (!createdCourse.success || !createdCourse.data) {
        throw new Error(createdCourse.message || "Unknown error");
      }
      toast.success("Course created successfully");
      await reloadAllFriends();
      router.push(`/dashboard/lms/courses/${createdCourse.data.id}`);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
    }
  };

  return (
    <WithUserLayout user={user} friends={friends} notfriends={notFriends} reloadFriends={reloadAllFriends} loaderName={loading ? "defaultLoader" : ""}>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
          <p className="text-gray-500 mb-4">Add a new course to your learning management system</p>
          
          {/* Course Form with onSubmit */}
          <CourseForm onSubmit={handleCreateCourse} />
        </div>
      </div>
    </WithUserLayout>
  );
}
