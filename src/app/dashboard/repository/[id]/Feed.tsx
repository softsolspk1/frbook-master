"use client";
import CreatePost from "@/Common/CreatePost";
import ArticleBox from "@/components/NewsFeed/Style1/ContentCenter/ArticleBox";
import PostBox from "@/components/NewsFeed/Style1/ContentCenter/PostBox";
import SufiyaElizaFirstPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost";
import SufiyaElizaSecondPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaSecondPost";
import SufiyaElizaThirdPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaThirdPost";
import { Article, ArticleArray, Post, PostArray } from "@/components/NewsFeed/Style1/Style1Types";
import GemixStore from "@/components/NewsFeed/Style3/ContentCenter/GemixStore";
import SufiyaElizaMultiplePost from "@/components/NewsFeed/Style3/ContentCenter/SufiyaElizaMultiplePost";
import { User } from "@/layout/LayoutTypes";
import WithUserLayout from "@/layout/WithUserLayout";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import 'react-quill/dist/quill.snow.css';

const NewsFeedStyle10: FC<ArticleArray> = ({ currA, user }) => {

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

    return () => {
      document.documentElement.style.setProperty(
        "--theme-color",
        "3, 137, 201"
      );
    };
  }, []);



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
                  {currA.title}
                </h2>
                {/* next line subtitle*/}
                <p className="mt-1 text-sm text-gray-500">
                  {currA.author_name}
                </p>

              </div>
            </div>
          </div>
          <Container fluid className="px-0">
            {/* show image here */}
            <Row>
              {currA.photo &&
                <Col md="12">

                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                    <img
                      src={process.env.NEXT_PUBLIC_API_BASE + "/assets/" + currA.photo}
                      alt="..."
                      className=""
                      style={{ maxHeight: '40vh', width: 'auto' }}
                    />
                  </div>
                </Col>
              }
              {
                currA.pdf &&
                (
                  <Col md="12 pt-8 pb-4">
                    <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-md font-bold">
                      <span className="text-gray-700 text-lg">Attached Pdf</span>
                      <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                        onClick={() => {
                          // open pdf in new tab
                          window.open(process.env.NEXT_PUBLIC_API_BASE + "/assets/" + currA.pdf, "_blank");
                        }}
                      >
                        View
                      </button>
                    </div>
                  </Col>
                )
              }
              <Col md="12 mt-2">
                {<div
                  className="content-container"
                  style={{
                    fontSize: '1.25rem', // Default font size
                    // Additional styles for headers if needed
                  }}
                  dangerouslySetInnerHTML={{ __html: (currA.content ?? 0) }} />}
              </Col>

            </Row>
          </Container>
        </div>
      </WithUserLayout>
      {/* <style jsx>{`
        .content-container h1 {
          font-size: 2.25rem;
          font-weight: bold;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .content-container h2 {
          font-size: 1.875rem;
          font-weight: bold;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          color: #444;
        }

        .content-container h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          color: #555;
        }

        .content-container p {
          font-size: 1rem;
          line-height: 1.6;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          color: #666;
        }

        .content-container blockquote {
          border-left: 4px solid #ddd;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #777;
        }

        .content-container ul,
        .content-container ol {
          padding-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .content-container a {
          color: #1a0dab;
          text-decoration: underline;
        }

        .content-container a:hover {
          text-decoration: none;
          color: #dd4b39;
        }
      `}</style> */}
    </>
  );
};

export default NewsFeedStyle10;
