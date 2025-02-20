import { ChangeEvent, FC, useState } from "react";
import DynamicFeatherIcon from "../DynamicFeatherIcon";
import { Comment, Href, Reaction, Share, SvgPath } from "../../utils/constant";
import Image from "next/image";
import CommentSection from "./CommentSection";
import ShareModal from "./ShareModal";
import { reactions } from "@/Data/common";
import SimpleComment from "./SimpleComment";
import { Input } from "reactstrap";
import SimpleMainComment from "./MainSimpleComm";
import { CommentSimp, PostBoxInterface } from "@/components/NewsFeed/Style1/Style1Types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ImagePath, Replay, Translate } from "../../utils/constant";
import { Media } from "reactstrap";
import CustomImage from "../CustomImage";
import HoverMessage from "../HoverMessage";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const CommonPostReact: FC<PostBoxInterface> = ({ post, like, setLike, comment, setComment }) => {

  const [postLiked, setPostLiked] = useState(post?.liked == true);



  const [showReaction, setShowReaction] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);


  const [messageInput, setMessageInput] = useState('');

  const [comments, setComments] = useState<CommentSimp[]>([]);

  const router = useRouter();

  const updateShow = async (z: boolean) => {
    setShowComment(z);

    if (z == true) {
      var resp = await fetch(`/api/posts/${post!.id}/comment`);
      if (resp.status === 200) {
        const data = await resp.json();
        setComments(data);
        console.log(data);
        
      } else {
      }
    }
  }

  const addComm = async () => {
    const resp = await fetch(`/api/posts/${post!.id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: messageInput }),
    });

    if (resp.status === 200) {
      setMessageInput('');
      var resp2 = await fetch(`/api/posts/${post!.id}/comment`);
      if (resp2.status === 200) {
        const data = await resp2.json();
        setComments(data);
      } else {
        toast.error("Weird thing");
      }

      setComment!(comment! + 1);

    } else {
      // const message = await resp.json();
      // toast.error(message);
    }
  };

  const formSubmitHandle = async () => {
    const resp = await fetch(`/api/posts/${post!.id}/${!postLiked ? "like" : "unlike"}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (resp.status === 200) {
      if (postLiked) {
        setLike!(like! - 1);
      } else {
        setLike!(like! + 1);
      }

      setPostLiked(!postLiked);


    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="post-react">
        <ul>
          <li className="comment-click" onClick={() => {
            formSubmitHandle();
          }}>
            <a style={
              {
                color: postLiked ? "red" : "black"
              }
            }>
              <DynamicFeatherIcon iconName="Heart" className="iw-18 ih-18"
                color={
                  postLiked ? "red" : "black"
                } />Like
            </a>
          </li>
          <li className="comment-click" onClick={() => updateShow(!showComment)}>
            <a>
              <DynamicFeatherIcon iconName="MessageSquare" className="iw-18 ih-18" />{Comment}
            </a>
          </li>


        </ul>
      </div>
      {showComment &&
        <div className=" comment-section">
          <div className={`comments ${showComment ? "d-block" : ""}`}>
            <div className="main-comment">
              {
                comments.map((comment, index) => {
                  return <div key={comment.id} style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                  }}>
                    <Media>
                      <a className="user-img popover-cls bg-size blur-up lazyloaded" id={`${comment.id}`}>
                        {
                          comment.profile_pic ? 
                        <CustomImage src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${comment?.profile_pic}`} className="img-fluid blur-up lazyload bg-img" alt="user" />
                        : <CustomImage src={`${ImagePath}/user-sm/def.jpg`} className="img-fluid blur-up lazyload bg-img" alt="user" />
                        }
                      </a>
                      <Media body>
                        <a>
                          <h5>{comment.name}</h5>
                        </a>
                        <p>{comment.content}</p>

                      </Media>
                      <div className="comment-time">
                        <h6>{
                          timeAgo.format(new Date(comment.created_at))
                        }
                        </h6>
                      </div>
                    </Media>

                  </div>
                })
              }
            </div>

          </div>
          {showComment == true && <div className="reply">
            <div className="search-input input-style input-lg icon-right">
              <Input type="text" className="emojiPicker" placeholder="write a comment.." value={messageInput} onChange={(event: ChangeEvent<HTMLInputElement>) => setMessageInput(event.target.value)} />
              <a onClick={addComm}>
                <DynamicFeatherIcon iconName="Send" className="iw-14 ih-14 icon" />
              </a>
            </div>
          </div>}
        </div>
      }
      <ShareModal showModal={showModal} toggleModal={toggleModal} />
    </>
  );
};

export default CommonPostReact;
