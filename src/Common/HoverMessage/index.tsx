import { UncontrolledPopover, PopoverBody, Media } from "reactstrap";
import ButtonPopover from "./ButtonPopover";
import { ImagePath, SvgPath } from "../../utils/constant";
import Image from "next/image";
import { HoverMessageProps } from "@/layout/LayoutTypes";

const HoverMessage = ({ name, target, placement, imagePath }: HoverMessageProps) => {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  return (
    <UncontrolledPopover trigger="hover" placement={placement} target={target}>
      <PopoverBody>
        <Media className="popover-media">
          {
            imagePath == "" ?
          <Image height={60} width={60} className="img-fluid user-img" src={`${ImagePath}/user-sm/def.jpg`} alt="user" />:
<Image height={60} width={60} className="img-fluid user-img" src={
  process.env.NEXT_PUBLIC_API_BASE + "/assets/" +imagePath
} alt="user" />
          }
          <Media body>
            <h4>{name}</h4>
          </Media>
        </Media>
        {/* <ButtonPopover /> */}
      </PopoverBody>
    </UncontrolledPopover>
  );
};

export default HoverMessage;
