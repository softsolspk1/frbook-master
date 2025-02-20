import {
  About,
  Upgrade,
  Communication,
  Resources,
} from "../../../utils/constant";
import React from "react";
import { Href } from "../../../utils/constant/index";

const LoginHeaderSection = () => {
  return (
    <div className="header-section">
      <div className="logo-sec"></div>
      <div className="right-links">
        <ul>
          <li>
            <a style={{ fontSize: "12px" }}>{About}</a>
          </li>
          <li>
            <a style={{ fontSize: "12px" }}>{Upgrade}</a>
          </li>
          <li>
            <a style={{ fontSize: "12px" }}>{Resources}</a>
          </li>
          <li>
            <a style={{ fontSize: "12px" }}>{Communication}</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginHeaderSection;
