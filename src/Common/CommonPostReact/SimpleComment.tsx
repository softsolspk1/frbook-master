import { ChangeEvent, FC, useState } from "react";
import { CommentSectionInterFace } from "../CommonInterFace";
import DynamicFeatherIcon from "../DynamicFeatherIcon";
import MainComment from "./MainComment";
import SubComment from "./SubComment";
import { LoadMoreReplies } from "../../utils/constant";
import { Input } from "reactstrap";
import { Href } from "../../utils/constant/index";
import Picker, { EmojiClickData } from 'emoji-picker-react';
import SimpleMainComment from "./MainSimpleComm";

const SimpleComment: FC<CommentSectionInterFace> = ({ showComment }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const addEmoji = (emoji: EmojiClickData) => {
    setMessageInput(messageInput + emoji.emoji)
  }
  return (
    <>
      {showComment &&
        <div className=" comment-section">
          <div className={`comments ${showComment ? "d-block" : ""}`}>
            <div className="main-comment">
              <SimpleMainComment message="Oooo Very Cute and Sweet Dog, happy birthday Cuty.... 🙂" id="firstComment" />
            </div>

          </div>
          {showComment == true && <div className="reply">
            <div className="search-input input-style input-lg icon-right">
              <Input type="text" className="emojiPicker" placeholder="write a comment.." value={messageInput} onChange={(event: ChangeEvent<HTMLInputElement>) => setMessageInput(event.target.value)} />
              <a href={Href}>
                <DynamicFeatherIcon iconName="Send" className="iw-14 ih-14 icon" />
              </a>
            </div>
          </div>}
        </div>
      }
    </>
  );
};

export default SimpleComment;
