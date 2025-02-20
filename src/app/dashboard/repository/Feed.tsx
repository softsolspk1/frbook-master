"use client";
import CreatePost from "@/Common/CreatePost";
import ArticleBox from "@/components/NewsFeed/Style1/ContentCenter/ArticleBox";
import PostBox from "@/components/NewsFeed/Style1/ContentCenter/PostBox";
import SufiyaElizaFirstPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost";
import SufiyaElizaSecondPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaSecondPost";
import SufiyaElizaThirdPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaThirdPost";
import { Article, ArticlesArray, Post, PostArray } from "@/components/NewsFeed/Style1/Style1Types";
import GemixStore from "@/components/NewsFeed/Style3/ContentCenter/GemixStore";
import SufiyaElizaMultiplePost from "@/components/NewsFeed/Style3/ContentCenter/SufiyaElizaMultiplePost";
import { User } from "@/layout/LayoutTypes";
import WithUserLayout from "@/layout/WithUserLayout";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

const NewsFeedStyle10: FC<ArticlesArray> = ({ currA = [], user }) => {
  const [posts, setPosts] = useState<Article[]>(currA);

  const [rightPost, setRightPost] = useState<Post[]>([]);
  const [leftPost, setLeftPost] = useState<Post[]>([]);


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
          <div className="pb-2">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  REPOSITORY
                </h2>
              </div>
              <div className="flex md:ml-4 md:mt-0">
                <Link
                  href="/dashboard/repository/new"
                  type="button"
                  style={
                    {
                      // use theme color for background color
                      backgroundColor: "rgba(3, 137, 201, 1)",
                    }
                  }
                  className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  New Article
                </Link>
              </div>
            </div>
          </div>
          <Container fluid className="px-0">
            <div className="page-content">
              <div className="content-center content-full w-100">
                <Row>
                  <Col xl="6">
                    {/* <CreatePost reloadPost={reloadPost} /> */}
                    <div className="overlay-bg" />
                    <div className="post-panel section-t-space">
                      {leftPost.map((arts, index) => (
                        <>
                          <ArticleBox article={arts} />
                        </>
                      ))}
                    </div>
                  </Col>
                  <Col xl="6">
                    <div className="post-panel">
                      {rightPost.map((arts, index) => (
                        <>
                          <ArticleBox article={arts} />
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
