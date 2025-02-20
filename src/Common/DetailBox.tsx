import { FC, useState } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { DetailBoxProps } from "./CommonInterFace";
import { ImagePath, PeopleReactThisPost } from "../utils/constant";
import CustomImage from "./CustomImage";
import { toast } from 'react-toastify';
import { PostBoxInterface } from "@/components/NewsFeed/Style1/Style1Types";

const DetailBox: FC<PostBoxInterface> = ({ post }) => {
  const [bookMarkActive, setBookMarkActive] = useState(false);
  const numbers = [1, 2, 3];
  return (
    <div className="detail-box">
      <h3>{post?.title}</h3>
      <p>
        {
          post?.content
        }
      </p>

    </div>
  );
};

export default DetailBox;
