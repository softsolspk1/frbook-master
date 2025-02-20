import React, { ChangeEvent, FC, useRef, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { ModalInterFace } from "../LayoutTypes";
import { EditProfile, ImagePath, Href, EditProfileImage } from "../../utils/constant/index";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import EditProfileDetails from "./EditProfileDetails";
import UpdateImageModal from "./UpdateImageModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import CustomImage from "@/Common/CustomImage";
import axios from "axios";
import { toast } from "react-toastify";

const EditCoverModal: FC<ModalInterFace> = ({ isOpen, toggle, user }) => {
  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  const saveImage = async () => {
    var resp = await fetch('/api/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ profile_pic: img })
    });

    if (resp.status === 200) {
      toggle();
    }else{
      toast.error("Error saving image");
    }

    // save image to the server
  }

  const [img, setImg] = useState<string | undefined>(user?.profile_pic);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

    setImg(data);

  };
  
  const { imageLink } = useSelector((state: RootState) => state.LayoutSlice);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{EditProfile}</ModalHeader>
        <ModalBody>
          <div className="edit-profile-sec">
            <div className="profile-wrap">
              <div className="edit-title">
                <div className="icon">
                  <DynamicFeatherIcon iconName="Image" className="iw-16 ih-16"/>
                </div>
                <h5>{EditProfileImage}</h5>
              </div>
              <div className="edit-content">
                <div className="profile-pic">
                  <div className="bg-size blur-up lazyloaded">
                    {/* <CustomImage
                      src={`${ImagePath}/${imageLink}`}
                      className="img-fluid blur-up lazyload bg-img"
                      alt=""
                    /> */}
                    {/* show a default image here */}
                    {
                      img ? (
                        <CustomImage
                          src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${img}`}
                          className="img-fluid blur-up lazyload bg-img"
                          alt=""
                        />
                      ) : (
                        <CustomImage
                          src={`${ImagePath}/user-sm/def.jpg`}
                          className="img-fluid blur-up lazyload bg-img"
                          alt=""
                        />
                      )
                    }
                  </div>

                  {/* open image input when edit image clicked */}
                  <a  onClick={handleEdit}>
                    edit image
                  </a>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="solid"
            onClick={saveImage}
          >save changes</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditCoverModal;
