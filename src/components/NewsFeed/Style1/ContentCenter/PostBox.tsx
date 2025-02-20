import CommonLikePanel from "@/Common/CommonLikePanel";
import CommonPostReact from "@/Common/CommonPostReact";
import CommonUserHeading from "@/Common/CommonUserHeading";
import DetailBox from "@/Common/DetailBox";
import { CelebrationNewAlbum, CelebrationSpan, ImagePath } from "../../../../utils/constant";
import Image from "next/image";
import React, { FC } from "react";
import { PostBoxInterface } from "../Style1Types";
import PostBoxLikePanel from "@/Common/PostBoxLikePannel";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { likePost } from "@/api/operations";


const PostBox: FC<PostBoxInterface> = ({ post }) => {

  const [like, setLike] = React.useState(post?.likes_count ?? 0);
  const [comment, setComment] = React.useState(post?.comments_count ?? 0);

  return (
    <div className="post-wrapper col-grid-box section-t-space d-block">
      <CommonUserHeading image={1} post={post} id={`c${post!.id}`} />
      <div className="post-details">
        <div className="img-wrapper"
          style={{
            marginBottom: "20px",
            // make image center
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
            {
            post?.image ?  
            <img src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${post!.image}`} className="img-fluid blur-up lazyloaded" alt="image"
              style={
                {
                  maxHeight: "40vh",
                  width: "auto",
                }
              }
            />: null
            }    
            {
            post?.video ?
            <video src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${post!.video}`} controls
              style={
                {
                  maxHeight: "100%",
                  width: "100%",
                }
              }
            />: null

            }      
        </div>
        <DetailBox post={post} />
        <div className="like-panel">

          <div className="right-stats">
            <ul>
              <li>
                <h5>
                  <DynamicFeatherIcon iconName="MessageSquare" className="iw-16 ih-16" />
                  <span>{like}</span> Likes  <span style={{
                    marginLeft: "10px",
                  }}>{comment ?? 0}</span> Comment
                </h5>
              </li>
            </ul>
          </div>
        </div>
        <CommonPostReact post={post} like={like} setLike={setLike} comment={comment} setComment={setComment} />
      </div>
    </div>
  );
};

export default PostBox;
