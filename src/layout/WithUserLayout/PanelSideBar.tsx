import { FC } from "react";
import SideBar from "./SideBar";
import { Href, ImagePath, LikedPages } from "../../utils/constant";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import FriendSuggestionDropDown from "@/components/NewsFeed/Style1/LeftContent/FriendSuggestionDropDown";
import { likePageListContentData } from "@/Data/NewsFeed";
import { Media } from "reactstrap";
import CustomImage from "@/Common/CustomImage";
import { UserInterFace } from "../LayoutTypes";

const PanelSideBar: FC<UserInterFace> = ({ user }) => {
  return (
    <div className="panel-sidebar">
      <div className="sticky-cls">
        <SideBar user={user} />
      </div>
    </div>
  );
};

export default PanelSideBar;
