import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Href, ImagePath } from "../../../../utils/constant/index";
import { FC } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { Input } from "reactstrap";
import { SingleData, User } from "@/layout/LayoutTypes";
import { useWebSocket } from "@/app/dashboard/Websocket";
import { useWebSocketAudio } from "@/app/dashboard/WebsocketAudio";
interface ChatBoxCommonInterFace {
  setChatBox: (value: boolean) => void;
  data: User;
  me: User;
}

// type Chat struct {
// 	Content   string    `json:"content" bson:"content"`
// 	CreatedAt time.Time `json:"created_at" bson:"created_at"`
// 	FromId    int       `json:"from_id" bson:"from_id"`
// 	Id        int       `json:"id" bson:"_id"`
// 	ToId      int       `json:"to_id" bson:"to_id"`

// 	// -- extensions --
// 	// -- end --
// }

interface Chat {
  content: string;
  created_at?: string;
  from_id: number;
  id: number;
  to_id: number;
}

const ChatBoxCommon: FC<ChatBoxCommonInterFace> = ({
  setChatBox,
  data,
  me,
}) => {
  const { sendMessage: sendWSMessage, onMessage: onWSMessage } = useWebSocket();
  const { sendMessage: sendWSAudioMessage, onMessage: onWSAudioMessage } = useWebSocketAudio();


  const [smallChat, setSmallChat] = useState(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMess();
    }
  };

  const handleMess = async () => {
    var resp = await fetch(`/api/add-chat`, {
      method: "POST",
      body: JSON.stringify({
        content: newMessage,
        to_id: data.id,
      }),
    });

    if (resp.status === 200) {
      setNewMessage("");
      setChats([...chats, { id: 0, content: newMessage, from_id: me.id, to_id: data.id }]);
    } else {
      console.log("error");
    }

  }

  const startVidCall = () => {
    sendWSMessage(JSON.stringify({ kind: 1, to_id: data.id }));
    console.log("start video call with " + data.id);
  }

  const startAudioCall = () => {
    sendWSAudioMessage(JSON.stringify({ kind: 1, to_id: data.id }));
    console.log("start audio call with " + data.id);
  }

  const updateChats = async () => {
    console.log("update chats with " + data.id);
    var resp2 = await fetch(`/api/chats?to_id=${data.id}`)
    if (resp2.status === 200) {
      var data2 = await resp2.json();
      setChats(data2);
    }
  }

  useEffect(() => {
    // fetch chats
    // setChats(data.message);
    updateChats();
    // load chats every 1 second
    const interval = setInterval(() => {
      updateChats();
    }, 2000);
    // add dummy data
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-box " style={{ right: 370 }}>
      <a className="chat-header">
        <div className="name" onClick={() => setSmallChat(!smallChat)}>
          <div
            className="user-img"
            style={{
              backgroundImage: `url(${data.profile_pic
                ? `${process.env.NEXT_PUBLIC_API_BASE}/assets/${data.profile_pic}`
                : `${ImagePath}/user-sm/def.jpg`
                })`,
            }}
          >
            {/* <span
              className={`available-stats ${
                data.message.length > 1 ? "online" : ""
              }`}
            /> */}
          </div>
          <span>{data.name}</span>
        </div>
        <div className="menu-option">
          <ul>
            <li onClick={() => startVidCall()}>
              <img src="../assets/svg/video.svg" />
            </li>
            <li onClick={() => startAudioCall()}>
              <img src="../assets/svg/phone.svg" />
            </li>
            <li className="close-chat" onClick={() => setChatBox(false)}>
              <img src="../assets/svg/x.svg" />
            </li>
          </ul>
        </div>
      </a>
      <div
        style={
          {
            backgroundColor: "#66ccff",
          }
        }
        className={`chat-wrap ${smallChat ? "d-none" : ""}`}>
        <div className="chat-body">
          {chats.map((chat, index) => (
            <div key={index} className={`msg-${chat.from_id === me.id ? "right" : "left"}`}>
              <span>{chat.content}</span>
            </div>
          ))}
          <div className="msg_push" />
        </div>
        <div className="chat-footer"
          style={
            {
              borderRadius: "0",
              backgroundColor: "white",
            }}
        >
          <Input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="type your message here.."
            className="chat-input form-control emojiPicker"
          />
          <div className={`add-extent`}

            style={
              {
                backgroundColor: "white",
              }}
          >
            <DynamicFeatherIcon
              iconName="Send"
              onClick={() => handleMess()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxCommon;
