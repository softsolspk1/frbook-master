"use client";

import { useEffect, useState } from "react";
import WithUserLayout from "@/layout/WithUserLayout";
import { PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { CourseTable } from "@/components/lms/CourseTable";
import { me } from "@/api/client-operations";
import { toast } from "react-toastify";
import type { User } from "@/layout/LayoutTypes";

export default function CoursesPage() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [friends1, setFriends] = useState<User[]>([]);
  const [notfriends1, setNotFriends] = useState<User[]>([]);

  const reloadAllFr = async () => {
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
    reloadAllFr();
  }, []);

  return (
    <WithUserLayout
      friends={friends1}
      notfriends={notfriends1}
      reloadFriends={reloadAllFr}
      loaderName={loading ? "defaultLoader" : "style10"}
      user={user}
    >
      <div className="page-center">
        <div className="pb-2">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Courses
              </h2>
            </div>
            <div className="flex md:ml-4 md:mt-0">
              <Link
                href="/dashboard/lms/courses/new"
                className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Course
              </Link>
            </div>
          </div>
        </div>
        <div className="container-fluid section-t-space px-0">
          <div className="page-content">
            <div className="content-center content-full w-100">
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-outline-secondary ml-2">Filters</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <CourseTable searchTerm={searchTerm} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithUserLayout>
  );
}
