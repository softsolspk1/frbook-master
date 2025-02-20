import { Href, ImagePath, Replay, Translate } from "../../utils/constant";
import { FC } from "react";
import { Media } from "reactstrap";
import { Like } from "../../utils/constant/index";
import CustomImage from "../CustomImage";
import { MainCommentProps } from "../CommonInterFace";
import HoverMessage from "../HoverMessage";

const SimpleMainComment: FC<MainCommentProps> = ({ message, like, id }) => {
  return (
    <Media>
      <a href={Href} className="user-img popover-cls bg-size blur-up lazyloaded" id={id}>
        <CustomImage src={`${ImagePath}/user-sm/2.jpg`} className="img-fluid blur-up lazyload bg-img" alt="user" />
      </a>
      <HoverMessage placement={"right"} target={id} name={"sufiya elija"} imagePath={`user-sm/2.jpg`} />
      <Media body>
        <a href={Href}>
          <h5>Pabelo Mukrani</h5>
        </a>
        <p>{message}</p>

      </Media>
      <div className="comment-time">
        <h6>50 mins ago</h6>
      </div>
    </Media>
  );
};

export default SimpleMainComment;
