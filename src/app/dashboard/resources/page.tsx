import ResourcesFeed from "./Feed";
import { User } from "@/layout/LayoutTypes";
import { FC } from "react";
import {getPosts, me} from "@/api/operations";
import NewsFeedStyle10 from "../feed/Feed";

// const ResourcesPage = ({ user }: { user: User }) => {
//   return <ResourcesFeed user={user} />;
// };

// export default ResourcesPage;

const Page: FC = async () => {
  var posts = await getPosts();
  var user = await me();
  console.log(posts)

  return (
    <>
      {/* <NewsFeedStyle10 user={user} currP={posts} ></NewsFeedStyle10> */}
      <ResourcesFeed user={user} />;
    </>
  );
};

export default Page;