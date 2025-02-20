import { UncontrolledPopover, PopoverBody, Media } from "reactstrap";
import { ImagePath, SvgPath } from "../../utils/constant";
import Image from "next/image";
import {
  HoverMessageProps,
  HoverMessagePropsNotFriend,
} from "@/layout/LayoutTypes";
import { toast } from "react-toastify";

const HoverMessageNotFriend = ({
  name,
  target,
  placement,
  imagePath,
  reloadFriends,
  user,
}: HoverMessagePropsNotFriend) => {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const handleAccept = async () => {
    var resp = await fetch(`/api/friend-requests/${user.req_id}/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status === 200) {
      toast.success("Friend request accepted");
    } else {
      toast.error("Something went wrong");
    }
    reloadFriends!();
  }

  const handleReject = async () => {
    var resp = await fetch(`/api/friend-requests/${user.req_id}/reject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status === 200) {
      toast.success("Friend request rejected");
    } else {
      toast.error("Something went wrong");
    }
    reloadFriends!();
  }


  const sendFr = async () => {
    var resp = await fetch("/api/friend-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to_id: user.id }),
    });

    if (resp.status === 200) {
      toast.success("Friend request sent");
    } else {
      toast.error("Something went wrong");
    }
    reloadFriends!();
  };

  return (
    <UncontrolledPopover trigger="hover" placement={placement} target={target}>
      <PopoverBody>
        <Media className="popover-media">
          {imagePath ? (
            <Image
              height={60}
              width={60}
              className="img-fluid user-img"
              src={imagePath}
              alt="user"
            />
          ) : (
            <Image
              height={60}
              width={60}
              className="img-fluid user-img"
              src={`${ImagePath}/user-sm/def.jpg`}
              alt="user"
            />
          )}
          <Media body>
            <h4>{name}</h4>
            {/* <h6>
              <Image height={15} width={15} src={`${SvgPath}/users.svg`} className="img-fluid" alt="users" />
              30 mutual friend
            </h6>
            <h6>
              <Image height={15} width={15} src={`${SvgPath}/map-pin.svg`} className="img-fluid" alt="users" />
              lives in london
            </h6> */}
          </Media>
        </Media>
        <div className="button-popover">
          {(user?.status ?? 0) == 0 && (
            <a
              className="btn btn-solid"
              onClick={sendFr}
              style={{
                width: "100%",
              }}
            >
              Send Friend Request
            </a>
          )}

          {(user?.status ?? 0) == 1 && (
            <a
              className="btn btn-solid"
              style={{
                width: "100%",
                backgroundColor: "gray",
                // remove border
                border: "none",
              }}
            >
              Request Already Sent
            </a>
          )}

          {(user?.status ?? 0) == 2 && (
            <>
            <a
              className="btn btn-solid"
              onClick={handleAccept}
              style={{
                width: "50%",
                backgroundColor: "green",
                // remove border
                border: "none",

              }}
            >
              Accept
            </a>
            <a
              className="btn btn-solid"
              onClick={handleReject}
              style={{
                width: "50%",
                backgroundColor: "red",
                border: "none",
              }}
            >
              Reject
            </a>
            </>
          )}
        </div>{" "}
      </PopoverBody>
    </UncontrolledPopover>
  );
};

export default HoverMessageNotFriend;
