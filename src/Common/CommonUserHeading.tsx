import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { FC, useState } from "react";
import { Dropdown, Media, DropdownToggle, DropdownMenu } from "reactstrap";
import { Href, ImagePath } from "../utils/constant/index";
import { postDropDownOption } from "@/Data/NewsFeed";
import { CommonUserHeadingProps } from "./CommonInterFace";
import CustomImage from "./CustomImage";
import HoverMessage from "./HoverMessage";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')



const CommonUserHeading: FC<CommonUserHeadingProps> = ({ image, id, post }) => {
  const [showOption, setShowOption] = useState(false);
  return (
    <div className="post-title">
      <div className="profile">
        <Media>
          <a className="popover-cls user-img bg-size blur-up lazyloaded" href={Href} id={id}>
            {
              post?.profile_pic ?
                <CustomImage src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${post!.profile_pic}`} className="img-fluid blur-up lazyload bg-img" alt="user" />
                :
                <CustomImage src={`${ImagePath}/user-sm/def.jpg`} className="img-fluid blur-up lazyload bg-img" alt="user" />
            }
          </a>
          <Media body>
            <h5>{post?.name ?? (post?.author_name ?? "sufiya eliza")}</h5>
            <h6>{timeAgo.format(new Date(post?.created_at ?? new Date()))}</h6>
          </Media>
        </Media>
        <HoverMessage placement={"right"} target={id} name={post?.name ?? ""} imagePath={post?.profile_pic ?? ""} />
      </div>
    </div>
  );
};

export default CommonUserHeading;
