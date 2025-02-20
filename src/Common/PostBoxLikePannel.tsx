import { Comment, Share, SvgPath } from "../utils/constant";
import Image from "next/image";
import { FC } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";

const PostBoxLikePanel: FC = () => {
  const emojisNames = ["040", 113, "027", "033"];
  return (
    <div className="like-panel">

      <div className="right-stats">
        <ul>
          <li>
            <h5>
              <DynamicFeatherIcon iconName="MessageSquare" className="iw-16 ih-16" />
              <span>4565</span> {Comment}
            </h5>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostBoxLikePanel;
