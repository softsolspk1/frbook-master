import { ChangeEvent, useState } from "react";
import { Album, Href, Post } from "../../utils/constant/index";
import CreatePostHeader from "./CreatePostHeader";
import { Button, Input } from "reactstrap";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import OptionsInputs from "./OptionsInputs";
import { createPostData } from "@/Data/common";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

interface CreatePostProps {
  reloadPost?: () => void;
}
const CreatePost: React.FC<CreatePostProps> = ({ reloadPost }) => {
  const colorList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [writePost, setWritePost] = useState(false);
  const [showPostButton, setShowPostButton] = useState(false);
  const [optionInput, setOptionInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const router = useRouter();

  const handleImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_BASE + "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);
    
    if (!data) {
      return;
    }

    setImgUrl(data);
  };
  
  const handleVid = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // check file size
    if (file.size > 10000000) {
      toast.error("File size is too large");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_BASE + "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);
    
    if (!data) {
      return;
    }

    setVideoUrl(data);
  };



  const formSubmitHandle = async () => {
    const resp = await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: description,
        video: videoUrl,
        image: imgUrl,
      }),
    });

    if (resp.status === 200) {
      toast.success("Post created successfully");
      setTitle("");
      setVideoUrl("");
      setImgUrl("");
      setDescription("");
      setShowPostButton(false);
      setWritePost(false);
      reloadPost!();
    } else {
      const message = await resp.json();
      toast.error(message || "Something went wrong");
    }
  };

  return (
    <div className="create-post">
      <div className={`static-section ${writePost ? "d-none" : ""}`}>
        <div className="card-title">
          <h3>Create Post</h3>
        </div>
        <div className="search-input input-style icon-right form-group"
          style={{
            marginBottom: "20px",
            marginTop: "20px",
            // center it
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          {imgUrl && 
            <img
              src= {process.env.NEXT_PUBLIC_API_BASE+"/assets/" + imgUrl}
              alt="Image"
              style={{ width: "auto", height: "20vh" }} // Add this line to limit the image width
            />
          }
          {videoUrl &&
            <video
              src= {process.env.NEXT_PUBLIC_API_BASE+"/assets/" + videoUrl}
              controls
              style={{ width: "100%", height: "100%" }} // Add this line to limit the video width
            />
          }
        </div>

        <div
          className="search-input input-style icon-right form-group"
          style={{
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <label htmlFor="" className="form-check-label">
            Title
          </label>
          <Input
            onClick={() => setShowPostButton(true)}
            type="text"
            className="enable"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title here.."
          />
        </div>
        <div
          className="search-input input-style icon-right form-group"
          style={{
            marginTop: "20px",
          }}
        >
          <label htmlFor="" className="form-check-label">
            Description
          </label>
          <Input
            onClick={() => setShowPostButton(true)}
            type="textarea"
            onChange={(e) => setDescription(e.target.value)}
            className="enable"
            value={description}
            placeholder="write something here.."
          />
        </div>
      </div>
      <ul className="create-btm-option">
        <li>
          <Input
            className="choose-file"
            accept=".png,.jpeg"
            type="file"
            onChange={handleImg}
          />
          <h5>
            <DynamicFeatherIcon iconName="Camera" className="iw-14" />
            {Album}
          </h5>
        </li>
        <li>
          <Input className="choose-file" accept=".mp4"
            onChange={handleVid}
          type="file" />
          <h5>
            <DynamicFeatherIcon iconName="Video" className="iw-14" />
            Video
          </h5>
        </li>
      </ul>
      <div className={`post-btn ${showPostButton ? "d-block" : "d-none"}  `}>
        <Button onClick={formSubmitHandle}>{Post}</Button>
      </div>
    </div>
  );
};

export default CreatePost;
