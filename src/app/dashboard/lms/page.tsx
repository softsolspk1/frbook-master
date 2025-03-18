"use client";

import { useEffect, useState } from "react";
import WithUserLayout from "@/layout/WithUserLayout";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import { me, getLMSStats } from "@/api/client-operations";
import { toast } from "react-toastify";
import type { User } from "@/layout/LayoutTypes";

interface LMSStats {
  totalCourses: number;
  totalStudents: number;
  totalEnrollments: number;
  completionRate: number;
  courseGrowth: string;
  studentGrowth: string;
  enrollmentGrowth: string;
  completionGrowth: string;
}

export default function LMSDashboard() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [stats, setStats] = useState<LMSStats | null>(null);
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

        const statsData = await getLMSStats();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    reloadAllFriends();
  }, []);

  return (
    <WithUserLayout
      friends={friends}
      notfriends={notFriends}
      reloadFriends={reloadAllFriends}
      loaderName={loading ? "defaultLoader" : "style10"}
      user={user}
    >
      <div className="container-fluid section-t-space px-0">
        <div className="page-content">
          <div className="content-center w-100">
            <div className="row">
              <div className="col-12">
                <h1 className="text-3xl font-bold mb-4">LMS Dashboard</h1>
                <p className="text-muted mb-6">
                  Overview of your learning management system
                </p>
              </div>
            </div>

            <div className="row">
              {[
                {
                  title: "Total Courses",
                  value: stats?.totalCourses || 0,
                  growth: stats?.courseGrowth || "No data",
                  icon: <BookOpen className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Total Students",
                  value: stats?.totalStudents || 0,
                  growth: stats?.studentGrowth || "No data",
                  icon: <Users className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Enrollments",
                  value: stats?.totalEnrollments || 0,
                  growth: stats?.enrollmentGrowth || "No data",
                  icon: <GraduationCap className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Completion Rate",
                  value: `${stats?.completionRate || 0}%`,
                  growth: stats?.completionGrowth || "No data",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  ),
                },
              ].map(({ title, value, growth, icon }, index) => (
                <div className="col-md-3 mb-4" key={index}>
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title">{title}</h5>
                        {icon}
                      </div>
                      <h2 className="text-2xl font-bold">{value}</h2>
                      <p className="text-xs text-muted">{growth}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-8 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="card-title">Course Enrollments</h5>
                    <p className="card-subtitle text-muted">Last 30 days</p>
                  </div>
                  <div className="card-body">
                    <div
                      className="chart-container d-flex justify-content-center align-items-center"
                      style={{ height: "300px" }}
                    >
                      <p className="text-muted">
                        Enrollment chart will be displayed here
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="card-title">Recent Activity</h5>
                  </div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      {[
                        {
                          name: "John Doe",
                          action: "enrolled in",
                          course: "Web Development",
                          time: "2 hours ago",
                        },
                        {
                          name: "Sarah Smith",
                          action: "completed",
                          course: "JavaScript Basics",
                          time: "5 hours ago",
                        },
                        {
                          name: "Mike Brown",
                          action: "created",
                          course: "React Fundamentals",
                          time: "1 day ago",
                        },
                      ].map(({ name, action, course, time }, idx) => (
                        <li className="list-group-item" key={idx}>
                          <div className="d-flex align-items-center">
                            <div className="avatar-sm mr-3">
                              <div className="avatar-initial rounded-circle bg-light text-primary">
                                {name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                            </div>
                            <div>
                              <p className="mb-0">
                                <strong>{name}</strong> {action}{" "}
                                <strong>{course}</strong>
                              </p>
                              <small className="text-muted">{time}</small>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {friendsLoading && (
              <p className="text-center text-muted">Loading friends data...</p>
            )}
          </div>
        </div>
      </div>
    </WithUserLayout>
  );
}
