"use client";
import CreatePost from "@/Common/CreatePost";
import PostBox from "@/components/NewsFeed/Style1/ContentCenter/PostBox";
import SufiyaElizaFirstPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost";
import SufiyaElizaSecondPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaSecondPost";
import SufiyaElizaThirdPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaThirdPost";
import { Post, PostArray } from "@/components/NewsFeed/Style1/Style1Types";
import GemixStore from "@/components/NewsFeed/Style3/ContentCenter/GemixStore";
import SufiyaElizaMultiplePost from "@/components/NewsFeed/Style3/ContentCenter/SufiyaElizaMultiplePost";
import { User } from "@/layout/LayoutTypes";
import WithUserLayout from "@/layout/WithUserLayout";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

const NewsFeedStyle10: FC<PostArray> = ({ currP = [], user }) => {
  const [posts, setPosts] = useState<Post[]>(currP);

  const [rightPost, setRightPost] = useState<Post[]>([]);
  const [leftPost, setLeftPost] = useState<Post[]>([]);

  const reloadPost = async () => {
    console.log("reloading post");
    var resp = await fetch(`/api/posts`);
    if (resp.status === 200) {
      const data = await resp.json();
      setPosts(data);
    } else {
    }
  };
  const [friends1, setFriends] = useState<User[]>([]);
  const [notfriends1, setNotFriends] = useState<User[]>([]);
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
    setTimeout(() => {
      document.documentElement.style.setProperty(
        "--theme-color",
        "3, 137, 201"
      );
    }, 3500);
    reloadAllFr();

    var lp: Post[] = [];
    var rp: Post[] = [];
    for (let i = 0; i < posts.length; i++) {
      if (i % 2 === 0) {
        lp = [...lp, posts[i]];
      } else {
        rp = [...rp, posts[i]];
      }
    }

    setLeftPost(lp);
    setRightPost(rp);

    return () => {
      document.documentElement.style.setProperty(
        "--theme-color",
        "3, 137, 201"
      );
    };
  }, [posts]);

  return (
    <>
      <WithUserLayout
        friends={friends1}
        notfriends={notfriends1}
        reloadFriends={reloadAllFr}
        loaderName="style10"
        user={user}
      >
        <div className="page-center">
          <Container fluid className="px-0">
            <div className="page-content">
              <div className="content-center content-full w-100">
                <Row>
                  <Col xl="6">
                    <CreatePost reloadPost={reloadPost} />
                    <div className="overlay-bg" />
                    <div className="post-panel section-t-space">
                      {leftPost.map((post, index) => (
                        <>
                          <PostBox post={post} />
                        </>
                      ))}
                    </div>
                  </Col>
                  <Col xl="6">
                    <div className="post-panel">
                      {rightPost.map((post, index) => (
                        <>
                          <PostBox post={post} />
                        </>
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </div>
      </WithUserLayout>
    </>
  );
};

export default NewsFeedStyle10;
