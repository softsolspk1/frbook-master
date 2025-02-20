import * as Icon from "react-feather";
import { FeatherIconType } from "./CommonInterFace";

const DynamicFeatherIcon: React.FC<FeatherIconType> = ({ iconName, className, onClick, color }) => {
  const IconComp = Icon[iconName];
  return <IconComp className={className} onClick={onClick} style={
    {
      color: color,
    }
  } />;
};

export default DynamicFeatherIcon;
