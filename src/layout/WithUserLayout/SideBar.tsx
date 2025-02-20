import CustomImage from "@/Common/CustomImage";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { ImagePath } from "../../utils/constant";
import React, { FC } from "react";
import { Href } from "../../utils/constant/index";
import { smallSideBarData } from "@/Data/Layout";
import SvgIconCommon from "@/Common/SvgIconCommon";
import { UserInterFace } from "../LayoutTypes";
import Link from "next/link";

const SideBar: FC<UserInterFace> = ({ user }) => {
  return (
    <div className="sidebar-panel panel-lg dark-sidebar">
      <div className="user-wrap">
        <div className="profile-img">
          <div className="bg-size blur-up lazyloaded">
            {
              user?.profile_pic ?
                <CustomImage src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${user?.profile_pic}`} className="img-fluid blur-up bg-img lazyloaded" alt="profile" /> :
                <CustomImage src={`${ImagePath}/user-sm/def.jpg`} className="img-fluid blur-up bg-img lazyloaded" alt="profile" />
            }
          </div>
        </div>
        <div className="user-info">
          <h3>{user?.name}</h3>
          <h4>{user?.email}</h4>
        </div>
      </div>
      <div className="main-icon d-lg-none d-block">
        <a href={Href}>
          <DynamicFeatherIcon iconName="Grid" className="bar-icon" />
        </a>
      </div>
      <ul className="sidebar-icon">
        {smallSideBarData.map((data, index) => (
          <li className={data.title === "newsfeed" ? "active" : ""} key={index}>
            <Link
              href={data.path ?? ""}
            >
              <DynamicFeatherIcon iconName={data.icon} className="bar-icon" />
              <h4>{data.title}</h4>
            </Link>
          </li>
        ))}
      </ul>
      <div className="main-icon d-lg-none d-block">
        <a>
          <DynamicFeatherIcon iconName="Power" className="bar-icon" />
        </a>
      </div>
    </div>
  );
};

export default SideBar;
