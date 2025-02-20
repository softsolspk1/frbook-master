"use client";
import CustomImage from "@/Common/CustomImage";
import { ChoosePhoto, EditProfile, ImagePath, RemovePhoto, SetPosition, UploadPhoto } from "../../utils/constant";
import Image from "next/image";
import UserData from "./UserData";
import { Href } from "../../utils/constant/index";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { FC, useState } from "react";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { UserProfileInterFace } from "../LayoutTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-toolkit/store";
import UserDropDown from "./UserDropDown";

const UserProfile:FC<UserProfileInterFace> = ({toggle, user}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDropDown = () => setDropDownOpen(!dropDownOpen);
  const { imageLink,backgroundImage } = useSelector((state: RootState) => state.LayoutSlice);
  
  return (
    <div className="profile-cover bg-size blur-up lazyloaded">
      <CustomImage src={`${ImagePath}/${backgroundImage}`} className="img-fluid blur-up lazyload bg-img " alt="cover"/>
      <div className="profile-box d-lg-block d-none">
        <div className="profile-content">
          <div className="image-section">
            <div className="profile-img">
              <div className="bg-size blur-up lazyloaded">  
              {
                user?.profile_pic ? (
                  <CustomImage src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${user!.profile_pic}`} className="img-fluid blur-up lazyload bg-img" alt="profile"/>
                ) : (
                  <CustomImage src={`${ImagePath}/user-sm/def.jpg`} className="img-fluid blur-up lazyload bg-img" alt="profile"/>
                )
              }
              </div>
              <span className="stats">
                <Image width={15} height={15} src={`${ImagePath}/icon/verified.png`} className="img-fluid blur-up lazyloaded" alt="verified"/>
              </span>
            </div>
          </div>
          <div className="profile-detail">
            <h2>{user?.name} <span>❤</span></h2>
            <h5>{user?.email}</h5>
            <UserData />
            <a onClick={toggle} className="btn btn-solid">{EditProfile}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
