import { FC } from "react";
import PanelHeader from "./PanelHeader";
import SearchBar from "./SearchBar";
import CloseFriends from "./CloseFriends";
import RecentChats from "./RecentChats";
import { closeFriendsData, recentChatsData } from "@/Data/Layout";
import { FriendsSidebarInterFace } from "@/layout/LayoutTypes";
import FriendsListRight from "./FriendsListRight";

const ConversationPanel: FC<FriendsSidebarInterFace> = ({ sidebarClassName, me, friends, notfriends, reloadFriends }) => {
  return (
    <div className={`conversation-panel ${sidebarClassName ? sidebarClassName : "xl-light"}`}>
      <PanelHeader />
      {/* <SearchBar /> */}
      <FriendsListRight chat={true} reloadFriends={reloadFriends} me={me!} label="Friends" users={friends} />
      <FriendsListRight chat={false} reloadFriends={reloadFriends} me={me!} label="Suggestions" users={notfriends} />
    </div>
  );
};

export default ConversationPanel;
