"use client";

import { FC, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import WithUserLayout from "@/layout/WithUserLayout";
import { User } from "@/layout/LayoutTypes";
import { CourseCard } from "@/components/course-card";
import { courses } from "@/utils/courses";
import { me } from "@/api/operations";

const CoursesPage: FC = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const [notFriends, setNotFriends] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      var user = await me();
      setUser(user);
    };
    fetchData();
  }, []);

  const reloadAllFr = async () => {
    var resp = await fetch(`/api/friends`);
    if (resp.status === 200) {
      var data = await resp.json();
      setFriends(data);
    } else {
      setFriends([]);
    }

    var resp2 = await fetch(`/api/notfriends`);
    if (resp2.status === 200) {
      var data2 = await resp.json();
      setNotFriends(data2);
    } else {
      setNotFriends([]);
    }
  };

  useEffect(() => {
    reloadAllFr();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <WithUserLayout
      friends={friends}
      notfriends={notFriends}
      reloadFriends={reloadAllFr}
      loaderName="courses"
      user={user}
    >
      <div className="page-center">
        <div className="pb-2">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                E-LEARNING COURSES
              </h2>
            </div>
          </div>
        </div>
        <Container fluid className="px-0">
          <div className="page-content">
            <div className="content-center content-full w-100">
              <Row>
                <Col xl="12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </WithUserLayout>
  );
};

export default CoursesPage;

