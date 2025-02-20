import CreatePost from "@/Common/CreatePost";
import SufiyaElizaFirstPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost";
import SufiyaElizaSecondPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaSecondPost";
import SufiyaElizaThirdPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaThirdPost";
import GemixStore from "@/components/NewsFeed/Style3/ContentCenter/GemixStore";
import SufiyaElizaMultiplePost from "@/components/NewsFeed/Style3/ContentCenter/SufiyaElizaMultiplePost";
import WithUserLayout from "@/layout/WithUserLayout";
import { FC, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import NewsFeedStyle10 from "./Feed";
import { getArticles, getFriends, getNotFriends, getPosts, me } from "@/api/operations";

const Page: FC = async () => {
  var posts = await getArticles();
  var user = await me();
  console.log(posts);

  return (

    <>
      <NewsFeedStyle10 user={user} currA={posts ?? []} ></NewsFeedStyle10>
    </>
  );
};

export default Page;
