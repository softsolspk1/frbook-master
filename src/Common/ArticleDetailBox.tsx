import { FC, useState } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { DetailBoxProps } from "./CommonInterFace";
import { ImagePath, PeopleReactThisPost } from "../utils/constant";
import CustomImage from "./CustomImage";
import { toast } from 'react-toastify';
import { ArticleBoxInterface, PostBoxInterface } from "@/components/NewsFeed/Style1/Style1Types";

const ArticleDetailBox: FC<ArticleBoxInterface> = ({ post }) => {
  return (
    <div className="detail-box">
      <h3>{post?.title}</h3>
      <p>
        {
          post?.description
        }
      </p>
    </div>
  );
};

export default ArticleDetailBox;
