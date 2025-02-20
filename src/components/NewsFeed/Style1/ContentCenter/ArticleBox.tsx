import CommonLikePanel from "@/Common/CommonLikePanel";
import CommonPostReact from "@/Common/CommonPostReact";
import CommonUserHeading from "@/Common/CommonUserHeading";
import DetailBox from "@/Common/DetailBox";
import { CelebrationNewAlbum, CelebrationSpan, ImagePath } from "../../../../utils/constant";
import Image from "next/image";
import React, { FC } from "react";
import { ArticleInterface, PostBoxInterface } from "../Style1Types";
import PostBoxLikePanel from "@/Common/PostBoxLikePannel";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { likePost } from "@/api/operations";
import ArticleDetailBox from "@/Common/ArticleDetailBox";
import { useRouter } from "next/navigation";
import Link from "next/link";


const ArticleBox: FC<ArticleInterface> = ({ article }) => {
  const router = useRouter();

  return (
    <div className="post-wrapper col-grid-box section-t-space d-block">
      <CommonUserHeading image={1} post={article} id={`c${article!.id}`} />
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
            article?.photo ?
              <img src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${article!.photo}`} className="img-fluid blur-up lazyloaded" alt="image"
                style={
                  {
                    maxHeight: "40vh",
                    width: "auto",
                  }
                }
              /> : null
          }
        </div>
        <ArticleDetailBox post={article} />
        <>
          <div className="post-react">
            <ul>
              <li className="comment-click">
                <Link
                  href={'/dashboard/repository/' + article!.id}
                >
                  <DynamicFeatherIcon iconName="MessageSquare" className="iw-18 ih-18" />View Article
                </Link>
              </li>


            </ul>
          </div>
        </>
      </div>
    </div>
  );
};

export default ArticleBox;
