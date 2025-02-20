import CustomImage from "@/Common/CustomImage";
import HoverMessage from "@/Common/HoverMessage";
import { ImagePath } from "../../../utils/constant";
import { FriendsListRightInterFace, SingleData, User, commonInterFace } from "@/layout/LayoutTypes";
import { FC, useEffect, useState } from "react";
import { Collapse, Media } from "reactstrap";
import ChatBoxCommon from "./common/ChatBoxCommon";
import CommonHeader from "./common/CommonHeader";
import useMobileSize from "@/utils/useMobileSize";
import HoverMessageNotFriend from "@/Common/HoverMessageNotFriend";
import HoverMessageFriend from "@/Common/HoverMessageFriend";


const FriendsListRight: FC<FriendsListRightInterFace> = ({label, users, recentChats,chat, reloadFriends, me }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatBox, setChatBox] = useState(false);
  const mobileSize = useMobileSize();

  useEffect(() => {
    if (users !== null && selectedUser) {
      setSelectedUser(users!.find((x) => x.id === selectedUser.id) || selectedUser
      );
    }
  }, [users]);
  const handleOpenChatBox = (user: User) => { setSelectedUser(user); setChatBox(true); };
  return (
    <div className="friend-section">
      <CommonHeader isOpen={isOpen} setIsOpen={setIsOpen} heading={label ?? "CLose Firned"} />
      <Collapse isOpen={isOpen} className="friend-list">
        <ul>
          {(users??[]).map((data, index) => (
            <li key={index} className={`friend-box user${index + 1}`}>
              <Media onClick={() => handleOpenChatBox(data)}>
                <a className={`popover-cls user-img bg-size blur-up lazyloaded `} id={`${recentChats ? `recentChatsPopOver-${index + 1}${chat == true ? 'f':'c'}` : `PopOver-${index + 1}${chat == true ? 'f':'c'}`}`}>
                  {
                    data.profile_pic ?
                      <CustomImage
                        src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${data.profile_pic}`}
                        className="img-fluid blur-up lazyloaded bg-img"
                        alt="user"
                      />
                      :
                      <CustomImage
                        src={`${ImagePath}/user-sm/def.jpg`}
                        className="img-fluid blur-up lazyload bg-img"
                        alt="user"
                      />
                  }
                  <span className={`available-stats`} />
                </a>
                <Media body>
                  <h5 className="user-name">{data.name}</h5>
                </Media>
              </Media>
             {
              (chat ?? false) == false &&  <HoverMessageNotFriend reloadFriends={reloadFriends} user={data}  placement={mobileSize ? "right" : "top"} target={`${recentChats ? `recentChatsPopOver-${index + 1}c` : `PopOver-${index + 1}c`}`} name={data.name} imagePath={
                data.profile_pic ? `${process.env.NEXT_PUBLIC_API_BASE}/assets/${data.profile_pic}` : undefined
              } />
             }
             {
              chat == true &&  <HoverMessageFriend reloadFriends={reloadFriends} user={data}  placement={mobileSize ? "right" : "top"} target={`${recentChats ? `recentChatsPopOver-${index + 1}f` : `PopOver-${index + 1}f`}`} name={data.name} imagePath={
                data.profile_pic ? `${process.env.NEXT_PUBLIC_API_BASE}/assets/${data.profile_pic}` : undefined
              } />
             }
            </li>
          ))}
        </ul>
       {
        chat &&
        chatBox && selectedUser && (
          <ChatBoxCommon setChatBox={setChatBox} data={selectedUser} me={me} />
        )
       }
      </Collapse>
    </div>
  );
};

export default FriendsListRight;
