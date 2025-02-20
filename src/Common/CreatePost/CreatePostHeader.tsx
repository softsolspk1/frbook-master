import { CreatePost, GoLive, Href, ImagePath } from "../../utils/constant";
import { FC } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { Input } from "reactstrap";
import OptionDropDown from "./OptionDropDown";
import SettingsDropDown from "./SettingsDropDown";
import { CreatePostHeaderInterFace } from "../CommonInterFace";
import Image from "next/image";

const CreatePostHeader: FC<CreatePostHeaderInterFace> = ({ writePost, setShowPostButton }) => {
  return (
    <div className={`static-section ${writePost ? "d-none" : ""}`}>
      <div className="card-title">
        <h3>{CreatePost}</h3>
      </div>
      <div className="search-input input-style icon-right">
        <Input
          onClick={() => setShowPostButton(true)}
          type="text"
          className="enable"
          placeholder="write something here.."
        />
      </div>
    </div>
  );
};

export default CreatePostHeader;
