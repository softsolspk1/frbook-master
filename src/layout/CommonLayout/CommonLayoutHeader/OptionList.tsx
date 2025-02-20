import { FC } from "react";
import DarkLight from "./DarkLight";
import HeaderMessage from "./HeaderMessage";
import Notification from "./Notification";
import UserProfile from "./UserProfile";
import { UserInterFace } from "@/layout/LayoutTypes";

const OptionList: FC<UserInterFace> = ({user}) => {
  return (
    <ul className="option-list">
      {/* <HeaderMessage /> */}
      <DarkLight />
      {/* <Notification /> */}
      <UserProfile user={user}/>
    </ul>
  );
};

export default OptionList;
