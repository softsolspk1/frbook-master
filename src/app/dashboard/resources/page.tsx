import ResourcesFeed from "./Feed";
import { User } from "@/layout/LayoutTypes";

const ResourcesPage = ({ user }: { user: User }) => {
  return <ResourcesFeed user={user} />;
};

export default ResourcesPage;
