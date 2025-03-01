"use client";
import WithUserLayout from "@/layout/WithUserLayout";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { User } from "@/layout/LayoutTypes";

const ResourcesFeed: FC<{ user: User }> = ({ user }) => {
  const [friends, setFriends] = useState<User[]>([]);
  const [notFriends, setNotFriends] = useState<User[]>([]);

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
      var data2 = await resp2.json();
      setNotFriends(data2);
    } else {
      setNotFriends([]);
    }
  };

  useEffect(() => {
    reloadAllFr();
  }, []);

  return (
    <WithUserLayout
      friends={friends}
      notfriends={notFriends}
      reloadFriends={reloadAllFr}
      loaderName="resources"
      user={user}
    >
      <div className="page-center">
        <div className="pb-2">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                RESOURCES
              </h2>
            </div>
          </div>
        </div>
        <Container fluid className="px-0">
          <div className="page-content">
            <div className="content-center content-full w-100">
              <Row>
                <Col xl="12">
                  <div className="video-grid">
                    <div className="video-item">
                      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        The Heart, Part 1 - Under Pressure: Crash Course Anatomy & Physiology 
                      </h2>
                      <video width="100%" controls>
                        <source src="/videos/video4.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="video-item">
                      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        Common Medicines For General Medical Practice / Medicine Name and Uses
                      </h2>
                      <video width="100%" controls>
                        <source src="/videos/video2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="video-item">
                      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        Cardiovascular System In Under 10 Minutes
                      </h2>
                      <video width="100%" controls>
                        <source src="/videos/video3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className="video-item">
                      <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        3D Medical Animation - Congestive Heart Failure
                      </h2>
                      <video width="100%" controls>
                        <source src="/videos/video1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
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

export default ResourcesFeed;
