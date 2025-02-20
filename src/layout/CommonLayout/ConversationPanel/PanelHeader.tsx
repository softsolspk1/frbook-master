import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import {
  FindFriends,
  Friends,
  SeeAll,
  Settings,
  StartNewConversation,
} from "../../../utils/constant";
import { FC, useState } from "react";

const PanelHeader: FC = () => {
  const [showPanel, setShowPanel] = useState(false);
  return (
    <div className="panel-header">
      <h2>{Friends}</h2>
      <h5>{StartNewConversation}</h5>
      <div className="setting">
        <div className="setting-btn setting-dropdown">
          <div className="btn-group custom-dropdown dropdown-sm">
            <a>
              <DynamicFeatherIcon
                iconName="Sun"
                className="icon-theme stroke-width-3 icon iw-11 ih-11"
                onClick={() => setShowPanel(!showPanel)}
              />
            </a>
            <div
              className={`dropdown-menu dropdown-menu-right custom-dropdown ${showPanel ? "show" : ""
                } `}
              style={{
                position: "absolute",
                inset: "0px auto auto 0px",
                margin: 0,
                transform: "translate(-149px, 23px)",
              }}
            >
              <ul>
                <li>
                  <a>
                    <DynamicFeatherIcon
                      iconName="User"
                      className="icon-font-light iw-16 ih-16"
                    />
                    {SeeAll}
                  </a>
                </li>
                <li>
                  <a>
                    <DynamicFeatherIcon
                      iconName="Search"
                      className="icon-font-light iw-16 ih-16"
                    />
                    {FindFriends}
                  </a>
                </li>
                <li>
                  <a>
                    <DynamicFeatherIcon
                      iconName="Settings"
                      className="icon-font-light iw-16 ih-16"
                    />
                    {Settings}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelHeader;
